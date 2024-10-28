package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.DTO.AuthorDTO;
import com.Sever.Sever.DTO.BookDTO;
import com.Sever.Sever.DTO.SupplierDTO;
import com.Sever.Sever.Model.Book;
import com.Sever.Sever.Resp.BookRepository;
import com.Sever.Sever.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<BookDTO> getAllBooks() {
        // Lấy danh sách sách từ repository
        List<Book> books = bookRepository.findAll();

        // Chuyển đổi danh sách Book thành danh sách BookDTO
        return books.stream().map(book -> {
            // Tạo đối tượng BookDTO
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

            // Chuyển đổi Author sang AuthorDTO nếu không null
            if (book.getAuthor() != null) {
                AuthorDTO authorDTO = new AuthorDTO();
                authorDTO.setAuthorID(book.getAuthor().getAuthorID());
                authorDTO.setName(book.getAuthor().getName());
                authorDTO.setBiography(book.getAuthor().getBiography());
                authorDTO.setNationality(book.getAuthor().getNationality());
                dto.setAuthor(authorDTO);
            }

            // Chuyển đổi Supplier sang SupplierDTO nếu không null
            if (book.getSupplier() != null) {
                SupplierDTO supplierDTO = new SupplierDTO();
                supplierDTO.setSupplierID(book.getSupplier().getSupplierID());
                supplierDTO.setName(book.getSupplier().getSuppliername());
                supplierDTO.setAddress(book.getSupplier().getAddress());
                supplierDTO.setContact(book.getSupplier().getContactinfo());
                dto.setSupplier(supplierDTO);
            }

            return dto; // Trả về đối tượng BookDTO đã tạo
        }).collect(Collectors.toList()); // Collect lại thành danh sách
    }

    @Override
    public Optional<Book> getBookById(int id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(int id, Book updatedBook) {
        return bookRepository.findById(id)
                .map(book -> {
                    // Cập nhật các trường từ updatedBook
                    book.setTitle(updatedBook.getTitle());
                    book.setPrice(updatedBook.getPrice());
                    book.setDescription(updatedBook.getDescription());
                    book.setStockquantity(updatedBook.getStockquantity());
                    book.setGenre(updatedBook.getGenre());
                    book.setPublicationdate(updatedBook.getPublicationdate());
                    book.setAuthor(updatedBook.getAuthor());
                    book.setPublisher(updatedBook.getPublisher());
                    book.setIsbn(updatedBook.getIsbn());
                    book.setSupplier(updatedBook.getSupplier());
                    // Lưu lại sách đã cập nhật
                    return bookRepository.save(book);
                }).orElseThrow(() -> new RuntimeException("Book not found"));
    }


    @Override
    public void deleteBook(int id) {
        bookRepository.deleteById(id);
    }
}
