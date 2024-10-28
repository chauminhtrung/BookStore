package com.Sever.Sever.Controller;

import com.Sever.Sever.Model.Blog;
import com.Sever.Sever.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // Lấy danh sách tất cả các bài blog
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    // Lấy thông tin một blog theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable int id) {
        Optional<Blog> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo mới blog
    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.createBlog(blog);
    }

    // Cập nhật thông tin blog
    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable int id, @RequestBody Blog updatedBlog) {
        return blogService.getBlogById(id)
                .map(blog -> ResponseEntity.ok(blogService.updateBlog(id, updatedBlog)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa blog
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable int id) {
        if (blogService.getBlogById(id).isPresent()) {
            blogService.deleteBlog(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
