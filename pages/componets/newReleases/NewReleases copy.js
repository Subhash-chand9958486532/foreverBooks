import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Banner() {
	const token = 'books002';
	const [books, setBooks] = useState([]);
	const [select, setSelected] = useState([]);

	const productPath = "https://books.foreverbooks.co.in/laravel_api/assets/productImg/"

	useEffect(() => {
		newRelease();
		testiMo();
	}, [])

	function newRelease() {
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

	}
	function testiMo(){
		window.$("#testimonial-slider").owlCarousel({
			items: 2,
			itemsDesktop: [1000, 2],
			itemsDesktopSmall: [979, 2],
			itemsTablet: [768, 1],
			pagination: false,
			navigation: true,
			navigationText: ["", ""],
			autoPlay: true
		});
	}

	return (
		<>
			<div className="newRelease">
				<Container>
					<div className="one">
						<h1>New Release</h1>
					</div>
					<p className="normalText">Forever is committed to giving the reader the best. Education</p>
				</Container>
				<Container>
					<div className="row animate__animated animate__fadeInDown">
						<div className="col-md-12">
							<div id="newRe" className="owl-carousel">
								{books.map((item, nBook) => {
									return (
										<div className="testimonial" key={nBook}>
											<Link href='../New-releases'>
												<div className="pricingTable">
													<div className="pricingTable-header">
														<img className="img_1" src={`${productPath}` + item.getProductDesc[0].product_cover_image} alt="books" />
														<h3 className="title">{item.product_name}</h3>
													</div>
													<div className="pricingTable-signup">
														<div>Order Now</div>
													</div>
												</div>
											</Link>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</Container>
				
			</div>

		</>
	)
}
