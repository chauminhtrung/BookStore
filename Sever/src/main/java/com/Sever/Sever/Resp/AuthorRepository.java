package com.Sever.Sever.Resp;

import com.Sever.Sever.Model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
}

