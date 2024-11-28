const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res) => {
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

    var query = "SELECT uzenet, DATE_FORMAT(idopont, '%Y. %m. %d. (%H:%i)') AS formatted_idopont FROM uzenetek ORDER BY idopont DESC";
    con.query(query, function (err, results) {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }

      let messagesHtml = results.map(message => `
        <tr>
          <td>${message.uzenet}</td>
          <td>${message.formatted_idopont}</td>
        </tr>
      `).join('');

      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>Üzenetek</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/assets/css/main.css" />
          <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
          <style>
            th {
              text-align: center;
            }
          </style>
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
                <li class="active"><a href="/uzenetek">Üzenetek</a></li>
                <li><a href="/crud">CRUD</a></li>
                <li><a href="/oop">OOP</a></li>
              </ul>
            </nav>

            <!-- Main -->
            <div id="main">
              <article class="post featured">
                <header class="major">
                  <h2><a href="#">Üzenetek oldal</a></h2>
                </header>
                <table>
                  <thead>
                    <tr>
                      <th>Üzenetek</th>
                      <th>Időpontok</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${messagesHtml}
                  </tbody>
                </table>
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

module.exports = router;
