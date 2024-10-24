import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState, useRef } from "react";
import 'aos/dist/aos.css';
import Link from 'next/link';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Layout from '../Layout';
import { Context } from '../componets/store';
import { useContext } from 'react';
import Loader from '../Loader';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Offcanvas from 'react-bootstrap/Offcanvas';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
export default function CartListData() {
	const {apiBase, token, cartList, userData, totalAmount, discountedAmt, grandTotal, userAddress, getSaveAddress, userDel, selectAddress,addressIDS, cartIds} = useContext(Context);
	useEffect(() => {
		getSaveAddress();
		AOS.init();
	}, []);
	let mrp = 0;
	const productPath = "https://books.foreverbooks.co.in/laravel_api/assets/productImg/";
	const [show, setShow] = useState(false);
	const [loader, setLoader]=useState(false)
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [Modl, setModl] = useState(false);
	const payClose = () => setModl(false);
	const [selectedPro, setSelectedPro] = useState({ data: null, index: 0 });
	const [singlePro, setsinglePro] = useState({});
	function payMentPop(){
		setModl(true)
	}
 
	function ptmFunct(){
		setLoader(true)
		const postData ={
			"customer_id": userData.customer_id,
			"address_id": addressIDS,
			"cart_id": cartIds,
			"token": token
		}
		// console.log(postData, "9958486532")
		
		fetch(apiBase + 'orderGenerate', {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())

            .then((payTmData) => {
				console.log(payTmData, "!!!")
                if (payTmData.status == "success") {
					alert(payTmData.message)
                } else {
					alert(payTmData.message)
                }
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => {
                setLoader(false)
            })
	}

		// show product list fun start here
		function shoProductList() {
			setloader(true)
			const postData = {
				"product_slug": product_slug,
				"token": token
			}
			fetch(apiBase+'getSingleProductDetail', {
				method: "post",
				body: JSON.stringify(postData),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
				.then(response => response.json())
				.then((singleProdu) => {
					if (singleProdu.status == "success") {
						setsinglePro(singleProdu.data);
						setProductIds(singleProdu.data.product_id);
						setBookType(singleProdu.data.getProductDesc)
						setSelectedPro((prev) => {
							return { ...prev, data: singleProdu.data.getProductDesc, index: 0 }
						})
					} else {
						alert(singleProdu.message);
					}
				})
				.catch((error) => {
					alert(error)
				})
				.finally(() => {
					setloader(false)
	
				})
	
	
		}
		console.log(singlePro)
		// show product list fun end here
	return (
		<>
			<Layout>
				<Head>
					<title>Buy-now</title>
				</Head>

				<div className='orderDetailsBgs'>
					<div className='forDesig'></div>
					<Container fluid >
						<div className='whiteBgs'>
							<div className="one animate__animated animate__backInDown">
								<h1 className="textWhite mediTxts">Buy-now</h1>
							</div>
						</div>
					</Container>
					<div className='blockBgs'>
						<Container>
							<Row>
								<Col className='col-md-4 col-sm-6 col-12'>
									<div className='backDiv shadow-sm'>
										<div className='headerDiv'>Shipment Address {userAddress.length > 1 ? <button onClick={handleShow} className='btn btn-light btn-sm'>Change Address</button> : ''}</div>
										<div className='rangeAddress'>
											{userAddress.length > 0 ?
												<>
													<h6>{userDel?.data?.[userDel?.index].fullname}</h6>
													<p className='address_belew'> {userDel?.data?.[userDel?.index].address}, {userDel?.data?.[userDel?.index].landmark}, {userDel?.data?.[userDel?.index].zip_code}, {userDel?.data?.[userDel?.index].city_name},<br />
														{userDel?.data?.[userDel?.index].phone_no}, {userDel?.data?.[userDel?.index].state_name}, {userDel?.data?.[userDel?.index].country_name}</p>
													<div className='actAddress'>Active <WbIncandescentIcon /></div>
												</> :
												<div className='notFound'>
													<img src='/indexImg/not.png' alt='' style={{ width: "150px" }} />
													<h5>Record not found</h5>
												</div>
											}

										</div>
									</div>
								</Col>
								<Col className='col-md-4 col-sm-6 col-12'>
									<div className='backDiv shadow-sm'>
										<div className='headerDiv'>Order Details</div>
										<div className='rowLine'>
											<div className='textBold'>Cart Sub Total :</div>
											<div className='textNormal'>{totalAmount}</div>
										</div>
										<div className='rowLine'>
											<div className='textBold'>Discount ( - )</div>
											<div className='textNormal'>{discountedAmt}</div>
										</div>
										<div className='rowLine'>
											<div className='textBold'>Shipping Charges ( + )</div>
											<div className='textNormal'>0</div>
										</div>
										<div className='rowLine'>
											<div className='textBold'>Payable Amount :</div>
											<div className='textNormal'>{grandTotal}</div>
										</div>

									</div>
								</Col>
								<Col className='col-md-4 col-sm-6 col-12'>
									<div className='backDiv shadow-sm'>
										<div className='headerDiv'>Payment Method</div>

										<FormControl className="selectMethod" size='small' >
											<InputLabel id="demo-simple-select-label w-15">Select Method</InputLabel>
											<Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select Method">
												<MenuItem value="1">Online Payment</MenuItem>
												{/* <MenuItem value="2">Bank Deposit</MenuItem> */}
											</Select>
										</FormControl>

										<div className='buttonSect'>
											{userAddress.length > 0 ? <button onClick={payMentPop} className='btn btn-danger'>Continue</button> :
												<button className='btn btn-danger'><Link className='ankr' href='/Profile'>Add Address</Link></button>
											}

										</div>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
					<div className='whiteBgs'>
						<Container>
							<Row className='animate__animated animate__zoomIn mt-3'>
								<div className='headerRow'>
									<div className='headingOrder'>Buy Now Order</div>
								</div>
								<Col className=''>
									
												<div className='gridRows'>
													<div className='titleImgs'>
													{/* <div><img src={`${productPath}` + singlePro.getProductDesc.product_cover_image} /></div> */}
													
													</div>
													<div className='bookDeta'>
														<div className='TextSame'>
														{singlePro.product_name}
														{selectedPro?.data?.[selectedPro?.index].book_binding_type}
														</div>
														<div className='TextSame'>Class : {singlePro.class_name}</div>
														<div className='TextSame'>Subject : {singlePro.subject_name}</div>
														<div className='TextSame'>Quantity: {singlePro.quantity}</div>
														<div className='TextSame'><CurrencyRupeeIcon /> {1}   <CurrencyRupeeIcon /> <span className='cutPrice'>{singlePro.product_mrp_price}</span></div>
														{/* <div className='TextSame'>You save <CurrencyRupeeIcon /> 44.9 (10% off)</div> */}

													</div>
												</div>
										
								</Col>
							</Row>
						</Container>
					</div>


					<Offcanvas show={show} onHide={handleClose}>
						<Offcanvas.Header className='headerList' closeButton >
							<Offcanvas.Title>Address List</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<div className='shadow-sm animate__animated animate__fadeInDown'>

								{userAddress.map((item, key) => {
									return (
										<div className='s'>
											<div className='addressBox shadow-sm'>
												<table className='table table-bordered'>
													<tbody>
														<tr>
															<td>
																<div key={key} className='are' onClick={() => { selectAddress(item, key) }}>
																	<h6>{item.fullname}</h6>
																	<p className='address_belew'> {item.address}, {item.landmark}, {item.zip_code}, {item.city_name},<br />
																		{item.phone_no}, {item.state_name}, {item.country_name}</p>
																</div>
															</td>
														</tr>
													</tbody>
												</table>

											</div>
										</div>
									)
								})}
								{userAddress.length == 0 &&
									<div className='notFound'>
										<img src='/indexImg/not.png' alt='' />
										<h5>Record not found</h5>
									</div>
								}


							</div>
						</Offcanvas.Body>
					</Offcanvas>

					<Offcanvas show={Modl} onHide={payClose} placement='end'  backdrop="static">
						<Offcanvas.Header closeButton className='headerList2'>
							<Offcanvas.Title className='titleText'>Select payment option</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<div className='payImgs' onClick={ptmFunct}>
								<img src='/indexImg/ptm.jpg'/>
							</div>
							<div className='payImgs'>
								<img className='deact' src='/indexImg/cc.jpg'/>
							</div>
						</Offcanvas.Body>
					</Offcanvas>
					{loader && 
					<Loader/>
					}
				</div>
			</Layout>
		</>
	)
}
