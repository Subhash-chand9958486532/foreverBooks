import React, { useEffect, useState } from "react";
import 'aos/dist/aos.css';

export default function Loader() {

	return (
		<>
			<div className="loaderBack">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="load_bk">
								<div className="loader">
									<div className="loader-inner"></div>
									<div className="loader-inner"></div>
									<div className="loader-inner"></div>
									<div className="loader-inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>



		</>
	)
}