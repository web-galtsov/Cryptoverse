import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        if (screenSize <= 800) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);


    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo"><Link to="/">Cryptoverse</Link></Typography.Title>
                <Button className="menu-control-container" onClick={handleClick}>
                    {click ? <CloseOutlined /> :  <MenuOutlined />}
                </Button>
            </div>

                <Menu theme="dark" className={click ? " nav-menu click" : "nav-menu"}>
                    <Menu.Item icon={<HomeOutlined />} onClick={closeMobileMenu}  key="1">
                        <Link to="/"> Home </Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />} onClick={closeMobileMenu}  key="2">
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />} onClick={closeMobileMenu}  key="3">
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />} onClick={closeMobileMenu}  key="4">
                        <Link to="/news" >News</Link>
                    </Menu.Item>
                </Menu>

        </div>
    );
};

export default Navbar;
