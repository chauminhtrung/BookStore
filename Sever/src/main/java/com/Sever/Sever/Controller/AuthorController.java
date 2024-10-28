package com.Sever.Sever.Controller;

import com.Sever.Sever.Model.Author;
import com.Sever.Sever.Service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    // Lấy danh sách tất cả các tác giả
    @GetMapping
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    // Lấy thông tin một tác giả theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable int id) {
        Optional<Author> author = authorService.getAuthorById(id);
        return author.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo mới tác giả
    @PostMapping
    public Author createAuthor(@RequestBody Author author) {
        return authorService.createAuthor(author);
    }

    // Cập nhật thông tin tác giả
    @PutMapping("/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable int id, @RequestBody Author updatedAuthor) {
        return authorService.getAuthorById(id)
                .map(author -> ResponseEntity.ok(authorService.updateAuthor(id, updatedAuthor)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa tác giả
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable int id) {
        if (authorService.getAuthorById(id).isPresent()) {
            authorService.deleteAuthor(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
