import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from '../utils/errorResponse';
import Bootcamp from '../models/Bootcamp';

async function getBootcamps(req: Request, res: Response, next: NextFunction) {
    let query;

    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'limit', 'page'];

    removeFields.forEach((field) => delete reqQuery[field]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`,
    );
    query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // exexute query
    const bootcamps = await query;

    // pagination object
    // TODO type
    let pagination: any = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    res.status(200).json({
        succes: true,
        count: bootcamps.length,
        pagination,
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
