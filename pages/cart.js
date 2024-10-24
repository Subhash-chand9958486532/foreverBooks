import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState, useRef } from "react";
import 'aos/dist/aos.css';
import Link from 'next/link';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Layout from './Layout';
import { Context } from './componets/store';
import { useContext } from 'react';
import { useRouter } from 'next/router'
export default function CartListData() {
	const {
		userData,
		getCartList,
		cartList,
		increMent,
		dicreMent,
		removeItem,
		removeAll,
		noCartData,
		isCartData,
		productAmount,
		totalAmount,
		discountedAmt,
		grandTotal,
		cartListOff,
		productPath
	} = useContext(Context);

	const [machineIdSta, setMachineId] = useState();


	const quant = 0
	const disCount = 10;

	useEffect(() => {
		getMachineId();
		AOS.init();
		getCartList();

	}, []);

	useEffect(() => {
		if (userData.customer_id !== "") {
			getCartList();
		}

	}, [userData.customer_id])

	function getMachineId() {
		let machineId = localStorage.getItem('MachineId');
		if (machineId) {
			setMachineId(machineId)
		}
		if (!machineId) {
			machineId = crypto.randomUUID();
			localStorage.setItem('MachineId', machineId);
		}
		return machineId;
	}


	// add to cart 

	// check out function
	function checlOut() {
		if (userData.isLogin) {
			window.location.href = "/Order";
		} else {
			window.location.href = "/Login";
		}
	}
	let amtLast = parseFloat(totalAmount).toFixed(2);
	return (
		<>
			<Layout>
				<Head>
					<title>Order|Detail</title>
				</Head>

				<div className='orderDetailsBgs'>
					<div className='forDesig'></div>
					<Container fluid >
						<div className='whiteBgs'>
							<div className="one animate__animated animate__backInDown">
								<h1 className="textWhite mediTxts">Order Detail</h1>
							</div>



							{cartList.length > 0 && isCartData &&
								<Row className='animate__animated '>
									<div className='headerRow'>
										<div className='headingOrder'>My cart </div>
										<button className='btn btn-outline-danger btn-sm' onClick={removeAll}>Remove All</button>
									</div>
									<Col className='col-md-9 col-sm-12 col-12'>
										{cartList.map((item, listKey) => {
											let discountF = item.getProductDesc[0].discount;

											console.log(typeof discountF, "cart")
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
															<div className='TextSame'>
																<span><CurrencyRupeeIcon /> {(item.getProductDesc[0].product_sale_price * item.quantity).toFixed(2)} </span>
																{Object.keys(discountF).length > 0 ?
																	<span className='cutPrice'><CurrencyRupeeIcon />{item.getProductDesc[0].product_mrp_price} </span>
																	: <span className='cutPrice1' style={{color: "#cc5e05"}}><CurrencyRupeeIcon />{item.getProductDesc[0].product_mrp_price} </span>
																}

																{/* <span> <CurrencyRupeeIcon /> <span className='cutPrice'>{item.getProductDesc[0].product_mrp_price}</span></span> */}
															</div>
															{/* <div className='TextSame'>You save <CurrencyRupeeIcon /> 44.9 (10% off)</div> */}
															<div className='rowGrids'>

																<div className='buttSection'>
																	<div>
																		<button onClick={(() => { dicreMent(item) })}
																			className='btn btn-outline-primary btn-sm'><RemoveIcon /></button>

																		<button className='btn btn-outline-primary btn-sm'>{item.quantity}</button>

																		<button onClick={(() => { increMent(item) })}
																			className='btn btn-outline-primary btn-sm'><AddIcon />
																		</button>
																		<button onClick={(() => { removeItem(item.cart_id) })} className='btn btn-outline-danger btn-sm'><DeleteIcon /></button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</>
											)
										})}
									</Col>

									<Col className='col-md-3 col-sm-12 col-12'>
										<div className='totalSection'>
											<div className='headingOrder'>Order summary</div>
											<div className='rowSu'>
												<div><strong>Total MRP</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{amtLast}</strong></div>
											</div>
											<hr />
											{/* <div className='rowSu'>
												<div><strong>Discount (-)</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{discountedAmt}</strong></div>
											</div> */}
											{/* <hr />
											<div className='rowSu'>
												<div><strong>Total</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{grandTotal}</strong></div>
											</div>
											<hr /> */}
											{/* <div className='rowSu'>
												<div><strong>Sub Total</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />1616.4</strong></div>
											</div> */}
											<div className='rowSu'>
												<div><strong>Grand Total</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{amtLast}</strong></div>
											</div>
											<hr />
											<div className='checkOut' onClick={checlOut}><LockPersonIcon /> Checkout</div>
										</div>
									</Col>
								</Row>
							}
							{cartListOff.length > 0 && isCartData &&
								<Row className='animate__animated '>
									<div className='headerRow'>
										<div className='headingOrder'>My cart </div>
										<button className='btn btn-outline-danger btn-sm' onClick={removeAll}>Remove All</button>
									</div>
									<Col className='col-md-9 col-sm-12 col-12'>
										{cartListOff.map((item, listKey) => {
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
															<div className='TextSame'><CurrencyRupeeIcon /> {productAmount * item.quantity}   <CurrencyRupeeIcon /> <span className='cutPrice'>{item.getProductDesc[0].product_mrp_price}</span></div>
															{/* <div className='TextSame'>You save <CurrencyRupeeIcon /> 44.9 (10% off)</div> */}
															<div className='rowGrids'>

																<div className='buttSection'>
																	<div>
																		<button onClick={(() => { dicreMent(item) })}
																			className='btn btn-outline-primary btn-sm'><RemoveIcon /></button>

																		<button className='btn btn-outline-primary btn-sm'>{item.quantity}</button>

																		<button onClick={(() => { increMent(item) })}
																			className='btn btn-outline-primary btn-sm'><AddIcon />
																		</button>
																		<button onClick={(() => { removeItem(item.cart_id) })} className='btn btn-outline-danger btn-sm'><DeleteIcon /></button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</>
											)
										})}

									</Col>

									<Col className='col-md-3 col-sm-12 col-12'>
										<div className='totalSection'>
											<div className='headingOrder'>Order summary</div>
											<div className='rowSu'>
												<div><strong>Total MRP</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{totalAmount}</strong></div>
											</div>
											<hr />
											<div className='rowSu'>
												<div><strong>Discount (-)</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{discountedAmt}</strong></div>
											</div>
											<hr />
											<div className='rowSu'>
												<div><strong>Total</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{grandTotal}</strong></div>
											</div>
											<hr />
											{/* <div className='rowSu'>
												<div><strong>Sub Total</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />1616.4</strong></div>
											</div> */}
											<div className='rowSu'>
												<div><strong>Grand Total</strong></div>
												<div><strong>:</strong></div>
												<div><strong><CurrencyRupeeIcon />{grandTotal}</strong></div>
											</div>
											<hr />
											<div className='checkOut' onClick={checlOut}><LockPersonIcon /> Checkout</div>
										</div>
									</Col>
								</Row>
							}

							{userData.isLogin == false && cartListOff.length == 0 &&
								<div className='rowCrt'>
									<img src='/indexImg/cart.png' alt='cart' />
									<h3>Your Cart is Empty</h3>
									<p className='looks'>Looks like you haven't added anything to your cart yet. of</p>
									<button className='btn btn-outline-success shpop'><Link href='/our-product'>Go to shopping</Link></button>
								</div>
							}
							{userData.isLogin && cartList.length == 0 &&
								<div className='rowCrt'>
									<img src='/indexImg/cart.png' alt='cart' />
									<h3>Your Cart is Empty</h3>
									<p className='looks'>Looks like you haven't added anything to your cart yet on.</p>
									<button className='btn btn-outline-success shpop'><Link href='/our-product'>Go to shopping</Link></button>
								</div>
							}
						</div>
					</Container>



				</div>
			</Layout>
		</>
	)
}
