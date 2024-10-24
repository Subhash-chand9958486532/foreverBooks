import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState } from "react";
import 'aos/dist/aos.css';
import Link from "next/link";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Layout from '../Layout';
import Loader from '../Loader';
export default function NewReleases() {
	const token = 'books002';
	const [books, setBooks] = useState([]);
	const [select, setSelected] = useState([]);
	const [loader, setLoader] = useState(false);
	const productPath = "https://books.foreverbooks.co.in/laravel_api/assets/productImg/"
	useEffect(() => {
		AOS.init();
		newReleaseAll();
	}, [])

	function newReleaseAll() {
		setLoader(true);
		const apiUrl = 'https://books.foreverbooks.co.in/laravel_api/api/bestSellerBooks/';
		const postData = {
			"token": token
		}
		fetch(apiUrl, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((newBook) => {
				if (newBook.status == "success") {
					setBooks(newBook.bestSeller);
					// setSelected(newBook.newReleaseBooks.getProductDesc)
				} else {
					alert(newBook.message)
				}
			})
			.finally(() => {
				setLoader(false);
			})
	}
	return (
		<>
			<Layout>
				<Head>
					<title>Best-Sellers</title>
				</Head>
				<div className='backMore'>
					<Container className=' py-4' >
						<div className="one">
							<h1 className="textWhite">BEST SELLERS</h1>
							<p className='normalText'> Educational Publishers As pioneer in , Forever Books  for CBSE , ICSE , STATES </p>
						</div>
						<Row className='d-flex justify-content-center'>
							{books.map((item, ebooks) => {
								return (
									<Col className="col-md-3 col-sm-6 col-12" key={ebooks}>
										<Link href={`./product/${item.product_slug}`}>
										<div className="product-grid">
											<div className="product-image">
												<a href="#" className="image">
													<img className="img_1" src={`${productPath}` + item.getProductDesc[0].product_cover_image} alt="books" />
												</a>
												<a href="#" className="product-like-icon">10% off</a>
											</div>
											<div className="product-content">

												<h6 className="title">
													<a href="#">
														{item.product_name}
													</a>
												</h6>
												<div className="price"><CurrencyRupeeIcon />{item.getProductDesc[0].product_sale_price} <span className='priceDis'><CurrencyRupeeIcon />{item.getProductDesc[0].product_mrp_price}</span></div>

											</div>
										</div>
										</Link>
									</Col>
								)
							})}


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