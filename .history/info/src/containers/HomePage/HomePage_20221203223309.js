import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import bannerPic from '../../assets/images/banner.png';
import './HomePage.css';
import {useLocation} from 'react-router-dom';
function HomePage() {
let location = useLocation();
if(location.pathname!='/')return <></>;
return (
    
);
};
export default HomePage;