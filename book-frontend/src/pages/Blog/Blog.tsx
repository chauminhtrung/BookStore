import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Blog } from "../../API/ApiClient";
import { getAllBlogs } from "../../API/ApiClient";

// Định nghĩa kiểu cho props
interface BlogProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const Blog: React.FC<BlogProps> = ({ setIsAdmin }) => {
  const [blogs, setblogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  useEffect(() => {
    loadBlogs();
    setIsAdmin(false);
  }, []);

  const loadBlogs = async () => {
    try {
      const blogsData = await getAllBlogs();
      setblogs(blogsData);
    } catch (error) {
      console.error("Failed to load authors", error);
    }
  };

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentPosts = blogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div>
      <section
        className="hero-section position-relative padding-large"
        style={{
          backgroundImage: "url(./banner-image-bg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "200px",
        }}
      >
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="text-center mt-5">
                <h1>Blog</h1>
                <div className="breadcrumbs">
                  <span className="item">
                    <Link
                      to="/home"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Home &gt;{" "}
                    </Link>
                  </span>
                  <span className="item text-decoration-underline">Blog</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="blog" className="mt-5">
        <div className="container">
          <div className="row flex-row-reverse g-md-5">
            <main className="col-md-9 mb-4 mb-md-0">
              <div className="filter-blog d-flex flex-wrap justify-content-between mb-4">
                <div className="showing-product">
                  <p>Showing 1-9 of 55 results</p>
                </div>
                <div className="sort-by">
                  <select
                    id="sorting"
                    className="form-select"
                    data-filter-sort=""
                    data-filter-order=""
                  >
                    <option value="">Latest to oldest</option>
                    <option value="">Oldest to latest</option>
                    <option value="">Popular</option>
                    <option value="">Name (A - Z)</option>
                    <option value="">Name (Z - A)</option>
                    <option value="">Model (A - Z)</option>
                    <option value="">Model (Z - A)</option>
                  </select>
                </div>
              </div>
              <div className="row post-contents">
                {currentPosts.map((blog, i) => (
                  <div key={i} className="col-lg-4 col-md-6 posts mb-5">
                    <img
                      src={`./${blog.imageURL}`}
                      alt="post image"
                      className="rounded-3"
                      width={270}
                      height={162}
                    />
                    <h4 className="card-title mb-2 text-capitalize text-dark">
                      <Link
                        to={`/blog/${blog.blogID}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {blog.title}
                      </Link>
                    </h4>
                    <p className="mb-2">
                      {blog.content}
                      <span>
                        <Link
                          to={`/blog/${blog.blogID}`}
                          className="text-decoration-underline text-black-50"
                        >
                          Read More
                        </Link>
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Phân trang */}
              <Pagination className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </main>

            <aside className="col-md-3">
              <div className="sidebar">
                {/* thanh tim kiem */}
                <div className="widget-menu">
                  <div className="widget-search-bar">
                    <form className="d-flex border rounded-3" role="search">
                      <input
                        className="form-control border-0 me-2 py-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn rounded-3 p-3 d-flex align-items-center"
                        type="submit"
                      >
                        <i className="fa-solid fa-magnifying-glass fs-5"></i>
                      </button>
                    </form>
                  </div>
                </div>
                {/* Categories */}
                <div className="widget-product-categories pt-5">
                  <div className="section-title overflow-hidden mb-2">
                    <h3 className="d-flex flex-column mb-0">Categories</h3>
                  </div>
                  <ul className="product-categories mb-0 sidebar-list list-unstyled">
                    <li className="cat-item">
                      <a
                        href="/collections/categories"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        All
                      </a>
                    </li>
                    <li className="cat-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Phones
                      </a>
                    </li>
                    <li className="cat-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Accessories
                      </a>
                    </li>
                    <li className="cat-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Tablets
                      </a>
                    </li>
                    <li className="cat-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Watches
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Tags */}
                <div className="widget-product-tags pt-5">
                  <div className="section-title overflow-hidden mb-2">
                    <h3 className="d-flex flex-column mb-0">Tags</h3>
                  </div>
                  <ul className="product-tags mb-0 sidebar-list list-unstyled">
                    <li className="tags-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        White
                      </a>
                    </li>
                    <li className="tags-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Cheap
                      </a>
                    </li>
                    <li className="tags-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Mobile
                      </a>
                    </li>
                    <li className="tags-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Modern
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Social Links */}
                <div className="widget-social-links pt-5">
                  <div className="section-title overflow-hidden mb-2">
                    <h3 className="d-flex flex-column mb-0">Social Links</h3>
                  </div>
                  <ul className="social-links mb-0 sidebar-list list-unstyled">
                    <li className="links">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Facebook
                      </a>
                    </li>
                    <li className="links">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Instagram
                      </a>
                    </li>
                    <li className="links">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Twitter
                      </a>
                    </li>
                    <li className="links">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Youtube
                      </a>
                    </li>
                    <li className="links">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Pinterest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
