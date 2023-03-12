const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  console.log(req.query);
  const page = req.query.page || 1; // Başlangıç sayfamız veya ilk sayfamız.
  const photosPerPage = 2; // Her sayfada bulunan fotoğraf sayısı
  const totalPhotos = await Photo.find().countDocuments(); // Toplam fotoğraf sayısı

  const photos = await Photo.find({}) // Fotoğrafları alıyoruz
    .skip((page - 1) * photosPerPage) // Her sayfanın kendi fotoğrafları
    .limit(photosPerPage); // Her sayfada olmasını istediğimi F. sayısını sınırlıyoruz.
  console.log(photos);

  res.render('index', {
    photos,
    current: Number(page),
    pages: Math.ceil(totalPhotos / photosPerPage),
  });

  /*   const photos = await Photo.find({}).sort('-dateCreated');*/
};

exports.getPhoto = async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('video', {
    photo: photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'views/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../views/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });

    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../views' + photo.image;

  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
