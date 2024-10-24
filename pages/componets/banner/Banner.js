import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
export default function Banner() {
	return (
		<>
			<div className="bannerSection ">
				<div className="dataFlow"></div>
				<Carousel>
					<Carousel.Item>
						<div className="bannerItem">
							<img src="/banner/bg1.png" />
							<div className="upSkill animate__animated animate__bounceInLeft animate__delay-0.5s">Upskill your Learning</div>
							<div className="via animate__animated animate__bounceInRight animate__delay-1s">via</div>
							<img className="logos animate__animated animate__rotateInDownLeft animate__delay-2s" src="/banner/logoBanner.png" />
							<div className="toatain animate__animated animate__rotateInDownRight animate__delay-3s">to attain subject-proficiency</div>
							<div className="cricleBanner animate__animated animate__zoomIn">
								<div className="box1">
									<div className="circle1"></div>
								</div>
							</div>
							<img className="cricleSection animate__animated animate__zoomIn" src="/banner/Circle.png" />
						</div>
					</Carousel.Item>
					<Carousel.Item>
						<div className="bannerItem">
							<img src="/banner/bg2.png" />
							<div className="exclu animate__animated animate__fadeInDown animate__delay-0.5s">Exclusive Series of</div>
							<div className="textbook animate__animated animate__backInDown animate__delay-1s">Textbooks with</div>
							<div className="concept animate__animated animate__rotateInUpRight animate__delay-2s">Concept-Based Insights</div>
							<img className="book2Bnr animate__animated animate__rotateInDownLeft animate__delay-1s" src="/banner/book2.png" />
							<div className="vert_move">
								<img className="book1Bnr animate__animated animate__rotateInDownRight animate__delay-1s" src="/banner/book1.png" />
							</div>
						</div>
					</Carousel.Item>
					<Carousel.Item>
						<div className="bannerItem">
							<img src="/banner/bg3.png" />
							
							<div className="steps animate__animated animate__fadeInDown animate__delay-0.5s">Take a step ahead</div>
							<div className="towards animate__animated animate__fadeInDown animate__delay-1s">Towards The Educational </div>
							<div className="advance animate__animated animate__fadeInDown animate__delay-2s">Advancement</div>
							<div className="txtForever animate__animated animate__fadeInDown animate__delay-3s">FOREVER</div>
							<img className="boys animate__animated animate__fadeInRight animate__delay-1s" src="/banner/boys.png"/>
						</div>
					</Carousel.Item>
					</Carousel>
			</div>
		</>
	)
}
