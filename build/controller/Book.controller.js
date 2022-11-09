"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Book_model_1 = __importDefault(require("../models/Book.model"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author } = req.body;
    const book = new Book_model_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        title,
        author
    });
    return yield book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
});
const readBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return yield Book_model_1.default.findById(bookId)
        .populate('author') // this field is an id, populate search that id in database and return that object
        .select('-__v') // do note return this field
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Book_model_1.default.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return yield Book_model_1.default.findById(bookId)
        .then((book) => __awaiter(void 0, void 0, void 0, function* () {
        if (book) {
            book.set(req.body);
            return yield book
                .save()
                .then((book) => res.status(201).json({ book }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    }))
        .catch((error) => res.status(500).json({ error }));
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return yield Book_model_1.default.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ book, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createBook, readBook, readAll, updateBook, deleteBook };
