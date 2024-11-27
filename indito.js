const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adatbazisRouter = require('./public/adatbazis'); // Importáljuk az adatb függvényt
const app = express();
const port = 8012;

const kapcsolatRouter = require('./public/kapcsolat');
const uzenetekRouter = require('./public/uzenetek');
const crudRouter = require('./public/crud');
const oopRouter = require('./public/oop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/images', express.static(path.join(__dirname, 'images'))); // Hozzáadva

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Módosítva a helyes útvonalra
});

app.use('/adatbazis', adatbazisRouter);
app.use('/kapcsolat', kapcsolatRouter);
app.use('/uzenetek', uzenetekRouter);
app.use('/crud', crudRouter);
app.use('/oop', oopRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
