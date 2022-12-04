import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import './HomePage.css';
import {useLocation} from 'react-router-dom';
function HomePage() {
    // let location = useLocation();
    // if(location.pathname!='/')return <></>;
    return (
        <div>
        <body>
        <header>
        <h2 className='first-h2'>Reliable & efficient information delivery</h2>
        <h2 className='second-h2'>InfoGetter</h2>
        <h3>
            Made by Xiaoxuan Cui, Wangshu Li, YiHua Zhou and Youchuan Liu
        </h3>
        </header>
        <main>
        <div className="cards">
            <div className="card card-1">
            <h2 className="card-title">Weather</h2>
            <p>weather</p>
            <img src="images/icon-supervisor.svg" alt="" />
            </div>
            <div className="mid-column">
            <div className="card card-2">
                <h2 className="card-title">News</h2>
                <p>
                news
                </p>
                <img src="images/icon-team-builder.svg" alt="" />
            </div>
            {/* <div className="card card-3">
                <h2 className="card-title">Twitter</h2>
                <p>Regularly evaluates our talent to ensure quality</p>
                <img src="images/icon-karma.svg" alt="" />
            </div> */}
            </div>
            <div className="card card-4">
            <h2 className="card-title">Twitter</h2>
            <p>
                twitter
            </p>
            <img src="images/icon-calculator.svg" alt="" />
            </div>
        </div>
        </main>
        </body>
    </div>
    );
};
export default HomePage;