const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/:id', (req, res) => {
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

    const { id } = req.params;
    const query = 'SELECT * FROM uzenetek WHERE id = ?';
    con.query(query, [id], (err, results) => {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }

      const message = results[0];
      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>CRUD Edit</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/assets/css/main.css" />
          <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
        </head>
        <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #000; position: relative;">

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
                <li><a href="/kapcsolat">Kapcsolat</a></li>
                <li><a href="/uzenetek">Üzenetek</a></li>
                <li class="active"><a href="/crud">CRUD</a></li>
                <li><a href="/oop">OOP</a></li>
              </ul>
            </nav>

            <!-- Main -->
            <div id="main">
              <article class="post featured">
                <header class="major">
                  <h2><a href="#">Üzenet szerkesztése</a></h2>
                </header>
                <form method="POST" action="/crud/update/${id}">
                  <label for="nev">Név:</label>
                  <input type="text" id="nev" name="nev" value="${message.nev}" required>
                  <label for="uzenet">Üzenet:</label>
                  <textarea id="uzenet" name="uzenet" required>${message.uzenet}</textarea>
                  <label for="idopont">Időpont:</label>
                  <input type="datetime-local" id="idopont" name="idopont" value="${message.idopont}" required>
                  <button type="submit">Mentés</button>
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

router.post('/:id', (req, res) => {
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

    const { id } = req.params;
    const { nev, uzenet, idopont } = req.body;
    const query = 'UPDATE uzenetek SET nev = ?, uzenet = ?, idopont = ? WHERE id = ?';
    con.query(query, [nev, uzenet, idopont, id], (err, results) => {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }
      res.redirect('/crud');
    });
  });
});

module.exports = router;
