import { useParams, Link } from "react-router-dom";
import type { Author, BookReview } from "../../API/ApiClient";
import { useEffect, useState } from "react";
import { getAuthorById, getBookReviewByBookId } from "../../API/ApiClient";

// Định nghĩa kiểu cho props
interface AuthorProfileProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ setIsAdmin }) => {
  const { AuthorId } = useParams<{ AuthorId: string }>(); // Lấy giá trị ItemId từ URL
  const [author, setauthor] = useState<Author | null>(null);
  const [bookReviews, setBookReviews] = useState<BookReview[]>([]); // Sửa setBooks và dùng null làm giá trị khởi tạo

  useEffect(() => {
    if (AuthorId) {
      getAuthor(Number(AuthorId)); // Chuyển ItemId sang kiểu số
    }
    setIsAdmin(false);
  }, [AuthorId]); // Thêm ItemId vào dependencies

  const getAuthor = async (Id: number) => {
    try {
      const authorData = await getAuthorById(Id); // getBookById là một API trả về dữ liệu
      const bookReviewsData = await getBookReviewByBookId(
        Number(authorData?.books[0].bookID)
      ); // getBookReviewByBookId là một API trả về dữ liệu
      setauthor(authorData); // Cập nhật state
      setBookReviews(bookReviewsData);
    } catch (error) {
      console.error("Failed to load books", error); // Sửa thông báo lỗi
    }
  };

  // Dùng useEffect để theo dõi state books nếu cần log khi thay đổi
  useEffect(() => {
    if (author) {
      console.log(author); // Log giá trị mới của books khi nó thay đổi
    }
  });

  return (
    <div>
      <section
        className="hero-section position-relative padding-large"
        style={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/banner-image-bg.jpg?alt=media&token=01ce541c-b584-4d1d-9d83-96375e1deb43)",
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
                <h1>Author Profile</h1>
                <div className="breadcrumbs">
                  <span className="item">
                    <Link
                      to="/home"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Home &gt;{" "}
                    </Link>
                  </span>
                  <span className="item text-decoration-underline">
                    Author Profile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {author ? (
        <div>
          {/* Profile Author Details Section Start  */}
          <section className="team-details-section fix section-padding mt-5">
            <div className="container">
              <div className="team-details-wrapper">
                <div className="team-details-items">
                  <div
                    className="details-image wow fadeInUp"
                    data-wow-delay=".3s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.3s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/Autob.png?alt=media&token=b564de0e-1e3c-4ed1-b16e-2d912ed395d9"
                      alt="img"
                    />
                  </div>
                  <div
                    className="details-content wow fadeInUp"
                    data-wow-delay=".5s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.3s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <h3>Author: {author.name}</h3>
                    <span>Nationality: {author.nationality}</span>
                    <div className="social-icon d-flex align-items-center">
                      <a href="https://www.facebook.com/">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="https://x.com/">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="https://www.youtube.com/">
                        <i className="fab fa-youtube"></i>
                      </a>
                      <a href="https://www.linkedin.com/">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <p
                  className="wow fadeInUp"
                  data-wow-delay=".7s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.3s",
                    animationName: "fadeInUp",
                  }}
                >
                  {author.biography}
                </p>
                <div className="details-counter-area">
                  <div
                    className="counter-items wow fadeInUp"
                    data-wow-delay=".3s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.3s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <h2>
                      <span className="count"> {author.books.length}</span>+
                    </h2>
                    <p>Books</p>
                  </div>
                  <div
                    className="counter-items wow fadeInUp"
                    data-wow-delay=".5s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.5s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <h2>
                      <span className="count">100</span>+
                    </h2>
                    <p>Seles</p>
                  </div>
                  <div
                    className="counter-items wow fadeInUp"
                    data-wow-delay=".7s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.7s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <h2>
                      <span className="count">{bookReviews.length}</span>+
                    </h2>
                    <p>Review</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* book by Author */}
          <section className="shop-section section-padding fix pt-0 mt-5">
            <div className="container">
              <div
                className="section-title wow fadeInUp"
                data-wow-delay=".3s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.3s",
                  animationName: "fadeInUp",
                }}
              >
                <h2>Books By: {author.name}</h2>
                <div className="row g-5">
                  {author.books.map((item, i) => (
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
                          <a
                            href={`/AuthorProfile/${author.authorID}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {author.name}
                          </a>
                          <div className="rating text-warning d-flex align-items-center"></div>
                        </div>

                        <span className="price text-danger fw-bold mb-2 fs-5">
                          {item.price}$
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>.......Loading</div>
      )}
    </div>
  );
};

export default AuthorProfile;
