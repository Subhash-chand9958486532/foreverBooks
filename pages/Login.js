import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState, useContext, useRef } from "react";
import 'aos/dist/aos.css';
import Link from 'next/link';
import Layout from './Layout';
import { Context } from './componets/store';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FixedLoader from './FixedLoader';

export default function Login() {
	useEffect(() => {
		AOS.init();
		getMachineId();
	}, []);


	// userlogin function start
	const { login, token, apiBase } = useContext(Context);
	
	const [loginData, setLoginData] = useState({
		userEmail: "",
		userPass: ""
	});

	const { userEmail, userPass } = loginData;
	
	const [machineIdSta, setMachineId] = useState();
	const [losder, setloader] = useState(false);
	const [showSms, setshowSms] = useState({ status: false, msg: "" })
	const [OTPsect, setOTPsect] = useState(false)

	function getMachineId() {
		let machineId = localStorage.getItem('MachineId');
		if (machineId) {
			setMachineId(machineId)
		}

		if (!machineId) {
			machineId = crypto.randomUUID();
			localStorage.setItem('MachineId', machineId);
		}

		return machineId;
	}
	const hendler = e => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	}
	function loginUsers(e) {

		e.preventDefault();
		const userData = {
			"email": userEmail,
			"password": userPass,
			"token": "books002",
			"session_id": machineIdSta,
		}
		login(userData);

	}
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [update_sect, setUpdate_sect] = useState(false)
	// userlogin function end

	// forgot password
	const [sentOtpToEmail, setSentOtpToEmail] = useState(true)
	const [emailIDS, setemailIDS] = useState({
		email_address: ""
	})

	const onChangesetOptToMail = e => {
		setemailIDS({ ...emailIDS, [e.target.name]: e.target.value });
	}
	const { email_address } = emailIDS;

	function setOptEmail(e) {
		e.preventDefault()
		setloader(true)
		const postData = {
			"token": token,
			"email": emailIDS.email_address
		}
		fetch(apiBase + 'forgetPasswordOtp', {
			method: "POST",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((emailOtp) => {
				if (emailOtp.status == "success") {
					setOTPsect(true)
					setshowSms((prev) => {
						return { ...prev, status: true, msg: emailOtp.message }
					})
					setSentOtpToEmail(false)
				} else {
					setshowSms((prev) => {
						return { ...prev, status: true, msg: emailOtp.message }
					})
				}
			})
			.catch((error) => {
				alert(error.message)
			})
			.finally(() => {
				setloader(false)
			})

	}



	const [OTP, setOTP] = useState({
		OTPInput: ""
	})

	const onChangEnterOTP = e => {
		setOTP({ ...OTP, [e.target.name]: e.target.value });
	}
	const { OTPInput } = OTP;

	function veryFicationOtp(e) {
		e.preventDefault()
		setloader(true)
		const postData = {
			"token": token,
			"email": emailIDS.email_address,
			"otp": OTP.OTPInput
		}
		fetch(apiBase + 'matchEmailOtp', {
			method: "POST",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((otpVery) => {
				if (otpVery.status == "success") {
					setUpdate_sect(true)
					setOTPsect(false)
					setshowSms((prev) => {
						return { ...prev, status: true, msg: otpVery.message }
					})
					setSentOtpToEmail(false)
				} else {
					setshowSms((prev) => {
						return { ...prev, status: true, msg: otpVery.message }
					})
				}
			})
			.catch((error) => {
				alert(error.message)
			})
			.finally(() => {
				setloader(false)
			})
	}

	// save password


	const [passWord, setPassword] = useState({
		passWordInput: "",
		confirmpassWordInput: "",

	})

	const onChangUpdatePass = e => {
		setPassword({ ...passWord, [e.target.name]: e.target.value });
	}
	const { passWordInput, confirmpassWordInput } = passWord;
	function updatepPass(e) {
		e.preventDefault()
		setloader(true)
		const postData = {
			"token": token,
			"email": emailIDS.email_address,
			"otp": OTP.OTPInput,
			"password": passWord.passWordInput,
			"confirmPassword": passWord.confirmpassWordInput
		}
		fetch(apiBase + 'updatePassword', {
			method: "POST",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((updatePassData) => {
				if (updatePassData.status == "success") {
					setTimeout(() => {
						setShow(false)
					}, 1000);
					setshowSms((prev) => {
						return { ...prev, status: true, msg: updatePassData.message }
					})
					setSentOtpToEmail(false)
				} else {
					setshowSms((prev) => {
						return { ...prev, status: true, msg: updatePassData.message }
					})
				}
			})
			.catch((error) => {
				alert(error.message)
			})
			.finally(() => {
				setloader(false)
			})
	}

	return (
		<>
			<Layout>
				<Head>
					<title>Login</title>
				</Head>
				<div className='loginDivs '>
					<div className='forDesig'></div>
					<Container className=''>
						<div className="one animate__animated animate__backInDown">
							<h1 className="textWhite">Login</h1>
							<p className='normalText'> Login your account.</p>
						</div>
						<Row>
							<div className='LoginForm animate__animated animate__fadeInUp' >
								<div className='whiteBox'>
									<div className='imagesSection'>
										<img src="/indexImg/log.svg" alt="" />
									</div>
									<div className='loginSection'>
										<div className="form_bg">
											<div className="container">
												<form className="form_horizontal" onSubmit={loginUsers}>
													<div className="form_icon"><i className="fas fa-user-circle"></i></div>
													<h3 className="title">Login</h3>
													<div className="form-group">
														<span className="input_icon"><i className="far fa-user"></i></span>
														<input className="form-control" type="email" placeholder="Enter your email address"
															name='userEmail'
															id='userEmail'
															value={userEmail}
															required
															onChange={e => hendler(e)} />
													</div>
													<div className="form-group">
														<span className="input_icon"><i className="fas fa-lock"></i></span>
														<input className="form-control" type="password" placeholder="Password"
															name='userPass'
															id='userPass'
															value={userPass}
															required
															onChange={e => hendler(e)} />
													</div>
													<button className="btn signin" type='submit'>Login</button>
													<ul className="form-options">
														<li><a href='javascript:void(0)'><div onClick={handleShow}>Forgot Password?</div></a></li>
														<li><Link href="/Signup">Create New Account <i className="fa fa-arrow-right"></i></Link></li>
													</ul>
												</form>

											</div>
										</div>
									</div>
								</div>
							</div>
						</Row>
						<Offcanvas show={show} onHide={handleClose} placement='end'>
							<Offcanvas.Header closeButton className='headerList2 py-2'>
								<Offcanvas.Title>Forgot Password?</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<div className='imgHolder'>
									<img className='animate__animated animate__zoomIn' src='/indexImg/forgotPass.gif' />
									{showSms.status &&
										<>
											<div className="alert alert-success mt-5 py-2" role="alert">
												{showSms.msg}
											</div>
										</>
									}

									{sentOtpToEmail &&
										<form onSubmit={setOptEmail} className='mt-5 forgotForm animate__animated animate__fadeInDown'>
											<label className='mb-2'>Enter your email ID for receive (OTP)</label>
											<TextField onChangeCapture={e => onChangesetOptToMail(e)} autoComplete='off' type='email' value={email_address} name='email_address' onChange='' required size='small' fullWidth label="Email Address" variant="outlined" />
											<Button type='submit' variant="contained" color="success" className='mt-3'>Submit</Button>
										</form>
									}

									{OTPsect &&
										<form onSubmit={veryFicationOtp} className='mt-5 forgotForm animate__animated animate__fadeInDown'>
											<label className='mb-2'>Sent to: {emailIDS.email_address}</label>
											<TextField onChangeCapture={e => onChangEnterOTP(e)} autoComplete='off' type='number' value={OTPInput} name='OTPInput' onChange='' required size='small' fullWidth label="Enter OTP" variant="outlined" />
											<Button type='submit' variant="contained" color="success" className='mt-3'>verify</Button>
										</form>
									}

									{update_sect &&
										<form onSubmit={updatepPass} className='mt-5 forgotForm animate__animated animate__fadeInDown'>
											<TextField className='mb-4' onChangeCapture={e => onChangUpdatePass(e)} autoComplete='off' type='password' value={passWordInput} name='passWordInput' onChange='' required size='small' fullWidth label="New password" variant="outlined" />
											<TextField onChangeCapture={e => onChangUpdatePass(e)} autoComplete='off' type='password' value={confirmpassWordInput} name='confirmpassWordInput' onChange='' required size='small' fullWidth label="Confirm new password" variant="outlined" />
											<Button type='submit' variant="contained" color="success" className='mt-3'>save</Button>
										</form>
									}

									{losder &&
										<FixedLoader />
									}

								</div>
							</Offcanvas.Body>
						</Offcanvas>
					</Container>
				</div>
			</Layout >
		</>
	)
}
