import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Link from 'next/link';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
export default function AfterBanner() {

  const [stupop, setstupop] = useState(false);
  const [studentDataPop, setstudentDataPop] = useState(false);
  const [teacSchool, setteacSchool] = useState(false);
  const [saller, setsaller] = useState(false);
  const data = [
    {
      id: "1",
      imgpath: "/indexImg/student.svg",
      buttonNamne: "Students/Parents",
      animateStyle: "flip-left",
    },
    {
      id: "2",
      imgpath: "/indexImg/teacher.svg",
      buttonNamne: "Teachers/Schools",
      animateStyle: "fade-right",
    },
    {
      id: "3",
      imgpath: "/indexImg/booksaler.svg",
      buttonNamne: "Booksellers",
      animateStyle: "fade-down",
    },
  ]

  function showModel(item) {
    setstupop(true);
    if (item.id == 1) {
      setstudentDataPop(true);
    } else {
      setstudentDataPop(false);
    }
    if (item.id == 2) {
      setteacSchool(true);
    } else {
      setteacSchool(false);
    }
    if (item.id == 3) {
      setsaller(true);
    } else {
      setsaller(false);
    }
  }
  function hideModel() {
    setstupop(false);
  }

  return (

    <>
      <div className="stuTea">
        <div className="one">
          <h1>Shop Now</h1>
        </div>
        <p className="normalText">Forever is committed to giving the reader the best Education</p>
        <img className="bottom_bookImg" src="/indexImg/bottom.png" />
        <Container className="justZindex">
          <Row>
            {data.map((item, keytype) => {
              return (
                <Col key={keytype} className="col-md-4 col-sm-6 col-12" data-aos={item.animateStyle}>
                  <div className="main_bx" onClick={() => { showModel(item) }}>
                    <img src={item.imgpath} />
                    <div className="textForwho">{item.buttonNamne}</div>
                  </div>
                </Col>
              )
            })}

          </Row>
        </Container>

        {/*  model start */}
        {stupop &&
          <div className="basePop">
            <div className="innerBoxe animate__animated animate__slideInDown" >
              {studentDataPop &&
                <>
                  <div className="header_text">
                    <div className="headingTxt">Students/Parents</div>
                    <div className="close_icon" onClick={() => { hideModel() }}><CloseIcon /></div>
                  </div>
                  <div className="rowBtns">
                    <div className="button_for"><Link href='/our-product'><MenuBookIcon /> Our Books</Link></div>
                    <div className="button_for"><Link href="https://goweb.foreverbooks.co.in/" target="_blank"><SupportAgentIcon /> Web Support</Link></div>
                  </div>
                </>
              }
              {teacSchool &&
                <>
                  <div className="header_text">
                    <div className="headingTxt">Teachers/School</div>
                    <div className="close_icon" onClick={() => { hideModel() }}><CloseIcon /></div>
                  </div>
                  <div className="rowBtns">
                    <div className="button_for"><Link href='/our-product'><MenuBookIcon /> Our Books</Link></div>
                    <div className="button_for"><Link href="https://goweb.foreverbooks.co.in/" target="_blank"><SupportAgentIcon /> Web Support</Link></div>
                    <div className="button_for"><Link href="https://goweb.foreverbooks.co.in/" target="_blank"><SpeedIcon /> Test Generator </Link></div>
                  </div>
                </>
              }
              {saller &&
                <>
                  <div className="header_text">
                    <div className="headingTxt">Bookseller</div>
                    <div className="close_icon" onClick={() => { hideModel() }}><CloseIcon /></div>
                  </div>
                  <div className="rowBtns">
                    <div className="button_for"><Link href='/books-locator'><PersonPinCircleIcon /> Bookstore Locator</Link></div>
                    <div className="button_for"><Link href='/catalogue'><PhotoAlbumIcon /> Catalogue</Link></div>
                    <div className="button_for"><LockOpenIcon /> Stockist Login</div>
                    <div className="button_for"><ViewQuiltIcon /> Order form</div>

                  </div>
                </>
              }

            </div>
          </div>



        }
        {/*  model end */}

      </div>
    </>
  )
}
