import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String },
  birthDate: { type: Date },
  nationality: { type: String },
}, { timestamps: true });

export default mongoose.models.Author || mongoose.model('Author', AuthorSchema);
