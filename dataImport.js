import mongoose from 'mongoose';
import fs from 'fs';

// Mongoose model schemas (ensure you have defined them earlier)
const authorSchema = new mongoose.Schema({
  name: String,
  biography: String,
  birthDate: String,
  nationality: String
});

const bookSchema = new mongoose.Schema({
  title: String,
  authorId: mongoose.Schema.Types.ObjectId,
  genreId: mongoose.Schema.Types.ObjectId,
  publishedDate: String,
  summary: String
});

const genreSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);
const Genre = mongoose.model('Genre', genreSchema);

const mongoDBUrl = 'your-mongodb-url-here';

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    importData();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to import data
async function importData() {
  try {
    // Read authors.json
    const authorsData = JSON.parse(fs.readFileSync('/data/authors.json', 'utf-8'));
    await Author.insertMany(authorsData);
    console.log('Authors data imported successfully');

    // Read genres.json
    const genresData = JSON.parse(fs.readFileSync('/data/genres.json', 'utf-8'));
    const insertedGenres = await Genre.insertMany(genresData);
    console.log('Genres data imported successfully');

    // Read books.json
    const booksData = JSON.parse(fs.readFileSync('/data/books.json', 'utf-8'));

    // Modify authorId and genreId in books to match MongoDB ObjectIds
    for (const book of booksData) {
      const author = await Author.findOne({ name: book.authorId });
      const genre = await Genre.findOne({ name: book.genreId });
      book.authorId = author._id;
      book.genreId = genre._id;
    }

    await Book.insertMany(booksData);
    console.log('Books data imported successfully');

    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
}
