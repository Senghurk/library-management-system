import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const booksPath = path.join(dataDir, 'books.json');
const authorsPath = path.join(dataDir, 'authors.json');
const genresPath = path.join(dataDir, 'genres.json');

// Utility function to read JSON file
async function readJsonFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// Utility function to write JSON file
async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Books
export async function getAllBooks() {
  return readJsonFile(booksPath);
}

export async function getBookById(id) {
  const books = await getAllBooks();
  return books.find(book => book.id === id);
}

export async function addBook(book) {
  const books = await getAllBooks();
  const newBook = { ...book, id: Date.now().toString() };
  books.push(newBook);
  await writeJsonFile(booksPath, books);
  return newBook;
}

export async function updateBook(id, updatedBook) {
  const books = await getAllBooks();
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook, id };
    await writeJsonFile(booksPath, books);
    return books[index];
  }
  throw new Error('Book not found');
}

export async function deleteBook(id) {
  const books = await getAllBooks();
  const filteredBooks = books.filter(book => book.id !== id);
  if (books.length !== filteredBooks.length) {
    await writeJsonFile(booksPath, filteredBooks);
    return true;
  }
  throw new Error('Book not found');
}

// Authors
export async function getAllAuthors() {
  return readJsonFile(authorsPath);
}

export async function getAuthorById(id) {
  const authors = await getAllAuthors();
  return authors.find(author => author.id === id);
}

export async function addAuthor(author) {
  const authors = await getAllAuthors();
  const newAuthor = { 
    ...author, 
    id: Date.now().toString(),
    birthDate: author.birthDate || new Date().toISOString().split('T')[0]
  };
  authors.push(newAuthor);
  await writeJsonFile(authorsPath, authors);
  return newAuthor;
}

export async function updateAuthor(id, updatedAuthor) {
  const authors = await getAllAuthors();
  const index = authors.findIndex(author => author.id === id);
  if (index !== -1) {
    authors[index] = { ...authors[index], ...updatedAuthor, id };
    await writeJsonFile(authorsPath, authors);
    return authors[index];
  }
  throw new Error('Author not found');
}

export async function deleteAuthor(id) {
  const authors = await getAllAuthors();
  const filteredAuthors = authors.filter(author => author.id !== id);
  if (authors.length !== filteredAuthors.length) {
    await writeJsonFile(authorsPath, filteredAuthors);
    return true;
  }
  throw new Error('Author not found');
}

// Genres
export async function getAllGenres() {
  return readJsonFile(genresPath);
}

export async function getGenreById(id) {
  const genres = await getAllGenres();
  return genres.find(genre => genre.id === id);
}

export async function addGenre(genre) {
  const genres = await getAllGenres();
  const newGenre = { ...genre, id: Date.now().toString() };
  genres.push(newGenre);
  await writeJsonFile(genresPath, genres);
  return newGenre;
}

export async function updateGenre(id, updatedGenre) {
  const genres = await getAllGenres();
  const index = genres.findIndex(genre => genre.id === id);
  if (index !== -1) {
    genres[index] = { ...genres[index], ...updatedGenre, id };
    await writeJsonFile(genresPath, genres);
    return genres[index];
  }
  throw new Error('Genre not found');
}

export async function deleteGenre(id) {
  const genres = await getAllGenres();
  const filteredGenres = genres.filter(genre => genre.id !== id);
  if (genres.length !== filteredGenres.length) {
    await writeJsonFile(genresPath, filteredGenres);
    return true;
  }
  throw new Error('Genre not found');
}

// Additional utility functions
export async function getBooksByAuthor(authorId) {
  const books = await getAllBooks();
  return books.filter(book => book.authorId === authorId);
}

export async function getBooksByGenre(genreId) {
  const books = await getAllBooks();
  return books.filter(book => book.genreId === genreId);
}

export async function searchBooks(query) {
  const books = await getAllBooks();
  const lowerQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    (book.summary && book.summary.toLowerCase().includes(lowerQuery))
  );
}

export async function searchAuthors(query) {
  const authors = await getAllAuthors();
  const lowerQuery = query.toLowerCase();
  return authors.filter(author => 
    author.name.toLowerCase().includes(lowerQuery) ||
    (author.biography && author.biography.toLowerCase().includes(lowerQuery))
  );
}

export async function searchGenres(query) {
  const genres = await getAllGenres();
  const lowerQuery = query.toLowerCase();
  return genres.filter(genre => 
    genre.name.toLowerCase().includes(lowerQuery) ||
    (genre.description && genre.description.toLowerCase().includes(lowerQuery))
  );
}