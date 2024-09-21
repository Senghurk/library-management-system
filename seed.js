const dbConnect = require('./lib/db');
const Author = require('./models/Author');
const Book = require('./models/Book');
const Genre = require('./models/Genre');
const authors = require('./data/authors.json');
const books = require('./data/books.json');
const genres = require('./data/genres.json');

async function seedDatabase() {
  try {
    await dbConnect();
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Author.deleteMany({});
    await Book.deleteMany({});
    await Genre.deleteMany({});

    console.log('Old data cleared');

    // Insert new data
    await Author.insertMany(authors);
    await Genre.insertMany(genres);
    await Book.insertMany(books);

    console.log('Data successfully loaded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
}

seedDatabase();
