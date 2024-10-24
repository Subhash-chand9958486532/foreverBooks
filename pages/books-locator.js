import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import AOS from 'aos';
import React, { useEffect, useState } from "react";
import 'aos/dist/aos.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Person2Icon from '@mui/icons-material/Person2';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import CallIcon from '@mui/icons-material/Call';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Loader from './Loader';
import Layout from './Layout';
export default function Catalogue() {
	const [error, setError] = useState(false);

	const token = 'books002';
	useEffect(() => {
		AOS.init();
		getState();
	}, [])

	const [loader, setLoader] = useState();
	// get state function start
	const [stateData, getStateData] = useState([]);
	const [cityColm, setcityColm] = useState(false);
	const stateUrl = "https://books.foreverbooks.co.in/laravel_api/api/getState";
	function getState() {
		const postData = {
			"country_id": 101,
			"token": token
		}
		fetch(stateUrl, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((stData) => {
				if (stData.status == 'success') {
					getStateData(stData.data);
				} else {
					alert(stData.message)
				}
			})

	}
	// get state function end;

	// get city function start heare

	const [city, setCity] = useState([]);
	const cityUrl = 'https://books.foreverbooks.co.in/laravel_api/api/getCity';
	const [stateidpass, Setstateidpass] = useState([])
	function getCityFun(ids) {

		setLoader(true);
		const stateIDS = ids;
		const postData = {
			"token": token,
			"state_id": stateIDS
		}
		console.log(postData);
		fetch(cityUrl, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((cityData) => {
				if (cityData.status == "success") {
					setCity(cityData.data);
					setcityColm(true)
				} else {
					alert('not success')
				}
			})
			.finally(() => {
				setLoader(false);
			})

	}
	// get city function end heare

	// get shopLocation fun start
	const [shoAddress, setshoAddress] = useState(false);
	const [shopItem, setshopItem] = useState([])
	const shopUrl = 'https://books.foreverbooks.co.in/laravel_api/api/getBookStoreLocation';
	function getShoplocation(ids) {
		setLoader(true)
		const cityIds = ids;
		const postData = {
			"country_id": 101,
			"state_id": stateidpass,
			"city_id": cityIds,
			"token": token
		}
		console.log(postData)
		fetch(shopUrl, {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((shopData) => {
				if (shopData.status == "success") {
					if (shopData.data.length <= 0) {
						setError(true);
						setshoAddress(false)
					} else {
						setshoAddress(true)
						setshopItem(shopData.data);
						setError(false)
					}

				} else {
					alert("not")
				}
			})

			.catch((error) => {
				alert(error)
			})
			.finally(() => {
				setLoader(false);
			})

	}

	return (
		<>
		<Layout>
			<Head>
				<title>Bookstore|Locator</title>
			</Head>
			<div className='catlog_bannelocation'>
				<img src='/indexImg/location.png' />
			</div>
			<div className='man_back0'>
				<Container className='tbls_data py-4' >
					<div className="one mt-5">
						<h1 className="textWhite">Book Store Location</h1>
						<p className='normalText'> Educational Publishers As pioneer in , Forever Books  for CBSE STATES </p>
					</div>

					<div className='selectStateSection mt-5'>
						<div className='row' data-aos="zoom-in">
							<Col>
								<p>Book Store Near Me</p>
								<FormControl size='small' fullWidth>
									<InputLabel id="demo-simple-select-label w-15">Select State</InputLabel>
									<Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select State"
										onChange={(e) => { getCityFun(e.target.value, Setstateidpass(e.target.value)) }}>
										{stateData.map((statItem, statKey) => {
											return (
												<MenuItem value={statItem.state_id} key={statKey}>{statItem.stateNameLang1}</MenuItem>
											)
										})}

									</Select>
								</FormControl>
							</Col>

							{cityColm &&
								<Col>
									<p>City</p>
									<FormControl size='small' fullWidth>
										<InputLabel id="demo-simple-select-label w-15">Select City</InputLabel>
										<Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select City"
											onChange={(e) => { getShoplocation(e.target.value) }}>
											{city.map((cityItem, ciyKey) => {
												return (
													<MenuItem value={cityItem.city_id} key={ciyKey}>{cityItem.cityNameLang1}</MenuItem>
												)
											})}
										</Select>
									</FormControl>
								</Col>
							}
						</div>
					</div>
					{shoAddress &&
						<>
							{shopItem.map((item, shopKey) => {
								return (

									<div className='shopAddressBack' key={shopKey}>
										<div className='manBgs'>
											<div className='profile'>
												<div className='profileSaller'><Person2Icon className='iconPerson' /></div>
												<p className='stallName'>{item.store_owner}</p>
											</div>
											<div className='secondColm'>
												<Row>
													<Col className='col-md-4 col-sm-12 col-12'>
														<div className='line'>
															<div><HomeIcon className='iconsAdd bg-secondary' /> Shop Name </div>
														</div>
													</Col>
													<Col className='col-md-8 col-sm-12 col-12'>
														<div className='line'>
															<div> {item.store_name}</div>
														</div>
													</Col>
													<Col className='col-md-4 col-sm-12 col-12'>
														<div className='line'>
															<div><LocationOnIcon className='iconsAdd bg-primary' /> Address</div>
														</div>
													</Col>
													<Col className='col-md-8 col-sm-12 col-12'>
														<div className='line'>
															<div>{item.address} </div>
														</div>
													</Col>
													<Col className='col-md-4 col-sm-12 col-12'>
														<div className='line'>
															<div><NetworkPingIcon className='iconsAdd bg-success' /> Pin code</div>
														</div>
													</Col>
													<Col className='col-md-8 col-sm-12 col-12'>
														<div className='line'>
															<div>{item.pin_code} </div>
														</div>
													</Col>
													<Col className='col-md-4 col-sm-12 col-12'>
														<div className='line'>
															<div><CallIcon className='iconsAdd bg-warning' /> Contact Number</div>
														</div>
													</Col>
													<Col className='col-md-8 col-sm-12 col-12'>
														<div className='line'>
															<div>{item.phone_no},{item.alternate_phone_no} </div>
														</div>
													</Col>
													<Col className='col-md-4 col-sm-12 col-12'>
														<div className='line'>
															<div><MarkEmailReadIcon className='iconsAdd bg-danger' />Email</div>
														</div>
													</Col>
													<Col className='col-md-8 col-sm-12 col-12'>
														<div className='line'>
															<div>{item.email} </div>
														</div>
													</Col>
												</Row>
											</div>
										</div>
									</div>
								)
							})}
						</>
					}

					<Row className='justify-content-center'>
						<Col className='col-md-4 mt-3'>
							{error &&

								<div className="alert alert-info  animate__animated animate__shakeX" role="alert">
									Data not found.
								</div>
							}
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