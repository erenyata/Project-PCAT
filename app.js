const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const path = require('path');

const Photo = require('./models/Photo');

const app = express();

mongoose.connect('mongodb://127.0.0.1/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // ejs views klasörüne bakar

// const myLogger = (req, res, next) => {
//   console.log('Middleware Log 1');
//   next();
// };

// const myLogger2 = (req, res, next) => {
//   console.log('Middleware Log 2');
//   next();
// };
// MIDDLEWARES
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

const port = 3000;

// routingler de middleware'dir

app.post('/photos', photoController.createPhoto);
app.get('/photos/:id', photoController.getPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.get('/', photoController.getAllPhotos);
app.get('/about',pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
