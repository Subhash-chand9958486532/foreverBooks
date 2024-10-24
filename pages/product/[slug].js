import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../Layout';
import fetch from 'node-fetch';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Container, Row, Col } from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Context } from '../componets/store';
import Loader from '../Loader';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Link from 'next/link';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import parse from 'html-react-parser';

export default function Product({ product }) {
	const router = useRouter();
	const { userData, getCartList, cartList, increMent, productPath, apiBase, dicreMent, cartListOff, wishListData, wishListModel, hideWishListModel, removeItem, getWishListFun, totalAmount, discountedAmt, grandTotal } = useContext(Context);
	const [bookType, setBookType] = useState([]);
	const [loader, setLoader] = useState(false);
	const token = 'books002';
	const product_slug = router.query;
	const [productSlug, setProductSlug] = useState(product_slug);
	const [singlePro, setSinglePro] = useState({});
	const [getP, setProductIds] = useState([]);
	const [selectedPro, setSelectedPro] = useState({ data: null, index: 0 });
	const [quantity, setQuantity] = useState(1);
	const [addCartBtn, setAddCartBtn] = useState(true);
	const [goToCartBtn, setGoToCartBtn] = useState(false);
	const [machineIdSta, setMachineId] = useState();
	const [wishListMOdel, setWishListModel] = useState(false)

	useEffect(() => {

		AOS.init();
		if (product_slug != undefined && seldPro.coverImgs != undefined) {
			showProductList();
		}
		if (router.isReady) {
			// Perform any necessary operations
		}
	}, [router.isReady]);

	const productDesc = product?.productDesc?.[0];

	const [seldPro, setSelectPro] = useState({
		imgpath: '',
		coverImgs: '',
		backCover: '',
		proDuctSmall: '',
		productSalePri: '',
		productMrp: '',

	})
	// const imgBig = productDesc.product_image_path + productDesc.product_cover_image;

	// useEffect(() => {
	// 	if (imgBig !== undefined) {
	// 		setImgs(imgBig);
	// 	}
	// }, [imgBig]);

	function setImgs(img) {
		setBigImgs(img);
	}

	function showProductList() {
		setLoader(true);
		const postData = {
			product_slug: product_slug,
			token: token
		};
		fetch(apiBase + 'getSingleProductDetail', {
			method: 'post',
			body: JSON.stringify(postData),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((singleProdu) => {
				if (singleProdu.status === 'success') {
					setSelectPro((prev) => {
						return {
							...prev,
							imgpath: singleProdu.data?.product_image_path,
							coverImgs: singleProdu.data?.getProductDesc?.[0]?.product_cover_image,
							backCover: singleProdu.data?.getProductDesc?.[0]?.product_image_back_cover,
							proDuctSmall: singleProdu.data?.getProductDesc?.[0]?.product_cover_image,
							productSalePri: singleProdu.data?.getProductDesc?.[0]?.product_sale_price,
							productMrp: singleProdu.data?.getProductDesc?.[0]?.product_mrp_price
						}
					})
					// console.log(singleProdu.data?.getProductDesc, "-----")
					setSinglePro(singleProdu.data);
					setProductIds(singleProdu.data.product_id);
					setBookType(singleProdu.data.getProductDesc);
					// setShowOfferEtc(singleProdu.data.getProductDesc);
					setSelectedPro((prev) => ({
						...prev,
						data: singleProdu.data.getProductDesc,
						index: 0
					}));
				} else {
					alert(singleProdu.message);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoader(false);
			});
	}

	const smallImg = `${selectedPro?.data?.[selectedPro?.index]?.product_image_back_cover}`;
	const coverImg = `${selectedPro?.data?.[selectedPro?.index]?.product_cover_image}`;

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const hideCartpop = () => setShow(false);

	const [bigImgsStor, setBigImgs] = useState(null);

	function updateImgs() {
		setSelectPro((prev) => {
			return {
				...prev,
				coverImgs: smallImg
			}
		})
		setBigImgs(smallImg);
	}

	function updateImgs2() {
		setBigImgs(coverImg);
		setSelectPro((prev) => {
			return {
				...prev,
				coverImgs: coverImg
			}
		})
	}

	function addToCart(singlePro, selectedPro) {
		if (userData.isLogin) {
			setLoader(true);
			const productDescId = selectedPro?.data?.[selectedPro?.index].product_desc_id;
			const productIds = singlePro.product_id;
			const cartData = {
				token: token,
				customer_id: userData.customer_id,
				session_id: machineIdSta,
				product_id: productIds,
				product_desc_id: productDescId,
				quantity: quantity
			};
			fetch(apiBase + 'addToCart', {
				method: 'post',
				body: JSON.stringify(cartData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((cart_data) => {
					if (cart_data.status === 'success') {
						getCartList();
						setLoader(false);
						setShow(true);
						setAddCartBtn(false);
						setGoToCartBtn(true);
					} else {
						alert(cart_data.message);
					}
				})
				.catch((error) => {
					alert(error.message);
				})
				.finally(() => {
					setLoader(false);
				});
		} else {
			router.push('/Login');
		}
	}

	function buyNow() {
		if (userData.isLogin) {
			localStorage.setItem('seltProduct', JSON.stringify(selectedPro));
			localStorage.setItem('singlePro', JSON.stringify(singlePro));
			setLoader(true);
			const productDescId = selectedPro?.data?.[selectedPro?.index].product_desc_id;
			const productIds = singlePro.product_id;
			const cartData = {
				token: token,
				customer_id: userData.customer_id,
				session_id: machineIdSta,
				product_id: productIds,
				product_desc_id: productDescId,
				quantity: 1,
				buy_now: 2
			};
			fetch(apiBase + 'addToCart', {
				method: 'post',
				body: JSON.stringify(cartData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((cart_data) => {
					if (cart_data.status === 'success') {
						getCartList();
						setLoader(false);
						router.push('/Buy-now');
						localStorage.setItem('cartID', JSON.stringify(cart_data.cartID));
					} else {
						alert(cart_data.message);
					}
				})
				.catch((error) => {
					alert(error.message);
				})
				.finally(() => {
					setLoader(false);
				});
		} else {
			router.push('/Login');
		}
	}

	function addToWishListFun() {
		if (userData.isLogin) {
			setLoader(true);
			setWishListModel(true);
			const productDescId = selectedPro?.data?.[selectedPro?.index].product_desc_id;
			const productIds = singlePro.product_id;
			const cartData = {
				token: token,
				customer_id: userData.customer_id,
				session_id: machineIdSta,
				product_id: productIds,
				product_desc_id: productDescId
			};
			fetch(apiBase + 'addToWishList', {
				method: 'post',
				body: JSON.stringify(cartData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((wishListData) => {
					if (wishListData.status === 'success') {
						getWishListFun();
					} else {
						alert(wishListData.message);
					}
				})
				.catch((error) => {
					alert(error.message);
				})
				.finally(() => {
					setLoader(false);
				});
		} else {
			router.push('/Login');
		}
	}

	function updateBook(key) {
		// setShowOfferEtc((prev) => ({
		// 	...prev,
		// 	index: key
		// }));
		setSelectedPro((prev) => ({
			...prev,
			index: key
		}));
	}
	return (
		<Layout>
			<Head>
				<title>{product?.product_name}</title>
			</Head>

			{seldPro.coverImgs != undefined ?
				<>
					<div className='mainWrapper'>
						<Container>
							<Row>
								<Col className='col-mmd-8 col-sm-8 col-8'>
									<div className='pdetails'>Product detail</div>
								</Col>
								<Col className='col-mmd-4 col-sm-4 col-4'>
									<div className='buttonSect'>
										{bookType.map((item, key) => {
											return (
												<div className='' key={key}>
													<div onClick={() => { updateBook(key, item) }} type="button" className='butonType'>{item.getBookTypeName.book_type_name}</div>
												</div>
											)
										})}
									</div>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col className='col-md-4 col-sm-12 col-12' >
									<div className='images_main'>
										<InnerImageZoom src={seldPro.imgpath + seldPro.coverImgs} zoomSrc={seldPro.imgpath + seldPro.coverImgs} zoomScale="1" />
									</div>
									<div className='thump'>
										<div onClick={updateImgs}><img src={seldPro.imgpath + seldPro.backCover} /></div>
										<div onClick={updateImgs2} style={{ marginLeft: "10px" }}><img src={seldPro.imgpath + seldPro.proDuctSmall} /></div>
									</div>
								</Col>
								<Col>
									<div className='productName'>
										{singlePro.product_name}
									</div>
									<div className='TextSame mt-3 priceDet'>
										<span > Price : <CurrencyRupeeIcon />{seldPro?.productSalePri}</span>
										<CurrencyRupeeIcon />
										{seldPro?.productSalePri == seldPro?.productMrp ?
											<span className='cutPrice_' style={{ color: "#cc5e05" }}>{seldPro?.productMrp}</span>
											:
											<span className='cutPrice'>{seldPro?.productMrp}</span>
										}
									</div>
									<div className='rowDiscount'>
										<div className='headingDis'>Discount & Offer</div>

										<div className='rowFlex'>
											<div className='nameIcons'> <LocalOfferIcon />  Special Discount</div>
											<div>{selectedPro?.data?.[selectedPro?.index]?.specialDiscount[0]?.discountName}</div>
										</div>

										<div className='rowFlex'>
											<div className='nameIcons'> <LocalOfferIcon />  Offer</div>
											<div>{selectedPro?.data?.[selectedPro?.index]?.offer[0]?.offer_code}</div>
										</div>
										<div className='rowFlex'>
											<div className='nameIcons'> <LocalOfferIcon />  Discount</div>
											<div>{selectedPro?.data?.[selectedPro?.index]?.discount[0]?.discountName}</div>
										</div>
									</div>


									<div className='grdRow'>
										<div><strong>Delivery</strong></div>
										<div>Delhi/NCR - Approx 3 - 4 working days Rest of India - Approx 5 - 8 working days</div>
									</div>
									{/* <div className='grdRow'>
									<div><strong>Publisher</strong></div>
									<div>{singlePro.author_name}</div>
								</div> */}
									<div className='grdRow'>
										<div><strong>Description</strong></div>
										<div className='descrip'><strong>Binding</strong> : {selectedPro?.data?.[selectedPro?.index]?.book_binding_type}
											<div><strong>Author</strong> : {singlePro.author_name}</div>
											<div><strong>ISBN</strong> : {singlePro.isbn_number} </div>
											<div><strong>Weight</strong> : {selectedPro?.data?.[selectedPro?.index]?.total_weight}</div>
										</div>
									</div>

									<hr />
									<div className='someBtns'>
										{addCartBtn &&
											<button className='btn btn-danger' onClick={() => { addToCart(singlePro, selectedPro) }}>ADD TO CART</button>
										}
										{goToCartBtn &&
											<button className='btn btn-danger goToCart'><Link href='/cart'><AddShoppingCartIcon /> Go TO CART</Link></button>
										}
										<button className='btn btn-secondary' onClick={() => { buyNow(singlePro, selectedPro) }}>BUY NOW</button>
										{/* <Link href={`../profile/${singlePro.product_slug}`}>
									<button className='btn btn-secondary'>BUY NOW</button>
									</Link> */}
										<button onClick={() => { addToWishListFun(singlePro) }} className='btn btn-danger'><FavoriteBorderIcon /></button>
									</div>
								</Col>

							</Row>
						</Container>
					</div>
					<div className='viewAndComments'>
						<Container>
							<Row>
								<Col className='col-md-6 col-12 col-sm-12'>
									<div className='boxForDes'>
										<div className='des'>Description</div>

										<hr />
										<div className='someProductDes'></div>
										<div dangerouslySetInnerHTML={{ __html: singlePro.product_desc }} />

									</div>
								</Col>
								<Col className='col-md-6 col-12 col-sm-12'>
									<div className='boxForDes'>
										<span className="heading">User Rating</span>
										<span className="fa fa-star checked"></span>
										<span className="fa fa-star checked"></span>
										<span className="fa fa-star checked"></span>
										<span className="fa fa-star checked"></span>
										<span className="fa fa-star"></span>
										<p>4.1 average based on 254 reviews.</p>
										<div className='des'>Customer Review</div>
										<hr />
										<div className='rowGrid'>
											<div className='userIcon'>
												<AccountCircleIcon />
											</div>
											<div className=''>
												<div className='userName'>Subhash Chand Thakur</div>
												<div className='startRating'>
													<StarIcon />
													<StarIcon />
													<StarIcon />
													<StarIcon />
													<StarIcon />
												</div>
												<div className='comment'>
													Since 1995, Forever Books has been at the forefront of educational publishing. We publish books for all leading boards CBSE, ICSE, ISC, State Board, International Board, etc. With the commitment to revamp the quality of education via Teaching and Learning Material (TLM)* for students and facilitators, we have secured a place in the vanguard of publishing nationally and internationally. Forever Books has been India’s most reputed brand for over 25 glorious years. We are trusted by 500k+ teachers covering 28k+ schools.
												</div>
												<hr />
												<div className='timeAgo'>1 Months ago</div>
											</div>
										</div>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
				</>
				: <Loader/>}

			<Offcanvas show={show} onHide={handleShow} placement={'end'} restoreFocus={'false'}>

				<div className='headerSection'>
					<div>My Cart</div>
					<div><button className='btn btn-outline-light btn-sm' onClick={hideCartpop}><CloseIcon /></button></div>
				</div>

				<Offcanvas.Body>
					{userData.isLogin ?
						<>
							{cartList.map((item, pids) => {
								let proAmt = item.getProductDesc?.[0]?.product_sale_price
								return (
									<div className='rowS' key={pids}>
										<div className='titlePa'><img src={`${productPath}` + item.getProductDesc[0].product_cover_image} /></div>
										<div>
											<div className='pname'>{item.getProductName.product_name}</div>
											<div className='rowFlx'>
												<div className='price_ics'><CurrencyRupeeIcon />{proAmt * item.quantity}</div>
												<div className='quenty_box'>
													<button onClick={(() => { dicreMent(item) })}
														className='btn btn-outline-primary btn-sm'><RemoveIcon /></button>
													<button className='btn btn-outline-primary btn-sm'>{item.quantity}</button>
													<button onClick={(() => { increMent(item) })}
														className='btn btn-outline-primary btn-sm'><AddIcon />
													</button>
												</div>
												<div>
													<button onClick={(() => { removeItem(item.cart_id) })} className='btn btn-outline-danger btn-sm'><DeleteIcon /></button>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</>

						:
						<>

							{cartListOff.map((item, proL) => {
								let proAmt = item.getProductDesc?.[0]?.product_sale_price
								return (
									<div className='rowS' key={proL}>
										<div className='titlePa'><img src={`${productPath}` + item.getProductDesc[0].product_cover_image} /></div>
										<div>
											<div className='pname'>{item.getProductName.product_name}</div>
											<div className='rowFlx'>
												<div className='price_ics'><CurrencyRupeeIcon />{proAmt * item.quantity}</div>
												<div className='quenty_box'>
													<button onClick={(() => { dicreMent(item) })}
														className='btn btn-outline-primary btn-sm'><RemoveIcon /></button>
													<button className='btn btn-outline-primary btn-sm'>{item.quantity}</button>
													<button onClick={(() => { increMent(item) })}
														className='btn btn-outline-primary btn-sm'><AddIcon />
													</button>
												</div>
												<div>
													<button onClick={(() => { removeItem(item.cart_id) })} className='btn btn-outline-danger btn-sm'><DeleteIcon /></button>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</>
					}
					<div className='bottomFixed'>
						<div className='getTo'><span className='bold_Text'> Total :</span> <CurrencyRupeeIcon />{grandTotal}</div>
						<div className='viewCart'>
							<Link href='/cart'>View Cart</Link>
						</div>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
			{/* wish list */}
			<Offcanvas show={wishListMOdel} onHide={hideWishListModel} placement='end'>
				<Offcanvas.Header closeButton className='wishListHeader py-2'>
					<Offcanvas.Title>Wish List</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{wishListData.map((item, pids) => {
						return (
							<div className='rowS' key={pids}>
								<div className='titlePa'><img src={`${productPath}` + item.get_product_desc[0].product_cover_image} /></div>
								<div>
									<div className='pname'>{item.get_product_name.product_name}</div>
									<div className='rowFlx'>
										<div className='price_ics'><CurrencyRupeeIcon />{item.get_product_desc[0]?.product_sale_price}
											<span className='strickThrow'><CurrencyRupeeIcon />{item.get_product_desc[0]?.product_mrp_price}</span></div>
									</div>
								</div>
							</div>
						)
					})}
					<div className='bottomFixed'>
						<div className='viewCart'>
							<Link href='/Wish-list'>View Wishlist</Link>
						</div>
					</div>
					{wishListData.length == 0 &&
						<p>Your wishlist is empty...</p>
					}
				</Offcanvas.Body>
			</Offcanvas>




		</Layout >
	);
}



