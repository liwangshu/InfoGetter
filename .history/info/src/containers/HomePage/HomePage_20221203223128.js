import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import bannerPic from '../../assets/images/banner.png';
import './HomePage.css';
import {useLocation} from 'react-router-dom';
function HomePage() {
let location = useLocation();
if(location.pathname!='/')return <></>;
return (
    <div className='Home'>

        <div className='Banner'>
            <img src={bannerPic} alt='bannerPic' />
        </div>
        <Container>
            <Row>
                <Col>
                    <div className='KeylineContainer'>
                        <div className="box_title">We don't ship. We're not real</div>
                        <div className="box_content">
                            We sell shirts. We are passionate about selling shirts.
                            But keep in mind we have no infrasturcture, supply chain, or mechanism to actually produce these shirts or fulfill the orders.
                            But the shirts will always be real in your imagination.
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className='KeylineContainer'>
                        <div className="box_title">Desgin your own shirt! But help us do that...</div>
                        <div className="box_content">
                            Not only do we not sell shirts, but we let you design your own!
                            Eventually. We actually kinda need your help implementing that.
                            If you could build an actual paint-style interface that you can make
                            desgins in that would be great :)
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
);
};
export default HomePage;