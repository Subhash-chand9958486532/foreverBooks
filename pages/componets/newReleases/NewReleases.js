import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loader from '../../FixedLoader';
import $ from 'jquery';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function Banner() {
	const token = 'books002';
	const [books, setBooks] = useState([]);
	const [select, setSelected] = useState([]);
	const [loader, setLoader] = useState(false);
	const productPath = "https://books.foreverbooks.co.in/laravel_api/assets/productImg/"

	useEffect(() => {
		newRelease();

	}, [])

	function newRelease() {
		setLoader(true);
		const apiUrl = 'https://books.foreverbooks.co.in/laravel_api/api/newReleaseBooks';
		const postData = {
			"token": token
		}
		fetch(apiUrl, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((newBook) => {
				if (newBook.status == "success") {
					setBooks(newBook.newReleaseBooks);
					setSelected(newBook.newReleaseBooks.getProductDesc)
				} else {
					alert(newBook.message)
				}
			})
			.finally(() => {
				setLoader(false);
			})

	}
	return (
		<>
			<div className="newRelease">
				<Container>
					<div className="one">
						<h1>New Release</h1>
					</div>
					<p className="normalText">Forever is committed to giving the reader the best Education</p>
				</Container>
				<Container>
					<div className="row">
						<div className="col-md-12">
							<Row>
								{books.map((item, nBook) => {
									let discountF = item.getProductDesc[0].discount;
									return (
										<Col className="col-md-3 col-sm-4 col-12 animate__animated animate__fadeInUp" key={nBook}>
											{/* <Link href='./product/New-release'> */}
											<Link href={`./product/${item.product_slug}`}>

												{/* <div className="pricingTable">
													<div className="pricingTable-header">
														<div className="imageHolder">
															<img className="img_1" src={`${productPath}` + item.getProductDesc[0].product_cover_image} alt="books" />
														</div>
														<h3 className="title">{item.product_name}</h3>
													</div>
													<div className="pricingTable-signup">
														<div>Order Now</div>
													</div>
												</div> */}
												<div className="product-grid">
													<div className="product-image">
														<a href="#" className="image">
															<img className="img_1" src={`${productPath}` + item.getProductDesc[0].product_cover_image} alt="books" />
														</a>
														{/* <a href="#" className="product-like-icon">10% off</a> */}
													</div>
													<div className="product-content">

														<h6 className="title">
															<a href="#">
																{item.product_name}
															</a>
														</h6>
														<div className="price">
															<CurrencyRupeeIcon />{item.getProductDesc[0].product_sale_price}
															{discountF[0] != undefined ?
																<span>
																	<span className='priceDis'><CurrencyRupeeIcon />{item.getProductDesc[0].product_mrp_price}</span>
																</span>
																:
																<span className='priceDis1' style={{ color: "#878787" }}><CurrencyRupeeIcon />{item.getProductDesc[0].product_mrp_price}</span>
															}
														</div>

													</div>
												</div>
											</Link>
										</Col>

									)
								})}
							</Row>
						</div>
					</div>
				</Container>
			</div>
			{loader &&
				<Loader />

			}

		</>
	)
}
