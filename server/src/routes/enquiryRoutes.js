import express from 'express';
import { submitEnquiry, getEnquiries } from '../controllers/enquiryController.js';

const router = express.Router();

router.route('/').post(submitEnquiry).get(getEnquiries);

export default router;
