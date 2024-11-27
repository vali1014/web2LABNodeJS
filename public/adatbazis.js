var mysql = require('mysql');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb012',
    password: 'PaSsWoRd13',
    database: 'db012'
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT DISTINCT mozinev FROM mozi;", function (err, result, fields) {
      if (err) throw err;
      var options = '<option value="">Válassz!</option>';
      for (var i = 0; i < result.length; i++) {
        options += `<option value="${result[i].mozinev}">${result[i].mozinev}</option>`;
      }
      res.send(`
        <!DOCTYPE html>
        <html lang="hu">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Adatbázis</title>
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
            <h1>Adatbázis oldal</h1>
            <form action="/adatbazis/filmek" method="POST">
              <label for="mozi">Válassz mozit!</label>
              <select name="mozi" id="mozi">
                ${options}
              </select>
              <button type="submit">Listázd ki a jelenleg itt játszott filmeket!</button>
            </form>
          </main>
          <footer>
            <p>Készítették: Nevek</p>
            <p>Elérhetőségek: emailcímek</p>
          </footer>
        </body>
        </html>
      `);
    });
  });
});

router.post('/filmek', (req, res) => {
  var moziNev = req.body.mozi;
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb012',
    password: 'PaSsWoRd13',
    database: 'db012'
  });

  con.connect(function(err) {
    if (err) throw err;
    var query = `
      SELECT film.filmcim 
      FROM film 
      JOIN hely ON film.fkod = hely.fkod 
      JOIN mozi ON hely.moziazon = mozi.moziazon 
      WHERE mozi.mozinev = ?;
    `;
    con.query(query, [moziNev], function (err, result, fields) {
      if (err) throw err;
      var filmek = "";
      for (var i = 0; i < result.length; i++) {
        filmek += `<tr><td>${result[i].filmcim}</td></tr>`;
      }
      res.send(`
        <!DOCTYPE html>
        <html lang="hu">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Adatbázis</title>
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
            <h1>A jelenleg ${moziNev} helyen játszott filmek listája:</h1>
            <table>
              <tr><th>Film cím</th></tr>
              ${filmek}
            </table>
            <form action="/adatbazis" method="GET">
              <button type="submit">Vissza</button>
            </form>
          </main>
          <footer>
            <p>Készítették: Nevek</p>
            <p>Elérhetőségek: emailcímek</p>
          </footer>
        </body>
        </html>
      `);
    });
  });
});

module.exports = router;
