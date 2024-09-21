import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  genreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  publishedDate: { type: Date, required: true },
  summary: { type: String },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
