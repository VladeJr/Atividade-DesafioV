import { Request, Response } from 'express';
import BookService from './book.service'; 

export class BookController {
    bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async create(req: Request, res: Response) {
        try {
            const book = await this.bookService.create(req.body);
            return res.json(book);
        } catch (error) {
            console.error('Erro ao criar livro:', error);
            return res.status(500).json({ message: 'Erro ao criar livro' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const book = await this.bookService.getById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Livro não encontrado' });
            }
            return res.json(book);
        } catch (error) {
            console.error('Erro ao buscar livro:', error);
            return res.status(500).json({ message: 'Erro ao buscar livro' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedBook = await this.bookService.update(req.params.id, req.body);
            if (!updatedBook) {
                return res.status(404).json({ message: 'Livro não encontrado' });
            }
            return res.json(updatedBook);
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            return res.status(500).json({ message: 'Erro ao atualizar livro' });
        }
    }

    async deleteBook(req: Request, res: Response) {
        try {
            await this.bookService.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
            return res.status(500).json({ message: 'Erro ao deletar livro' });
        }
    }
}

export default BookController;
