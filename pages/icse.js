import { Col, Container, Row } from 'react-bootstrap';
import Footer from './Footer';
import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Layout from './Layout';

export default function Category() {

  function subhash(val){
    alert(val)
  }

  return (
    <>
    <Layout>
      <Head>
        <title>ICSE/ISC Board</title>
      </Head>

      <div className='shopByCatMain'>
        <div className='boardNames'>ICSE/ISC Board
        </div>
        <Container>
          <Row className='forJusty mt-5'>
            <Col className='col-md-4 col-sm-4 col-12'>
            <FormControl size="small" fullWidth className='select_input'>
                <InputLabel id="demo-simple-select-label w-15">Select Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Class"
                  
                >
                  <MenuItem value={1}>Class - 1</MenuItem>
                  <MenuItem value={2}>Class - 2</MenuItem>
                  <MenuItem value={3}>Class - 3</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col className='col-md-4 col-sm-4 col-12'>
             
              <FormControl size="small" fullWidth className='select_input'>
                <InputLabel id="demo-simple-select-label w-15">Type of Books</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type of Books"
                  
                >
                  <MenuItem value={1}>Text Book</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col className='col-md-4 col-sm-4 col-12'>
            <FormControl size="small" fullWidth className='select_input'>
                <InputLabel id="demo-simple-select-label w-15">Select Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type of Books"
                  onChange={(e) => subhash(e.target.value)}
                >
                  <MenuItem value={1}>Hindi</MenuItem>
                  <MenuItem value={2}>English</MenuItem>
                  <MenuItem value={3}>Mathematics</MenuItem>
                  <MenuItem value={4}>Science</MenuItem>

                </Select>
              </FormControl>
              
            </Col>
          </Row>

          <div className="row mt-5">
            <div className="col-md-3 col-sm-6 col-12" data-aos="fade-up" data-aos-duration="1000">
              <div className="pricingTable">
                <div className="pricingTable-header">
                  <img className="img_1" src="/books/3.jpg" alt="books" />
                  <h3 className="title">CBSE Together With All Subjects 9</h3>
                </div>
                <div className="pricingTable-signup">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12" data-aos="zoom-out-right" data-aos-duration="1500">
              <div className="pricingTable">
                <div className="pricingTable-header">
                  <img className="img_1" src="/books/2.jpg" alt="books" />
                  <h3 className="title">CBSE Together With All Subjects 12</h3>
                </div>
                <div className="pricingTable-signup">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12" data-aos="fade-down-right" data-aos-duration="2000">
              <div className="pricingTable">
                <div className="pricingTable-header">
                  <img className="img_1" src="/books/1.jpg" alt="books" />
                  <h3 className="title">CBSE Together With All Subjects 10</h3>
                </div>
                <div className="pricingTable-signup">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12" data-aos="zoom-in-right" data-aos-duration="2500">
              <div className="pricingTable">
                <div className="pricingTable-header">
                  <img className="img_1" src="/books/1.jpg" alt="books" />
                  <h3 className="title">CBSE Together With All Subjects 8</h3>
                </div>
                <div className="pricingTable-signup">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>


          </div>
        </Container>
      </div>
      </Layout>
    </>
  )
}
