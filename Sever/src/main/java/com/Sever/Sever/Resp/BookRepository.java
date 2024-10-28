package com.Sever.Sever.Resp;

import com.Sever.Sever.DTO.BookDTO;
import com.Sever.Sever.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
