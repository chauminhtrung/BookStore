package com.Sever.Sever.Service;

import com.Sever.Sever.Model.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    List<Author> getAllAuthors();
    Optional<Author> getAuthorById(int id);
    Author createAuthor(Author author);
    Author updateAuthor(int id, Author author);
    void deleteAuthor(int id);
}
