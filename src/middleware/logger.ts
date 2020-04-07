import { Request, Response, NextFunction } from 'express';

function logger(req: Request, res: Response, next: NextFunction) {
    const { method, protocol, originalUrl } = req;

    console.log(`${method} ${protocol}://${req.get('host')}${originalUrl}`);
    next();
}

export { logger };
