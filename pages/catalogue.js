import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState } from "react";
import 'aos/dist/aos.css';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import Layout from './Layout';
import Loader from './Loader';
import { Context } from './componets/store';
import { useContext } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DownloadingIcon from '@mui/icons-material/Downloading';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Catalogue() {
	const router = useRouter();

	useEffect(() => {
		AOS.init();
	}, [])
	const [loader, setloader] = useState(false);
	const [cbseBooks, setCbseBooks] = useState([])
	const [showBooks, setShowBooks] = useState(false)
	const [cbseHolder, setcbseHolder] = useState(true)
	const [nodata, setnodata] = useState(false)

	const {
		token,
		apiBase,
		userData,
		getCartList,
		machineIdSta,
	} = useContext(Context);
	// board data function


	function getBoardData(pass) {
		if (pass == "1") {
			setloader(true);
			const postData = {
				"board_id": 1,
				"token": token
			}
			fetch(apiBase + 'productList', {
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
						setCbseBooks(productData.data)
						setShowBooks(true)
						setcbseHolder(true)
						setnodata(false)
					} else {
						alert(productData.message)
					}
				})
				.catch((error) => {
					alert(error)
				})
				.finally(() => {
					setloader(false);
				})
		}

		if (pass == "2") {
			setcbseHolder(false);
			setnodata(true)
		}




	}
	function addTocart(item) {
		if (userData.isLogin) {
			const productIds = item.product_id;
			const proDeseIds = item.productDesc?.[0]?.product_desc_id;
			setloader(true);
			const postData = {
				"token": token,
				"customer_id": userData.customer_id,
				"session_id": machineIdSta,
				"product_id": productIds,
				"product_desc_id": proDeseIds,
				"quantity": 1
			}
			console.log(postData, "111")
			fetch(apiBase + 'addToCart', {
				method: "POST",
				body: JSON.stringify(postData),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
				.then(response => response.json())
				.then((cartData) => {
					if (cartData.status == "success") {
						setloader(false);
						getCartList();
					} else {
						alert(cartData.message)

					}
				})
				.catch((error) => {
					alert(error.message)
				})
				.finally(() => {
					setloader(false);
				})
		} else {
			router.push('/Login')
		}
	}
	return (
		<>
			<Layout>
				<Head>
					<title>Catalogue</title>
				</Head>

				<div className='backDivs catG'>

					<Container className='mt-2'>
						<div className="one animate__animated animate__fadeInDown">
							<h1 className="textWhite">Catalogue</h1>
							<p className='normalText'>
								Educational Publishers As pioneer in , Forever Books creates and publishes
								world’s best school books which are based on National and International standard study materials for
								CBSE, STATES (Meghalaya & Tamil Nadu) and INTERNATIONAL (Nigeria, Ghana, Uganda & Rwanda)
								BOARDS that capture the spirits of students, to reflect the ethos of our changing times. For more
								details you can download our catalogue.
							</p>

						</div>
						<Row>
							<Col>
								<div className='bgsOrdForm'>
									<Link href="https://books.foreverbooks.co.in/catalogue/foreverCatalogue.pdf" target='_blank'>
										<div className='boxForm shadow-lg'>

											<div>Free Catalogue</div>
											<div className='iconsImgs'>
												<img className='oderfor' src='/indexImg/order.png' />
											</div>
											<button><DownloadingIcon /></button>

										</div>
									</Link>
								</div>
							</Col>
						</Row>

					</Container>
					<Container className='tbls_data py-4' >
						<div className='selectInpSec'>
							<div className='row' data-aos="zoom-in">
								<div className=''>
									<FormControl size='small' fullWidth>
										<InputLabel id="demo-simple-select-label w-15">Select Board</InputLabel>
										<Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select Board"
											onChange={(e) => { getBoardData(e.target.value) }}>
											<MenuItem value='1'>CBSE</MenuItem>
											{/* <MenuItem value='2'>ICSE</MenuItem> */}
										</Select>
									</FormControl>
								</div>
							</div>
						</div>
						{showBooks &&
							<>
								{cbseHolder &&
									<div className='table-responsive'>
										<table className='table table-bordered mt-3  tbls_data table-hover' data-aos="zoom-out-left">
											<thead>
												<tr className='trHead'>
													<td>Sr. No</td>
													<td className='bookname'>Book Name</td>
													<td>Class</td>
													<td>MRP</td>
													<td>Price</td>
													<td>Discount</td>
													<td>Add cart</td>
												</tr>
											</thead>
											<tbody>
												{cbseBooks.map((item, index, cbseBook) => {

													let disColutAmt = item.productDesc?.[0]?.discount.discountName;

													let discountF = item.productDesc?.[0]?.discount;

													console.log(discountF, "*/")
													let mrp = item.productDesc?.[0].product_mrp_price;
													let salePrice = mrp * disColutAmt / 100;
													const productMrpPrice = item.productDesc?.[0]?.product_mrp_price || 0; // Default to 0 if undefined
													const result = productMrpPrice - Number(salePrice);

													return (
														<tr key={cbseBook}>
															<th>{index + 1}</th>
															<td>{item.product_name}</td>
															<td>{item.class_name}</td>
															<td>
																{discountF && Object.keys(discountF).length > 1 ? (
																	<span className='hideLine'>
																		<CurrencyRupeeIcon /> {item.productDesc?.[0]?.product_mrp_price}
																	</span>
																) : (
																	<span className='hideLine1' style={{ color: '#fd4949bd' }}>
																		<CurrencyRupeeIcon />{item.productDesc?.[0]?.product_mrp_price}
																	</span>
																)}
															</td>
															<td><CurrencyRupeeIcon />
																{item.productDesc?.[0]?.product_sale_price}
															</td>
															<td>{disColutAmt ?
																disColutAmt : "....."
															}</td>
															<td><div onClick={() => { addTocart(item) }} className='checkBox'><ShoppingCartIcon /></div></td>
														</tr>
													)
												})}

											</tbody>

										</table>
									</div>
								}
							</>

						}
						{nodata &&
							<div className='notFound py-3 animate__animated animate__backInDown'>
								<img src='/indexImg/not.png' alt='' style={{ width: "150px" }} />
								<h5>Record not found</h5>
							</div>
						}
					</Container>
				</div>
				{loader &&
					<Loader />
				}
			</Layout>
		</>
	)
}