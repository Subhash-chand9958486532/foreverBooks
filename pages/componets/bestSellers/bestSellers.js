import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loader from '../../FixedLoader';
import Link from "next/link";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function BestSellers() {

	useEffect(() => {
		bestSellBooks();
	}, [])
	const token = 'books002';
	const [bstBooks, setBestBooks] = useState([]);
	const productPath = "https://books.foreverbooks.co.in/laravel_api/assets/productImg/";
	const [FixedLoader, setFixedLoader] = useState(false);
	function bestSellBooks() {
		setFixedLoader(true);
		const apiUrl = 'https://books.foreverbooks.co.in/laravel_api/api/bestSellerBooks';
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
			.then(res => res.json())
			.then((bestBook) => {
				if (bestBook.status == "success") {
					setBestBooks(bestBook.bestSeller);
				} else {
					alert(bestBook.message);
				}
			})
			.finally(() => {
				setFixedLoader(false);
			})
	}



	return (
		<>
			<div className="bestSell">
				<div className="leftSideImages " data-aos="fade-right">
					<img className="vert_move" src="/best/best.png" alt="" />
				</div>
				<div className="RightSideImages" data-aos="fade-right">
					<img className="vert_move" src="/best/best2.png" alt="" />
				</div>
				<div className="one ">
					<h1 className="textWhite">Best Sellers
					</h1>
				</div>
				<p className="normalText textWhite">Forever is committed to giving the reader the best. Education</p>

				<Container>
					<Row className="d-flex justify-content-center">
						{bstBooks.map((item, bestBooks) => {
							let discountF = item.getProductDesc[0].discount;
							console.log(discountF[0], "******")
							return (
								<Col className="col-md-3 col-sm-6 col-12" data-aos="zoom-in" key={bestBooks}>
									<Link href={`./product/${item.product_slug}`}>
										<div className="product-grid">
											<div className="product-image">
												<a href="#" className="image">
													<img className="img_1" src={`${productPath}` + item?.getProductDesc[0]?.product_cover_image} alt="books" />
												</a>
												{/* <a href="#" className="product-like-icon">10% off</a> */}
											</div>
											<div className="product-content">

												<h6 className="title">
													<a href="#">
														{item.product_name}
													</a>
												</h6>
												<div className="price"><CurrencyRupeeIcon />
													{item?.getProductDesc[0]?.product_sale_price}
													{discountF[0]!=undefined ?
														<span className='priceDis'><CurrencyRupeeIcon />{item?.getProductDesc[0]?.product_mrp_price}</span>
													:
													<span className='priceDis1' style={{color: "#878787"}}><CurrencyRupeeIcon />{item?.getProductDesc[0]?.product_mrp_price}</span>

												}
												</div>

											</div>
										</div>
									</Link>
								</Col>
							)
						})}
					</Row>


					{FixedLoader &&
						<Loader />
					}
				</Container>

			</div>
		</>
	)
}
