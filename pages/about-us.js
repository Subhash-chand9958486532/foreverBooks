import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import 'aos/dist/aos.css';
import Layout from './Layout';
import FactoryIcon from '@mui/icons-material/Factory';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
export default function About() {
	useEffect(() => {
		
		AOS.init();
		$(document).ready(function () {
			$("#testimonial-slider").owlCarousel({
				items: 4,
				itemsDesktop: [1000, 2],
				itemsDesktopSmall: [979, 2],
				itemsTablet: [768, 1],
				pagination: false,
				navigation: true,
				navigationText: ["", ""],
				autoPlay: true
			});
		});
	}, []);
	useEffect(()=>{
		$(document).ready(function(){
			$('.counter-value').each(function(){
				$(this).prop('Counter', $(this).text()).animate({
					Counter: $(this).text()
				},{
					duration: 3500,
					easing: 'swing',
					step: function (now){
						$(this).text(Math.ceil(now));
					}
				});
			});
		});
	},[])

	return (
		<>
			<Layout>
				<Head>
					<title>About|Us</title>
				</Head>

				<div className='about_divs'>
					<div className='imag_1 '><img className='vert_move' src='/about/about.png' /></div>
					<div className='rightRide'><img src='/about/2.svg' /></div>
					<div className='centerImages '><img src='/about/a.svg' /></div>
					<div className='bgs'><img src='/about/bgs.png' /></div>
				</div>


				<div className='aboutText'>
					<Container>
						<div className="one">
							<h1 className="textWhite">About Forever Books</h1>
						</div>
						<Row className='mt-3'>
							<Col className='col-md-6 col-sm-12 col-12' data-aos="fade-up-right">
								<img className='officeBook' src='/about/office.svg' />
							</Col>
							<Col className='col-md-6 col-sm-12 col-12' data-aos="fade-up-left">
								<p className='textP'>
									Forever Books Pvt. Ltd., a leading educational Publishers. <br />
									Since its inception, under the provisions of Company Act of India, the company consistently continues to add to its
									publications with each growing year. The company has created for itself a brand status in the market establishing
									it where it stands today. <br />
									The contents in books are written by highly qualified authors introducing new concepts to make learning
									more interesting. These educational books have been much appreciated in schools and institutes.
									Along with the books, additional benefit comes with the support of its online portals. More than
									100 titles have been published under this banner and these books have reached several institutions
									with the assistance of over a dozen of the industry's top distributors.
								</p>
							</Col>
						</Row>
					</Container>
				</div>
				<div className='aboutText_box'>
					<Container>
						<div className="one">
							<h1 className="whyForever">Why Forever Books is the most reputed publisher?</h1>
						</div>
						<Row className='mt-3'>
							<Col className='col-md-6 col-sm-12 col-12' data-aos="fade-up-left">
								<p className='textP'>
									Forever Books is committed to giving the reader the best. Education is simply the soul of a society as it passes from one generation to another.
									We aim to publish relevant, timely and informative series to serve the educational community. We are committed to continuously improve all aspects of teaching and learning. Through publishing quality texts, we will create a better tomorrow. <br />
									Veering away from a tendency to reproduce the existing printed stock into a digitized format, the Company has launched fresh, well researched and innovative products, enhancing its printed editions, so that online readers could benefit from these quality products, keeping abreast of global and national trends in education. This step towards online information is a substantial advancement in making quality education interactive, innovative and satisfying for both the learner and the faculty.
								</p>
							</Col>
							<Col className='col-md-6 col-sm-12 col-12 imgQu' data-aos="fade-up-right">
								<img className='officeBook' src='/about/questions-animate.svg' />
							</Col>
						</Row>
					</Container>
				</div>

				<div className='aboutText_box2'>
					<Container>
						<div className="one">
							<h1 className="whyForever">How have we adapted to online mode of learning?</h1>
						</div>
						<Row className='mt-3'>
							<Col className='col-md-4 col-sm-12 col-12' data-aos="fade-up-right">
								<img className='howTo' src='/about/how.png' />
							</Col>
							<Col className='col-md-8 col-sm-12 col-12' data-aos="fade-up-left">
								<p className='textP'>
									Goweb (a multimedia based online support for teachers and students) was introduced which offers e-learning, audio-visual animations, test generators, video lectures and other multimedia resources to enhance the learning outcomes.
									Besides books, we have entered the space of digital study material including e-books, interactive e-books and mobile applications. As publishers, we have successfully engineered production and research into preparing study material that meets the requirements of present generation and ushers us into a bright future. <br />
									This comprehensive package has been well researched and tested across a number of institutions and has undergone several categories of brainstorming exercises. These have helped us to make the package original, interesting and engaging. Also, reference material for secondary and senior secondary classes is available in updated printed form and is also electronically accessible.
								</p>
							</Col>

						</Row>
					</Container>
				</div>

				<div className='secondSection'>
					<Container>
						<div className="one">
							<h1 className="textWhite">Meet Our FOUNDERS</h1>
							<p className='normalText'>Forever Books Pvt. Ltd., a leading educational Publishers.</p>
						</div>
						<Row>
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<div id="testimonial-slider" className="owl-carousel">
											<div className="testimonial">
												<div className='founderMain div1'>
													<div className='imageBox'>
														<img src='/about/HRSir.webp' />
													</div>
													<div className='bottomDiv'>
														<div className='textDivs'>
															<div className='Founder_name'>Mr. HR Gupta</div>
															<p className='profileText'>Former Secretary, CBSE President</p>

															<div className='iconsSection'>
																{/* <FacebookIcon className='iconsDiv' />
																<InstagramIcon className='iconsDiv' />
																<LinkedInIcon className='iconsDiv' /> */}
															</div>
														</div>
														{/* <button className='btn btn_readMore'>Read More...</button> */}
													</div>
												</div>
											</div>
											<div className="testimonial">
												<div className='founderMain div3'>
													<div className='imageBox'>
														<img src='/about/mr-lalit-gupta.jpg' />
													</div>
													<div className='bottomDiv'>
														<div className='textDivs'>
															<div className='Founder_name'>Mr. Lalit Gupta</div>
															<p className='profileText'>Chairman and Managing Director</p>
															<div className='iconsSection'>
																<a href='https://www.facebook.com/people/Lalit-Gupta/pfbid0LzdaUTo7iwVqCsi26FgAS4bkFzcm9KUMW3ZcW9SDYk7z44qTG2vz1W5L117E5WxMl/' target='_blank'><FacebookIcon className='iconsDiv' /></a>
																<a href='https://www.instagram.com/lalit.rspl/' target='_blank'><InstagramIcon className='iconsDiv' /></a>
																<a href='https://www.linkedin.com/in/lalit-gupta-b42747161/' target='_blank'><LinkedInIcon className='iconsDiv' /></a>
															</div>
														</div>
														{/* <button className='btn btn_readMore'>Read More...</button> */}
													</div>
												</div>
											</div>
											<div className="testimonial">
												<div className='founderMain div2'>
													<div className='imageBox'>
														<img src='/about/rajeev-gupta.png' />
													</div>
													<div className='bottomDiv'>
														<div className='textDivs'>
															<div className='Founder_name'>CA (Dr.) Rajeev Gupta</div>
															<p className='profileText'>CEO</p>

															<div className='iconsSection'>
																<a href='https://www.facebook.com/DrCARajeevGupta' target='_blank'><FacebookIcon className='iconsDiv' /></a>
																<a href='https://www.instagram.com/drrajeevguptaofficial/?igshid=YmMyMTA2M2Y%3D' target='_blank'><InstagramIcon className='iconsDiv' /></a>
																<a href='https://in.linkedin.com/in/ca-drrajeev-gupta-a9a0341a' target='_blank'><LinkedInIcon className='iconsDiv' /></a>
															</div>
														</div>
														{/* <button className='btn btn_readMore'>Read More...</button> */}
													</div>
												</div>
											</div>
											<div className="testimonial">
												<div className='founderMain div4'>
													<div className='imageBox'>
														<img src='/about/neeraj-gupta.png' />
													</div>
													<div className='bottomDiv'>
														<div className='textDivs'>
															<div className='Founder_name'>Mr. Neeraj Gupta</div>
															<p className='profileText'>Managing Director</p>
															<div className='iconsSection'>
																<a href='https://www.facebook.com/people/Neeraj-Gupta/pfbid02rqq1nhKEy6KgCEmGVhayEzndbVT3QLdBXLdHA2znxeJfQSSHAotn75EJu4NQzFN5l/' target='_blank'><FacebookIcon className='iconsDiv' /></a>
																<a href='https://www.instagram.com/neerajgupta0908/?igshid=YmMyMTA2M2Y%3D' target='_blank'><InstagramIcon className='iconsDiv' /></a>
																<a href='https://in.linkedin.com/in/neeraj-gupta-57b76a27' target='_blank'><LinkedInIcon className='iconsDiv' /></a>
															</div>
														</div>
														{/* <button className='btn btn_readMore'>Read More...</button> */}
													</div>
												</div>
											</div>
											<div className="testimonial">
												<div className='founderMain div5'>
													<div className='imageBox'>
														<img src='/about/seema-gupta.png' />
													</div>
													<div className='bottomDiv'>
														<div className='textDivs'>
															<div className='Founder_name'>Mrs. Seema Gupta</div>
															<p className='profileText'>Director</p>
															<div className='iconsSection'>
																<a href='https://www.facebook.com/seemagupta.rspl/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0' target='_blank'><FacebookIcon className='iconsDiv' /></a>
																<a href='https://www.instagram.com/seemagupta.rspl/' target='_blank'><InstagramIcon className='iconsDiv' /></a>
																<a href='https://www.linkedin.com/in/seema-gupta-421a8214a/' target='_blank'><LinkedInIcon className='iconsDiv' /></a>
															</div>
														</div>
														{/* <button className='btn btn_readMore'>Read More...</button> */}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Row>
						<Row>
							<Col className='col-sm-6 col-12 col-md-3' data-aos="fade-down-right">

							</Col>
							<Col className='col-sm-6 col-12 col-md-3' data-aos="zoom-in-down">

							</Col>
							<Col className='col-sm-6 col-12 col-md-3' data-aos="zoom-in-down">

							</Col>
							<Col className='col-sm-6 col-12 col-md-3' data-aos="fade-down-left">

							</Col>
						</Row>
					</Container>
					<div className="glowing">

						<span></span>

						<span></span>

						<span></span>

					</div>

				</div>
				<div className='aboutText_box2'>
					<Container>
						<div className="one">
							<h1 className="whyForever">Are we logistically available Globally?</h1>
						</div>
						<Row className='mt-1'>
							<Col className='col' data-aos="fade-up-left">
								<p className='textP mt-2'>
									To enhance awareness and avail updates on the user group, we regularly conduct and participate in workshops and exhibitions across the globe. The user thus gets the latest books. We are active on e-commerce platforms as well. We have acquired an invincible position in the industry. What we are today is thanks to the efforts of our team. Our Management has made our presence felt in the market. Apart from in-house Authors, Editors, Graphic Designers, Artists, IT Team including Animators, we also have sales and marketing professionals who are well versed in market dynamics and carry out extensive market research to understand the requirements of readers. Their efforts have enabled us to spread our client base and increase our business activities.
								</p>
							</Col>

						</Row>

					</Container>
				</div>
				<div className='aboutText_box'>
					<Container>
						<div className="one">
							<h1 className="whyForever">Warehouse facility across India</h1>
						</div>
						<Row className='mt-3'>
							<Col className='col-md-12 col-sm-12 col-12' data-aos="fade-up-left">
								<p className='textweHave mt-2'>
									We have a strong and professionally managed supply chain management system in place, which ensures the ordered materials reach in time.
									Considering the need of the customer, we keep the necessary stocks in reserve. We have around 25,000 square feet area of warehouses in Noida, India. Our staff is well-equipped to assist in-house designing and setting catalogues and bulletins, updating mailing lists on continuous basis and maintaining regular mailing schedules.
								</p>
							</Col>

						</Row>
						<Row>
							<div className="col-md-4 col-sm-6">
								<div className="counterAbout animate__animated animate__backInDown">
									<div className="counterAbout-icon"><FactoryIcon className="fa fa-globe" /></div>
									<h3>Schools</h3>
									<span className="counter-value">22000 </span>+
								</div>
							</div>
							<div className="col-md-4 col-sm-6">
								<div className="counterAbout blue animate__animated animate__backInDown">
									<div className="counterAbout-icon"><PersonIcon className="fa fa-rocket" /></div>
									<h3>Students</h3>
									<span className="counter-value">2000000 </span>+
								</div>
							</div>
							<div className="col-md-4 col-sm-6">
								<div className="counterAbout pink animate__animated animate__backInDown">
									<div className="counterAbout-icon"><PeopleIcon className="fa fa-rocket" /></div>
									<h3>Partners</h3>
									<span className="counter-value">1200 </span>+
								</div>
							</div>
							<div className="col-md-4 col-sm-6">
								<div className="counterAbout blue animate__animated animate__bounceInLeft">
									<div className="counterAbout-icon"><ElectricBikeIcon className="fa fa-globe" /></div>
									<h3>Sales force</h3>
									<span className="counter-value">250 </span>+
								</div>
							</div>
							<div className="col-md-4 col-sm-6">
								<div className="counterAbout pink animate__animated animate__bounceInDown">
									<div className="counterAbout-icon"><PeopleAltIcon className="fa fa-rocket" /></div>
									<h3>Work force</h3>
									<span className="counter-value">600 </span>+
								</div>
							</div>
							<div className="col-md-4 col-sm-6">
								<div className="counterAbout purple animate__animated animate__bounceInRight">
									<div className="counterAbout-icon"><RecordVoiceOverIcon className="fa fa-rocket" /></div>
									<h3>Teachers</h3>
									<span className="counter-value">1500000 </span>+
								</div>
							</div>
						</Row>
					</Container>
				</div>
			</Layout>
		</>
	)
}
