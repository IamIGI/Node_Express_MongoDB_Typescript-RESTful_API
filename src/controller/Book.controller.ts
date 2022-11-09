import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BookModel from '../models/Book.model';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;
    const book = new BookModel({
        id: new mongoose.Types.ObjectId(),
        title,
        author
    });

    return await book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return await BookModel.findById(bookId)
        .populate('author') // this field is an id, populate search that id in database and return that object
        .select('-__v') // do note return this field
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return await BookModel.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return await BookModel.findById(bookId)
        .then(async (book) => {
            if (book) {
                book.set(req.body);

                return await book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return await BookModel.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ book, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
