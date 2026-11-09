import express from 'express';
import { Newsletter } from '../models/Newsletter.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }
    try {
      await Newsletter.create({ email });
    } catch {}
    res.json({ success: true, message: 'Subscribed to Aarvya Realty Pune Property Insights successfully!' });
  } catch (error) {
    next(error);
  }
});

export default router;
