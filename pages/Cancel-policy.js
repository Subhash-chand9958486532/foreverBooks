import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import 'aos/dist/aos.css';
import AOS from 'aos';
import React, { useEffect } from "react";
import Layout from './Layout';
export default function CancelPolicy() {
	useEffect(() => {
		AOS.init();
	}, [])
	return (
		<>
		<Layout>
			<Head>
				<title>Cancel-policy</title>
			</Head>
			<div className='backDivs faqs'>

				<div className="one animate__animated animate__fadeInDown">
					<h1 className="textWhite">Cancellation & Refund Policy</h1>
					<p className='normalText'>If you have any questions about our products or services, </p>
				</div>
				<Container className='mt-5'>
					<Row>
						<Col className='imgSect col-md-6 col-sm-6 col-12 animate__animated animate__bounceInLeft'>
							<img className='refund_Imgs' src='/indexImg/refund-animate.svg' />
						</Col>
						<Col className='col-md-6 col-sm-6 col-12 animate__animated animate__bounceInRight'>
							<p className='refundTxt'>
								As of now we do not provide any option for cancellation of products and/or services you have purchased or subscribed. Once a product/service has been purchased by you, we cannot provide any refund, either totally or partially. We suggest that first you go through the demos and/or free to use contents/products/services before you subscribe to or purchase from books.foreverbooks.co.in.
							</p>
						</Col>

					</Row>
				</Container>
			</div>
			</Layout>
		</>
	)
}
