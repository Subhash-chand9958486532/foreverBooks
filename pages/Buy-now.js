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
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'
export default function CartListData() {
	const {
		apiBase,
		token,
		userData,
		discountedAmt,
		grandTotal,
		userAddress,
		getSaveAddress,
		userDel,
		selectAddress,
		addressIDS,
		cartIds,
		buyNowData,
		buycartID,
		productPath,
		gettShip,
		getShipingCharge

	} = useContext(Context);
	const router = useRouter();
	useEffect(() => {
		if (addressIDS !== "") {
			getShipingCharge();
		}
	}, [addressIDS])
	useEffect(() => {
		getSaveAddress();
		AOS.init();
		const singData = JSON.parse(localStorage.getItem('seltProduct'));
		const singlePro = JSON.parse(localStorage.getItem('singlePro'));

		if (singData) {
			setItems(singData);
		}
		if (singlePro) {
			setSinglPro(singlePro);
		}
	}, []);

	useEffect(() => {
		const getBuyIds = JSON.parse(localStorage.getItem('cartID'));
		if (getBuyIds) {
			setgetBuyIds(getBuyIds);
		}
	}, []);

	const [getBuyIds, setgetBuyIds] = useState([]);
	let BuycartIds = [getBuyIds]

	console.log(BuycartIds, "00000")

	const [items, setItems] = useState({});
	const [singlPro, setSinglPro] = useState({});


	let mrp = 0;
	const [show, setShow] = useState(false);
	const [loader, setLoader] = useState(false)
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [Modl, setModl] = useState(false);
	const payClose = () => setModl(false);
	const [selectedPro, setSelectedPro] = useState({ data: null, index: 0 });
	const [singlePro, setsinglePro] = useState({});
	function payMentPop() {
		setModl(true)
	}

	// function ptmFunct() {
	// 	setLoader(true)
	// 	const postData = {
	// 		"customer_id": userData.customer_id,
	// 		"address_id": addressIDS,
	// 		"cart_id": BuycartIds,
	// 		"token": token,
	// 		"buy_now": 1,
	// 		"quantity": 1,
	// 		"isWeb": 1

	// 	}
	// 	fetch(apiBase + 'orderGenerate', {
	// 		method: "POST",
	// 		body: JSON.stringify(postData),
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json',
	// 		}
	// 	})
	// 		.then(resp => resp.json())
	// 		.then((someData) => {
	// 			console.log(someData, "00")
	// 			// setPaymentData(someData)
	// 			let orIDs = someData.orderId;
	// 			let totalAmt = someData.total_amount
	// 			let txtId = someData.txnToken

	// 			var config = {
	// 				"root": "",
	// 				"flow": "DEFAULT",
	// 				"data": {
	// 					"orderId": orIDs, /* update order id */
	// 					"token": txtId, /* update token value */
	// 					"tokenType": "TXN_TOKEN",
	// 					"amount": totalAmt /* update amount */
	// 				},

	// 				"handler": {
	// 					"notifyMerchant": function (eventName, data) {
	// 						console.log("notifyMerchant handler function called");
	// 						console.log("eventName => ", eventName);
	// 						console.log("data => ", data);
	// 					}

	// 				}
	// 			};
	// 			console.log(window.Paytm, "pay")
	// 			if (window.Paytm && window.Paytm.CheckoutJS) {
	// 				// window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
	// 				// initialze configuration using init method
	// 				window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
	// 					// after successfully updating configuration, invoke JS Checkout
	// 					// setLoader(false)
	// 					window.Paytm.CheckoutJS.invoke();

	// 				}).catch(function onError(error) {
	// 					console.log("error => ", error);
	// 				}).finally(() => {
	// 					setLoader(false)
	// 				});
	// 				// });
	// 			} else {
	// 				setLoader(false)
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			alert(error.message)
	// 			setLoader(false)
	// 		})
	// 		.finally(() => {
	// 			// setLoader(false)
	// 		})
	// }

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
				isWeb: 1,
				buy_now: 1,
				quantity: 1
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
								"shippingCharge": data.shippingCharge,
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


	if (items.data == undefined) {
		return null
	}
	if (singlPro == undefined) {
		return null
	}
	console.log(singlPro, "subhash")
	let MRP = items.data[0].product_sale_price
	let disountAmt = 10;

	console.log(gettShip, "Buy")

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
											<div className='textNormal'>{MRP}</div>
										</div>

										<div className='rowLine'>
											<div className='textBold'>Shipping Charges ( + ) </div>
											<div className='textNormal'>{gettShip}</div>
										</div>
										<div className='rowLine'>
											<div className='textBold'>Payable Amount :</div>
											<div className='textNormal'>{Number(MRP) + Number(gettShip)}</div>
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
											<div><img src={`${productPath}` + items.data[0].product_cover_image} /></div>
										</div>
										<div className='bookDeta'>
											<div className='TextSame'>
												{singlPro.product_name}
											</div>
											<div className='TextSame'>
												ISBN : {singlPro.isbn_number}
											</div>
											<div className='TextSame'>
												Product Type : {items.data[0].getBookTypeName.book_type_name}
											</div>
											<div className='TextSame'>
												<span > Price : <CurrencyRupeeIcon />{items.data[0].product_sale_price}</span>
												{/* <CurrencyRupeeIcon /> <span className='cutPrice'>{items.data[0].product_mrp_price}
												</span> */}
											</div>
											<div className='TextSame'>Class : {singlPro.getClassName.class_name}</div>
											<div className='TextSame'>Subject : {singlPro.getClassName.subject_name}</div>
											<div className='TextSame'>Quantity: 1</div>

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
				</div>
			</Layout>
		</>
	)
}
