const mongoose = require('mongoose');

const Schema = mongoose.Schema; // şablon oluşturalım

// Connect DB
mongoose.connect('mongodb://127.0.0.1/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create schema

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// create a photo

/* Photo.create(
  {
    title: 'Photo Title 1',
    description: 'Lorem ipsum photo description 1',
  },
  () => {
    console.log('abc');
  }
); */

// read a photo
// Photo.find({}, (err, data) => {
//   console.log(data);
// });

// update a photo
/* Photo.findByIdAndUpdate(
  "640ccc9877720113ac176b19",
  {
    title: 'Photo title 1 Updated',
    description: 'Photo desc 1 updated',
  },
  {
    new: true // konsolda güncellenmiş veriyi görmek için kullanılır 
  },
  (err, data) => {
    console.log(data);
  }
); */

// delete a photo

const id = "640ccc9877720113ac176b19"
Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Photo is removed.');
});
