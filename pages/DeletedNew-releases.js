import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import Link from "next/link";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Layout from './Layout';
export default function NewReleases() {
	useEffect(() => {
		AOS.init();
	}, [])
	return (
		<>
			<Layout>
				<Head>
					<title>New-releases</title>
				</Head>

				<div className='backMore'>
					<Container className=' py-4' >
						<div className="one">
							<h1 className="textWhite">NEW RELEASES</h1>
							<p className='normalText'> Educational Publishers As pioneer in , Forever Books  for CBSE , ICSE , STATES </p>
						</div>

						<Row>
							<Col className="col-md-3 col-sm-6 col-12">
								<div className="product-grid">
									<div className="product-image">
										<a href="#" className="image">
											<img className="pic-1" src="/popularBooks/1.png" />
										</a>
										<a href="#" className="product-like-icon">10% off</a>
									</div>
									<div className="product-content">

										<h6 className="title">
											<a href="#">
												Together With CBSE Class 9 English Language Literature
											</a>
										</h6>
										<div className="price"><CurrencyRupeeIcon />400 <span className='priceDis'><CurrencyRupeeIcon />420</span></div>

									</div>
								</div>
							</Col>
							<Col className="col-md-3 col-sm-6 col-12">
								<div className="product-grid">
									<div className="product-image">
										<a href="#" className="image">
											<img className="pic-1" src="/popularBooks/2.png" />
										</a>
										<a href="#" className="product-like-icon">10% off</a>
									</div>
									<div className="product-content">

										<h6 className="title">
											<a href="#">
												Together With CBSE Class 9 English Language Literature
											</a>
										</h6>
										<div className="price"><CurrencyRupeeIcon />400 <span className='priceDis'><CurrencyRupeeIcon />420</span></div>

									</div>
								</div>
							</Col>
							<Col className="col-md-3 col-sm-6 col-12">
								<div className="product-grid">
									<div className="product-image">
										<a href="#" className="image">
											<img className="pic-1" src="/popularBooks/3.png" />
										</a>
										<a href="#" className="product-like-icon">10% off</a>
									</div>
									<div className="product-content">

										<h6 className="title">
											<a href="#">
												Together With CBSE Class 9 English Language Literature
											</a>
										</h6>
										<div className="price"><CurrencyRupeeIcon />400 <span className='priceDis'><CurrencyRupeeIcon />420</span></div>

									</div>
								</div>
							</Col><Col className="col-md-3 col-sm-6 col-12">
								<div className="product-grid">
									<div className="product-image">
										<a href="#" className="image">
											<img className="pic-1" src="/popularBooks/4.png" />
										</a>
										<a href="#" className="product-like-icon">10% off</a>
									</div>
									<div className="product-content">

										<h6 className="title">
											<a href="#">
												Together With CBSE Class 9 English Language Literature
											</a>
										</h6>
										<div className="price"><CurrencyRupeeIcon />400 <span className='priceDis'><CurrencyRupeeIcon />420</span></div>

									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</Layout>
		</>
	)
}