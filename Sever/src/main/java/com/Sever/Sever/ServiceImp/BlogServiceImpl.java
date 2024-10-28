package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.Model.Blog;
import com.Sever.Sever.Resp.BlogRepository;
import com.Sever.Sever.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blog> getBlogById(int id) {
        return blogRepository.findById(id);
    }

    @Override
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public Blog updateBlog(int id, Blog updatedBlog) {
        return blogRepository.findById(id)
                .map(blog -> {
                    blog.setTitle(updatedBlog.getTitle());
                    blog.setContent(updatedBlog.getContent());
                    blog.setPublisheddate(updatedBlog.getPublisheddate());
                    return blogRepository.save(blog);
                }).orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    @Override
    public void deleteBlog(int id) {
        blogRepository.deleteById(id);
    }
}
