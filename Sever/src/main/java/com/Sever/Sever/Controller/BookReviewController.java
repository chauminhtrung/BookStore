package com.Sever.Sever.Controller;

import com.Sever.Sever.Model.BookReview;
import com.Sever.Sever.Service.BookReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookreviews")
public class BookReviewController {

    @Autowired
    private BookReviewService bookReviewService;

    // Lấy danh sách tất cả các đánh giá sách
    @GetMapping
    public List<BookReview> getAllBookReviews() {
        return bookReviewService.getAllBookReviews();
    }

    // Lấy thông tin đánh giá sách theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BookReview> getBookReviewById(@PathVariable int id) {
        Optional<BookReview> bookReview = bookReviewService.getBookReviewById(id);
        return bookReview.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Lấy thông tin đánh giá sách theo ID
    @GetMapping("Book-Id/{id}")
    public List<BookReview> getBookReviewByBookId(@PathVariable int id) {
        return bookReviewService.getAllBookReviewsbyBookId(id);
    }

    // Tạo mới đánh giá sách
    @PostMapping
    public BookReview createBookReview(@RequestBody BookReview bookReview) {
        return bookReviewService.createBookReview(bookReview);
    }

    // Cập nhật đánh giá sách
    @PutMapping("/{id}")
    public ResponseEntity<BookReview> updateBookReview(@PathVariable int id, @RequestBody BookReview updatedBookReview) {
        return bookReviewService.getBookReviewById(id)
                .map(bookReview -> ResponseEntity.ok(bookReviewService.updateBookReview(id, updatedBookReview)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa đánh giá sách
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookReview(@PathVariable int id) {
        if (bookReviewService.getBookReviewById(id).isPresent()) {
            bookReviewService.deleteBookReview(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
