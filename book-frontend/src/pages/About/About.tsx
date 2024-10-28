import { useEffect } from "react";
import { Link } from "react-router-dom";

// Định nghĩa kiểu cho props
interface AboutProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const About: React.FC<AboutProps> = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(false);
  }, []);

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
                <h1>About Us</h1>
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
                    About Us
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="company-services" className="padding-large pb-0 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 pb-3 pb-lg-0">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
                <div className="icon-box-content">
                  <h4 className="card-title mb-1 text-capitalize text-dark">
                    Free delivery
                  </h4>
                  <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3 pb-lg-0">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <i className="fa-solid fa-award"></i>
                </div>
                <div className="icon-box-content">
                  <h4 className="card-title mb-1 text-capitalize text-dark">
                    Quality guarantee
                  </h4>
                  <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3 pb-lg-0">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <i className="fa-solid fa-tag"></i>
                </div>
                <div className="icon-box-content">
                  <h4 className="card-title mb-1 text-capitalize text-dark">
                    Daily offers
                  </h4>
                  <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3 pb-lg-0">
              <div className="icon-box d-flex">
                <div className="icon-box-icon pe-3 pb-3">
                  <i className="fa-solid fa-shield"></i>
                </div>
                <div className="icon-box-content">
                  <h4 className="card-title mb-1 text-capitalize text-dark">
                    100% secure payment
                  </h4>
                  <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image-holder position-relative mb-4 d-flex align-items-center justify-content-center">
                <a
                  type="button"
                  data-bs-toggle="modal"
                  data-src="https://www.youtube.com/embed/Zo2vYU2noeI?si=wz_nYYtvxxouOFXA"
                  data-bs-target="#myModal"
                  className="play-btn position-absolute"
                >
                  <div className="play-icon border border-2 border-dark rounded-pill p-5">
                    <i className="fa-solid fa-play text-black fs-2"></i>
                  </div>
                </a>
                <div className="image">
                  <img
                    src="./single-image-about.jpg"
                    alt="single"
                    className="img-fluid rounded-3 single-image"
                    width={500}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail ps-md-5 mt-5">
                <div className="display-header">
                  <h3 className="mb-3">Best Bookstore of all time</h3>
                  <p className="pb-1">
                    Risus augue curabitur diam senectus congue velit et. Sed
                    vitae metus nibh sit era. Nulla adipiscing pharetra
                    pellentesque maecenas odio eros at. Et libero vulputate amet
                    duis erat volutpat vitae eget. Sed vitae metus nibh sit era.
                    Nulla adipiscing pharetra eros at.
                  </p>
                  <p>
                    Nulla adipiscing pharetra pellentesque maecenas odio eros
                    at. Et libero vulputate amet duis erat volutpat vitae eget.
                    Quam libero etiam et in ac at quis. Risus augue curabitur
                    diam senectus congue velit et.{" "}
                  </p>
                  <a
                    href="shop.html"
                    className="btn mt-3 text-white"
                    style={{ backgroundColor: " #682d37" }}
                  >
                    Go to shop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          id="demo"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{
            backgroundImage: "url(./banner-image-bg.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "350px",
          }}
        >
          <div className="carousel-inner">
            <div className="section-title text-center">
              <h3 className="mt-5">Customers reviews</h3>
            </div>
            <div className="carousel-item active">
              <div className="d-flex justify-content-center">
                <div className="card p-5 border rounded-3 w-50">
                  <blockquote>
                    "I stumbled upon this bookstore while visiting the city, and
                    it instantly became my favorite spot. The cozy atmosphere,
                    friendly staff, and wide selection of books make every visit
                    a delight!"
                  </blockquote>
                  <div className="rating text-warning d-flex align-items-center">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <h5 className="mt-1 fw-normal">Emma Chamberlin</h5>
                </div>
              </div>
            </div>
            <div className="carousel-item ">
              <div className="d-flex justify-content-center">
                <div className="card p-5 border rounded-3 w-50">
                  <blockquote>
                    "As an avid reader, I'm always on the lookout for new
                    releases, and this bookstore never disappoints. They always
                    have the latest titles, and their recommendations have
                    introduced me to some incredible reads!"
                  </blockquote>
                  <div className="rating text-warning d-flex align-items-center">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <h5 className="mt-1 fw-normal">Thomas John</h5>
                </div>
              </div>
            </div>
            <div className="carousel-item ">
              <div className="d-flex justify-content-center">
                <div className="card p-5 border rounded-3 w-50">
                  <blockquote>
                    "I ordered a few books online from this store, and I was
                    impressed by the quick delivery and careful packaging. It's
                    clear that they prioritize customer satisfaction, and I'll
                    definitely be shopping here again!"
                  </blockquote>
                  <div className="rating text-warning d-flex align-items-center">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <h5 className="mt-1 fw-normal">Kevin Bryan</h5>
                </div>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>
      <section id="latest-posts" className="mt-5">
        <div className="container">
          <div className="section-title d-md-flex justify-content-between align-items-center mb-4">
            <h3 className="d-flex align-items-center">Latest posts</h3>
            <a href="shop.html" className="btn">
              View All
            </a>
          </div>
          <div className="row">
            <div className="col-md-3 posts mb-4">
              <img
                src="./post-item1.jpg"
                alt="post image"
                className="img-fluid rounded-3"
              />
              <a
                href="blog.html"
                className="fs-6 "
                style={{ color: " #682d37", textDecoration: "none" }}
              >
                Books
              </a>
              <h4 className="card-title mb-2 text-capitalize text-dark">
                <a
                  href="single-post.html"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  10 Must-Read Books of the Year: Our Top Picks!
                </a>
              </h4>
              <p className="mb-2">
                Dive into the world of cutting-edge technology with our latest
                blog post, where we highlight five essential gadge.{" "}
                <span>
                  <a
                    className="text-decoration-underline text-black-50"
                    href="single-post.html"
                  >
                    Read More
                  </a>
                </span>
              </p>
            </div>
            <div className="col-md-3 posts mb-4">
              <img
                src="./post-item2.jpg"
                alt="post image"
                className="img-fluid rounded-3"
              />
              <a
                href="blog.html"
                className="fs-6 "
                style={{ color: " #682d37", textDecoration: "none" }}
              >
                Books
              </a>
              <h4 className="card-title mb-2 text-capitalize text-dark">
                <a
                  href="single-post.html"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  The Fascinating Realm of Science Fiction
                </a>
              </h4>
              <p className="mb-2">
                Explore the intersection of technology and sustainability in our
                latest blog post. Learn about the innovative{" "}
                <span>
                  <a
                    className="text-decoration-underline text-black-50"
                    href="single-post.html"
                  >
                    Read More
                  </a>
                </span>{" "}
              </p>
            </div>
            <div className="col-md-3 posts mb-4">
              <img
                src="./post-item3.jpg"
                alt="post image"
                className="img-fluid rounded-3"
              />
              <a
                href="blog.html"
                className="fs-6 "
                style={{ color: " #682d37", textDecoration: "none" }}
              >
                Books
              </a>
              <h4 className="card-title mb-2 text-capitalize text-dark">
                <a
                  href="single-post.html"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Finding Love in the Pages of a Book
                </a>
              </h4>
              <p className="mb-2">
                Stay ahead of the curve with our insightful look into the
                rapidly evolving landscape of wearable technology.{" "}
                <span>
                  <a
                    className="text-decoration-underline text-black-50"
                    href="single-post.html"
                  >
                    Read More
                  </a>
                </span>
              </p>
            </div>
            <div className="col-md-3 posts mb-4">
              <img
                src="./post-item4.jpg"
                alt="post image"
                className="img-fluid rounded-3"
              />
              <a
                href="blog.html"
                className="fs-6 "
                style={{ color: " #682d37", textDecoration: "none" }}
              >
                Books
              </a>
              <h4 className="card-title mb-2 text-capitalize text-dark">
                <a
                  href="single-post.html"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Reading for Mental Health: How Books Can Heal and Inspire
                </a>
              </h4>
              <p className="mb-2">
                In today's remote work environment, productivity is key.
                Discover the top apps and tools that can help you stay{" "}
                <span>
                  <a
                    className="text-decoration-underline text-black-50"
                    href="single-post.html"
                  >
                    Read More
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="instagram" className="mt-5 mb-4">
        <div className="container">
          <div className="text-center mb-4">
            <h3>Instagram</h3>
          </div>
          <div className="row">
            <div className="col-md-2">
              <figure className="instagram-item position-relative rounded-3">
                <a
                  href="https://templatesjungle.com/"
                  className="image-link position-relative"
                >
                  <div className="icon-overlay position-absolute d-flex justify-content-center"></div>
                  <img
                    src="./insta-item1.jpg"
                    alt="instagram"
                    className="img-fluid rounded-3 insta-image"
                  />
                </a>
              </figure>
            </div>
            <div className="col-md-2">
              <figure className="instagram-item position-relative rounded-3">
                <a
                  href="https://templatesjungle.com/"
                  className="image-link position-relative"
                >
                  <div className="icon-overlay position-absolute d-flex justify-content-center"></div>
                  <img
                    src="./insta-item2.jpg"
                    alt="instagram"
                    className="img-fluid rounded-3 insta-image"
                  />
                </a>
              </figure>
            </div>
            <div className="col-md-2">
              <figure className="instagram-item position-relative rounded-3">
                <a
                  href="https://templatesjungle.com/"
                  className="image-link position-relative"
                >
                  <div className="icon-overlay position-absolute d-flex justify-content-center"></div>
                  <img
                    src="./insta-item3.jpg"
                    alt="instagram"
                    className="img-fluid rounded-3 insta-image"
                  />
                </a>
              </figure>
            </div>
            <div className="col-md-2">
              <figure className="instagram-item position-relative rounded-3">
                <a
                  href="https://templatesjungle.com/"
                  className="image-link position-relative"
                >
                  <div className="icon-overlay position-absolute d-flex justify-content-center"></div>
                  <img
                    src="./insta-item4.jpg"
                    alt="instagram"
                    className="img-fluid rounded-3 insta-image"
                  />
                </a>
              </figure>
            </div>
            <div className="col-md-2">
              <figure className="instagram-item position-relative rounded-3">
                <a
                  href="https://templatesjungle.com/"
                  className="image-link position-relative"
                >
                  <div className="icon-overlay position-absolute d-flex justify-content-center"></div>
                  <img
                    src="./insta-item5.jpg"
                    alt="instagram"
                    className="img-fluid rounded-3 insta-image"
                  />
                </a>
              </figure>
            </div>
            <div className="col-md-2">
              <figure className="instagram-item position-relative rounded-3">
                <a
                  href="https://templatesjungle.com/"
                  className="image-link position-relative"
                >
                  <div className="icon-overlay position-absolute d-flex justify-content-center"></div>
                  <img
                    src="./insta-item6.jpg"
                    alt="instagram"
                    className="img-fluid rounded-3 insta-image"
                  />
                </a>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal modal-lg fade"
        id="myModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/Zo2vYU2noeI?si=wz_nYYtvxxouOFXA"
                  id="video"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
