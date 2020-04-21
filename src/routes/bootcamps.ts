import express from 'express';
import {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    deleteBootcamp,
    updateBootcamp,
} from '../controllers/bootcampController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.get('/', asyncHandler(getBootcamps));
router.get('/:id', asyncHandler(getBootcamp));

router.post('/', asyncHandler(createBootcamp));

router.put('/:id', asyncHandler(updateBootcamp));

router.delete('/:id', asyncHandler(deleteBootcamp));

export default router;
