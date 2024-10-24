import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState, useRef } from "react";
import 'aos/dist/aos.css';
import Loader from './Loader';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Layout from './Layout';
import Link from 'next/link';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
export default function Signup() {
	useEffect(() => {
		AOS.init();
		window.csrf_token = "{{ csrf_token() }}"
	}, [])
	function hidemolelbtn() {
		setstatusModel(false);
		setErrorStatus(false)
	}
	const [val, setVal] = useState('');
	const [emailVal, setemailVal] = useState('');
	const [optData, setOptData] = useState('');
	const [optDataE, setOptDataE] = useState('');
	const [regisSucc, setRegisSucc] = useState(true);
	const [yocanLog, setYocanLog] = useState(false);
	const [otpError, setotpError] = useState(false);



	const mobNo = useRef();
	const eMRef = useRef();

	// Sign Up Function start here
	const token = 'books002';
	const [loader, setLoader] = useState(false);
	const Urls = 'https://books.foreverbooks.co.in/laravel_api/api/register';
	const [statusModel, setstatusModel] = useState(false);
	const [errorStatus, setErrorStatus] = useState({ status: false, msg: "" })
	const [successSms, setsuccessSms] = useState({ status: false, msg: "" })
	const [signUp, setsignUp] = useState({
		firstName: "",
		lastName: "",
		mobileNum: "",
		emailIds: "",
		password: "",
	});
	const { firstName, lastName, mobileNum, emailIds, password } = signUp;
	const newUsers = e => {
		setsignUp({ ...signUp, [e.target.name]: e.target.value });
	}
	
	function registerUser() {
		const firstName = document.getElementById("firstName");
		const lastName = document.getElementById("lastName");
		const mobileNum = document.getElementById("mobileNum");
		const emailIds = document.getElementById("emailIds");
		const password = document.getElementById("password");
		if (firstName.value == "") {
			firstName.classList.add("is-invalid");
		}
		if (lastName.value == "") {
			lastName.classList.add("is-invalid");
		}
		if (mobileNum.value == "") {
			mobileNum.classList.add("is-invalid");
		}
		if (emailIds.value == "") {
			emailIds.classList.add("is-invalid");
		}
		if (password.value == "") {
			password.classList.add("is-invalid");
		}
		else {
			firstName.classList.remove("is-invalid");
			firstName.classList.add("is-valid");
			lastName.classList.remove("is-invalid");
			lastName.classList.add("is-valid");
			mobileNum.classList.remove("is-invalid");
			mobileNum.classList.add("is-valid");
			emailIds.classList.remove("is-invalid");
			emailIds.classList.add("is-valid");
			password.classList.remove("is-invalid");
			password.classList.add("is-valid");
			setLoader(true)
			const postData = {
				"firstname": signUp.firstName,
				"lastname": signUp.lastName,
				"contact_no": signUp.mobileNum,
				"email": signUp.emailIds,
				"password": signUp.password,
				"token": token
			}
			console.log(postData)
			fetch(Urls, {
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
						setstatusModel(true);
						setRegisSucc(false);
						setYocanLog(true);
						setsuccessSms((prev) => {
							return { ...prev, status: true, msg: userData.message }
						})
					} else {
						setstatusModel(true);
						setsuccessSms(false)
						// setErrorStatus(true);
						setErrorStatus((prev) => {
							return { ...prev, status: true, msg: userData.message }
						})
					}
				})
				.catch((catch_err) => {
					alert(catch_err)
				})
				.finally(() => {
					setLoader(false)
				})
		}
		// Sign Up Function end here
	}

	// mobile veryfication fun start
	function mobileVarify(e) {
		setVal(mobNo.current.value);
		setemailVal(eMRef.current.value);
		e.preventDefault();
		const apiUrl = 'https://books.foreverbooks.co.in/laravel_api/api/mobileAndEmailVarify';
		const firstName = document.getElementById("firstName");
		const lastName = document.getElementById("lastName");
		const mobileNum = document.getElementById("mobileNum");
		const emailIds = document.getElementById("emailIds");
		const password = document.getElementById("password");
		if (firstName.value == "") {
			firstName.classList.add("is-invalid");
		}
		if (lastName.value == "") {
			lastName.classList.add("is-invalid");
		}
		if (mobileNum.value == "") {
			mobileNum.classList.add("is-invalid");
		}
		if (emailIds.value == "") {
			emailIds.classList.add("is-invalid");
		}
		if (password.value == "") {
			password.classList.add("is-invalid");
		}
		else {
			firstName.classList.remove("is-invalid");
			firstName.classList.add("is-valid");
			lastName.classList.remove("is-invalid");
			lastName.classList.add("is-valid");
			mobileNum.classList.remove("is-invalid");
			mobileNum.classList.add("is-valid");
			emailIds.classList.remove("is-invalid");
			emailIds.classList.add("is-valid");
			password.classList.remove("is-invalid");
			password.classList.add("is-valid");
			setLoader(true)
			const postData = {
				"firstName": signUp.firstName,
				"lastName": signUp.lastName,
				"contactNo": signUp.mobileNum,
				"email": signUp.emailIds,
				"password": signUp.password,
				"token": token
			}
			console.log(postData, "!")
			fetch(apiUrl, {
				method: 'POST',
				body: JSON.stringify(postData),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then(response => response.json())
				.then((otpData) => {
					if (otpData.status == "success") {
						setOptData(otpData.data.mobileOtp)
						setOptDataE(otpData.data.emailOtp)
						setstatusModel(true);
						setsuccessSms((prev) => {
							return { ...prev, status: true, msg: otpData.message }
						})
					}
					else {
						setstatusModel(true);
						// setErrorStatus(true);
						setErrorStatus((prev) => {
							return { ...prev, status: true, msg: otpData.message }
						})
					}
				})
				.catch(() => {
					alert("not Working yet")
				})
				.finally(() => {
					setLoader(false)
				})
		}
	}


	const [otpSign, setotpSign] = useState({
		mobNum: "",
		emailVl: "",
	});
	const { mobNum, emailVl } = otpSign;

	const OTPChange = e => {
		setotpSign({ ...otpSign, [e.target.name]: e.target.value });
	}


	// submit fun start
	// const [checkMobOpt, setcheckMobOpt] = useState('');
	const inputRef = useRef(null);
	const emailRef = useRef(null);
	function submit(e) {
		e.preventDefault()
		if (inputRef.current.value == optData || emailRef.current.value == optDataE) {
			registerUser();
		} else {
			setotpError(true)
		}
	}
	// submit fun end

	return (
		<>
			<Layout>
				<Head>
					<title>Signup</title>
				</Head>
				{loader &&
					<Loader />
				}
				{statusModel &&
					<div className='statusSmsBack'>
						<div className='innerModel animate__animated animate__bounceInDown'>
							{/* error */}
							{errorStatus.status &&
								<>
									<div className='error_icons'>
										<ErrorOutlineIcon className='iconsErr animate__animated  animate__bounceIn' />
									</div>
									<div className='errorSms shadow-sm'>
										{errorStatus.msg}
									</div>
									<div className='btnsOk' onClick={() => { hidemolelbtn() }}>
										OK
									</div>
								</>
							}
							{/* error */}
							{/* success pop */}
							{successSms.status &&
								<>
									{/* <div className='error_icons'>
										<CheckCircleOutlineIcon className='iconsSucc animate__animated  animate__bounceIn' />
									</div> */}
									<div className='successSms shadow-sm '>
										{successSms.msg}
									</div>

									{regisSucc &&
										<>
											
											<h5 className='very'>Verification</h5>
											{otpError && 
												<div className="alert alert-danger" role="alert">
													OTP Not Validated. 
												</div>
											}
											<form onSubmit={submit}>
												<div className='inputArea'>
													<label>Enter OTP sent to : {val}</label>
													<input ref={inputRef} autoComplete='off' type='text' className='form-control' value={mobNum} name="mobNum" placeholder='Enter OTP' onChange={e => OTPChange(e)} />
												</div>
												<div className='inputArea'>
													<label>OR</label>
												</div>
												<div className='inputArea'>
													<label>Enter OTP sent to : {emailVal}</label>
													<input ref={emailRef} type='text' autoComplete='off' className='form-control' value={emailVl} name="emailVl" placeholder='Enter OTP' onChange={e => OTPChange(e)} />
												</div>
												<div className='btnRow'>
													<button type='submit' className='btnsOk'>Submit</button>
													<div className='btnsOk' onClick={mobileVarify}>Resent</div>
													<div className='btnsOk' onClick={() => { hidemolelbtn() }}>Close</div>
													{/* {otpData} */}
												</div>
											</form>
										</>
									}
									{yocanLog &&
										<>
											<div className='checkIcons'><DoneAllIcon /></div>
											<p className='animate__animated animate__backInDown'>You can login now</p>
											<button className='btn btn-success logSuc'><Link href="/Login"><ThumbUpIcon /> Login</Link></button>
										</>
									}

								</>
							}
							{/* success pop */}
						</div>
					</div>
				}
				<div className='loginDivs'>
					<div className='forDesig'></div>
					<Container>
						<div className="one animate__animated animate__backInDown">
							<h1 className="textWhite">CREATE ACCOUNT</h1>
							<p className='normalText'> Crate your account.</p>
						</div>
						<Row>
							<div className='LoginFormS animate__animated animate__fadeInUp'>
								<div className='whiteBox2'>
									<div className='imagesSection'>
										<img src="/indexImg/sign.svg" alt="" />
									</div>
									<div className='loginSection2'>
										<div className="form_bg">
											<div className="container ">
												<form onSubmit={mobileVarify}>
													{/* <form onSubmit={registerUser}> */}
													<div className='row'>
														<div className='col-md-12'>
															<div className="mb-1">
																<label className="form-label">First Name *</label>
																<input value={firstName} type="text" className="form-control" id='firstName' name="firstName" onChange={e => newUsers(e)} />
															</div>
														</div>
														<div className='col-md-12'>
															<div className="mb-1">
																<label className="form-label" >Last name *</label>
																<input value={lastName} type="text" className="form-control" id='lastName' name="lastName" onChange={e => newUsers(e)} />
															</div>
														</div>
														<div className='col-md-12'>
															<div className="mb-1">
																<label className="form-label">Mobile *</label>
																<input ref={mobNo} value={mobileNum} type="number" className="form-control" id="mobileNum" name="mobileNum" onChange={e => newUsers(e)} minlength="10" maxlength="10" />
															</div>
														</div>
														<div className='col-md-12'>
															<div className="mb-1">
																<label className="form-label">Email *</label>
																<input ref={eMRef} value={emailIds} type="email" className="form-control" id="emailIds" name="emailIds" onChange={e => newUsers(e)} />
															</div>
														</div>
														<div className='col-md-12'>
															<div className="mb-1">
																<label className="form-label">Password *</label>
																<input value={password} type="password" className="form-control" id="password" name="password" onChange={e => newUsers(e)} />
															</div>
														</div>
													</div>
													<div className="row_buttonSec">
														{/* <button type='submit' className="btn btn-primary">Signup</button> */}
														<button type='submit' className="btn btn-primary">Continue</button>

													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Row>
					</Container>
				</div>
			</Layout>
		</>
	)
}