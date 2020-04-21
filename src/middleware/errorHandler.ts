import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from './../utils/errorResponse';

function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    let error = { ...err, message: err.message };

    // log to console for devs
    console.error(err.stack);

    // mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with a id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // mongoose duplicate field
    if (err.code === 11000) {
        const message = `Duplicate value entered`;
        error = new ErrorResponse(message, 500);
    }

    // mongoose validation error
    if (err.name === 'ValidationError') {
        const errors: any = Object.values(err.errors);
        const message = errors.map((val: any) => val.message);

        error = new ErrorResponse(message, 400);
    }

    res.status(err.statusCode || 500).json({
        succes: false,
        error: error.message || 'Server Error',
    });
}

export { errorHandler };
