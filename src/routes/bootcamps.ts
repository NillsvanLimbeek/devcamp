import express from 'express';
import {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    deleteBootcamp,
    updateBootcamp,
} from '../controllers/bootcampController';

const router = express.Router();

// TODO wrap in ErrorHandler for async/await error
router.get('/', getBootcamps);
router.get('/:id', getBootcamp);

router.post('/', createBootcamp);

router.put('/:id', updateBootcamp);

router.delete('/:id', deleteBootcamp);

export default router;
