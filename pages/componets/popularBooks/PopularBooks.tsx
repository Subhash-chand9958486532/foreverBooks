import { Container, Row, Col } from "react-bootstrap";
import Image from 'next/image';
import cbse from 'public/cbse.png';
import icse from 'public/icse.png';
import ledtImgs from 'public/best/best.png';
import rightImgs from 'public/best/best2.png';

import book1 from 'public/popularBooks/1.png';
import book2 from 'public/popularBooks/2.png';
import book3 from 'public/popularBooks/3.png';
import book4 from 'public/popularBooks/4.png';
import book5 from 'public/popularBooks/5.png';
import book6 from 'public/popularBooks/6.png';
import book7 from 'public/popularBooks/7.png';
import book8 from 'public/popularBooks/8.png';




import HdrStrongIcon from '@mui/icons-material/HdrStrong';


export default function PopularBooks() {
  return (
    <>
      <div className="Popu">
        
       
        <div className="one ">
          <h1 className="textWhite">Popular Books</h1>
        </div>
        <p className="normalText textWhite">Forever is committed to giving the reader the best Education</p>

        <Container>
          <Row>
            <div className="col-md-3 col-sm-6" data-aos="flip-up">
              <div className="product_grid">
                <div className="product_image">
                  <a href="#" className="image">
                  <img src="/popularBooks/1.png" alt="" />
                  </a>
                  <span className="product_sale_label">20 off</span>
                </div>
                <div className="product_content">
                  <h3 className="title"><a href="#">Forever With English Multiskill Coursebook for Class 4 (CBSE)</a></h3>
                  <div className="price"><span>Rs 23.00</span> Rs17.00</div>
                  <div className="orderNowBtns">Order Now</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6" data-aos="fade-up">
              <div className="product_grid">
                <div className="product_image">
                  <a href="#" className="image">
                  <img src="/popularBooks/2.png" alt="" />
                  <span className="product_sale_label">20 off</span>
                  </a>
                </div>
                <div className="product_content">
                  <h3 className="title"><a href="#">Forever With English Multiskill Coursebook for Class 4 (CBSE)</a></h3>
                  <div className="price"><span>Rs 23.00</span> Rs19.00</div>
                  <div className="orderNowBtns">Order Now</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6" data-aos="fade-up">
              <div className="product_grid">
                <div className="product_image">
                  <a href="#" className="image">
                  <img src="/popularBooks/3.png" alt="" />
                  <span className="product_sale_label">20 off</span>
                  </a>
                </div>
                <div className="product_content">
                  <h3 className="title"><a href="#">Forever With English Multiskill Coursebook for Class 4 (CBSE)</a></h3>
                  <div className="price"><span>Rs 23.00</span> Rs19.00</div>
                  <div className="orderNowBtns">Order Now</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6" data-aos="flip-up">
              <div className="product_grid">
                <div className="product_image">
                  <a href="#" className="image">
                  <img src="/popularBooks/4.png" alt="" />
                  <span className="product_sale_label">20 off</span>
                  </a>
                </div>
                <div className="product_content">
                  <h3 className="title"><a href="#">Forever With English Multiskill Coursebook for Class 4 (CBSE)</a></h3>
                  <div className="price"><span>Rs 23.00</span> Rs19.00</div>
                  <div className="orderNowBtns">Order Now</div>
                </div>
              </div>
            </div>
          </Row>
          

          
        </Container>

      </div>
    </>
  )
}
