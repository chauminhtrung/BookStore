package com.Sever.Sever.Service;

import com.Sever.Sever.DTO.BookDTO;
import com.Sever.Sever.Model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<BookDTO> getAllBooks();
    Optional<Book> getBookById(int id);
    Book createBook(Book book);
    Book updateBook(int id, Book book);
    void deleteBook(int id);
}
