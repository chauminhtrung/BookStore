package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.Model.Author;
import com.Sever.Sever.Resp.AuthorRepository;
import com.Sever.Sever.Service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Optional<Author> getAuthorById(int id) {
        return authorRepository.findById(id);
    }

    @Override
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public Author updateAuthor(int id, Author updatedAuthor) {
        return authorRepository.findById(id)
                .map(author -> {
                    author.setName(updatedAuthor.getName());
                    author.setBiography(updatedAuthor.getBiography());
                    author.setNationality(updatedAuthor.getNationality());
                    return authorRepository.save(author);
                }).orElseThrow(() -> new RuntimeException("Author not found"));
    }

    @Override
    public void deleteAuthor(int id) {
        authorRepository.deleteById(id);
    }
}
