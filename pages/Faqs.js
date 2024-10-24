import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import 'aos/dist/aos.css';
import AOS from 'aos';
import React, { useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Layout from './Layout';

export default function Faqs() {
	useEffect(() => {
		AOS.init();
	}, [])
	return (
		<>
		<Layout>
			<Head>
				<title>FAQs</title>
			</Head>
			<div className='backDivs faqs'>
				<div className="one animate__animated animate__fadeInDown">
					<h1 className="textWhite">FAQs</h1>
					<p className='normalText'>How to... </p>
				</div>
				<Container className='mt-5'>
					<Row>
						<Col className='imgSect col-md-4 col-sm-12 col-12 animate__animated animate__bounceInLeft mt-5'>
							<img className='faqsImgs' src='/indexImg/faq.svg' />
						</Col>
						<Col className='col-md-8 col-sm-12 col-12 animate__animated animate__bounceInRight'>
							<Accordion defaultActiveKey="1" className='acco'>
								<Accordion.Item eventKey="2">
									<Accordion.Header><span className='qnoFaqs'>Q. 1.</span>  What are the salient features of ‘Together with’ series?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll  animate__animated animate__lightSpeedInRight'>
												The ‘Forever With’ series has been designed as a practice/reference material. The books cover the entire syllabus prescribed by the CBSE/ICSE Boards as well as the guidelines for Class 8-12 mentioned in the NCERT curriculum. The series covers answers to complete NCERT textbook questions along with Select NCERT Exemplar Problems in addition to questions from the Previous Years’ Boards Examinations, Other State Boards, Kendriya Vidyalayas, NCT, DAV, Higher Order Thinking Skills (HOTS), Value-based Questions, and Important Questions. The books are divided into two parts. Part I of the book contain chapters in the form of Important Points to Remember/Important Definitions and Results, mind maps, diagrams and formulae, Previous Years’ Questions & NCERT Questions based on the weightage prescribed by the relevant boards, Important Questions, Self-evaluation Tests, Let’s Recall, Project Work, etc. Part II of the book contains Latest Sample/Specimen Papers, Practice Papers, Examination Papers. The answers/solutions to the Practice Papers are published at gowebrachnasagar.com. Velcro attached with the book contains ‘Internal Assessment of Practical Work in the subjects where it is required by syllabus and Projects’ Books for classes 9 & 10.
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="3">
									<Accordion.Header><span className='qnoFaqs'>Q. 2.</span> What are the features of Scanner Series?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll  animate__animated animate__lightSpeedInRight'>
												<strong>Scanner Series</strong> is a pack of 2 books for forthcoming CBSE Board Examinations. One consists of solutions to previous 7-8 years’ questions chapterwise and the other consists of solutions to all the NCERT questions chapterwise along with select NCERT Exemplar Problems. This series is based on curriculum of classes 10 and 12. In class 12, we have covered English Core, Mathematics, Physics, Chemistry, Biology, Economics and Business studies. In class 10, we have English Communicative, Hindi (A, B), Mathematics, Science and Social Studies.
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="4">
									<Accordion.Header><span className='qnoFaqs'>Q. 3.</span> Explain important features of 15 + 1 CBSE Sample papers (EAD series).</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll animate__animated animate__lightSpeedInRight'>
												<strong>EAD Series:</strong> EAD stands for Easy, Average and Difficult level of CBSE sample papers. The idea behind introducing the concept is to prepare a student from the basic level, i.e. easy to average level and then to difficult level. It is available for class 10 and 12.

												<p className='mt-3'><strong>Features of Class 10 Sample Papers</strong></p>

												Each level consists of 2 + 2 (Two Solved and Two Unsolved) sample papers. These are followed by 3 Annual papers based on the latest CBSE pattern and 1 sealed mock paper (Unsolved) appended for final practice. Solutions to unsolved sample papers and mock paper are available at gowebrachnasagar.com.

												<p className='mt-3'><strong>Features of Class 12 Sample Papers</strong></p>

												The series comes in a pack of 2 books for each subject. Book 1 consists of level-wise papers comprising of 2 + 2 (Two Solved and Two Unsolved) sample papers. These are followed by 3 Annual papers based on the latest CBSE pattern. Book 2 consists of CBSE’s previous year’s topper’s answer sheet. It reflects the correct way of writing the answerss. Latest CBSE Examination paper has also been to observe the latest pattern finally followed by 1 sealed one mock paper (Unsolved) for final practice. Solutions to unsolved sample papers and mock paper are available at gowebrachnasagar.com
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="5">
									<Accordion.Header><span className='qnoFaqs'>Q. 4.</span> What is CBSE Pariksha?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll animate__animated animate__lightSpeedInRight'>
											<strong>CBSE Pariksha</strong> is a unique set of three examination papers strictly designed on the CBSE pattern of examination with a sample answer sheet to test the knowledge and understanding of the students before the final Board Examinations. Students are expected to solve one paper and send back to us for evaluation. Toppers will be rewarded by the company.
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="6">
									<Accordion.Header><span className='qnoFaqs'>Q. 5.</span> Who is to be approached in case of any queries related to a particular subject?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll animate__animated animate__lightSpeedInRight'>
											You can communicate with the company by way of telephone/post/email or through any other means of communication which is convenient to you and certainly your queries will be taken care of at <mark>editorial@rachnasagar.in</mark>
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="7">
									<Accordion.Header><span className='qnoFaqs'>Q. 6.</span> How to get complementary/specimen copies of RSPL’s books?particular subject?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll animate__animated animate__lightSpeedInRight'>
											Usually our sales representatives provide specimen copies to teachers/principals at their respective schools/residence/coaching institutes. In case you are not able to get a copy, you are WELCOME to contact us at  
											<mark>specimen@rachnasagar.in.</mark>
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="8">
									<Accordion.Header><span className='qnoFaqs'>Q. 7.</span> For which boards, do you prepare books?subject?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll animate__animated animate__lightSpeedInRight'>
											CBSE, ICSE, State Boards and some products for abroad.
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="9">
									<Accordion.Header><span className='qnoFaqs'>Q. 8.</span> If we don’t find the book of your publication at our nearest bookshop, what shall we do?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll animate__animated animate__lightSpeedInRight'>
											Call us at our helpline line number 011-43585858 (Monday- Saturday: 10:00 AM to 06:30 PM ,2nd Saturday Off). Our friendly staff will assist you or you can direct order us and we will send you through courier against advance payment.
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="10">
									<Accordion.Header><span className='qnoFaqs'>Q. 9.</span> How do we know that your book is being published?</Accordion.Header>
									<Accordion.Body>
										<div className='row_answith'>
											<div className='andDiv'>Ans.</div>
											<div className='ansAll animate__animated animate__lightSpeedInRight'>
											You can visit our website rachnasagar.in for the catalogue or can call at our “Help Desk”.
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>


							</Accordion>
						</Col>

					</Row>
				</Container>
			</div>
			</Layout>
		</>
	)
}
