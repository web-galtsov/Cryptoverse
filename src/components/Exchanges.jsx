import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    console.log("is::", exchangesList)
    // Note: To access this endpoint you need premium plan
    if (isFetching) return <Loader />;

    return (
        <>
            <Row >
                <Col span={6}>Exchanges</Col>
                <Col span={6} style={{textAlign:"center"}}>24h Trade Volume</Col>
                <Col span={6} style={{textAlign:"center"}}>Markets</Col>
                <Col span={6} style={{textAlign:"center"}}>Change</Col>
            </Row>
            <Row>
                 {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.uuid}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid} style={{ width: "100%" }}>
                    <Col span={6} >
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>

                    <Col span={6} style={{textAlign:"center"}}>${millify(exchange?.["24hVolume"])}</Col>
                    <Col span={6} style={{textAlign:"center"}}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6} style={{textAlign:"center"}}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
            </Row>
        </>
    );
};

export default Exchanges;
