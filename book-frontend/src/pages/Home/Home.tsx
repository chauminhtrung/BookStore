import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useEffect, useState } from "react";
import "swiper/css";
import data from "../../Utils/Slider.json";
import { SliderSettings } from "../../Utils/common";
import { Link } from "react-router-dom";
import type { Book } from "../../API/ApiClient";
import { getAllBooks } from "../../API/ApiClient";
// Định nghĩa kiểu cho props
interface HomeProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const Home: React.FC<HomeProps> = ({ setIsAdmin }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [books, setbooks] = useState<Book[]>([]);

  const loadBooks = async () => {
    try {
      const booksData = await getAllBooks();
      setbooks(booksData);
      console.log(books);
    } catch (error) {
      console.error("Failed to load authors", error);
    }
  };

  useEffect(() => {
    setIsAdmin(false);
    loadBooks();
    const target = new Date("11/21/2024 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section>
        <div id="demo" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="2"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="position-relative d-flex align-items-center py-5 bg-light-gray"
                style={{
                  backgroundImage: "url(./banner-image-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "300px",
                }}
              >
                {books.slice(0, 1).map((book, i) => (
                  <div key={i} className="container">
                    <div className="row d-flex flex-column-reverse flex-md-row align-items-center">
                      <div className="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
                        <div className="banner-content">
                          <h2>{book.title} Book Collection</h2>
                          <p>Best Offer Save 30%. Grab it now!</p>
                          <Link
                            to={`/shop/${book.bookID}`}
                            className="btn btn-dark mt-3"
                          >
                            Shop Collection
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-6 text-center">
                        <div className="image-holder">
                          <img
                            src={`${book.imageURL}`}
                            className="img-fluid"
                            alt="banner"
                            width={180}
                            style={{ marginLeft: "50px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="position-relative d-flex align-items-center py-5 bg-light-gray"
                style={{
                  backgroundImage: "url(./banner-image-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "300px",
                }}
              >
                {books.slice(1, 2).map((book, i) => (
                  <div key={i} className="container">
                    <div className="row d-flex flex-column-reverse flex-md-row align-items-center">
                      <div className="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
                        <div className="banner-content">
                          <h2>{book.title} Book Collection</h2>
                          <p>Best Offer Save 30%. Grab it now!</p>
                          <Link
                            to={`/shop/${book.bookID}`}
                            className="btn btn-warning mt-3"
                          >
                            Shop Collection
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-6 text-center">
                        <div className="image-holder">
                          <img
                            src={`${book.imageURL}`}
                            className="img-fluid"
                            alt="banner"
                            width={180}
                            style={{ marginLeft: "50px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="position-relative d-flex align-items-center py-5 bg-light-gray"
                style={{
                  backgroundImage: "url(./banner-image-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "300px",
                }}
              >
                {books.slice(2, 3).map((book, i) => (
                  <div key={i} className="container">
                    <div className="row d-flex flex-column-reverse flex-md-row align-items-center">
                      <div className="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
                        <div className="banner-content">
                          <h2>{book.title} Book Collection</h2>
                          <p>Best Offer Save 30%. Grab it now!</p>
                          <Link
                            to={`/shop/${book.bookID}`}
                            className="btn btn-danger mt-3"
                          >
                            Shop Collection
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-6 text-center">
                        <div className="image-holder">
                          <img
                            src={`${book.imageURL}`}
                            className="img-fluid"
                            alt="banner"
                            width={180}
                            style={{ marginLeft: "50px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
      <section
        className="position-relative padding-large mt-5"
        id="best-selling-items"
      >
        <div className="container">
          <div className="section-title d-md-flex justify-content-between align-items-center mb-4">
            <h3 className="d-flex align-items-center">Best selling items</h3>
            <Link to="/shop" className="btn btn-default">
              View All
            </Link>
          </div>
          <div>
            <Swiper {...SliderSettings}>
              <SliderButtons />
              {books.map((book, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="card position-relative  border rounded-3  "
                    style={{ paddingLeft: "52px", paddingTop: "15px" }}
                  >
                    {book.title === "A Game of Thrones" ? (
                      <div className="position-absolute">
                        <p className="bg-danger py-1 px-3 fs-6 text-white rounded-2">
                          10% off
                        </p>
                      </div>
                    ) : null}
                    <img
                      src={`${book.imageURL}`}
                      className="img-fluid shadow-sm "
                      alt="product item"
                      width={190}
                    />
                    <h6 className="mt-4 mb-0 fw-bold">
                      <Link
                        to={`/shop/${book.bookID}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {book.title}
                      </Link>
                    </h6>
                    <div className="review-content d-flex">
                      <p className="my-2 me-2 fs-6 text-black-50">
                        {book.author.name}
                      </p>

                      <div className="rating text-warning d-flex align-items-center"></div>
                    </div>

                    <span
                      className="price fw-bold mb-2 fs-5"
                      style={{ color: "#8b4954" }}
                    >
                      ${book.price}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section
        className="mt-5"
        id="limited-offer"
        style={{
          backgroundImage: "url(./banner-image-bg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 text-center">
              <div className="image-holder">
                <img
                  src="./banner-image4.png"
                  className="img-fluid mt-5"
                  alt="banner"
                  width={400}
                />
              </div>
            </div>
            <div className="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
              <h2>30% Discount on all items. Hurry Up !!!</h2>
              <div
                id="countdown-clock"
                className="text-dark d-flex align-items-center my-3"
              >
                <div className="time d-grid pe-3">
                  <span className="days fs-1 fw-normal">{days}</span>
                  <small>Days</small>
                </div>
                <span className="fs-1  mb-3" style={{ color: " #682d37" }}>
                  :
                </span>
                <div className="time d-grid pe-3 ps-3">
                  <span className="hours fs-1 fw-normal">{hours}</span>
                  <small>Hrs</small>
                </div>
                <span className="fs-1 mb-3" style={{ color: " #682d37" }}>
                  :
                </span>
                <div className="time d-grid pe-3 ps-3">
                  <span className="minutes fs-1 fw-normal">{minutes}</span>
                  <small>Min</small>
                </div>
                <span className="fs-1  mb-3" style={{ color: " #682d37" }}>
                  :
                </span>
                <div className="time d-grid ps-3">
                  <span className="seconds fs-1 fw-normal">{seconds}</span>
                  <small>Sec</small>
                </div>
              </div>
              <Link
                to="/shop"
                className="btn mt-3 text-white"
                style={{ backgroundColor: " #682d37" }}
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3">
              <div className="featured border rounded-3 p-4">
                <div className="section-title overflow-hidden mb-5 mt-2">
                  <h3 className="d-flex flex-column mb-0">Featured</h3>
                </div>

                {data.map((card, i) =>
                  i < 3 ? (
                    <div className="items-lists">
                      <div className="item d-flex">
                        <img
                          src={`./${card.img}`}
                          className="img-fluid shadow-sm"
                          alt="product item"
                          width={84}
                        />
                        <div className="item-content ms-3">
                          <h6 className="mb-0 fw-bold">
                            <a href="single-product.html">{card.name}</a>
                          </h6>
                          <div className="review-content d-flex">
                            <p className="my-2 me-2 fs-6 text-black-50">
                              {card.aut}
                            </p>
                          </div>
                          <span className="price text-primary fw-bold mb-2 fs-5">
                            $ {card.price}
                          </span>
                          <div className="rating text-warning ">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                        </div>
                      </div>
                      <hr className="gray-400" />
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3">
              <div className="featured border rounded-3 p-4">
                <div className="section-title overflow-hidden mb-5 mt-2">
                  <h3 className="d-flex flex-column mb-0">Last Item</h3>
                </div>

                {data.map((card, i) =>
                  i < 3 ? (
                    <div className="items-lists">
                      <div className="item d-flex">
                        <img
                          src={`./${card.img}`}
                          className="img-fluid shadow-sm"
                          alt="product item"
                          width={84}
                        />
                        <div className="item-content ms-3">
                          <h6 className="mb-0 fw-bold">
                            <a href="single-product.html">{card.name}</a>
                          </h6>
                          <div className="review-content d-flex">
                            <p className="my-2 me-2 fs-6 text-black-50">
                              {card.aut}
                            </p>
                          </div>
                          <span className="price text-primary fw-bold mb-2 fs-5">
                            $ {card.price}
                          </span>
                          <div className="rating text-warning ">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                        </div>
                      </div>
                      <hr className="gray-400" />
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3">
              <div className="featured border rounded-3 p-4">
                <div className="section-title overflow-hidden mb-5 mt-2">
                  <h3 className="d-flex flex-column mb-0">Best reviewed</h3>
                </div>

                {data.map((card, i) =>
                  i < 3 ? (
                    <div className="items-lists">
                      <div className="item d-flex">
                        <img
                          src={`./${card.img}`}
                          className="img-fluid shadow-sm"
                          alt="product item"
                          width={84}
                        />
                        <div className="item-content ms-3">
                          <h6 className="mb-0 fw-bold">
                            <a href="single-product.html">{card.name}</a>
                          </h6>
                          <div className="review-content d-flex">
                            <p className="my-2 me-2 fs-6 text-black-50">
                              {card.aut}
                            </p>
                          </div>
                          <span className="price text-primary fw-bold mb-2 fs-5">
                            $ {card.price}
                          </span>
                          <div className="rating text-warning ">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                        </div>
                      </div>
                      <hr className="gray-400" />
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3">
              <div className="featured border rounded-3 p-4">
                <div className="section-title overflow-hidden mb-5 mt-2">
                  <h3 className="d-flex flex-column mb-0">On sale</h3>
                </div>

                {data.map((card, i) =>
                  i < 3 ? (
                    <div className="items-lists">
                      <div className="item d-flex">
                        <img
                          src={`./${card.img}`}
                          className="img-fluid shadow-sm"
                          alt="product item"
                          width={84}
                        />
                        <div className="item-content ms-3">
                          <h6 className="mb-0 fw-bold">
                            <a href="single-product.html">{card.name}</a>
                          </h6>
                          <div className="review-content d-flex">
                            <p className="my-2 me-2 fs-6 text-black-50">
                              {card.aut}
                            </p>
                          </div>
                          <span className="price text-primary fw-bold mb-2 fs-5">
                            $ {card.price}
                          </span>
                          <div className="rating text-warning ">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                        </div>
                      </div>
                      <hr className="gray-400" />
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="categories" className="mt-5 mb-4">
        <div className="container">
          <div className="section-title overflow-hidden mb-4">
            <h3 className="d-flex align-items-center">Categories</h3>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 border-0 rounded-3 position-relative">
                <a href="shop.html">
                  <img
                    src="./category1.jpg"
                    className="img-fluid rounded-3"
                    alt="cart item"
                  />
                </a>
                <h6
                  className=" position-absolute bottom-0  m-4 py-2 px-3 rounded-3"
                  style={{ backgroundColor: " #682d37" }}
                >
                  <a href="shop.html"></a>
                  <a
                    href="shop.html"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Romance
                  </a>
                </h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-4 border-0 rounded-3">
                <a href="shop.html">
                  <img
                    src="./category2.jpg"
                    className="img-fluid rounded-3"
                    alt="cart item"
                  />
                </a>
                <h6
                  className=" position-absolute bottom-0  m-4 py-2 px-3 rounded-3"
                  style={{ backgroundColor: " #682d37" }}
                >
                  <a href="shop.html"></a>
                  <a
                    href="shop.html"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Lifestyle
                  </a>
                </h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-4 border-0 rounded-3">
                <a href="shop.html">
                  <img
                    src="./category3.jpg"
                    className="img-fluid rounded-3"
                    alt="cart item"
                  />
                </a>
                <h6
                  className=" position-absolute bottom-0  m-4 py-2 px-3 rounded-3"
                  style={{ backgroundColor: " #682d37" }}
                >
                  <a href="shop.html"></a>
                  <a
                    href="shop.html"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Recipe
                  </a>
                </h6>
              </div>
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
    </div>
  );
};

export default Home;

const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="r-buttons mt-1">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
