import { Col, Container, Row } from 'react-bootstrap';
import Head from 'next/head'
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
export default function Category() {
	const token = 'books002';
	const [allProductCont, setallProductCont] = useState(true);
	const [prodAll, setprodAll] = useState([]);
	const [loader, setloader] = useState(false);
	const [classList, setClassList] = useState([]);
	const [classBox, setClassBox] = useState(false);
	const [subjectList, setSubjectList] = useState([]);
	const [classIds, setClassIds] = useState([]);
	const [subjectBook, setSubjectBook] = useState([])
	const [noData, setnoData]=useState(false)

	useEffect(() => {
		AOS.init();
		shoProductList();
		getClassListFun()
	}, [])



	// show product list fun start here
	const productListUrl = 'https://books.foreverbooks.co.in/laravel_api/api/productList';
	function shoProductList() {
		setloader(true);
		const postData = {
			"board_id": 2,
			"token": token
		}
		fetch(productListUrl, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((productData) => {
				if (productData.status == "success") {
					setprodAll(productData.data)
					
				} else {
					setnoData(true)
				}
			})

			.catch((error) => {
				alert(error)
			})
			.finally(() => {
				setloader(false);
			})

	}
	// show product list fun end here

	// getclass Fun start here
	const classListUrl = 'https://books.foreverbooks.co.in/laravel_api/api/getClasses'
	function getClassListFun() {

		const postData = {
			"token": token,
		}
		fetch(classListUrl, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((classListdata) => {
				if (classListdata.status == "success") {
					setClassList(classListdata.data)
				} else {
					alert(classListdata.message)
				}
			})
			.catch((error) => {
				alert(error)
			})
	}
	// getclass Fun end here

	// getSubjects fun start here
	const urlSubject = 'https://books.foreverbooks.co.in/laravel_api/api/getSubjects';
	function getSubjectFun(ids) {
		setClassIds(ids);
		const classIDS = ids;
		const postData = {
			"token": token,
			"class_id": classIDS
		}
		setClassBox(true);
		fetch(urlSubject, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((subjectdata) => {
				if (subjectdata.status == "success") {
					setSubjectList(subjectdata.data)
				} else {
					alert(subjectdata.message)
				}
			})
			.catch((erro) => {
				alert(erro)
			})
	}

	// getBook Acc To subject fun Start Here
	const urlSubjectBook = 'https://books.foreverbooks.co.in/laravel_api/api/getProductListAccToSubject'
	function getBookAccToSubject(subIds) {
		setloader(true);
		const subjectIds = subIds;
		setallProductCont(false)
		const postData = {
			"board_id": 2,
			"class_id": classIds,
			"subject_id": subjectIds,
			"token": token
		}
		fetch(urlSubjectBook, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(responsive => responsive.json())
			.then((subjectBooks) => {
				if (subjectBooks.status == "success") {
					setSubjectBook(subjectBooks.data)
					if(subjectBooks.data.length <= 0){
						setnoData(true)
					}else{
						setnoData(false)
					}
				} else {
					alert(subjectBooks.message)
				}
			})
			.catch((error) => {
				alert(error)
			})
			.finally(() => {
				setloader(false);
			})

	}
	// getBook Acc To subject fun end Here

	return (
		<>
		<Layout>
			<Head>
				<title>ISC Board</title>
			</Head>

			
			<div className='shopByCatMain'>
				<div className='boardNames'>ICSE/ISC Board</div>
				<Container>
					<Row className='forJusty mt-5'>
						<Col>
							<FormControl size="small" fullWidth className='select_input'>
								<InputLabel id="demo-simple-select-label w-15">Select Class</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Select Class"
									onChange={(e) => { getSubjectFun(e.target.value) }}
								>
									{classList.map((item, classlst) => {
										return (
											<MenuItem value={item.class_id} id={item.class_id} key={classlst}>{item.class_name}</MenuItem>
										)
									})}

								</Select>
							</FormControl>
						</Col>

						{classBox &&
							<Col>
								<FormControl size="small" fullWidth className='select_input'>
									<InputLabel id="demo-simple-select-label w-15">Select Subject</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Type of Books"
										onChange={(e) => { getBookAccToSubject(e.target.value) }}
									>
										{subjectList.map((item, subjectKey) => {
											return (
												<MenuItem key={subjectKey} value={item.subject_id}>{item.subject_name}</MenuItem>
											)
										})}


									</Select>
								</FormControl>
								

							</Col>
						}
					</Row>
					
					<Row>
						{allProductCont &&
							<>
								{prodAll.map((items) => {
									return (
										<Col className="col-md-3 col-sm-6 col-12 " key={items.product_id}>
											<Link  href={`${items.product_slug}`} >
											{/* <Link  href={`product${items.product_slug}`} > */}

												<div className="product-grid">
													<div className="product-image">
														<a className="image">
															<img className="pic-1" src={items.productDesc[0].product_image_path+items.productDesc[0].product_cover_image} />
														</a>
														<a href="#" className="product-like-icon">10% off</a>
													</div>
													<div className="product-content">
														<h6 className="title">
															<a>
																{items.product_name}
															</a>
														</h6>
														<div className="price"><CurrencyRupeeIcon />
															{items.productDesc[0].product_sale_price}
															<span className='priceDis'><CurrencyRupeeIcon />{items.productDesc[0].product_mrp_price} </span></div>
													</div>
												</div>
											</Link>
										</Col>
									)
								})}
							</>
						}

						{subjectBook.map((items, proKey) => {
							return (
								<Col className="col-md-3 col-sm-6 col-12 " key={proKey}>
									<Link href={`${items.product_id}?/${items.board_name}?/${items.product_slug}`}>
										<div className="product-grid">
											<div className="product-image">
												<a className="image">
													<img className="pic-1" src={items.product_image_path} />
												</a>
												<a href="#" className="product-like-icon">10% off</a>
											</div>
											<div className="product-content">
												<h6 className="title">
													<a>
														{items.product_name}
													</a>
												</h6>
												<div className="price"><CurrencyRupeeIcon />
													{items.productDesc[0].product_sale_price}
													<span className='priceDis'><CurrencyRupeeIcon />{items.productDesc[0].product_mrp_price} </span></div>
											</div>
										</div>
									</Link>
								</Col>
							)
						})}
					</Row>

					<Row className='justify-content-center'>
						<Col className='col-md-4 mt-3'>
							{noData &&

								<div className="alert alert-info  animate__animated animate__shakeX" role="alert">
									Data not found.
								</div>
							}
						</Col>
					</Row>
				</Container>

			</div>
			{loader &&
				<Loader />
			}
	</Layout>
		</>
	)
}
