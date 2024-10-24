import { Container, Row, Col } from "react-bootstrap";

export default function onlineShoping() {
  return (
    <>
      <div className="onlineShopping">
        <div className="one">
          <h1 className="textWhite">ONLINE OFFERS</h1>
        </div>
        <p className="normalText">Forever is committed to giving the reader the best Education</p>
        <Container>
          <Row>
            <Col className="col-md-6 col-sm-6 col-12" data-aos="fade-right">
              <section className="main-container">
                <div className="main">
                  <div className="big-circle">
                    <div className="icon-block">
                      <img src="/aniMate/1.png" alt="Forever Books" />
                    </div>
                    <div className="icon-block">
                    <img src="/aniMate/2.png" alt="Forever Books" />
                    </div>
                    <div className="icon-block">
                    <img src="/aniMate/3.png" alt="Forever Books" />

                    </div>
                    <div className="icon-block">
                    <img src="/aniMate/4.png" alt="Forever Books" />

                    </div>
                  </div>
                  <div className="circle">
                    <div className="icon-block">
                    <img src="/aniMate/5.png" alt="Forever Books" />

                    </div>
                    <div className="icon-block">
                    <img src="/aniMate/6.png" alt="Forever Books" />

                    </div>
                    <div className="icon-block">
                    <img src="/aniMate/7.png" alt="Forever Books" />

                    </div>
                    <div className="icon-block">
                    <img src="/aniMate/8.png" alt="Forever Books" />

                    </div>
                  </div>
                  <div className="center-logo">
                    <img src="/indexImg/shopOnline.png" alt="logo" />
                  </div>
                </div>
              </section>
            </Col>
            <Col className="col-md-6 col-sm-6 col-12" data-aos="fade-left">
              <img className="oggSet vert_move" src="/indexImg/off.png" alt=""/>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
