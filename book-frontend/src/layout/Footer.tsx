const Footer: React.FC = () => {
  return (
    <footer id="footer" className="padding-large">
      <div className="container">
        <div className="row">
          <div className="footer-top-area">
            <div className="row d-flex flex-wrap justify-content-between">
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="footer-menu">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/poly-java6-8a32f.appspot.com/o/logo.png?alt=media&token=cccd5b67-2abb-4eab-95ef-d5dc40a952a9"
                    alt="logo"
                    className="img-fluid mb-2"
                  />
                  <p>
                    Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit
                    hendrerit. Gravida massa volutpat aenean odio erat nullam
                    fringilla.
                  </p>
                  <div className="social-links">
                    <ul className="d-flex list-unstyled">
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-square-facebook text-black fs-3 p-2"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-square-instagram text-black fs-3 p-2"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-square-x-twitter text-black fs-3 p-2"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin text-black fs-3 p-2"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6 pb-3">
                <div className="footer-menu text-capitalize">
                  <h5 className="widget-title pb-2">Quick Links</h5>
                  <ul className="menu-list list-unstyled text-capitalize">
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Home
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        About
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Shop
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Blogs
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="footer-menu text-capitalize">
                  <h5 className="widget-title pb-2">Help &amp; Info Help</h5>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Track Your Order
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Returns Policies
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Shipping + Delivery
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Contact Us
                      </a>
                    </li>
                    <li className="menu-item mb-1">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Faqs
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 pb-3">
                <div className="footer-menu contact-item">
                  <h5 className="widget-title text-capitalize pb-2">
                    Contact Us
                  </h5>
                  <p>
                    Do you have any queries or suggestions?{" "}
                    <a href="mailto:" style={{ color: "black" }}>
                      yourinfo@gmail.com
                    </a>
                  </p>
                  <p>
                    If you need support? Just give us a call.{" "}
                    <a href="#" style={{ color: "black" }}>
                      +55 111 222 333 44
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
