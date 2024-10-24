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
				<div className='baner_wrapper'><img src='/indexImg/termbanner.webp' /></div>
			</div>
			<div className='contentSections'  data-aos="zoom-in">
				<Container>
					<div className='mainDiv'>
						<p className='runTextP'>The term ‘User’ shall refer to the user who is browsing the Website. The term ‘Swa-Adhyayan’ shall refer to Swa-Adhyayan and/or its affiliates/subsidiary companies. The term ‘Site’ refers to <Link href="https://books.foreverbooks.co.in/">books.foreverbooks.co.in</Link> </p>
					</div>
					<div className='mainDiv'>
						<p className='runTextP'>By using the Site, you agree to follow and be bound by the following terms and conditions concerning your use of the Site. Swa-Adhyayan may revise the Terms of Use at any time without any notice.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>All the content present on this site is the exclusive property of Swa-Adhyayan. The software, text, images, graphics, video and audio used on this site solely belong to Swa-Adhyayan. No material from this site may be copied, modified, reproduced, republished, uploaded, transmitted, posted or distributed in any form, whatsoever without prior written permission from Swa-Adhyayan. All rights not expressly granted herein are reserved. Unauthorized use of the materials appearing on this site may violate copyright, trademark and other applicable laws, and could result in criminal and/or civil penalties.</p>
					</div>
					
					<div className='mainDiv'>
						<p className='runTextP'>Swa-Adhyayan does not make any warranties, express or implied, including without limitation, those of merchantability and fitness for a particular purpose, with respect to any information, data, statements or products made available on the Site.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>Swa-Adhyayan does not accept any responsibility towards the contents and/or information practices of third party Sites, which have links through Swa-Adhyayan Site. The said links to internal or external website locations are only for the purpose of facilitating your visit or clarifying your query.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>The Site, and all content, materials, information, software, products and services provided on the Site, are provided on an ‘as is’ and ‘as available’ basis. Swa-Adhyayan expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose and non-infringement.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>Swa-Adhyayan shall have no responsibility for any damage to a User's computer system or loss of data that may result from the download of any content, materials and information from the Site.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>The User agrees to indemnify, defend and hold Swa-Adhyayan harmless from and against all losses, expenses, damages and costs, including reasonable attorneys' fees, arising out of or relating to any misuse by the User of the content and services provided on the Site.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>The information contained in the Site has been obtained from sources believed to be reliable. Swa-Adhyayan disclaims all warranties as to the accuracy, completeness or adequacy of such information.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>The User's right to privacy is of paramount importance to Swa-Adhyayan. Any information provided by the User will not be shared with any third party. Swa-Adhyayan reserves the right to use the information to provide the User a personalized online experience.</p>
					</div>
					<div className='mainDiv'>
						<p className='runTextP'>The Site provides links to Websites and access to content, products and services from third parties, including users, advertisers, affiliates and sponsors of the Site. You agree that Swa-Adhyayan is not responsible for the availability of, and content provided on, third party Websites. The User is requested to peruse the policies posted by other Websites regarding privacy and other topics before use.</p>
					</div>

					<div className='mainDiv'>
						<p className='runTextP'>Swa-Adhyayan reserves the right in its sole discretion to review, improve, modify or discontinue, temporarily or permanently, the Site or any content or information on the Site with or without notice to User. User agrees that Swa-Adhyayan shall not be liable to User or any third party for any modification or discontinuance of the Site.</p>
					</div>


					



				</Container>
			</div>
			</Layout>
		</>
	)
}
