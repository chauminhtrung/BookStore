package com.Sever.Sever.Service;

import com.Sever.Sever.Model.BookReview;

import java.util.List;
import java.util.Optional;

public interface BookReviewService {
    List<BookReview> getAllBookReviews();
    List<BookReview> getAllBookReviewsbyBookId(int id);
    Optional<BookReview> getBookReviewById(int id);
    BookReview createBookReview(BookReview bookReview);
    BookReview updateBookReview(int id, BookReview bookReview);
    void deleteBookReview(int id);
}
