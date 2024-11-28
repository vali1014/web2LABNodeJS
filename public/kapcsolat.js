const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE HTML>
    <html lang="hu">
    <head>
      <title>Kapcsolat</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="stylesheet" href="/assets/css/main.css" />
      <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
      <style>
        input, textarea {
          color: black !important;
        }
      </style>
    </head>
    <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #000; position: relative; text-align: center;">

      <!-- Wrapper -->
      <div id="wrapper" class="fade-in">

        <!-- Header -->
        <header id="header">
          <a href="/" class="logo">Budapesti Mozi Műsor</a>
        </header>

        <!-- Nav -->
        <nav id="nav">
          <ul class="links">
            <li><a href="/">Főoldal</a></li>
            <li><a href="/adatbazis">Adatbázis</a></li>
            <li class="active"><a href="/kapcsolat">Kapcsolat</a></li>
            <li><a href="/uzenetek">Üzenetek</a></li>
            <li><a href="/crud">CRUD</a></li>
            <li><a href="/oop">OOP</a></li>
          </ul>
        </nav>

        <!-- Main -->
        <div id="main">
          <article class="post featured">
            <header class="major">
              <h2><a href="#">Kapcsolat oldal</a></h2>
            </header>
            <form action="/kapcsolat" method="POST">
              <label for="nev">Név:</label>
              <input type="text" id="nev" name="nev" required>
              <label for="uzenet">Üzenet:</label>
              <textarea id="uzenet" name="uzenet" required></textarea>
              <button type="submit">Küldés</button>
            </form>
          </article>
        </div>

        <!-- Footer -->
        <footer id="footer">
          <section class="split contact">
            <section class="alt">
              <h3>Készítette: </h3>
              <p>Dunai Valéria</p>
            </section>
            <section class="alt">
              <h3>NJE </h3>
              <p>webprogramozás II LA-02</p>
            </section>
            <section>
              <h3>NEPTUN kód: </h3>
              <p>VVXZPP</p>
            </section>
          </section>
        </footer>
      </div>

      <!-- Scripts -->
      <script src="/assets/js/jquery.min.js"></script>
      <script src="/path/to/scrolly-plugin.js"></script>
      <script src="/assets/js/browser.min.js"></script>
      <script src="/assets/js/breakpoints.min.js"></script>
      <script src="/assets/js/util.js"></script>
      <script src="/assets/js/main.js"></script>
    </body>
    </html>
  `);
});

router.post('/', (req, res) => {
  const { nev, uzenet } = req.body;
  const idopont = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formázott időpont

  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb012',
    password: 'PaSsWoRd13',
    database: 'db012'
  });

  con.connect(function(err) {
    if (err) {
      console.error('Database connection failed:', err.stack);
      res.status(500).send('Database connection failed');
      return;
    }
    var query = "INSERT INTO uzenetek (nev, uzenet, idopont) VALUES (?, ?, ?)";
    con.query(query, [nev, uzenet, idopont], function (err, result) {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }
      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>Kapcsolat</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/assets/css/main.css" />
          <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
        </head>
        <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #000; position: relative; text-align: center;">

          <!-- Wrapper -->
          <div id="wrapper" class="fade-in">

            <!-- Header -->
            <header id="header">
              <a href="/" class="logo">Budapesti Mozi Műsor</a>
            </header>

            <!-- Nav -->
            <nav id="nav">
              <ul class="links">
                <li><a href="/">Főoldal</a></li>
                <li><a href="/adatbazis">Adatbázis</a></li>
                <li class="active"><a href="/kapcsolat">Kapcsolat</a></li>
                <li><a href="/uzenetek">Üzenetek</a></li>
                <li><a href="/crud">CRUD</a></li>
                <li><a href="/oop">OOP</a></li>
              </ul>
            </nav>

            <!-- Main -->
            <div id="main">
              <article class="post featured">
                <header class="major">
                  <h2><a href="#">Kapcsolat oldal</a></h2>
                </header>
                <div>
                  <p>Sikeresen elküldted az üzeneted a weboldal tulajdonosának!<br>Köszönjük visszajelzésedet!</p>
                  <form action="/kapcsolat" method="GET">
                    <button type="submit">Vissza</button>
                  </form>
                </div> 
              </article>
            </div>

            <!-- Footer -->
            <footer id="footer">
              <section class="split contact">
                <section class="alt">
                  <h3>Készítette: </h3>
                  <p>Dunai Valéria</p>
                </section>
                <section class="alt">
                  <h3>NJE </h3>
                  <p>webprogramozás II LA-02</p>
                </section>
                <section>
                  <h3>NEPTUN kód: </h3>
                  <p>VVXZPP</p>
                </section>
              </section>
            </footer>
          </div>

          <!-- Scripts -->
          <script src="/assets/js/jquery.min.js"></script>
          <script src="/path/to/scrolly-plugin.js"></script>
          <script src="/assets/js/browser.min.js"></script>
          <script src="/assets/js/breakpoints.min.js"></script>
          <script src="/assets/js/util.js"></script>
          <script src="/assets/js/main.js"></script>
        </body>
        </html>
      `);
    });
  });
});

module.exports = router;
