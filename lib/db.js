const isServer = typeof window === 'undefined';

// Utility function for making API requests
async function fetchAPI(path, method = 'GET', body = null) {
  const baseUrl = isServer ? `http://localhost:${process.env.PORT || 3000}` : '';
  const url = `${baseUrl}/api${path}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return method === 'DELETE' ? null : response.json();
}

// Authors
export async function getAllAuthors() {
  return fetchAPI('/authors');
}

export async function getAuthorById(id) {
  return fetchAPI(`/authors/${id}`);
}

export async function addAuthor(author) {
  return fetchAPI('/authors', 'POST', author);
}

export async function updateAuthor(id, updatedAuthor) {
  return fetchAPI(`/authors/${id}`, 'PUT', updatedAuthor);
}

export async function deleteAuthor(id) {
  return fetchAPI(`/authors/${id}`, 'DELETE');
}

// Books
export async function getAllBooks() {
  console.log('getAllBooks called');
  try {
    const books = await fetchAPI('/books');
    console.log('Books fetched successfully:', books);
    return books;
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    throw error;
  }
}
export async function getBookById(id) {
  return fetchAPI(`/books/${id}`);
}

export async function addBook(book) {
  return fetchAPI('/books', 'POST', book);
}

export async function updateBook(id, updatedBook) {
  return fetchAPI(`/books/${id}`, 'PUT', updatedBook);
}

export async function deleteBook(id) {
  return fetchAPI(`/books/${id}`, 'DELETE');
}

// Genres
export async function getAllGenres() {
  return fetchAPI('/genres');
}

export async function getGenreById(id) {
  return fetchAPI(`/genres/${id}`);
}

export async function addGenre(genre) {
  return fetchAPI('/genres', 'POST', genre);
}

export async function updateGenre(id, updatedGenre) {
  return fetchAPI(`/genres/${id}`, 'PUT', updatedGenre);
}

export async function deleteGenre(id) {
  return fetchAPI(`/genres/${id}`, 'DELETE');
}

// Additional utility functions
export async function getBooksByAuthor(authorId) {
  return fetchAPI(`/books?authorId=${authorId}`);
}

export async function getBooksByGenre(genreId) {
  return fetchAPI(`/books?genreId=${genreId}`);
}

export async function searchBooks(query) {
  return fetchAPI(`/books/search?q=${encodeURIComponent(query)}`);
}

export async function searchAuthors(query) {
  return fetchAPI(`/authors/search?q=${encodeURIComponent(query)}`);
}

export async function searchGenres(query) {
  return fetchAPI(`/genres/search?q=${encodeURIComponent(query)}`);
}