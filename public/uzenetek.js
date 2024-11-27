const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE HTML>
    <html lang="hu">
    <head>
      <title>Üzenetek</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="stylesheet" href="/assets/css/main.css" />
      <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
    </head>
    <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #fff; position: relative;">

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

module.exports = router;
