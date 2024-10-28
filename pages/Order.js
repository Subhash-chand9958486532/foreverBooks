import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState, useRef } from "react";
import 'aos/dist/aos.css';
import Link from 'next/link';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Layout from './Layout';
import { Context } from './componets/store';
import { useContext } from 'react';
import Loader from './Loader';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Offcanvas from 'react-bootstrap/Offcanvas';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import Script from 'next/script';
import Router from 'next/router'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Swal from 'sweetalert2';

export default function Order() {
	const {
		apiBase,
		token,
		cartList,
		userData,
		totalAmount,
		discountedAmt,
		grandTotal,
		userAddress,
		getSaveAddress,
		userDel,
		selectAddress,
		addressIDS,
		cartIds,
		productPath,
		getShipingCharge,
		gettShip
	} = useContext(Context);
	useEffect(() => {
		// getShipingCharge();
		AOS.init();
		if ('https://books.foreverbooks.co.in/laravel_api/api/paymentStatus') {

		}

	}, []);
	useEffect(() => {
		if (userData.customer_id !== "") {
			getSaveAddress();
		}
	}, [userData.customer_id])
	
	useEffect(() => {
		if (addressIDS !== "") {
			getShipingCharge();
		}
	}, [addressIDS])

	let mrp = 0;
	const [show, setShow] = useState(false);
	const [loader, setLoader] = useState(false)
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [Modl, setModl] = useState(false);
	const payClose = () => setModl(false);
	const router = useRouter();
	const [messShow, setmessShow] = useState(false)
	const pathname = usePathname()

	function payMentPop() {
		setModl(true)
	}
	function ptmFunct() {
		setmessShow(false)
		setLoader(true)
		const postData = {
			"customer_id": userData.customer_id,
			"address_id": addressIDS,
			"cart_id": cartIds,
			"token": token,
			"isWeb": 1
		}
		fetch(apiBase + 'orderGenerate', {
			method: "POST",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(resp => resp.json())
			.then((someData) => {
				console.log(someData, "bose")
				// setPaymentData(someData)
				let orIDs = someData.orderId;
				let totalAmt = someData.total_amount
				let txtId = someData.txnToken

				var config = {
					"redirect": "false",
					"root": "",
					"flow": "DEFAULT",
					"data": {
						"orderId": orIDs, /* update order id */
						"token": txtId, /* update token value */
						"tokenType": "TXN_TOKEN",
						"amount": totalAmt /* update amount */
					},

					"handler": {
						"notifyMerchant": function (eventName, data) {
							console.log("notifyMerchant handler function called");
							console.log("eventName => ", eventName);
							console.log("data9 => ", data);
							// setmessShow(true)
						}

					}

				};

				console.log(window.Paytm, "pay")
				if (window.Paytm && window.Paytm.CheckoutJS) {
					// window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
					// initialze configuration using init method
					window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
						// after successfully updating configuration, invoke JS Checkout 
						// setLoader(false)
						window.Paytm.CheckoutJS.invoke();
						// router.push('/Your-order');

					}).catch(function onError(error) {
						console.log("error => ", error);
					}).finally(() => {
						console.log("error => ", 'hello');
						setLoader(false)
					});
					// });
				} else {
					setLoader(false)
				}
			})
			.catch((error) => {
				alert(error.message)
				setLoader(false)
			})
			.finally(() => {
				// setLoader(false)
			})
	}


	const hideErrorSms = () => {
		setmessShow(false)
	}

	let amtLast = parseFloat(totalAmount).toFixed(2);

	let payAmt =parseFloat(amtLast+gettShip).toFixed(2);  


	
	const loadRazorpayScript = () => {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = 'https://checkout.razorpay.com/v1/checkout.js';
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			document.body.appendChild(script);
		});
	};
	
	const handlePayment = async () => {
		setLoader(true);
		try {
			const res = await loadRazorpayScript();
			if (!res) {
				Swal.fire('Error', 'Razorpay SDK failed to load. Are you online?', 'error');
				setLoader(false);
				return;
			}
	
			const postData = {
				customer_id: userData.customer_id,
				address_id: addressIDS,
				cart_id: cartIds,
				token: token,
				isWeb: 1
			};
	
			const result = await fetch(apiBase + 'books/buy', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api_token': token,
				},
				body: JSON.stringify(postData),
			});
	
			if (!result.ok) {
				console.error('Error:', result.status, result.statusText);
				Swal.fire('Error', `API request failed: ${result.status} - ${result.statusText}`, 'error');
				setLoader(false);
				return;
			}
	
			const data = await result.json();
			console.log('API Response:', data);  // Log response data for debugging
	
			if (data.status === "success" && data.orderID) {
				const options = {
					key: 'rzp_live_ESHYjQ2LWl9DNS',
					amount: data.amount_paise,
					currency: data.currency,
					name: 'FOREVER BOOKS PRIVATE LIMITED',
					description: 'Test Transaction',
					order_id: data.orderID,
					handler: function (response) {
						// if (response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature) {
						// 	router.push('/Your-order');
						// } else {
						// 	console.error('Missing necessary response fields:', response);
						// }

						if (response.razorpay_payment_id) {
							const xData = {
								"customer_id": userData.customer_id,
								"address_id": addressIDS,
								"token": token,
								"shippingCharge":data.shippingCharge,
								"razorpay_order_id": response.razorpay_order_id,
								"razorpay_payment_id": response.razorpay_payment_id,
								"razorpay_signature": response.razorpay_signature
							};

							// Verify payment details
							fetch(apiBase + 'payment/verify', {
								method: 'POST',
								body: JSON.stringify(xData),
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
									'api_token': token,
								},
							})
								.then(response => response.json())
								.then((result) => {
									if (result.status === "success") {
										router.push('/Your-order');
										console.log(result, "After payment success.....")
									} else {
										Swal.fire({
											title: 'Warning!',
											text: result.message,
											icon: 'warning',
											confirmButtonText: 'OK'
										});
									}
								})
								.catch((err) => alert(err))
								.finally(() => setLoader(false));
						} else {
							console.error('Missing razorpay_payment_id in response');
						}
					},
					prefill: {
						name: 'YEF',
						email: 'foreverbook4583@gmail.com',
						contact: '91 9717 998857',
					},
					theme: {
						color: '#3399cc',
					},
				};
	
				const paymentObject = new window.Razorpay(options);
				paymentObject.open();
			} else {
				Swal.fire('Warning', data.message ?? 'Failed to initiate payment. Please try again later.', 'warning');
			}
		} catch (error) {
			console.error('Error during payment process:', error);
			Swal.fire('Error', 'An error occurred during the payment process. Please try again.', 'error');
		} finally {
			setLoader(false);
		}
	};
	
	



	return (
		<>
			<Layout>
				<Head>
					<title>Order</title>
				</Head>
				<Script>

				</Script>
				<div className='orderDetailsBgs'>
					<div className='forDesig'></div>
					<Container fluid >
						<div className='whiteBgs'>
							<div className="one animate__animated animate__backInDown">
								<h1 className="textWhite mediTxts">Order Summary </h1>
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
											<div className='textBold'>Cart Sub Total : </div>
											<div className='textNormal'>{amtLast}</div>
										</div>
										<div className='rowLine'>
											<div className='textBold'>Shipping Charges (+) </div>
											<div className='textNormal'>{gettShip}</div>
										</div>
										<div className='rowLine'>
											<div className='textBold'>Payable Amount :</div>
											<div className='textNormal'>{Number(amtLast)+Number(gettShip)}</div>
										</div>
										{/* <div className='rowLine'>
											<div className='textBold'>Discount ( - )</div>
											<div className='textNormal'>{discountedAmt}</div>
										</div> */}

										{/* <div className='rowLine'>
											<div className='textBold'>Payable Amount :</div>
											<div className='textNormal'>{grandTotal}</div>
										</div> */}

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
											<button className='btn btn-danger'><Link className='ankr' href='our-product'>Continue Shopping</Link></button>
											{userAddress.length > 0 ? <button onClick={payMentPop} className='btn btn-danger'>Place Order</button> :
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
									<div className='headingOrder'>Book Order List
									</div>
								</div>
								<Col className=''>
									{cartList.map((item, listKey) => {
										const pric = item.getProductDesc[0].product_sale_price;
										let quant = item.quantity
										let crtIDS = item.cart_id
										let amo = pric * quant
										mrp = mrp + parseInt(amo)
										const total = pric;
										return (
											<>
												<div className='gridRows' key={listKey}>
													<div className='titleImgs'>
														<img src={`${productPath}` + item.getProductDesc[0].product_cover_image} />
													</div>
													<div className='bookDeta'>
														<div className='TextSame'>
															{item.getProductName.product_name}
															({item.getProductDesc[0].getBookTypeName.book_type_name})
														</div>
														<div className='TextSame'>Class : {item.getProductName.class_id}</div>
														<div className='TextSame'>Subject : {item.getProductName.getSubjectName.subject_name}</div>
														<div className='TextSame'>Quantity: {item.quantity}</div>
														<div className='TextSame'><CurrencyRupeeIcon /> {(amo).toFixed(2)}  
														 {/* <CurrencyRupeeIcon /> <span className='cutPrice'>{item.getProductDesc[0].product_mrp_price}</span> */}
														 </div>
														{/* <div className='TextSame'>You save <CurrencyRupeeIcon /> 44.9 (10% off)</div> */}

													</div>
												</div>
											</>
										)
									})}
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

					<Offcanvas show={Modl} onHide={payClose} placement='end' backdrop="static">
						<Offcanvas.Header closeButton className='headerList2'>
							<Offcanvas.Title className='titleText'>Select payment option</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<div className="boPay shadow-sm" onClick={handlePayment}>
								<div>Pay Through Razorpay </div>
								<div className='payImgs_i'><img src='/indexImg/payLogo.jpg' /></div>
							</div>
						</Offcanvas.Body>
					</Offcanvas>
					{loader &&
						<Loader />
					}
					{messShow &&
						<div className='error_mess'>
							<div className='innerBoxBlank animate__animated animate__fadeInDown'>
								<ErrorOutlineIcon className='errorIcons' />
								<h4>Not Success</h4>
								<p>If any help please contact to : 9717998857</p>
								<hr />
								<button className='btn btn-success' onClick={ptmFunct}>Retry</button>{' '}
								<button className='btn btn-danger' onClick={hideErrorSms}>Close</button>
							</div>
						</div>
					}
				</div>
			</Layout>
		</>
	)
}
