"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Book_controller_1 = __importDefault(require("../controller/Book.controller"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.create), Book_controller_1.default.createBook);
router.get('/get/:bookId', Book_controller_1.default.readBook);
router.get('/get', Book_controller_1.default.readAll);
router.patch('/update/:bookId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.update), Book_controller_1.default.updateBook);
router.delete('/delete/:bookId', Book_controller_1.default.deleteBook);
module.exports = router;
