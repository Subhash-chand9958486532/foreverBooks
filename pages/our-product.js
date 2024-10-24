import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import Link from "next/link";
import Layout from './Layout';

export default function OurProduct() {

	useEffect(() => {
		AOS.init();
	}, [])

	const categoryData = [
		{
		  id: "1",
		  cateName: "CBSE Board",
		  buttonName: "Click Here",
		  imagePath: "/indexImg/cbse.png",
		  linkUrl: "./product/cbse",
		  animteFrom: "fade-left",
		  gridLayout : "col-md-6 col-sm-6 col-12"
		},
		// {
		//   id: "2",
		//   cateName: "ICSE/ISC Board",
		//   buttonName: "Click Here",
		//   imagePath: "/indexImg/icse.png",
		//   linkUrl: "/product/icse",
		//   animteFrom: "fade-right",
		//   gridLayout : "col-md-6 col-sm-6 col-12",
	
		// },
	  ]
	return (
		<>
		<Layout>
			<Head>
				<title>Our|Products</title>
			</Head>
			
			<div className='backMore'>
			<Container className=' py-4' >
				<div className="one">
					<h1 className="textWhite">BOOKS AND EDUCATIONAL KITS</h1>
					<p className='normalText'> Educational Publishers As pioneer in , Forever Books  for CBSE, STATES </p>
				</div>
				<Row className='d-flex justy-d-flex justify-content-center'>
					{categoryData.map((item, catKeys) => {
						return (
							<Col  className={item.gridLayout } data-aos={item.animteFrom} key={catKeys}>
								<Link href={item.linkUrl}>
									<div className="mainBack">
										<div className="scricle">
											<img src={item.imagePath} alt="Forever Books" />
										</div>
										<h3>{item.cateName}</h3>
										<button className="onclickBTn">{item.buttonName}</button>
									</div>
								</Link>
							</Col>
						)
					})}
				</Row>
			</Container>
			</div>
			</Layout>
		</>
	)
}