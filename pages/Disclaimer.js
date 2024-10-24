import { Container } from 'react-bootstrap';
import Head from 'next/head'
import Link from 'next/link';
import Layout from './Layout';
export default function PrivacyPolicy() {
	return (
		<>
		<Layout>
			<Head>
				<title>Terms-and-conditions</title>
			</Head>
			<div className='Bann'>
				<div className='baner_wrapper'><img src='/indexImg/disbanner.webp' /></div>
			</div>
			<div className='contentSections'  data-aos="zoom-in">
				<Container>
					<div className='mainDiv'>
						<p className='runTextP'>The information contained in swaadhyayan.com is for general information purposes only. While swaadhyayan.com makes the effort to keep the information upgraded and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the information, products, services, or related graphics contained in this website, for any purpose. Any reliance you place on such information is strictly at your own risk. Swaadhyayan.com takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control. </p>
					</div>
				</Container>
			</div>
			</Layout>
		</>
	)
}
