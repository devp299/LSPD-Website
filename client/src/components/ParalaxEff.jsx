import {React} from 'react';

import '../paralaxEffect/css/main.css';
import '../paralaxEffect/css/fonts/raleway-black.woff2';
import '../paralaxEffect/css/fonts/raleway-regular.woff2';
import '../paralaxEffect/css/gsap/gsap.min.js'
import '../paralaxEffect/css/gsap/ScrollSmoother.min.js'
import '../paralaxEffect/css/gsap/ScrollTrigger.min.js'

const ParalaxEff = () => {
    return (
        <div className="wrapper">
		<div className="content">

			<header className="main-header">
				<div className="layers">
					<div className="layer__header">
						<div className="layers__caption">Welcome to Parallax</div>
						<div className="layers__title">Dev Alphaspace</div>
					</div>
					<div className="layer layers__base"></div>
					<div className="layer layers__middle"></div>
					<div className="layer layers__front"></div>
				</div>
			</header>
		
			<div className="main-article" style="background-image: url(img/dungeon.jpg);">
				<div className="main-article__content">
					<h2 className="main-article__header">Follow For More</h2>
					<p className="main-article__paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis sed obcaecati maxime labore. Reprehenderit culpa consequatur dolore est a debitis!</p>
				</div>
			</div>
		</div>
	</div>
    )
}

export default ParalaxEff;