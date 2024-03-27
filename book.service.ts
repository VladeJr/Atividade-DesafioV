import Book from './book.schema'; 

export class BookService {

    async create(bookData: any) {
        const book = new Book(bookData);
        await book.save();
        return book;
    }

    async getById(id: string) {
        const book = await Book.findById(id);
        return book;
    }

    async update(id: string, updateData: any) {
        const book = await Book.findByIdAndUpdate(id, updateData, { new: true });
        return book;
    }

    async delete(id: string) {
        await Book.findByIdAndDelete(id);
    }

    async list() {
        const books = await Book.find();
        return books;
    }
}

export default BookService;