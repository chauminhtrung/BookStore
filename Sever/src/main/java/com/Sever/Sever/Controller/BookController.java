package com.Sever.Sever.Controller;

import com.Sever.Sever.DTO.AuthorDTO;
import com.Sever.Sever.DTO.BookDTO;
import com.Sever.Sever.DTO.SupplierDTO;
import com.Sever.Sever.Model.Book;
import com.Sever.Sever.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // Lấy danh sách tất cả sách
    @GetMapping
    public List<BookDTO> getAllBooks() {
        return bookService.getAllBooks().stream().map(book -> {
            BookDTO dto = new BookDTO();
            dto.setBookID(book.getBookID());
            dto.setTitle(book.getTitle());
            dto.setGenre(book.getGenre());
            dto.setPublicationdate(book.getPublicationdate());
            dto.setPrice(book.getPrice());
            dto.setDescription(book.getDescription());
            dto.setStockquantity(book.getStockquantity());
            dto.setImageURL(book.getImageURL());
            dto.setPublisher(book.getPublisher());
            dto.setIsbn(book.getIsbn());

            // Chuyển đổi Author sang AuthorDTO
            if (book.getAuthor() != null) {
                AuthorDTO authorDTO = new AuthorDTO();
                authorDTO.setAuthorID(book.getAuthor().getAuthorID());
                authorDTO.setName(book.getAuthor().getName());
                authorDTO.setBiography(book.getAuthor().getBiography());
                authorDTO.setNationality(book.getAuthor().getNationality());
                dto.setAuthor(authorDTO);
            }

            // Chuyển đổi Supplier sang SupplierDTO
            if (book.getSupplier() != null) {
                SupplierDTO supplierDTO = new SupplierDTO();
                supplierDTO.setSupplierID(book.getSupplier().getSupplierID());
                supplierDTO.setName(book.getSupplier().getName());
                supplierDTO.setAddress(book.getSupplier().getAddress());
                supplierDTO.setContact(book.getSupplier().getContact());
                dto.setSupplier(supplierDTO);
            }

            return dto;
        }).collect(Collectors.toList());
    }

    // Lấy thông tin sách theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable int id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo mới sách
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.createBook(book);
    }

    // Cập nhật sách
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable int id, @RequestBody Book updatedBook) {
        return bookService.getBookById(id)
                .map(book -> ResponseEntity.ok(bookService.updateBook(id, updatedBook)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa sách
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable int id) {
        if (bookService.getBookById(id).isPresent()) {
            bookService.deleteBook(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    private BookDTO convertToDTO(Book book) {
        BookDTO dto = new BookDTO();
        dto.setBookID(book.getBookID());
        dto.setTitle(book.getTitle());
        dto.setGenre(book.getGenre());
        dto.setPublicationdate(book.getPublicationdate());
        dto.setPrice(book.getPrice());
        dto.setDescription(book.getDescription());
        dto.setStockquantity(book.getStockquantity());
        dto.setImageURL(book.getImageURL());
        dto.setPublisher(book.getPublisher());
        dto.setIsbn(book.getIsbn());

        // Chuyển đổi Author sang AuthorDTO
        if (book.getAuthor() != null) {
            AuthorDTO authorDTO = new AuthorDTO();
            authorDTO.setAuthorID(book.getAuthor().getAuthorID());
            authorDTO.setName(book.getAuthor().getName());
            authorDTO.setBiography(book.getAuthor().getBiography());
            authorDTO.setNationality(book.getAuthor().getNationality());
            dto.setAuthor(authorDTO);
        }

        // Chuyển đổi Supplier sang SupplierDTO
        if (book.getSupplier() != null) {
            SupplierDTO supplierDTO = new SupplierDTO();
            supplierDTO.setSupplierID(book.getSupplier().getSupplierID());
            supplierDTO.setName(book.getSupplier().getSuppliername());
            supplierDTO.setAddress(book.getSupplier().getAddress());
            supplierDTO.setContact(book.getSupplier().getContactinfo());
            dto.setSupplier(supplierDTO);
        }

        return dto;
    }
}
