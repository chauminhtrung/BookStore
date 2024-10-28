package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.Model.BookReview;
import com.Sever.Sever.Resp.BookReviewRepository;
import com.Sever.Sever.Service.BookReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookReviewServiceImpl implements BookReviewService {

    @Autowired
    private BookReviewRepository bookReviewRepository;

    @Override
    public List<BookReview> getAllBookReviews() {
        return bookReviewRepository.findAll();
    }

    @Override
    public List<BookReview> getAllBookReviewsbyBookId(int id) {
        return bookReviewRepository.findByBook_BookID(id);
    }

    @Override
    public Optional<BookReview> getBookReviewById(int id) {
        return bookReviewRepository.findById(id);
    }

    @Override
    public BookReview createBookReview(BookReview bookReview) {
        return bookReviewRepository.save(bookReview);
    }

    @Override
    public BookReview updateBookReview(int id, BookReview updatedBookReview) {
        return bookReviewRepository.findById(id)
                .map(bookReview -> {
                    bookReview.setReviewcontent(updatedBookReview.getReviewcontent());
                    bookReview.setRating(updatedBookReview.getRating());
                    bookReview.setReviewdate(updatedBookReview.getReviewdate());
                    // Cập nhật các trường khác nếu cần
                    return bookReviewRepository.save(bookReview);
                }).orElseThrow(() -> new RuntimeException("BookReview not found"));
    }

    @Override
    public void deleteBookReview(int id) {
        bookReviewRepository.deleteById(id);
    }
}
