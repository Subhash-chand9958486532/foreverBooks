import { Container, Row, Col } from "react-bootstrap";
import PhoneIcon from '@mui/icons-material/Phone';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';
import { useState, useRef } from "react";
import Loader from './FixedLoader';
import { Context } from './componets/store';
import { useContext } from 'react';
import Swal from 'sweetalert2';

export default function Footer() {
	let { apiBase, token, } = useContext(Context);
	const [userData, setuserData] = useState({
		userEmail: ""
	});
	const { userEmail } = userData;
	const [loader, setLoader] = useState(false);
	const onChangEmail = (e) => {
		setuserData({ ...userData, [e.target.name]: e.target.value });
	}
	function subscription(e) {
		e.preventDefault()
		setLoader(true)
		const postData = {
			"emailID": userData.userEmail,
			"token": token
		}
		fetch(apiBase + 'subscriptionEmail', {
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((userData) => {
				if (userData.status == "success") {
					Swal.fire({
						title: "Success",
						text: userData.message,
						icon: "success"
					});
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: userData.message,
					});
				}
			})
			.catch((catch_err) => {
				alert(catch_err.message)
			})
			.finally(() => {
				setLoader(false)
			})

	}
	return (
		<>
			<div className='footer' >

				<Container>
					<div className="onFooterDiv">
						<Row>
							<Col className="col-md-6 col-12 col-sm-12">
								<div className="weAre">We are always here to help you. Get in touch with us.</div>
							</Col>
							<Col className="col-md-6 col-12 col-sm-12">
								<form onSubmit={subscription} className="foterForm">
									<div className="rowInputs">
										<input value={userEmail} name="userEmail" type="email" className="form-control" placeholder="Enter your email" required onChange={onChangEmail} />
										<button type="submit" className="btn btn-danger">Submit</button>
										{loader &&
										<div className="fixedLoader">
											<div class="loaderFooter">
												<div></div>
												<div></div>
												<div></div>
												<div></div>
												<div></div>
												<div></div>
												<div></div>
												<div></div>
												<div></div>
											</div>

										</div>
									}
									</div>
									
								</form>

							</Col>
						</Row>
					</div>
					<Row>
						<Col className="col-md-4 col-sm-4 col-12" >
							<div className="boldHeading">LOGIN</div>
							<ul className="onlineLinks">
								<li><Link href="/">Stockist Login</Link></li>
								<li><Link href="/">Executive Login</Link></li>
								<li><Link href="/Order-form">Order Form</Link></li>
								<li><Link href="/Feedback">Feedback</Link></li>
								<li><Link href="/Request">Request</Link></li>
								<li><Link href="https://books.foreverbooks.co.in/laravel_api/login" target="_blank">Admin Login</Link></li>
							</ul>
						</Col>
						<Col className="col-md-4 col-sm-4 col-12" >
							<div className="boldHeading">TERMS OF USE</div>
							<ul className="onlineLinks">
								<li><Link href="/Privacy-Policy">Privacy Policy</Link></li>
								<li><Link href="/Cancel-policy">Cancellation & Refund Policy</Link></li>
								<li><Link href="/Terms-and-conditions">Terms & Conditions</Link></li>
								<li><Link href="/Disclaimer">Disclaimer</Link></li>
								{/* <li><Link href="/Faqs">FAQs</Link></li> */}
							</ul>

						</Col>
						<Col className="col-md-4 col-sm-4 col-12" >
							<div className="boldHeading">Address</div>
							<ul className="Address_ul">
								<li><PhoneIcon className="iconSDiv" /> 011 - 43585858,  23285568 </li>
								<li><AddLocationIcon className="iconSDiv" /> 4583/15, Opp. LIC Building, <br />   Daryaganj, P.O. Box 7226, New Delhi-110002</li>
								<li><EmailIcon className="iconSDiv" /> info@swaadhyayan.com</li>
							</ul>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<div className="payMethod">
								<div className="paymentText">Try Our App</div>
								<Link href="https://play.google.com/store/apps/" target="_blank"><img className="appLink" src="/indexImg/appImgs.png" /></Link>
							</div>
						</Col>
						<Col>
							<div className="payMethod rightside">
								<div className="paymentText">Payment Methods</div>
								<img src="/indexImg/payment.png" />
							</div>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<div className="copyRight">Copyright © 2023 books.foreverbooks.co.in All Right Reserved.</div>
						</Col>
						{/* <Col>
							<div className="section_social">
								<button className="btn btn-outline-primary btn-sm"><FacebookIcon className="socialIcons" /></button>
								<button className="btn btn-outline-primary btn-sm"><InstagramIcon className="socialIcons" /></button>
								<button className="btn btn-outline-primary btn-sm"><TwitterIcon className="socialIcons" /></button>
								<button className="btn btn-outline-primary btn-sm"><LinkedInIcon className="socialIcons" /></button>
								<button className="btn btn-outline-primary btn-sm"><YouTubeIcon className="socialIcons" /></button>
							</div>
						</Col> */}
					</Row>
				</Container>




			</div>

		</>
	)
}
