import React, { useEffect } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
import AOS from "aos";
import "aos/dist/aos.css";

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return <Loader />;
    AOS.init({
        easing: "ease-out-cubic",
    });
  /*  useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            duration: 1200,
        });
    }, []);*/

    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={12} lg={8} ><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col xs={24} sm={12} lg={8}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col xs={24} sm={12} lg={8}><Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
                <Col xs={24} sm={12} lg={8}><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
                <Col xs={24} sm={12} lg={8}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col xs={24} sm={12} lg={8}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>


            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies"  className="btn">Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3}><Link to="/news"  className="btn">Show more</Link></Title>
            </div>
            <News simplified />
        </>
    );
};

export default Homepage;