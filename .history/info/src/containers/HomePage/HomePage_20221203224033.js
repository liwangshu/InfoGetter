import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import './HomePage.css';
import {useLocation} from 'react-router-dom';
function HomePage() {
    // let location = useLocation();
    // if(location.pathname!='/')return <></>;
    return (
        <div>
        <header>
        <h2 className='first-h2'>Reliable & efficient information delivery</h2>
        <h2 className='second-h2'>InfoGetter</h2>
        <h3>
            Our Artificial Intelligence powered tools use millions of project data
            points to ensure that your project is successful
        </h3>
        </header>
        <main>
        <div className="cards">
            <div className="card card-1">
            <h2 className="card-title">Supervisor</h2>
            <p>Monitors activity to identify project roadblocks</p>
            <img src="images/icon-supervisor.svg" alt="" />
            </div>
            <div className="mid-column">
            <div className="card card-2">
                <h2 className="card-title">Team Builder</h2>
                <p>
                Scans our talent network to create the optimal team for your
                project
                </p>
                <img src="images/icon-team-builder.svg" alt="" />
            </div>
            <div className="card card-3">
                <h2 className="card-title">Karma</h2>
                <p>Regularly evaluates our talent to ensure quality</p>
                <img src="images/icon-karma.svg" alt="" />
            </div>
            </div>
            <div className="card card-4">
            <h2 className="card-title">Calculator</h2>
            <p>
                Uses data from past projects to provide better delivery estimates
            </p>
            <img src="images/icon-calculator.svg" alt="" />
            </div>
        </div>
        </main>

    </div>
    );
};
export default HomePage;