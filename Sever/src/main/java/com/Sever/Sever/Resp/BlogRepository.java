package com.Sever.Sever.Resp;

import com.Sever.Sever.Model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
}

