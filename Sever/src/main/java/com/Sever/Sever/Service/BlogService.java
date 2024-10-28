package com.Sever.Sever.Service;

import com.Sever.Sever.Model.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogService {
    List<Blog> getAllBlogs();
    Optional<Blog> getBlogById(int id);
    Blog createBlog(Blog blog);
    Blog updateBlog(int id, Blog blog);
    void deleteBlog(int id);
}
