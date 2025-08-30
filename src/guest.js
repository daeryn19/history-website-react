import React from 'react';
import './guest.css';
import { Link, useNavigate } from 'react-router-dom';

const periods = [
    { name: "1 - 1000 d.Hr.", path: '/periods/1-1000' },
    { name: "1001 - 1500 d.Hr.", path: '/periods/1001-1500' },
    { name: "1501 - 1700 d.Hr.", path: '/periods/1501-1700' },
    { name: "1701 - 1800 d.Hr.", path: '/periods/1701-1800' },
    { name: "1801 - 1900 d.Hr.", path: '/periods/1801-1900' },
    { name: "1901 - 1950 d.Hr.", path: '/periods/1901-1950' },
    { name: "1951 - 2000 d.Hr.", path: '/periods/1951-2000' }
];


const countries = [
    { name: "England", path: '/countries/england' },
    { name: "France", path: '/countries/france' },
    { name: "Germany", path: '/countries/germany' },
    { name: "Norway", path: '/countries/norway' },
    { name: "Romania", path: '/countries/romania' },
    { name: "Russia", path: '/countries/russia' },
    { name: "USA", path: '/countries/usa' }
];

const regions = [
    { name: "Africa", path: '/regions/africa' },
    { name: "Asia", path: '/regions/asia' },
    { name: "Europe", path: '/regions/europe' },
    { name: "North America", path: '/regions/north-america' },
    { name: "Australia", path: '/regions/australia' },
    { name: "South America", path: '/regions/south-america' },
    { name: "Antarctica", path: '/regions/antarctica' }
];


function Guest() {

    const navigate = useNavigate();

    return (
        <div className="guest-container">
            <div className="guest-header">
                <button className="home-button" type="button" onClick = {() => navigate('/')}>
                    Home
                </button>
                <span className="header-title">HISTODOCS</span>
            </div>
            <div className="guest-bg">
                <div className="guest-box">
                    <p>Perioade:</p>
                        {periods.map(period => (
                            <Link className="guest-link" to={period.path} key={period.name}>
                                {period.name}
                            </Link>
                        ))}
                </div>
                <div className="guest-box">
                    <p>Tari:</p>
                        {countries.map(country => (
                            <Link className="guest-link" to={country.path} key={country.name}>
                                {country.name}
                            </Link>
                        ))}
                </div>
                <div className="guest-box">
                    <p>Regiuni:</p>
                        {regions.map(region => (
                            <Link className="guest-link" to={region.path} key={region.name}>
                                {region.name}
                            </Link>
                        ))}
                </div>
            </div>
            <div className = "guest-footer">
                Contact
            </div>    
        </div>
    );
}

export default Guest;