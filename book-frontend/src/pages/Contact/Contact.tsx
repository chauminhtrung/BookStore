import { useEffect } from "react";
import { Link } from "react-router-dom";

// Định nghĩa kiểu cho props
interface ContactProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const Contact: React.FC<ContactProps> = ({ setIsAdmin }) => {
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
                <h1>Contact</h1>
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
                    Contact
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="contact-us padding-large mt-5">
        <div className="container">
          <div className="row">
            <div className="contact-info col-lg-6 pb-3">
              <h3>Contact info</h3>
              <p className="mb-4">
                Tortor dignissim convallis aenean et tortor at risus viverra
                adipiscing.
              </p>
              <div className="page-content d-flex flex-wrap">
                <div className="col-lg-6 col-sm-12">
                  <div className="content-box text-dark pe-4 mb-4">
                    <h5 className="fw-bold">Office</h5>
                    <div className="contact-address pt-3">
                      <p>730 Glenstone Ave 65802, Springfield, US</p>
                    </div>
                    <div className="contact-number">
                      <p>
                        <a
                          href="#"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          +123 987 321
                        </a>
                      </p>
                      <p>
                        <a
                          href="#"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          +123 123 654
                        </a>
                      </p>
                    </div>
                    <div className="email-address">
                      <p>
                        <a
                          href="#"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          BORCELLE@.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="content-box">
                    <h5 className="fw-bold">Management</h5>
                    <div className="contact-address pt-3">
                      <p>730 Glenstone Ave 65802, Springfield, US</p>
                    </div>
                    <div className="contact-number">
                      <p>
                        <a
                          href="#"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          +123 987 321
                        </a>
                      </p>
                      <p>
                        <a
                          href="#"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          +123 123 654
                        </a>
                      </p>
                    </div>
                    <div className="email-address">
                      <p>
                        <a
                          href="#"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          BORCELLE@.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inquiry-item col-lg-6">
              <h3>Any questions?</h3>
              <p className="mb-4">
                Use the form below to get in touch with us.
              </p>

              <form id="form" className="d-flex gap-3 flex-wrap">
                <div className="w-100 d-flex gap-3">
                  <div className="w-50">
                    <input
                      type="text"
                      name="name"
                      placeholder="Write your name here *"
                      className="form-control w-100"
                    />
                  </div>
                  <div className="w-50">
                    <input
                      type="text"
                      name="email"
                      placeholder="Write your email here *"
                      className="form-control w-100"
                    />
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    className="form-control w-100"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Write your subject here"
                    className="form-control w-100"
                  />
                </div>
                <div className="w-100">
                  <textarea
                    placeholder="Write your message here *"
                    className="form-control w-100"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  name="submit"
                  className="btn btn-dark my-3"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-5">
        <div className="container" id="our-store">
          <div className="row d-flex flex-wrap align-items-center">
            <div className="col-lg-6">
              <div className="image-holder mb-4">
                <img
                  src="./single-image2.jpg"
                  alt="our-store"
                  className="img-fluid"
                  width={520}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="locations-wrap ms-lg-5">
                <div className="display-header">
                  <h3>Our stores</h3>
                  <p className="mb-4">
                    You can also directly buy products from our stores.
                  </p>
                </div>
                <div className="location-content d-flex flex-wrap">
                  <div className="col-lg-6 col-sm-12">
                    <div className="content-box text-dark pe-4 mb-4">
                      <h5 className="fw-bold">USA</h5>
                      <div className="contact-address pt-3">
                        <p>730 Glenstone Ave 65802, US</p>
                      </div>
                      <div className="contact-number">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            +123 666 777 88
                          </a>
                        </p>
                      </div>
                      <div className="email-address">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            BORCELLE@.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="content-box">
                      <h5 className="fw-bold">France</h5>
                      <div className="contact-address pt-3">
                        <p>13 Rue Montmartre 75001, Paris, France</p>
                      </div>
                      <div className="contact-number">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            +123 222 333 44
                          </a>
                        </p>
                      </div>
                      <div className="email-address">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            BORCELLE@.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="content-box text-dark pe-4 mb-4">
                      <h5 className="fw-bold">Canada</h5>
                      <div className="contact-address pt-3">
                        <p>730 Glenstone Ave 65802, US</p>
                      </div>
                      <div className="contact-number">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            +123 666 777 88
                          </a>
                        </p>
                      </div>
                      <div className="email-address">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            BORCELLE@.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="content-box">
                      <h5 className="fw-bold">VietNam</h5>
                      <div className="contact-address pt-3">
                        <p>108 binh hoa thuan an binh duong</p>
                      </div>
                      <div className="contact-number">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            +123 222 333 44
                          </a>
                        </p>
                      </div>
                      <div className="email-address">
                        <p>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            BORCELLE@.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="latest-posts" className="mt-5 mb-5">
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
    </div>
  );
};

export default Contact;
