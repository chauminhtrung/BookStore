package com.Sever.Sever.Resp;

import com.Sever.Sever.Model.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookReviewRepository extends JpaRepository<BookReview, Integer> {
    List<BookReview> findByBook_BookID(int bookID);
}
