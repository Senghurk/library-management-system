// components/books/BookForm.js
import { useState, useEffect } from 'react';

export function BookForm({ book, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: '',
    authorId: '',
    genreId: '',
    publishedDate: '',
    summary: '',
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... (input fields remain the same) ... */}
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : (book ? 'Update Book' : 'Add Book')}
      </button>
    </form>
  );
}