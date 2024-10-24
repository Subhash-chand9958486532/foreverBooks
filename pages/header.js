import Head from 'next/head';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Row, Col, Container } from 'react-bootstrap';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Image from 'next/image';
import small from 'public/indexImg/small.png';
import logoMain from 'public/indexImg/logo.png';
import Marquee from "react-fast-marquee";
import MenuIcon from '@mui/icons-material/Menu';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CloseIcon from '@mui/icons-material/Close';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css';
import { Context } from './componets/store';
import { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FixedLoader from './FixedLoader';
export default function header(req) {
	const [logbutton, setlogbutton] = useState(true);
	const [afterLog, setafterLog] = useState(false);
	const { apiBase, userData, num, token, productPath } = useContext(Context);
	const router = useRouter();
	const currentRoute = router.pathname;
	const IndexData = [
		{
			"id": "1",
			"menuName": "Home",
			"linkPath": "/",
			"activeClass": "active",
		},
		// {
		// 	"id": "2",
		// 	"menuName": "About",
		// 	"linkPath": "/about-us",
		// 	"activeClass": "active",
		// },
		{
			"id": "3",
			"menuName": "Our Product",
			"linkPath": "/our-product",
			"activeClass": "active",
		},
		{
			"id": "4",
			"menuName": "Catalogue",
			"linkPath": "/catalogue",
			"activeClass": "active",
		},
		{
			"id": "5",
			"menuName": "Bookstore Locator",
			"linkPath": "/books-locator",
			"activeClass": "active",
		},
		{
			"id": "6",
			"menuName": "Contact",
			"linkPath": "/contact-us",
			"activeClass": "active",
		},
	];
	const [showLogin, setLogin] = useState(false);
	function closeLog() {
		setLogin(false)
	}
	const [showSearch, setShowSearch] = useState(false);
	const [menu, setmenu] = useState(false);
	const showSearchPopup = () => { setShowSearch(false); }
	const menuSection = () => { setmenu(false); }
	const handleShow = () => { setShowSearch(true); }
	function navigation2() {
		setmenu(true);
	}
	if (userData.isLogin) {
	}
	function logout() {
		localStorage.removeItem("token");
		router.push('/')
		setTimeout(() => {
			window.location.reload()
		}, 1200)
	}

	const [blankMsg, setMesg]=useState(false)
	const [errorStatus, seterrorStatus] = useState(false)
	const [seacthItem, setseacthItem] = useState("");
	const handleChange = event => {
		setseacthItem(event.target.value);
	};
	const [loader, setLoader] = useState(false);
	const [searchingBooks, setSearchingBooks] = useState([]);
	const [imagCover, setimagCover] = useState();

	const [errorMsg, seterrorMsg] = useState("")
	function searchBooks(e) {
		e.preventDefault();
		setLoader(true)
		const postData = {
			"searchString": seacthItem,
			"token": token
		}

		if(seacthItem!==""){
		fetch(apiBase + 'searchBooks', {
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
					let imgs = userData.data[0]?.productDesc[0]?.product_cover_image;
					
					setimagCover(imgs)

					setSearchingBooks(userData.data);
					seterrorStatus(false);
					setMesg(false);
				} else {
					seterrorStatus(true);
					seterrorMsg(userData.message);
					setSearchingBooks([])
					setMesg(false);
				}
			})
			.catch((catch_err) => {
				alert(catch_err.message)
			})
			.finally(() => {
				setLoader(false)
			})
		}else{
			seterrorStatus(true);
			setLoader(false);
			setMesg(true)
		}

	}
	function goDetails(slug) {
		let productSlug = slug
		router.replace({
			pathname: '/product/' + productSlug,
		})
		// setTimeout(() => {
		// 	window.location.reload()
		// }, 100);
	}
	// console.log(imgs, "imgs")
	return (
		<>
			<Head>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
				<meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
				{/* <meta http-equiv="Content-Security-Policy" content="script-src 'self' https://cdn.jsinit.directfwd.com; ..."/> */}
				<link rel="icon" href="/indexImg/small.png" />
			</Head>
			<header>
				<Container fluid className='topSections'>
					<Row>
						<Col className='col-md-4 col-sm-4 col-4'>
							<div className='box_1'>
								<div className='section_1'>
									<small className='icon_text'>
										<div><MailOutlineIcon className='icons' /></div>
										<div>Email Us: <br />info@forever.co.in</div>
									</small>
								</div>
								<div className='section_1'>
									<small className='icon_text'>
										<div><AccessAlarmIcon className='icons' /></div>
										<div>Visiting Hours: <br />09:30 AM - 06:00 PM</div>
									</small>
								</div>
							</div>
						</Col>
						<Col className='col-md-4 col-sm-4 col-4' >
							<div className='centerSection'>
								<Marquee pauseOnHover={true} gradient={false} direction={'left'} className='textAnimate' >
									Deal- Light to Welcome Super Bonanza Offer & Extra Benefits! 'Forever with' books.
								</Marquee>
							</div>
						</Col>
						<Col className='col-md-4 col-sm-4 col-4'>
							<div className='box_1'>
								<div className='section_1'>
									<small className='icon_text'>
										<div><LocationOnIcon className='icons' /></div>
										<div>4583/15, Opp. LIC Building,<br />  Daryaganj, 110002</div>
									</small>
								</div>
								<div className='section_1 '>
									<small className='icon_text rightSec'>
										<div><PhoneIcon className='icons' /></div>
										<div>Call us for any question <br /> 011 - 43585858,  23285568</div>
									</small>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<div className='LogoNaviSec shadow-lg'>
					<div onClick={() => { navigation2() }} className='menuAndroid'>
						<MenuIcon />
					</div>
					<Image src={small} alt="Forever Books" className='onlyMobile' />
					<Container fluid>
						<Row>
							<Col className='col-md-9 col-sm-9 col-3 hideAndroid'>
								<Navbar expand="lg" className='p-0'>
									<Container fluid>
										<Navbar.Brand href="/">
											<Image src={logoMain} alt="Forever Books" className='logo' />
										</Navbar.Brand>
										<Navbar.Toggle aria-controls="navbarScroll" className='toggles' />
										<Navbar.Collapse id="navbarScroll">
											<Nav
												className="me-auto my-2 my-lg-0 newNavs">
												<ul className='menu_nab mb-0'>
													{IndexData.map((menuitem, menMenu) => {
														return (
															<Link key={menMenu} href={menuitem.linkPath} className={currentRoute === `${menuitem.linkPath}` ? styles.active : styles.nonActive}>
																{menuitem.menuName}
															</Link>
														)
													})}
												</ul>

											</Nav>
										</Navbar.Collapse>
									</Container>
								</Navbar>
							</Col>
							<Col className='col-md-3 col-sm-12 col-12 offset-col-3 forWidth'>
								<div className='SectionActions'>
									{userData.isLogin ?
										<Dropdown>
											<Dropdown.Toggle id="dropdown-button-light-example1 " variant="light">
												<AccountCircleIcon /> <span className='wlcmFnm'> {userData.firstname}</span>
											</Dropdown.Toggle>
											<Dropdown.Menu variant="primary">
												<Dropdown.Item href="" onClick={logout}><LogoutIcon /> Logout</Dropdown.Item>
												<Dropdown.Divider />
												<Dropdown.Item><Link href="/Profile"> <Person2Icon /> Profile</Link></Dropdown.Item>
												<Dropdown.Divider />
												<Dropdown.Item><Link href="/Wish-list"><FavoriteIcon /> Wishlist</Link></Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										: <Link href='/Login'> <div id='logButton_id' className='sectionText'>Login</div></Link>
									}
									<div className='sectionText cart_notivat'><Link href='/cart'><ShoppingCartIcon /><div style={{ backgroundColor: num ? '#dc3545' : '#9990' }} className='notivationNo'>{num}</div></Link></div>{' '}
									<div className='sectionText' onClick={handleShow}><span className='searchTextHid'>Search</span> <SearchIcon /></div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
				{showLogin &&
					<div className='LoginForm'>
						<div className='whiteBox animate__animated animate__fadeInDown'>
							<CloseIcon className='closeBtn' onClick={() => closeLog()} />
							<div className='imagesSection'>
								<img src="/indexImg/log.svg" alt="" />
							</div>
							<div className='loginSection'>
								<div className="form_bg">
									<div className="container">
										<form className="form_horizontal">
											<div className="form_icon"><i className="fas fa-user-circle"></i></div>
											<h3 className="title">Login</h3>
											<div className="form-group">
												<span className="input_icon"><i className="far fa-user"></i></span>
												<input className="form-control" type="email" placeholder="Username" />
											</div>
											<div className="form-group">
												<span className="input_icon"><i className="fas fa-lock"></i></span>
												<input className="form-control" type="password" placeholder="Password" />
											</div>
											<button className="btn signin">Login</button>
											<ul className="form-options">
												<li><a href="">Forgot Password?</a></li>
												<li><a href="">Create New Account <i className="fa fa-arrow-right"></i></a></li>
											</ul>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>

				}
				<Offcanvas show={showSearch} onHide={showSearchPopup} backdrop="static" placement={"end"} className="popShow">
					<Offcanvas.Header closeButton className='headers_books'>
						<Offcanvas.Title>Search Book</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>

						<form onSubmit={searchBooks}>
							<div className='rowinpuOrbtn'>
								<input type='text' className='form-control' placeholder='Search...' onChange={handleChange} />
								<button className='btn btn_search' type='submit'><SearchIcon /></button>
							</div>
						</form>

						<div className='booksArea'>
							{errorStatus &&
								<div class="alert alert-warning" role="alert">
									{errorMsg}
									{blankMsg && 
										<div>Please enter book name</div>
									}
								</div>
							}

							{loader &&
								<FixedLoader />
							}
							{searchingBooks.map((item, pids) => {
								console.log(searchingBooks, "*/-*/")
								return (

									<div onClick={() => { goDetails(item.product_slug) }}>
										<div className='searchBoxRow' key={pids}>
											<div className='titlePageH'><img src={`${productPath}` + imagCover} /></div>
											<div>
												<div className='pname'>{item.product_name}</div>
												<div className='pname'><b>ISBN</b> : {item.isbn_number}</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</Offcanvas.Body>
				</Offcanvas>



				<Offcanvas show={menu} onHide={menuSection} backdrop="static" placement={"start"} className="popShow">
					<Offcanvas.Header closeButton className='headers_books'>
						<Offcanvas.Title>Menu</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body className="menuBody">
						<ul className='android_menu'>
							{IndexData.map((menuitem, keynav) => {
								return (
									<li key={keynav}>
										<Link href={menuitem.linkPath} className={currentRoute === `${menuitem.linkPath}` ? styles.active : styles.nonActive}>
											{menuitem.menuName}
										</Link>
									</li>
								)
							})}
						</ul>
					</Offcanvas.Body>
				</Offcanvas>
			</header>


		</>
	)
}