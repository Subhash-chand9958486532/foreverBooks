import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

export default function FastDeliviry() {
  return (
    <>
      <div className="fastDeliviry">

          <img className="leftBottm" src="/fastDe/bottm.png" alt="" />
          <img className="rightTop" src="/fastDe/ri.png" alt="" />

        <div className="one">
          <h1 className="textWhite colw">FAST DELIVERY</h1>
        </div>
        <p className="normalText colw">Forever is committed to giving the reader the best Education</p>
        <Container>
          <Row>
            <Col className="col-md-6 col-12 col-sm-6" data-aos="zoom-in-right">
              <div className="fastD ">MAKE ORDER</div>
              <p className="textCont">
                We all like to get things in a fast, expedited manner as it makes everything that much easier. 
                With this in mind, we endeavour to make everything as easy as possible for our clients by offering 
                them fast contents delivery to ensure everything operates at their convenience. In order to achieve 
                this fast delivery speed, we implement a number of measures to make sure we can, quite literally, 
                deliver on what we promise you. How fast do you want your contents Here at Top Content we will meet 
                all your deadlines so that there’s no need to stress from your end.
              </p>
              <div className="orderNowBtns lastBtns"><Link href="/product/cbse">Order Now</Link></div>
            </Col>
            <Col className="col-md-6 col-12 col-sm-6" data-aos="zoom-in-left">
              <img className="deliveryImg vert_move" src="/fastDe/delivery.png" alt="" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
