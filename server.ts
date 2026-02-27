import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("cafe_bliss.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    name TEXT,
    price TEXT,
    desc TEXT
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    time TEXT,
    guests TEXT,
    requests TEXT,
    status TEXT DEFAULT 'pending'
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    alt TEXT
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );
`);

// Seed initial data if empty
const menuCount = db.prepare("SELECT COUNT(*) as count FROM menu").get() as { count: number };
if (menuCount.count === 0) {
  const insertMenu = db.prepare("INSERT INTO menu (category, name, price, desc) VALUES (?, ?, ?, ?)");
  insertMenu.run("Artisan Coffee", "Bliss Signature Cold Brew", "$8", "24-hour slow-steeped single-origin beans with a hint of cinnamon.");
  insertMenu.run("Artisan Coffee", "Vanilla Bean Latte", "$7", "Double espresso with house-made Madagascar vanilla bean syrup.");
  insertMenu.run("Signature Beverages", "Lavender Honey Matcha", "$9", "Ceremonial grade matcha with organic lavender and local honey.");
  insertMenu.run("Gourmet Bites", "Truffle Avocado Toast", "$14", "Smashed avocado, truffle oil, and micro-greens on sourdough.");
  insertMenu.run("Desserts", "Pistachio Rose Cake", "$10", "Light sponge with pistachio cream and rose petal garnish.");
}

const galleryCount = db.prepare("SELECT COUNT(*) as count FROM gallery").get() as { count: number };
if (galleryCount.count === 0) {
  const insertGallery = db.prepare("INSERT INTO gallery (url, alt) VALUES (?, ?)");
  insertGallery.run("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000", "Interior");
  insertGallery.run("https://images.unsplash.com/photo-1497933321188-941f9ad36b12?auto=format&fit=crop&q=80&w=500", "Latte Art");
  insertGallery.run("https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=500", "Friends");
  insertGallery.run("https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000", "Night Vibe");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/signup", (req, res) => {
    const { username, password } = req.body;
    try {
      db.prepare("INSERT INTO admins (username, password) VALUES (?, ?)").run(username, password);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: "Username already exists" });
    }
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const admin = db.prepare("SELECT * FROM admins WHERE username = ? AND password = ?").get(username, password);
    if (admin) {
      res.json({ success: true, token: "fake-jwt-token" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/menu", (req, res) => {
    const menu = db.prepare("SELECT * FROM menu").all();
    res.json(menu);
  });

  app.post("/api/menu", (req, res) => {
    const { id, category, name, price, desc } = req.body;
    if (id) {
      db.prepare("UPDATE menu SET category = ?, name = ?, price = ?, desc = ? WHERE id = ?").run(category, name, price, desc, id);
    } else {
      db.prepare("INSERT INTO menu (category, name, price, desc) VALUES (?, ?, ?, ?)").run(category, name, price, desc);
    }
    res.json({ success: true });
  });

  app.delete("/api/menu/:id", (req, res) => {
    db.prepare("DELETE FROM menu WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/reservations", (req, res) => {
    const reservations = db.prepare("SELECT * FROM reservations ORDER BY id DESC").all();
    res.json(reservations);
  });

  app.post("/api/reservations", (req, res) => {
    const { date, time, guests, requests } = req.body;
    db.prepare("INSERT INTO reservations (date, time, guests, requests) VALUES (?, ?, ?, ?)").run(date, time, guests, requests);
    res.json({ success: true });
  });

  app.post("/api/reservations/:id/confirm", (req, res) => {
    db.prepare("UPDATE reservations SET status = 'confirmed' WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/gallery", (req, res) => {
    const gallery = db.prepare("SELECT * FROM gallery").all();
    res.json(gallery);
  });

  app.post("/api/gallery", (req, res) => {
    const { id, url, alt } = req.body;
    if (id) {
      db.prepare("UPDATE gallery SET url = ?, alt = ? WHERE id = ?").run(url, alt, id);
    } else {
      db.prepare("INSERT INTO gallery (url, alt) VALUES (?, ?)").run(url, alt);
    }
    res.json({ success: true });
  });

  app.delete("/api/gallery/:id", (req, res) => {
    db.prepare("DELETE FROM gallery WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
