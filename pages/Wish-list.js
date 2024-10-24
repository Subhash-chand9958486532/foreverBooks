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
import { useRouter } from 'next/router';
import Loader from './Loader';
import { Route } from '@mui/icons-material';
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
		setwishListData,
		apiBase,
		token,
		productPath,
		wishListData,
		getWishListFun
	} = useContext(Context);
	const quant = 0
	const disCount = 10;
	useEffect(() => {
		AOS.init();
	}, []);
	let productDescId = ''
	let productIds = ''

	const [loader, setLoader] = useState(false);
	const router = useRouter();
	function moveToCart(dataAll) {
		setLoader(true);
		productDescId = dataAll.product_desc_id;
		productIds = dataAll.product_id;
		const cartData = {
			"token": token,
			"customer_id": userData.customer_id,
			"product_id": productIds,
			"product_desc_id": productDescId,
			"quantity": 1
		}
		fetch(apiBase + 'addToCart', {
			method: "post",
			body: JSON.stringify(cartData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((cart_data) => {
				if (cart_data.status == "success") {
					getCartList();
					addToWishListFun();
					setwishListData([])
					setTimeout(() => {
						getWishListFun()
					}, 1000)
				} else {
					alert(cart_data.message)
				}
			})
			.catch((error) => {
				alert(error.message)
			})
			.finally(() => {
				setLoader(false);
			})
	}

	function addToWishListFun() {
		if (userData.isLogin) {
			setLoader(true)
			const cartData = {
				"token": token,
				"customer_id": userData.customer_id,
				"product_id": productIds,
				"product_desc_id": productDescId,
			}
			console.log(cartData, "sample")
			fetch(apiBase + 'addToWishList', {
				method: "post",
				body: JSON.stringify(cartData),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
				.then(response => response.json())
				.then((wishListData) => {
					if (wishListData.status == "success") {
						getWishListFun()
					} else {
						alert(wishListData.message)
					}
				})
				.catch((error) => {
					alert(error.message)
				})
				.finally(() => {
					setLoader(false);
				})
		} else {
			router.push('/Login')
		}

	}

	return (
		<>
			<Layout>
				<Head>
					<title>Wish|List</title>
				</Head>
				<div className='orderDetailsBgs'>
					<div className='forDesig'></div>
					<Container >
						<div className='whiteBgs'>
							<div className="one animate__animated animate__backInDown">
								<h1 className="textWhite mediTxts">Wish-list</h1>
							</div>
							<Row className='d-flex justify-content-center'>
								{wishListData.map((item, wishLis) => {
									return (
										<Col className='col-md-3 col-sm-6 col-12'>
											<div className="product-grid" key={wishLis}>
												<div className="product-image">
													<a href="#" className="image">
														<img className="img_1" src={`${productPath}` + item.get_product_desc[0].product_cover_image} alt="books" />
													</a>
													<a href="#" className="product-like-icon">10% off</a>
												</div>
												<div className="product-content">
													<h6 className="title">
														<a href="#">
															{item.get_product_name.product_name}
														</a>
													</h6>
													<div className="price"><CurrencyRupeeIcon />
														{item.get_product_desc[0]?.product_sale_price}
														<span className='priceDis'><CurrencyRupeeIcon />{item.get_product_desc[0]?.product_mrp_price}</span>
													</div>
													<div className='btn_move'>
														<button className='mtCart btn btn-outline-success shadow-sm ml-5 btn-sm'>
															<Link href={`./product/${item.get_product_name.product_slug}`}>
																View Details
															</Link>
														</button>
														<button onClick={() => { moveToCart(item) }} className='mtCart btn btn-outline-success shadow-sm ml-5 btn-sm'>
															Move to Cart
														</button>
													</div>
												</div>
											</div>
										</Col>
									)
								})}
								{wishListData.length == 0 &&
									<>
										<div className='text_box'>
											<div className='notFound'>
												<img src='/indexImg/not.png' alt='' />
												<h5>Your wish list is emply...</h5>
											</div>
										</div>
									</>
								}

							</Row>
						</div>
					</Container>
					{loader && <Loader />}
				</div >
			</Layout >
		</>
	)
}
