import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import bannerPic from '../../assets/images/banner.png';
import './HomePage.css';
import {useLocation} from 'react-router-dom';
function HomePage() {
    let location = useLocation();
    if(location.pathname!='/')return <></>;
    return (
        <div>
        <header>
        <h2 className='first-h2'>Reliable, efficient delivery</h2>
        <h2 className='second-h2'>Powered by Technology</h2>
        <h3>
            Our Artificial Intelligence powered tools use millions of project data
            points to ensure that your project is successful
        </h3>
        </header>
        <main>
        <div class="cards">
            <div class="card card-1">
            <h2 class="card-title">Supervisor</h2>
            <p>Monitors activity to identify project roadblocks</p>
            <img src="images/icon-supervisor.svg" alt="" />
            </div>
            <div class="mid-column">
            <div class="card card-2">
                <h2 class="card-title">Team Builder</h2>
                <p>
                Scans our talent network to create the optimal team for your
                project
                </p>
                <img src="images/icon-team-builder.svg" alt="" />
            </div>
            <div class="card card-3">
                <h2 class="card-title">Karma</h2>
                <p>Regularly evaluates our talent to ensure quality</p>
                <img src="images/icon-karma.svg" alt="" />
            </div>
            </div>
            <div class="card card-4">
            <h2 class="card-title">Calculator</h2>
            <p>
                Uses data from past projects to provide better delivery estimates
            </p>
            <img src="images/icon-calculator.svg" alt="" />
            </div>
        </div>
        </main>

        <footer>
        <p class="attribution">
            Challenge by
            <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
            >Frontend Mentor</a
            >. Coded by <a href="https://flormcalvo.github.io/">Flora Calvo</a>.
        </p>
        </footer>
        </div>
    );
};
export default HomePage;