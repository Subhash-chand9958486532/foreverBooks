import { Col, Container, Row } from 'react-bootstrap';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Loader from '../Loader';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Link from 'next/link';
import Layout from '../Layout';
import fetch from 'node-fetch';

export default function Category() {
  const token = 'books002';
  const [allProductCont, setAllProductCont] = useState(true);
  const [prodAll, setProdAll] = useState([]);
  const [loader, setLoader] = useState(false);
  const [classList, setClassList] = useState([]);
  const [classBox, setClassBox] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [classIds, setClassIds] = useState([]);
  const [subjectBook, setSubjectBook] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    AOS.init();
    showProductList();
    getClassListFun();
  }, []);

  // Function to fetch all products
  const productListUrl = 'https://books.foreverbooks.co.in/laravel_api/api/productList';
  const showProductList = async () => {
    setLoader(true);
    const postData = {
      board_id: 1,
      token,
    };
    const response = await fetch(productListUrl, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const productData = await response.json();
    if (productData.status === 'success') {
      setProdAll(productData.data);
    } else {
      alert(productData.message);
    }
    setLoader(false);
  };

  // Function to fetch class list
  const classListUrl = 'https://books.foreverbooks.co.in/laravel_api/api/getClasses';
  const getClassListFun = async () => {
    const postData = { token };
    const response = await fetch(classListUrl, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const classListData = await response.json();
    if (classListData.status === 'success') {
      setClassList(classListData.data);
    } else {
      alert(classListData.message);
    }
  };

  // Function to fetch subjects based on selected class
  const urlSubject = 'https://books.foreverbooks.co.in/laravel_api/api/getSubjects';
  const getSubjectFun = async (ids) => {
    setClassIds(ids);
    setClassBox(true);
    setSubjectBook([]); // Reset book list when class changes
    setNoData(false);    // Reset noData flag
    const postData = { token, class_id: ids };
    const response = await fetch(urlSubject, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const subjectData = await response.json();
    if (subjectData.status === 'success') {
      setSubjectList(subjectData.data);
    } else {
      alert(subjectData.message);
    }
  };

  // Function to fetch books according to the selected subject
  const urlSubjectBook = 'https://books.foreverbooks.co.in/laravel_api/api/getProductListAccToSubject';
  const getBookAccToSubject = async (subIds) => {
    setLoader(true);
    const postData = {
      board_id: 1,
      class_id: classIds,
      subject_id: subIds,
      token,
    };

    console.log("Fetching books with:", postData); // Debugging: log request data

    const response = await fetch(urlSubjectBook, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const subjectBooks = await response.json();
    console.log("Received books data:", subjectBooks); // Debugging: log response data

    if (subjectBooks.status === 'success') {
      setSubjectBook(subjectBooks.data);
      setNoData(subjectBooks.data.length === 0);
      setAllProductCont(false); // Hide all products list if specific books are fetched
    } else {
      alert(subjectBooks.message);
    }
    setLoader(false);
  };

  return (
    <Layout>
      <Head>
        <title>CBSE Board</title>
      </Head>
      <div className='shopByCatMain'>
        <div className='boardNames'>CBSE</div>
        <Container>
          <Row className='forJusty mt-5'>
            <Col>
              <FormControl size="small" fullWidth className='select_input'>
                <InputLabel id="demo-simple-select-label w-15">Select Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Class"
                  onChange={(e) => getSubjectFun(e.target.value)}
                >
                  {classList.map((item, classlst) => (
                    <MenuItem value={item.class_id} id={item.class_id} key={classlst}>
                      {item.class_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col>
            {classBox && (
              <Col>
                <FormControl size="small" fullWidth className='select_input'>
                  <InputLabel id="demo-simple-select-label w-15">Select Subject</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type of Books"
                    onChange={(e) => getBookAccToSubject(e.target.value)}
                  >
                    {subjectList.map((item, subjectKey) => (
                      <MenuItem key={subjectKey} value={item.subject_id}>
                        {item.subject_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
            )}
          </Row>

          {/* Render all products if no specific subject is selected */}
          {allProductCont && (
            <Row>
              {prodAll.map((items) => (
                items?.productDesc ? 
                <>
                <Col className="col-md-3 col-sm-6 col-12" key={items.product_id}>
                <Link key={items.id} href={`/product/${items.product_slug}`}>
                    <div className="product-grid">
                      <div className="product-image">
                        <a className="image">
                          <img className="pic-1" src={`${items.productDesc?.[0].product_image_path}${items.productDesc?.[0]?.product_cover_image}`} />
                        </a>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                          <a>{items.product_name}</a>
                        </h6>
                        <div className="price">
                          <CurrencyRupeeIcon />
                          {items.productDesc?.[0].product_sale_price}
                          <span className='priceDis'>
                            <CurrencyRupeeIcon />
                            {items.productDesc?.[0].product_mrp_price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Col>
                </>
                :null


              ))}
            </Row>
          )}

          {/* Render books according to the selected subject */}
          <Row>
            {subjectBook.map((items, proKey) => (
              <Col className="col-md-3 col-sm-6 col-12" key={proKey}>
                <Link key={items.id} href={`/product/${items.product_slug}`}>
                  <div className="product-grid">
                    <div className="product-image">
                      <a className="image">
                        <img className="pic-1" src={`${items.productDesc?.[0].product_image_path}${items.productDesc?.[0]?.product_cover_image}`} />
                      </a>
                    </div>
                    <div className="product-content">
                      <h6 className="title">
                        <a>{items.product_name}</a>
                      </h6>
                      <div className="price">
                        <CurrencyRupeeIcon />
                        {items.productDesc[0].product_sale_price}
                        <span className='priceDis'>
                          <CurrencyRupeeIcon />
                          {items.productDesc[0].product_mrp_price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          {/* Display message if no books found */}
          {noData && (
            <Row className='justify-content-center'>
              <Col className='col-md-4 mt-3'>
                <div className="alert alert-info animate__animated animate__shakeX" role="alert">
                  Data not found.
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      {loader && <Loader />}
    </Layout>
  );
}
