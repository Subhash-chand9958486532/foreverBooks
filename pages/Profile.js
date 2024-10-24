import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import Layout from './Layout';
import Person2Icon from '@mui/icons-material/Person2';
import { Context } from './componets/store';
import { useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Button from '@mui/material/Button';
import Loader from './Loader';
import AddAddress from './AddAddress';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useRouter } from 'next/router';
export default function Profile() {
	const { userData, getSaveAddress, userAddress, deleteSaveAddressFun, token, apiBase, userProData, getUserProfile } = useContext(Context);
	const [yourProfile, setYourProfile] = useState(true);
	const [yourAddress, setYourAddress] = useState(false);
	const [addAddress, setYAddAddress] = useState(false);
	const [order, setOrder] = useState(false);
	const [loader, setloader] = useState(false);
	const [norecord, setnorecord] = useState(true)
	const [getstate, setState] = useState([]);
	const [countUds, setCountryIds] = useState();
	const [staId, setstaId] = useState();
	const [alertMsg, setAlertMsg] = useState(true);
	const [errorDiv, seterrorDiv] = useState(true);
	const [messageShow, SetmessageShow] = useState({ status: false, msg: "" });
	const [succMSG, SetsuccMSG] = useState({ status: false, msg: "" });
	const [statusShow, setStatusShow] = useState({
		status: false,
		msg: ""
	})
	const [country, setcountry] = useState([]);
	const [editProShow, setEditProShow] = useState(false);
	const router = useRouter();
	useEffect(() => {
		getCountry();
		AOS.init();
	}, []);

	function shoHide(id) {
		getSaveAddress();
		if (id == "1") {
			setYourProfile(true);
		} else {
			setYourProfile(false)
		}
		if (id == "2") {
			setYourAddress(true)
		} else {
			setYourAddress(false)
		}
		if (id == "3") {
			router.push('/Your-order')
		} else {
			setOrder(false)
		}
		if (id == "4") {
			setYAddAddress(true)
		} else {
			setYAddAddress(false)
		}
	}
	function getCountry() {
		setloader(true)
		const postData = {
			"country_id": 1,
			"token": token
		}
		fetch(apiBase + 'getCountry', {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((countryData) => {
				if (countryData.status == "success") {
					setcountry(countryData.data)
				} else {
					alert("not")
				}
			})
			.finally(() => {
				setloader(false)
			})

	}

	function getState(ids) {
		const cuntryIds = ids;
		setCountryIds(cuntryIds)
		const postData = {
			"country_id": cuntryIds,
			"token": token
		}
		fetch(apiBase + 'getState', {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((stateData) => {
				if (stateData.status == "success") {
					setState(stateData.data)
				} else {
					// alert("not")
				}
			})
			.finally(() => {
				setloader(false)
			})
	}

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);


	const [editUser, setEditUser] = useState([])
	function handleShow(data) {
		setEditUser(data)
		setShow(true);
	}

	function onChangeState(id) {
		let statIds = id;
		setstaId(statIds)
	}



	const onChangUpdateAddress = e => {
		setEditUser((prev) => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}
	function updateAddress(e) {
		setloader(true)
		e.preventDefault();
		if (staId == undefined) {
			const postData = {
				"address_id": editUser.address_id,
				"fullname": editUser.fullname,
				"phone_no": editUser.phone_no,
				"address": editUser.address,
				"zip_code": editUser.zip_code,
				"country_id": editUser.country_id,
				"state_id": editUser.state_id,
				"landmark": editUser.landmark,
				"city": editUser.city_name,
				"token": token
			}
			fetch(apiBase + 'updateUserAddress', {
				method: "post",
				body: JSON.stringify(postData),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then(response => response.json())
				.then((stateData) => {
					if (stateData.status == "success") {
						setShow(false);
						getSaveAddress()
						SetmessageShow(false)
						SetsuccMSG((prev) => {
							return { ...prev, status: true, msg: stateData.message }
						})
					} else {
						SetsuccMSG(false)
						SetmessageShow((prev) => {
							return { ...prev, status: true, msg: stateData.message }
						})
					}
				})
				.finally(() => {
					setloader(false)
				})

		} else if (staId !== undefined) {
			const postData = {
				"address_id": editUser.address_id,
				"fullname": editUser.fullname,
				"phone_no": editUser.phone_no,
				"address": editUser.address,
				"zip_code": editUser.zip_code,
				"country_id": countUds,
				"state_id": staId,
				"landmark": editUser.landmark,
				"city": editUser.city_name,
				"token": token
			}
			fetch(apiBase + 'updateUserAddress', {
				method: "post",
				body: JSON.stringify(postData),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then(response => response.json())
				.then((stateData) => {
					if (stateData.status == "success") {
						getSaveAddress()
						setShow(false);
						SetmessageShow(false)
						SetsuccMSG((prev) => {
							return { ...prev, status: true, msg: stateData.message }
						})
					} else {
						SetsuccMSG(false)
						SetmessageShow((prev) => {
							return { ...prev, status: true, msg: stateData.message }
						})
					}
				})
				.finally(() => {
					setloader(false)
				})
		}

	}




	const [upDatePro, setUpDatePro] = useState([])
	const onChangUpdateProfile = e => {
		setUpDatePro((prev) => {
			return { ...prev, [e.target.name]: e.target.value }
		})

	}
	const hideEditProClose = () => setEditProShow(false);
	function editProfile(data) {
		setUpDatePro(data)
		setEditProShow(true)
	}
	function updateProfileDe(e) {
		e.preventDefault()
		setloader(true)
		const xdata = {
			"customer_id": userData.customer_id,
			"firstname": upDatePro.firstname,
			"lastname": upDatePro.lastname,
			"token": token
		}
		fetch(apiBase + 'updateUserProfile', {
			method: "POST",
			body: JSON.stringify(xdata),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((updateUp) => {
				if (updateUp.status == "success") {
					getUserProfile();
					setTimeout(() => {
						setEditProShow(false);
						setStatusShow(false)
					}, 1000)
					setStatusShow((prev) => {
						return { ...prev, status: true, msg: updateUp.message }
					})
				} else {
					setStatusShow(false)
					setStatusShow((prev) => {
						return { ...prev, status: true, msg: updateUp.message }
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
					<title>User|Profile</title>
				</Head>
				<div className='userDash'>
					<div className='userPro'>
						<div className='backProfile shadow-sm'>
							<Person2Icon />
						</div>
						<div className='welcmtext'>Welcome : {userData.firstname}</div><hr />
						<div className='buttonBox' onClick={() => { shoHide(1) }} style={{ backgroundColor: yourProfile ? "#0053955e" : "#ffffff00" }} ><AccountCircleIcon /> Your Profile</div>
						<div className='buttonBox' onClick={() => { shoHide(2) }} style={{ backgroundColor: yourAddress ? "#0053955e" : "#ffffff00" }}><BusinessIcon /> Your Address</div>
						<div className='buttonBox' onClick={() => { shoHide(3) }} style={{ backgroundColor: order ? "#0053955e" : "#ffffff00" }}><ListAltIcon /> Your Order</div>
						<div className='buttonBox' onClick={() => { shoHide(4) }} style={{ backgroundColor: addAddress ? "#0053955e" : "#ffffff00" }}><AddBusinessIcon /> Add Address</div>
					</div>
					<div className='showData'>
						{yourProfile &&
							<div className='profileBack shadow-sm animate__animated animate__fadeInDown' style={{ padding: "10px" }}>
								<div className="one animate__animated animate__backInDown">
									<h1 className="textWhite mediTxts">Profile</h1>
								</div>
								<Row>
									<Col>
										<table className="table table-bordered table-light tbls">
											<thead>
												<tr>
													<th scope="col">First name</th>
													<th scope="col">Last name</th>
													<th scope="col">Email</th>
													<th scope="col">Contact no</th>
													<th scope="col">Action</th>

												</tr>
											</thead>
											<tbody>
												<tr>
													<td>{userProData.firstname}</td>
													<td>{userProData.lastname}</td>
													<td>{userProData.email}</td>
													<td>{userProData.contact_no}</td>
													<td>
														<button className='btn btn-primary btn-sm'
															onClick={() => { editProfile(userProData) }}><AutoFixHighIcon /> Edit
														</button>
													</td>
												</tr>
											</tbody>

										</table>
									</Col>
								</Row>
							</div>
						}
						{yourAddress &&
							<div className='profileBack shadow-sm animate__animated animate__fadeInDown'>
								<div className="one animate__animated animate__backInDown">
									<h1 className="textWhite mediTxts">Address</h1>
								</div>
								<Row className='d-flex d-flex justify-content-center'>
									{userAddress.map((item, saveAdd) => {
										return (
											<Col className='col-md-12' key={saveAdd}>
												<div className='saveAddBox shadow-sm'>
													<table className='table table-bordered'>
														<tbody>
															<tr>
																<td>
																	<h6>{item.fullname}</h6>
																	<p className='address_belew'> {item.address}, {item.landmark}, {item.zip_code}, {item.city_name},<br />
																		{item.phone_no}, {item.state_name}, {item.country_name}</p>
																</td>
															</tr>
														</tbody>
													</table>
													<div className='btnSection'>
														<button onClick={() => { handleShow(item) }} className='btn btn-primary btn-sm'><EditLocationAltIcon /> Edit</button> {' '}
														<button onClick={() => { deleteSaveAddressFun(item.address_id) }} className='btn btn-danger btn-sm'><DeleteForeverIcon /> Delete</button>
													</div>
												</div>
											</Col>
										)
									})}
									{userAddress.length == 0 &&
										<div className='notFound'>
											<img src='/indexImg/not.png' alt='' />
											<h5>Record not found</h5>
										</div>
									}

								</Row>
							</div>
						}
						{order &&
							<div className='profileBack shadow-sm animate__animated animate__fadeInDown'>
								<div className="one animate__animated animate__backInDown">
									<h1 className="textWhite mediTxts">Order</h1>
								</div>
								<div className='notFound'>
									<img src='/indexImg/not.png' alt='' />
									<h5>Record not found</h5>
								</div>
							</div>
						}


						{addAddress &&
							<AddAddress />
						}
						{loader && <Loader />}
					</div>

					<Offcanvas show={show} onHide={handleClose} placement='end'>
						<Offcanvas.Header closeButton className='headerTop py-2'>
							<Offcanvas.Title>Update Address</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							{alertMsg &&
								<>
									{messageShow.status &&
										<div className='alertSms'>
											<div className="alert alert-danger" role="alert">
												<div className='errow'><NearbyErrorIcon /> {messageShow.msg}</div>
											</div>
										</div>
									}
									{succMSG.status &&
										<div className='alertSms'>
											<div className="alert alert-success" role="alert">
												<div className='succ'><DoneAllIcon /> {succMSG.msg}</div>
											</div>
										</div>
									}
								</>
							}
							<form className='formDas' onSubmit={updateAddress}>
								<Row>
									<Col className='col-12 mb-4'>
										<TextField autoComplete='off' value={editUser.fullname} name="fullname" required onChange={onChangUpdateAddress} size='small' fullWidth id="" label="Full Name" variant="outlined" />
									</Col>
									<Col className='col-12 mb-4'>
										<TextField autoComplete='off' value={editUser.phone_no} name='phone_no' required onChange={onChangUpdateAddress} size='small' fullWidth id="" type='number' label="Phone Number" variant="outlined" />
									</Col>

									<Col className='col-12 mb-4'>
										<TextField autoComplete='off' value={editUser.zip_code} name='zip_code' required onChange={onChangUpdateAddress} size='small' fullWidth id="" label="Zip Code" variant="outlined" />
									</Col>
									<Col className='col-12 mb-4'>
										<FormControl fullWidth>
											<InputLabel variant="standard">
												Select Country
											</InputLabel>
											<NativeSelect onChange={(e) => { getState(e.target.value) }}
												defaultValue={editUser.country_id}
												inputProps={{
													name: 'Select Country',
													id: 'uncontrolled-native',
												}}
											>
												{country.map((item, countR) => {
													return (
														<option key={countR} value={item.country_id}>{item.country_name}</option>
													)
												})}
											</NativeSelect>
										</FormControl>
									</Col>
									<Col className='col-12 mb-4'>
										<FormControl fullWidth>
											<InputLabel variant="standard">
												Select State
											</InputLabel>
											<NativeSelect onChange={(e) => { onChangeState(e.target.value) }}
												defaultValue={editUser.state_id}
												inputProps={{
													name: 'Select State',
													id: 'uncontrolled-native',
												}}
											>
												{getstate.map((item, stster) => {
													return (
														<option key={stster} value={item.state_id}>{item.state_name}</option>
													)
												})}
											</NativeSelect>
										</FormControl>

									</Col>
									<Col className='col-12 mb-4'>
										<TextField autoComplete='off' value={editUser.city_name} name='city_name' onChange={onChangUpdateAddress} required size='small' fullWidth label="City" variant="outlined" />
									</Col>
									<Col className='col-12 mb-4'>
										<TextField autoComplete='off' value={editUser.landmark} name='landmark' onChange={onChangUpdateAddress} required size='small' fullWidth label="Landmark" variant="outlined" />
									</Col>
									<Col className='col-12 mb-4'>
										<TextField autoComplete='off' value={editUser.address} name='address' onChange={onChangUpdateAddress} required multiline size='small' fullWidth label="Address" variant="outlined" />
									</Col>
									<Col className='col-12'>
										<Button type='submit' variant="contained">Update</Button>
									</Col>
								</Row>
							</form>
						</Offcanvas.Body>
					</Offcanvas>

					{/* edit profile popup start from here */}
					<Offcanvas show={editProShow} onHide={hideEditProClose} placement='end'>
						<Offcanvas.Header closeButton className='headerTop py-2'>
							<Offcanvas.Title>Edit profile</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							{statusShow.status &&
								<>
									<div className="alert alert-success" role="alert">
										{statusShow.msg}
									</div>
								</>
							}
							<form onSubmit={updateProfileDe}>
								<div className='divSpc'>
									<TextField autoComplete='off' value={upDatePro.firstname} name="firstname" required onChange={onChangUpdateProfile} size='small' fullWidth label="First Name" variant="outlined" />
								</div>
								<div className='divSpc'>
									<TextField autoComplete='off' value={upDatePro.lastname} name="lastname" required onChange={onChangUpdateProfile} size='small' fullWidth label="Last Name" variant="outlined" />
								</div>
								<Button type='submit' variant="contained">Update</Button>
							</form>
						</Offcanvas.Body>
					</Offcanvas>
					{/* edit profile popup end*/}


				</div>
			</Layout>
		</>
	)
}


