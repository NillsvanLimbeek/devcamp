import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from '../utils/errorResponse';
import Course from '../models/Course';

async function getCourses(req: Request, res: Response, next: NextFunction) {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Course.find();
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
}

export { getCourses };
