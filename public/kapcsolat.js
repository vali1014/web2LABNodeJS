const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="hu">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kapcsolat</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        <a href="/">Főoldal</a>
        <a href="/adatbazis">Adatbázis</a>
        <a href="/kapcsolat">Kapcsolat</a>
        <a href="/uzenetek">Üzenetek</a>
        <a href="/crud">CRUD</a>
        <a href="/oop">OOP</a>
      </nav>
      <main>
        <h1>Kapcsolat oldal</h1>
      </main>
      <footer>
        <p>Készítették: Nevek</p>
        <p>Elérhetőségek: emailcímek</p>
      </footer>
    </body>
    </html>
  `);
});

module.exports = router;
