import express, { Request, Response } from 'express';
import { BookController } from './src/books/book.controller';

const bookController = new BookController();

const router = express.Router();

router.post('/books', (req: Request, res: Response) => {
    bookController.create(req, res);
});

router.get('/books/:id', (req: Request, res: Response) => {
    bookController.getById(req, res);
});

router.put('/books/:id', (req: Request, res: Response) => {
    bookController.update(req, res);
});

router.delete('/books/:id', (req: Request, res: Response) => {
    bookController.deleteBook(req, res);
});

export default router;
