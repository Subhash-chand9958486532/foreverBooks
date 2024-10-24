import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import 'aos/dist/aos.css';
import AOS from 'aos';
import React, { useEffect } from "react";
import DownloadingIcon from '@mui/icons-material/Downloading';
import Layout from './Layout';
export default function Faqs() {
	useEffect(() => {
		AOS.init();
	}, [])
	return (
		<>
		<Layout>
			<Head>
				<title>Order Form</title>
			</Head>
			<div className='backDivs faqs'>

				<Container className='mt-2'>
					<div className="one animate__animated animate__fadeInDown">
						<h1 className="textWhite">Order Form</h1>
						<p className='normalText'>You can download order form from here. </p>

					</div>
					<Row>
						<Col>
							<div className='bgsOrdForm'>
								<div className='boxForm shadow-lg'>
									<div>Together with  Form</div>
									<div className='iconsImgs'>
										<img className='oderfor' src='/indexImg/order.png' />
									</div>

									<button><DownloadingIcon /></button>
								</div>
							</div>
						</Col>
						<Col>
							<div className='bgsOrdForm'>
								<div className='boxForm shadow-lg'>
									<div>Primary  Form</div>
									<div className='iconsImgs'>
										<img className='oderfor' src='/indexImg/order.png' />
									</div>

									<button><DownloadingIcon /></button>
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
