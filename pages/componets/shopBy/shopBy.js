import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import { useState } from "react";

export default function ShopByCategory(item) {

	const categoryData = [
		{
			id: "1",
			cateName: "CBSE Board",
			buttonName: "Click Here",
			imagePath: "/indexImg/cbse.png",
			linkUrl: "/product/cbse",
			animteFrom: "fade-left",
			gridLayout: "col-md-6 col-sm-6 col-12"
		},
		// {
		//   id: "2",
		//   cateName: "ICSE/ISC Board",
		//   buttonName: "Click Here",
		//   imagePath: "/indexImg/icse.png",
		//   linkUrl: "/product/icse",
		//   animteFrom: "fade-right",
		//   gridLayout: "col-md-6 col-sm-6 col-12",

		// },
	]

	const [catIds, setids] = useState()
	function passIds(ids) {
		const catids = ids;
	}
	return (

		<>
			<div className="backMore">
				<div className="one ">
					<h1 className="textWhite">Shop by Category
					</h1>
				</div>
				<p className="normalText textWhite">Forever is committed to giving the reader the best Education</p>

				<Container>
					<Row className="d-flex justy-d-flex justify-content-center">
						{categoryData.map((item, catKeys) => {
							return (
								<Col className={item.gridLayout} data-aos={item.animteFrom} key={catKeys}>
									<Link href={item.linkUrl}>
										<div className="mainBack">
											<div className="scricle">
												<img src={item.imagePath} alt="Forever Books" />
											</div>
											<h3>{item.cateName}</h3>
											<button className="onclickBTn">{item.buttonName}</button>
										</div>
									</Link>
								</Col>
							)
						})}
					</Row>
				</Container>

			</div>
		</>
	)
}
