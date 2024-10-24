import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState, useRef } from "react";
import 'aos/dist/aos.css';
import Layout from './Layout';
import { Context } from './componets/store';
import { useContext } from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import Loader from './Loader';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DownloadIcon from '@mui/icons-material/Download';
export default function YourOrder() {

	const {
		orderLIST,
		productPath,
		userData,
		token,
		apiBase,
		gettShip,
		addressIDS,
		getShipingCharge
	} = useContext(Context);
	useEffect(() => {
		if (addressIDS !== "") {
			getShipingCharge();
		}
	}, [addressIDS])
	useEffect(() => {
		AOS.init();
	}, []);
	// useEffect(() => {
	// 	if (addressIDS !== "") {
	// 		getShipingCharge();
	// 	}
	// }, [addressIDS])

	// const fName = inVoiceList?.deliveryAddress?.fullname
	// const address = inVoiceList?.deliveryAddress?.address
	// const zip_code = inVoiceList?.deliveryAddress?.zip_code
	// const created_date = inVoiceList?.deliveryAddress?.created_date
	// const phone_no = inVoiceList?.deliveryAddress?.phone_no
	// const stateName = inVoiceList?.deliveryAddress?.stateName[0]?.state_name
	// const countryName = inVoiceList?.deliveryAddress?.countryName[0]?.country_name
	// const orderDetails = inVoiceList.orderDetails
	const [invoice_model, setinvoice_model] = useState(false)

	const closeModel = () => {
		setinvoice_model(false)
	}
	const [loader, setLoader] = useState(false)



	const [inVoiceList, setinVoice] = useState([]);
	function getSingleOrders(orderIDS) {
		setLoader(true)
		setinvoice_model(true)
		let idsSecnd = orderIDS
		const xdata = {
			"customer_id": userData.customer_id,
			"token": token,
			"order_id": idsSecnd
		}
		fetch(apiBase + 'getSingleOrder', {
			method: "POST",
			body: JSON.stringify(xdata),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((invoiceDta) => {
				if (invoiceDta.status == "success") {
					setinVoice(invoiceDta.data[0])
				} else {
					alert(invoiceDta.message);
				}
			})
			.catch((error) => {
				alert(error.message)
			})
			.finally(() => {
				setLoader(false)
			})

	}
	function printInVoice (){
		window.print();
	}

	let totalAmt = inVoiceList.total_amount
	let shipCharge = gettShip;
	let finalAmt = Number( totalAmt )+ Number( shipCharge );
    console.log(gettShip, "store------")


	return (
		<>
			<Layout>
				<Head>
					<title>Your Order</title>
				</Head>

				<div className='orderDetailsBgs'>
					<div className='forDesig'></div>
					<div className='whiteBgs2'>
						<Container className='bg-light py-5' style={{ overflow: "auto" }}>
							<div className="one animate__animated animate__backInDown">
								<h1 className="textWhite mediTxts">Your Order</h1>
							</div>
							{orderLIST.map((item, listOr) => {
								const multyData = item.orderDetails
								let amt = item.total_amount
								return (
									<div className='tableBox shadow-sm' key={listOr}>
										<div className='rowHeader'>
											<div className='textDiv'>Order Date<br /> <span className='drop_text'> {item.order_date} </span></div>
											<div className='textDiv'>Order Number <br /> <span className='drop_text'> {item.order_no} </span></div>
											<div className='textDiv'>Order Status <br /> <span className='drop_text'> Success </span></div>
											<div className='textDiv'>Amount <br /> <span className='drop_text'> {Number(amt)+Number(shipCharge)} </span></div>
											<button className='btn btn-outline-success btnSec' onClick={() => { getSingleOrders(item.order_id) }}>Invoice <RemoveRedEyeIcon /></button>
										</div>
										<table className="table table-bordered tblsTop">
											<thead>
												<tr>
													<th scope="col">Sr. | Items</th>
												</tr>
											</thead>
											<tbody>
												<tr>

													<td colSpan={3}>
														<Row>
															{multyData.map((item, index, inOt) => {
																return (
																	<>
																		<Col className='col-md-6 col-12 col-sm-12'>
																			<div className='rowInDiv' key={inOt}>
																				<div className='numberText'>{index + 1}</div>
																				<div className='imgs'><img src={`${productPath}` + item.product_cover_image} /></div>
																				<div >{item.product_name}</div>
																			</div>
																		</Col>
																	</>
																)
															})}
														</Row>
													</td>

												</tr>
											</tbody>
										</table>
									</div>
								)
							})}
							{orderLIST.length == 0 &&
								<div className='boxBlank'><img src='/indexImg/blank_order.gif' /><br />
									<h5>Your order list is empty.</h5>
								</div>
							}
						</Container>
					</div>
				</div>


				{/* invoice pop start */}
				{invoice_model &&
					<div className='basePop12'>
						<Container>
							<div className='innerBox animate__animated animate__slideInDown' id='printablediv'>
								<div className='headerTop2'>
									<div className='logoInvoice'><img src='/indexImg/logo.png' /></div>
									<div className='rightColm'>
										Order Confirmation <br />
										Order id : {inVoiceList?.order_no}
									</div>
								</div>
								<div className='we_value'>
									We value your safety.Your safety matters. We take utmost care to ensure that the orders are duly sanitized and safe to reach you.
								</div>
								<div className='textMore'>
									<b>Dear {inVoiceList?.deliveryAddress?.fullname},</b> <br />
									Thank You for choosing Forever’ Books: Your Learning Partner!
								</div>
								<div className='textsimple'>
									We’d like to inform you that your order has been successfully placed. The following item(s) of your Order ID
									({inVoiceList?.order_no}) will be dispatched soon. Once shipped, we will send an email notifying the tracking details along with the expected delivery date.
								</div>

								<div className='box2'>
									<div className='fcol'>
										<div className='ordDetails'>	Your Order Details</div><br />
										<span className='boldTExt addTex'>Order Number</span> : {inVoiceList?.order_no} <br />
										<span className='boldTExt addTex'>Order Date</span> : {inVoiceList?.deliveryAddress?.created_date} <br />
										<span className='boldTExt addTex'>Payment Method</span> : {inVoiceList?.payment_method} <br />
									</div>
									<div style={{ width: "28%" }}>
										<b>Billing Address</b> <br />
										{inVoiceList?.deliveryAddress?.fullname} <br />
										{inVoiceList?.deliveryAddress?.address},
										Pin Code - {inVoiceList?.deliveryAddress?.zip_code} <br />
										Mobile - {inVoiceList?.deliveryAddress?.phone_no}<br />
										{inVoiceList?.deliveryAddress?.stateName[0]?.state_name}, {inVoiceList?.deliveryAddress?.countryName[0]?.country_name}
									</div>
								</div>
								<div className='table-responsive'>
									<table class="table table-bordered tbls">
										<thead>
											<tr className='headerTr'>
												<td style={{ width: "25px" }}>S.N.</td>
												<td>Product</td>
												<td>Price</td>
												<td> Qty</td>
												<td>Total</td>
											</tr>
										</thead>
										<tbody>
											{inVoiceList?.orderDetails?.map((item, index, inBooks) => {
												return (
													<>
														<tr key={inBooks}>
															<th>{index + 1}</th>
															<td>{item.product_details.product_name}</td>
															<td><CurrencyRupeeIcon /> {item.product_amount}</td>
															<td>{item.quantity}</td>
															<td><CurrencyRupeeIcon /> {item.quantity * item.product_amount}</td>
														</tr>
													</>
												)
											})}
											<tr>
												<td colSpan={5}><div className='total'>
													<span className='sameWidth'>Shipping Change :<CurrencyRupeeIcon /> <b>{gettShip}</b></span>
													<br/>
													<span className='sameWidth'>Grand total :<CurrencyRupeeIcon /><b>{finalAmt}</b></span></div></td>
											</tr>


										</tbody>
									</table>
									<div className='moretext'>
										<b>Please note:</b> <br />
										We do not demand your banking and credit card details verbally or telephonically. Please do not divulge your details to fraudsters and imposters falsely claiming to be calling on Forever Books behalf.
									</div>
									<div className='moretext mt-5'>
										Have feedback on your shopping experience or an order-related query? Ring us on +91 9717998857 or e-mail us at info@forever.co.in. Our Customer Care Executives would be glad to help you!
									</div>
									<div className='threeSteps'>
										<div className='iconsWith'>
											<PriceCheckIcon /><br />
											Assured Quality
										</div>
										<div className='iconsWith'>
											<CreditScoreIcon /><br />
											100% Handpicked

										</div>
										<div className='iconsWith'>
											<ChangeCircleIcon /><br />
											Easy Returns
										</div>
									</div>
									<div className='totalSection2'>
										<div className=''>*This is a computer generated invoice.No signature required.</div>
										<div className=''>Thank you for shopping with us.</div>
									</div>
									<div className='button_section'>
										{/* <button className='btn btn-success btn-sm' onClick={printInVoice}>Print</button> */}
										<button className='btn btn-danger btn-sm' onClick={closeModel}><CloseIcon /> Close</button>
									</div>
								</div>

							</div>
						</Container>
					</div>
				}
				{/* invoice pop end */}
				{loader &&
					<Loader />
				}

			</Layout >

		</>
	)
}
