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
import { useRouter } from 'next/router';
import Video from 'next-video';
export default function Request() {
	const router = useRouter();
	const { userData } = useContext(Context);
	let { apiBase, token, } = useContext(Context);
	useEffect(() => {
		AOS.init();
	}, [])
	const [loader, setLoader] = useState(false);
	const [feedBackData, setfeedBackData] = useState({
		user_name: "",
		user_contact: "",
	})
	const { user_name, user_contact } = feedBackData;
	const feedBack = e => {
		setfeedBackData({ ...feedBackData, [e.target.name]: e.target.value })
	}
	function submitFeedback(e) {
		e.preventDefault();
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then((result) => {
			if (result.isConfirmed) {
				confirm();
			}
		});

		return
	}

	function confirm() {
		setLoader(true)
		const postData = {
			"email": feedBackData.user_name,
			"contact_no": feedBackData.user_contact,
			"token": token
		}
		fetch(apiBase + 'checkUser', {
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((reques) => {
				if (reques.status == "success") {
					Swal.fire({
						title: "Success",
						text: reques.result,
						icon: "success"
					});
					if (userData.isLogin) {
						localStorage.removeItem("token");
						setTimeout(() => {
							window.location.reload();
							router.push('/');
						}, 1200)
					} else {
						router.push('/');
					}

				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: reques.errors,
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

let url = 'indexImg/vdo.mp4';

	return (
		<>
			<Layout>
				<Head>
					<title>Account|Delete</title>
				</Head>
				<div className='backDivs faqs'>
					<div className="one animate__animated animate__fadeInDown">
						<h1 className="textWhite">Account delete request</h1>
						<p className='normalText'>After confirmation your account will delete.</p>
					</div>
					<Container className='mt-5'>
						<Row>
							<Col className='imgSect col-md-6 col-sm-6 col-12 animate__animated animate__bounceInLeft'>
								<img className='feedback' src='/indexImg/delete.svg' />
							</Col>
							<Col className='col-md-6 col-sm-6 col-12 animate__animated animate__bounceInRight'>
								<div className='formBack deleteAccount'>
									<form onSubmit={submitFeedback} className='py-5'>
										<div className='inputsFeed'>
											<TextField
												value={user_name}
												name="user_name"
												fullWidth label="Email id"
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
												label="Contact"
												required
												type='number'
												variant="standard"
												size="small"
												autoComplete='off'
												onChange={e => feedBack(e)}
											/>
										</div>
										<Button type='submit' variant="contained"> Submit  <SendIcon /> </Button>
									</form>
								</div>
							</Col>

						</Row>
					</Container>
				</div>
				{loader &&
					<Loader />
				}
				<div className='d-none'>
				<Video src={url} />;
				</div>
			</Layout>
		</>
	)
}
