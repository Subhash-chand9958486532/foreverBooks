import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import 'aos/dist/aos.css';
import AOS from 'aos';
import React, { useEffect, useState } from "react";
import Layout from './Layout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Loader from './Loader';
import { Context } from './componets/store';
import { useContext } from 'react';
import Swal from 'sweetalert2';

export default function Feedback() {

let {apiBase,token,} = useContext(Context);
	
	useEffect(() => {
		AOS.init();
	}, [])


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
		fetch(apiBase+'saveFeedback', {
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
					<title>Feedback</title>
				</Head>
				<div className='backDivs faqs'>
					<div className="one animate__animated animate__fadeInDown">
						<h1 className="textWhite">Feedback</h1>
						<p className='normalText'>We welcome your suggestions and feedback.</p>
					</div>
					<Container className='mt-5'>
						<Row>
							<Col className='imgSect col-md-6 col-sm-6 col-12 animate__animated animate__bounceInLeft'>
								<img className='feedback' src='/indexImg/feedback-animate.svg' />
							</Col>
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
					</Container>
				</div>
				{loader &&
					<Loader />
				}
			</Layout>
		</>
	)
}
