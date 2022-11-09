import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import AuthorModel from '../models/Author.model';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const author = new AuthorModel({
        id: new mongoose.Types.ObjectId(),
        name
    });

    return await author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return await AuthorModel.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return await AuthorModel.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.status(500).json({ error }));
};
const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return await AuthorModel.findById(authorId)
        .then(async (author) => {
            if (author) {
                author.set(req.body);

                return await author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return await AuthorModel.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ author, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
