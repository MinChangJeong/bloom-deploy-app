import React from 'react';
import './Intro.css';
import { Link } from 'react-router-dom';
import logo from '../img/Bloom_logo.png';
import bloom from '../img/Bloom4.png';

function Intro(props) {
    return (
        <Link className="container" to="/explore">
            <div className="box">
                <img 
                    src={bloom}
                    className="logo"
                />
            </div>
        </Link>
    );
}

export default Intro;
