import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true },
    content: [{ type: String }],
    category: { type: String, required: true },
    author: { type: String, default: 'Aarvya Realty Advisory' },
    readTime: { type: String, default: '5 min read' },
    image: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
