import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from '../utils/errorResponse';
import Bootcamp from '../models/Bootcamp';

async function getBootcamps(req: Request, res: Response, next: NextFunction) {
    let query;

    const reqQuery = { ...req.query };
    const removeFields = ['select'];

    removeFields.forEach((field) => delete reqQuery[field]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`,
    );
    query = Bootcamp.find(JSON.parse(queryStr));

    const bootcamps = await query;

    res.status(200).json({
        succes: true,
        count: bootcamps.length,
        data: bootcamps,
    });
}

async function getBootcamp(req: Request, res: Response, next: NextFunction) {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp)
        return next(
            new ErrorResponse(
                `Bootcamp not found with id of ${req.params.id}`,
                404,
            ),
        );

    res.status(200).json({ succes: true, data: bootcamp });
}

async function createBootcamp(req: Request, res: Response) {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ succes: true, data: bootcamp });
}

async function updateBootcamp(req: Request, res: Response, next: NextFunction) {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!bootcamp) return res.status(400).json({ succes: false });

    res.status(200).json({ succes: true, data: bootcamp });
}

async function deleteBootcamp(req: Request, res: Response, next: NextFunction) {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) return res.status(400).json({ succes: false });

    res.status(200).json({ succes: true, data: {} });
}

export {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
};
