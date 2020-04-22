import express from 'express';
import { getCourses } from '../controllers/courseController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router({ mergeParams: true });

router.get('/', asyncHandler(getCourses));

export default router;
