import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import Layout from './Layout';
import { Context } from './componets/store';
import { useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Loader from './Loader';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import DoneAllIcon from '@mui/icons-material/DoneAll';
export default function AddAddress() {
	const { userData, apiBase, token, getSaveAddress } = useContext(Context);
	const [country, setcountry] = useState([]);
	const [loader, setloader] = useState(false);
	const [getstate, setState] = useState([]);
	const [countUds, setCountryIds] = useState();
	const [staId, setstaId] = useState();
	const [alertMsg, setAlertMsg] = useState(true);
	const [errorDiv, seterrorDiv] = useState(true);
	const [messageShow, SetmessageShow] = useState({ status: false, msg: "" });
	const [succMSG, SetsuccMSG] = useState({ status: false, msg: "" });

	useEffect(() => {
		getCountry()
		AOS.init();
	}, []);


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
					alert("not")
				}
			})
			.finally(() => {
				setloader(false)
			})
	}
	function onChangeState(id) {
		let statIds = id;
		setstaId(statIds)
	}
	const [addAddre, setAddre] = useState({
		firstName: "",
		contact: "",
		address: "",
		zipCode: "",
		countryIds: "",
		stateIds: "",
		cityIds: "",
		landmark: "",

	});

	const { firstName, contact, address, zipCode, cityIds, landmark, countryIds, stateIds } = addAddre;
	const onChangAddAddress = e => {
		setAddre({ ...addAddre, [e.target.name]: e.target.value });
	}
	function addAddressFun(e) {
		setloader(true)
		e.preventDefault();
		const postData = {
			"customer_id": userData.customer_id,
			"fullname": addAddre.firstName,
			"phone_no": addAddre.contact,
			"address": addAddre.address,
			"zip_code": addAddre.zipCode,
			"country_id": countUds,
			"state_id": staId,
			"landmark": addAddre.landmark,
			"city": addAddre.cityIds,
			"token": token
		}
		console.log(postData, "subhash")
		fetch(apiBase + 'addNewAddress', {
			method: "post",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then((addNew) => {
				if (addNew.status == "success") {
					seterrorDiv(true);
					getSaveAddress()
					SetmessageShow(false);
					SetsuccMSG((prev) => {
						return { ...prev, status: true, msg: addNew.message }
					})
				} else {
					SetsuccMSG(false)
					SetmessageShow((prev) => {
						return { ...prev, status: true, msg: addNew.message }
					})
				}
			})
			.finally(() => {
				setloader(false)
			})
	}
	// hide Understand start

	return (
		<>
			<Head>
				<title>User|Profile</title>
			</Head>
			<div className='profileBack shadow-sm animate__animated animate__fadeInDown'>
				<div className="one animate__animated animate__backInDown">
					<h1 className="textWhite mediTxts">Add Address</h1>
				</div>
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

				<form className='formDas' onSubmit={addAddressFun}>
					<Row>
						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<TextField autoComplete='off' value={firstName} name='firstName' required onChange={e => onChangAddAddress(e)} size='small' fullWidth id="" label="Full Name" variant="outlined" />
						</Col>
						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<TextField autoComplete='off' inputProps={{ maxLength: 12 }} value={contact} name='contact' required onChange={e => onChangAddAddress(e)} size='small' fullWidth id="" type='number' label="Phone Number" variant="outlined" />
						</Col>

						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<TextField autoComplete='off' maxRows={1} value={zipCode} name='zipCode' required onChange={e => onChangAddAddress(e)} size='small' fullWidth id="" label="Zip Code" variant="outlined" />
						</Col>
						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<FormControl size='small' fullWidth>
								<InputLabel id="demo-simple-select-label w-15">Select Country</InputLabel>
								<Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select Country"
									onChange={(e) => { getState(e.target.value) }}
								>
									{country.map((item, count) => {
										return (
											<MenuItem key={count} value={item.country_id}>{item.country_name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Col>
						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<FormControl size='small' fullWidth>
								<InputLabel id="demo-simple-select-label w-15">Select State</InputLabel>
								<Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select State"
									onChange={(e) => { onChangeState(e.target.value) }}
								>
									{getstate.map((item, stt) => {
										return (
											<MenuItem key={stt} id={item.state_id} value={item.state_id}>{item.state_name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Col>
						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<TextField autoComplete='off' value={cityIds} name='cityIds' onChange={e => onChangAddAddress(e)} required size='small' fullWidth label="City" variant="outlined" />
						</Col>
						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<TextField autoComplete='off' value={landmark} name='landmark' onChange={e => onChangAddAddress(e)} required size='small' fullWidth label="Landmark" variant="outlined" />
						</Col>
						<Col className='col-md-3 col-sm-6 col-12 mb-5'>
							<TextField autoComplete='off' value={address} name='address' onChange={e => onChangAddAddress(e)} required multiline size='small' fullWidth label="Address" variant="outlined" />
						</Col>
						<Col className='col-md-3 col-sm-6 col-12'>
							<Button type='submit' variant="contained">Add Address</Button>
						</Col>
					</Row>
				</form>


				{loader && <Loader />}
			</div>
		</>
	)
}


