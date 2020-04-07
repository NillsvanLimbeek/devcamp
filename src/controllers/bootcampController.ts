import { Request, Response } from 'express';
import Bootcamp from '../models/Bootcamp';

async function getBootcamps(req: Request, res: Response) {
    res.json({ succes: true });
}

async function getBootcamp(req: Request, res: Response) {
    res.json({ succes: true, msg: `Bootcamp ${req.params.id}` });
}

async function createBootcamp(req: Request, res: Response) {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({ succes: true, data: bootcamp });
    } catch (error) {
        res.status(400).json({ succes: false, data: error });
    }
}

async function updateBootcamp(req: Request, res: Response) {
    res.json({ success: true, msg: `Updated Bootcamp ${req.params.id}` });
}

async function deleteBootcamp(req: Request, res: Response) {
    res.json({ success: true, msg: `Deleted Bootcamp ${req.params.id}` });
}

export {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
};
