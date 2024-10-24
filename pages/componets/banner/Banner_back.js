import { Container, Row, Col } from "react-bootstrap";

import Carousel from 'react-bootstrap/Carousel';

export default function Banner() {
  return (
    <>
      <div className="bannerSection ">
        <div className="dataFlow"></div>
        <Carousel>
          <Carousel.Item>
            <div className="bannerItem">
              <img src="/banner/bg.jpg" alt="forever" className="bgItem" />
              <img className="book1_ali" src="/banner/book1.png" alt="forever" />
              <img className="book2_ali" src="/banner/book2.png" alt="forever" />
              <img className="book3_ali" src="/banner/book1.png" alt="forever" />
              <img className="offerImg vert_move" src="/banner/offer.png" alt="forever" />
              <div className="offSome vert_move">20</div>
              <a href="#" className="shopNow btn-lg">
                <span>Shop Now</span>
            </a>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="bannerItem">
              <img className="shop_imgs" src="/banner/shop.png" alt="" />
              <img className="bgItem" src="banner/slid1bg.jpg" alt="" />
              <img className="slide1" src="banner/teachers.svg" alt="" />
              <img className="icon2" src="/banner/2.png" alt="" />
              <img className="icon3" src="/banner/3.png" alt="" />
              <img className="icon4" src="/banner/4.png" alt="" />
              <img className="icon5" src="/banner/5.png" alt="" />
            </div>
          </Carousel.Item>
        </Carousel>
        <div className="glowing">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="glowing" style={{ left: "30%" }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="glowing" style={{ left: "90%" }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="glowing" style={{ left: "90%" }}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>


    </>
  )
}
