import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState } from "react";
// import 'aos/dist/aos.css';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MessageIcon from '@mui/icons-material/Message';
import Layout from './Layout';
import Accordion from 'react-bootstrap/Accordion';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Loader from './Loader';
import { Context } from './componets/store';
import { useContext } from 'react';
import Swal from 'sweetalert2';
export default function About() {
	useEffect(() => {
		AOS.init();
	}, [])

	let { apiBase, token, } = useContext(Context);
	const [loader, setLoader] = useState(false);
	const [feedBackData, setfeedBackData] = useState({
		user_name: "",
		user_contact: "",
		user_email: "",
		user_subject: "",
		user_message: ""
	})
	const { user_name, user_contact, user_email, user_subject, user_message } = feedBackData;
	const feedBack = e => {
		setfeedBackData({ ...feedBackData, [e.target.name]: e.target.value })
	}
	function submitFeedback(e) {
		e.preventDefault();
		setLoader(true)
		const postData = {
			"fullName": feedBackData.user_name,
			"contactNo": feedBackData.user_contact,
			"emailID": feedBackData.user_email,
			"subject": feedBackData.user_subject,
			"feedback": feedBackData.user_message,
			"token": token
		}
		fetch(apiBase + 'saveFeedback', {
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
			<Layout>
				<Head>
					<title>Contact|Us</title>
				</Head>

				<div className='about_divs'>
					<div className='contactBgs'><img src='/contact/bgs.jpg' /></div>
					{/* <div className='centerImages '><img src='/contact/call.svg' /></div>
         */}
					<img className='iconsSocial vert_move' src='/contact/cont_icons.png' />

				</div>
				<Container>
					<div className='address'>
						<div className="one">
							<h1 className="textWhite">Contact US</h1>
							<p className='normalText'>If you have any questions about our products or services, please call one of our numbers or send us an email. <br /> We welcome your suggestions and feedback.</p>
						</div>
						<Row>
							<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-left">
								<div className="serviceBox">
									<p className="service-icon"><AddLocationAltIcon /></p>
									<div className="service-content">
										<h5 className="title">ADDRESS</h5>
										<p className="description">4583/15, Opp. LIC Building, <br />  Daryaganj, P.O. Box 7226, New Delhi-110002 </p>
										<a href="#" className="read-more"><BakeryDiningIcon /></a>
									</div>
								</div>
							</Col>

							<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-up">
								<div className="serviceBox">
									<p className="service-icon"><LocalPhoneIcon /></p>
									<div className="service-content">
										<h5 className="title">PHONE NUMBER </h5>
										<p className="description">011 - 43585858,  23285568  <br /> 011 - 23243519</p>
										<a href="#" className="read-more"><BakeryDiningIcon /></a>
									</div>
								</div>
							</Col>
							<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-right">
								<div className="serviceBox">
									<p className="service-icon"><EmailIcon /></p>
									<div className="service-content">
										<h5 className="title"> EMAIL ADDRESS  </h5>
										<p className="description">info@foreverbooks.co.in <br /> info@swaadhyayan.com</p>
										<a href="#" className="read-more"><BakeryDiningIcon /></a>
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</Container>

				<div className='fromBgs'>
					<Container>
						<div className='address'>
							<div className="one">
								<h1 className="textWhite">SEND US A MESSAGE </h1>
								<p className='normalText'> We welcome your suggestions and feedback. </p>
							</div>
							<Row>

								{/* <Col className="col-md-6 col-sm-12 col-12" data-aos="zoom-in-right">
									<div className='address_div'>
										<div className='menDead'>
											Head Office <br />
											Forever Books Pvt. Ltd.
										</div>
										<p className='smallText_cont'>
											4583/15, Daryaganj, New Delhi,110002(INDIA) <br />
											+91-11-43585858, 23285568, 23243519
										</p>
										<hr />

										<div className='menDead'>
											For Export Queries :
										</div>
										<p className='smallText_cont'>
											export@foreverbooks.co.in
										</p>
										<hr />

										<div className='menDead'>
											For Online Order/Customer Queries :
										</div>
										<p className='smallText_cont'>
											ecommerce@foreverbooks.co.in
										</p>
										<hr />

										<div className='menDead'>
											For books to Book Related Queries / Errors :
										</div>
										<p className='smallText_cont'>
											editorial@foreverbooks.co.in
										</p>
										<hr />

										<div className='menDead'>
											For Specimen Queries :
										</div>
										<p className='smallText_cont'>
											specimen@foreverbooks.co.in
										</p>
										<hr />

										<div className='menDead'>
											Office Hours :
										</div>
										<p className='smallText_cont'>
											Monday - Saturday: 9:30 AM - 6:00 PM <br />
											Second Saturday is closed <br />
											We are available/ reachable in all other states.
										</p>
									</div>
								</Col> */}
								<Col className='imgSect col-md-6 col-sm-6 col-12 animate__animated animate__bounceInLeft'>
									<img className='feedback' src='/indexImg/feedback-animate.svg' />
								</Col>

								{/* <Col className="col-md-6 col-sm-12 col-12" data-aos="zoom-in-left">
									<form className="form-horizontal mt-1">
										<div className="form-group">
											<label for="exampleInputEmail1">First Name</label>
											<i className="fa fa-envelope-o"><AccountCircleIcon /></i>
											<input required="" name="login[username]" type="text" className="form-control" id="exampleInputEmail1" placeholder="First Name" />
										</div>
										<div className="form-group">
											<label for="exampleInputEmail1">Last Name</label>
											<i className="fa fa-envelope-o"><AccountCircleIcon /></i>
											<input required="" name="login[username]" type="text" className="form-control" id="exampleInputEmail1" placeholder="Last Name" />
										</div>
										<div className="form-group">
											<label for="exampleInputEmail1">Email</label>
											<i className="fa fa-envelope-o"><MailIcon /></i>
											<input required="" name="login[username]" type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
										</div>

										<div className="form-group">
											<label for="exampleInputEmail1">Mobile Number</label>
											<i className="fa fa-envelope-o"><ContactPhoneIcon /></i>
											<input required="" name="login[username]" type="number" className="form-control" id="exampleInputEmail1" placeholder="Mobile Number" />
										</div>

										<div className="form-group">
											<label for="exampleInputEmail1">Message</label>
											<i className="fa fa-envelope-o"><MessageIcon /></i>
											<textarea required="" name="login[username]" type="number" className="form-control" id="exampleInputEmail1" placeholder="Message"></textarea>
										</div>


										<div className="form-group">
											<button type="submit" className="btn btn-default"><SendIcon /> Submit !</button>
										</div>
									</form>
								</Col> */}
								<Col className='col-md-6 col-sm-6 col-12 animate__animated animate__bounceInRight'>
									<div className='formBack'>
										<form onSubmit={submitFeedback}>
											<div className='inputsFeed'>
												<TextField
													value={user_name}
													name="user_name"
													fullWidth label="Name"
													required
													variant="standard"
													size="small"
													autoComplete='off'
													onChange={e => feedBack(e)}
												/>
											</div>
											<div className='inputsFeed'>
												<TextField
													value={user_contact}
													name="user_contact"
													fullWidth
													label="Mobile"
													required
													type='number'
													variant="standard"
													size="small"
													autoComplete='off'
													onChange={e => feedBack(e)}
												/>
											</div>
											<div className='inputsFeed'>
												<TextField
													value={user_email}
													name="user_email"
													fullWidth
													label="Email"
													required
													type='email'
													variant="standard"
													size="small"
													autoComplete='off'
													onChange={e => feedBack(e)}
												/>
											</div>
											<div className='inputsFeed'>
												<TextField
													value={user_subject}
													name="user_subject"
													fullWidth
													label="Subject"
													required
													variant="standard"
													size="small"
													autoComplete='off'
													onChange={e => feedBack(e)}
												/>
											</div>
											<div className='inputsFeed'>
												<TextField
													value={user_message}
													name="user_message"
													fullWidth
													label="Message"
													required
													multiline
													variant="standard"
													size="Normal"
													autoComplete='off'
													onChange={e => feedBack(e)}
												/>
											</div>
											<Button type='submit' variant="contained">Send <SendIcon /> </Button>
										</form>
									</div>
								</Col>
							</Row>
						</div>
					</Container>
				</div>


				<div className='emailsBack'>
					<Container>
						<div className='address'>
							<div className="one">
								<h1 className="textWhite">For Query</h1>
								<p className='normalText'>If you have any questions about our products or services, please call one of our numbers or send us an email. <br /> We welcome your suggestions and feedback.</p>
							</div>
							<Row className='queryRow'>
								<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-left">
									<div className="serviceBox">
										<p className="service-icon queryRow_ic"><EmailIcon /></p>
										<div className="service-content backBgs">
											<h5 className="title">For Export Queries</h5>
											<p className="description">export@foreverbooks.co.in </p>
											<a href="#" className="read-more"><BakeryDiningIcon /></a>
										</div>
									</div>
								</Col>

								<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-up">
									<div className="serviceBox">
										<p className="service-icon queryRow_ic"><EmailIcon /></p>
										<div className="service-content backBgs">
											<h5 className="title">For Online Order/Customer Queries : </h5>
											<p className="description">ecommerce@foreverbooks.co.in</p>
											<a href="#" className="read-more"><BakeryDiningIcon /></a>
										</div>
									</div>
								</Col>
								<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-right">
									<div className="serviceBox">
										<p className="service-icon queryRow_ic"><EmailIcon /></p>
										<div className="service-content backBgs">
											<h5 className="title"> For books to Book Related Queries / Errors :  </h5>
											<p className="description">editorial@foreverbooks.co.in</p>
											<a href="#" className="read-more"><BakeryDiningIcon /></a>
										</div>
									</div>
								</Col>
								<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-right">
									<div className="serviceBox">
										<p className="service-icon queryRow_ic"><EmailIcon /></p>
										<div className="service-content backBgs">
											<h5 className="title"> For Specimen Queries :  </h5>
											<p className="description">specimen@foreverbooks.co.in</p>
											<a href="#" className="read-more"><BakeryDiningIcon /></a>
										</div>
									</div>
								</Col>
								<Col className="col-md-4 col-sm-12 col-12" data-aos="flip-right">
									<div className="serviceBox">
										<p className="service-icon queryRow_ic"><EmailIcon /></p>
										<div className="service-content backBgs">
											<h5 className="title"> Office Hours :  </h5>
											<p className="description">Monday - Saturday: 9:30 AM - 6:00 PM <br />
												Second Saturday is closed
												We are available/ reachable in all other states.</p>
											<a href="#" className="read-more"><BakeryDiningIcon /></a>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</Container>
				</div>

				<div className='googleMaps branch_off'>
					<div className="one">
						<h1 className="textWhite">Branch Offices</h1>
						<p className='normalText'>You can take books from multiple office </p>
					</div>
					<Container>
						<Accordion>
							<Row>
								<Col className='col-md-4 col-sm-6 col-12 animate__animated animate__fadeInDown'>
									<Accordion.Item eventKey="0" className='headingAccound'>
										<Accordion.Header className='headerLine'>Dehradun</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											I-15, Nehru Colony  <br />
											Dehradun-248001 (Uttarakhand)  <br />
											Mob: 7388933938  <br />
											Email:- dehradun.rspl@gmail.com  <br />
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="1" className='headingAccound'>
										<Accordion.Header>Ahemedabad</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											25, Avani Bungalow and Row house <br />
											Behind D mart, Motera <br />
											Ahmedabad (Gujarat) <br />
											Pin code - 380005 <br />
											Mob : 9924645576 <br />
											Email:- ahmedabad.rspl@gmail.com
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="2" className='headingAccound'>
										<Accordion.Header>Hyderabad</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt Ltd</b> <br />
											12-5-151/2, Vijayapuri Colony, <br />
											South Lalaguda, <br />
											Secunderabad- 500017 (Telangana) <br />
											Tel: 9100914234 Email:- hyderabad.rspl@gmail.com <br />
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="3" className='headingAccound'>
										<Accordion.Header>Jaipur</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											SHIVAM APPARTMENT <br />
											Flat No. G-1, <br />
											Plot No.B-1/ 564, <br />
											Akshar Dham Chauraha, <br />
											Chitrakoot, Vaishali Nagar, <br />
											Jaipur(Rajasthan) <br />
											Pin Code-302021 <br />
											Mob: 09799999123 <br />
											Email:- jaipur.rspl@gmail.com <br />
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="4" className='headingAccound'>
										<Accordion.Header>Ranchi</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											1360 - Bali Bagicha, Old Argora Road Argora <br />
											Ranchi - 834002, (Jharkhand) <br />
											Mob:9771441621 <br />
											Email:- ranchi.rspl@gmail.com
										</Accordion.Body>
									</Accordion.Item>
								</Col>
								<Col className='col-md-4 col-sm-6 col-12 animate__animated animate__fadeInDown'>
									<Accordion.Item eventKey="5" className='headingAccound'>
										<Accordion.Header>Bengaluru</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											90/7 & 90/8, First Floor <br />
											1st Cross, Vittal Nagar, Mysore Road, <br />
											Bengaluru-560026 (Karnataka) <br />
											Mob: 9008557707 <br />
											Ph: 080-26747475/76 <br />
											Email:- rachnasagarblr@hotmail.com <br />
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="6" className='headingAccound'>
										<Accordion.Header>Lucknow</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											C-1454, Indira Nagar,
											Lucknow-226016 (Uttar Pradesh) <br />
											Mob: 09794852855 <br />
											Ph: 0522-4004909 <br />
											Email:- lucknow.rspl@gmail.com <br />
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="7" className='headingAccound'>
										<Accordion.Header>Kolkata</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											220, Bipin Ganguly Road, Dum Dum, Kolkata-700030 (West Bengal) <br />
											Mob: 09330102176 <br />
											Email:- westbengal.rspl@gmail.com <br />
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="8" className='headingAccound'>
										<Accordion.Header>Chennai</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											Old No. 18, New No. 80 <br />
											Ramar Koil Street(Opp. Chennai Trade Centre <br />
											Nandambakkam Chennai-600089 (Tamil Nadu) <br />
											Mob: 08754580793 <br />
											Email:- chennai.rspl@gmail.com <br />
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="9" className='headingAccound'>
										<Accordion.Header>Patna</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											4H/41,Bahadur pur Housing Colony, <br />
											Bhootnath Road,Kankarbag <br />
											Patna-800026, (Bihar) <br />
											Mob: 09771441611 <br />
											Ph: 09771441611 <br />
											Email:- patna.rspl@gmail.com
										</Accordion.Body>
									</Accordion.Item>

								</Col>
								<Col className='col-md-4 col-sm-6 col-12 animate__animated animate__fadeInDown'>
									<Accordion.Item eventKey="10" className='headingAccound'>
										<Accordion.Header>Bhopal</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											E-6/127, Ground Floor <br />
											Arera Colony, <br />
											Bhopal-462016 (Madhya Pradesh) <br />
											Mob: 09752593355 <br />
											Ph: 0755-4223838 <br />
											Email:- bhopal.rspl@gmail.com
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="11" className='headingAccound'>
										<Accordion.Header>Cochin</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											House Number- 1007/A2 , <br />
											Sahridaya Nagar road , <br />
											Edappally – Cochin - 682024, <br />
											Kerala <br />
											Phone :- 7356122773 <br />
											Email :- cochin.rspl@gmail.com
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="12" className='headingAccound'>
										<Accordion.Header>Mohali</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											Plot No. BMM-36 <br />
											First Floor, Bulk Material Market, <br />
											Phase 11, Sector 65,SAS Nagar <br />
											Mohali, Punjab - 1600629 <br />
											Phone : 9646633300
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="13" className='headingAccound'>
										<Accordion.Header>Mumbai</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											Flat No- 203 2nd Floor, <br />
											Anmol Annexie CTS No- 98/99, <br />
											Dhobi Ali Near Civil Hospital Thane West <br />
											Mumbai – 400602 (Maharashtra) <br />
											Mob: 08108448884,08425869445 <br />
											Email:- mumbai.rspl@gmail.com
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="14" className='headingAccound'>
										<Accordion.Header>Guwahati</Accordion.Header>
										<Accordion.Body>
											<b>Forever Books Pvt. Lt</b>d. <br />
											House no.-03, Fatasil Ambari, Rang Pathar <br />
											Bylane name - Uday Nagar path <br />
											Guwahati, Assam-781025 <br />
											Phone: 7086090866
										</Accordion.Body>
									</Accordion.Item>
								</Col>
							</Row>


						</Accordion>
					</Container>
				</div>

				<div className='googleMaps'>
					<div className="one">
						<h1 className="textWhite">Forever Location</h1>
						<p className='normalText'>Google map for company location </p>
					</div>
					<iframe data-aos="fade-up-right" className='maps_google' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3625771590423!2d77.23868388719032!3d28.64886041288632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfce081c61bc9%3A0xf9ead7909a3881fb!2sForever%20Store!5e0!3m2!1sen!2sin!4v1682415036808!5m2!1sen!2sin" allowFullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
				</div>
				{loader &&
					<Loader />
				}
			</Layout>
		</>
	)
}
