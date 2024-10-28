import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Book } from "../../API/ApiClient";
import { getAllBooks } from "../../API/ApiClient";

// Định nghĩa kiểu cho props
interface ShopProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const Shop: React.FC<ShopProps> = ({ setIsAdmin }) => {
  const [books, setbooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const postsPerPage = 7;

  useEffect(() => {
    loadBooks();
    setIsAdmin(false);
  }, []);

  //load danh sach book
  const loadBooks = async () => {
    try {
      const booksData = await getAllBooks();
      setbooks(booksData);
      setFilteredBooks(booksData);
      console.log(books);
    } catch (error) {
      console.error("Failed to load authors", error);
    }
  };

  //page
  const totalPages = Math.ceil(filteredBooks.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentPosts = filteredBooks.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  //filter theo Author
  const handleSelectByAuthor = (nameAuthor: string) => {
    const updatedBooks = books.filter(
      (item) => item.author.name === nameAuthor
    );
    setFilteredBooks(updatedBooks); // Cập nhật danh sách sách đã lọc
  };

  //filter theo Genre
  const handleSelectByGenre = (genre: string) => {
    const updatedBooks = books.filter((item) => item.genre === genre);
    setFilteredBooks(updatedBooks); // Cập nhật danh sách sách đã lọc
  };

  // Để reset về danh sách gốc:
  const resetFilter = () => {
    setFilteredBooks(books); // Khôi phục lại toàn bộ danh sách gốc
  };

  // Hàm để lấy rating cao nhất cho mỗi cuốn sách
  const getHighestRating = (book: Book) => {
    return book.bookReviews.length > 0
      ? Math.max(...book.bookReviews.map((review) => review.rating))
      : 0;
  };

  // Hàm để lấy rating thap nhất cho mỗi cuốn sách
  const getLowestRating = (book: Book) => {
    return book.bookReviews.length > 0
      ? Math.min(...book.bookReviews.map((review) => review.rating))
      : 0;
  };
  //lay value select
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    if (selectedOption === "h") {
      const sortedBooks = [...books].sort(
        (a, b) => getHighestRating(b) - getHighestRating(a)
      );
      setFilteredBooks(sortedBooks);
    } else if (selectedOption === "l") {
      const sortedBooks = [...books].sort(
        (a, b) => getLowestRating(b) - getLowestRating(a)
      );
      setFilteredBooks(sortedBooks);
    } else if (selectedOption === "az") {
      const sortedBooks = [...books].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setFilteredBooks(sortedBooks);
    } else if (selectedOption === "za") {
      const sortedBooks = [...books].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      setFilteredBooks(sortedBooks);
    } else if (selectedOption === "lh") {
      const sortedBooks = [...books].sort((a, b) => a.price - b.price);
      setFilteredBooks(sortedBooks);
    } else if (selectedOption === "hl") {
      const sortedBooks = [...books].sort((a, b) => b.price - a.price);
      setFilteredBooks(sortedBooks);
    } else {
      setFilteredBooks(books);
    }
  };

  // Hàm xử lý thay đổi khi người dùng nhập
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

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
                <h1>Shop</h1>
                <div className="breadcrumbs">
                  <span className="item">
                    <Link
                      to="/home"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Home &gt;{" "}
                    </Link>
                  </span>
                  <span className="item text-decoration-underline">Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="shopify-grid padding-large mt-5">
        <div className="container">
          <div className="row flex-row-reverse g-md-5">
            <main className="col-md-9">
              <div className="filter-shop d-flex flex-wrap justify-content-between mb-5">
                <div className="showing-product">
                  <p>
                    Showing 1–{postsPerPage} of {books.length} results
                  </p>
                </div>
                <div className="sort-by">
                  <select
                    id="sorting"
                    className="form-select"
                    data-filter-sort=""
                    data-filter-order=""
                    onChange={handleSortChange}
                  >
                    <option value="all">Default sorting</option>
                    <option value="az">Name (A - Z)</option>
                    <option value="za">Name (Z - A)</option>
                    <option value="lh">Price (Low-High)</option>
                    <option value="hl">Price (High-Low)</option>
                    <option value="h">Rating (Highest)</option>
                    <option value="l">Rating (Lowest)</option>
                  </select>
                </div>
              </div>
              <div className="row product-content product-store">
                {currentPosts.map((item, i) => (
                  <div key={i} className="col-lg-3 col-md-4 mb-4">
                    <div className="card position-relative p-4 border rounded-3">
                      {/* <div className="position-absolute">
                        <p className="bg-primary py-1 px-3 fs-6 text-white rounded-2">
                          10% off
                        </p>
                      </div> */}
                      <img
                        src={`${item.imageURL}`}
                        className="img-fluid shadow-sm"
                        alt="product item"
                        width={150}
                        height={100}
                      />
                      <h6 className="mt-4 mb-0 fw-bold">
                        <Link
                          to={`/shop/${item.bookID}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {item.title}
                        </Link>
                      </h6>
                      <div className="review-content d-flex">
                        <Link
                          to={`/AuthorProfile/${item.author.authorID}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {item.author.name}
                        </Link>

                        <div className="rating text-warning d-flex align-items-center"></div>
                      </div>

                      <span className="price text-danger fw-bold mb-2 fs-5">
                        {item.price}$
                      </span>
                    </div>
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
              <div className="sidebar ps-lg-5">
                <div className="widget-menu">
                  {/* thanh tim kiem */}
                  <div className="widget-menu">
                    <div className="widget-search-bar">
                      <form className="d-flex border rounded-3" role="search">
                        <input
                          className="form-control border-0 me-2 py-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          onChange={handleInputChange}
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
                </div>
                <div className="widget-product-categories pt-5">
                  <div className="section-title overflow-hidden mb-2">
                    <h3 className="d-flex flex-column mb-0">Categories</h3>
                  </div>
                  <ul className="product-categories mb-0 sidebar-list list-unstyled">
                    <li className="cat-item">
                      <a
                        onClick={() => resetFilter()}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          cursor: "pointer",
                        }}
                      >
                        All
                      </a>
                    </li>
                    {books.slice(1, 5).map((book, i) => (
                      <li className="cat-item" key={i}>
                        <a
                          onClick={() => handleSelectByGenre(book.genre)}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                        >
                          {book.genre}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="widget-product-authur pt-5">
                  <div className="section-title overflow-hidden mb-2">
                    <h3 className="d-flex flex-column mb-0">authur</h3>
                  </div>
                  <ul className="product-tags mb-0 sidebar-list list-unstyled">
                    {books.slice(2, 6).map((book, i) => (
                      <li className="tags-item" key={i}>
                        <a
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSelectByAuthor(book.author.name)}
                        >
                          {book.author.name}
                        </a>
                      </li>
                    ))}
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

export default Shop;
