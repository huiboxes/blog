import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col } from 'antd'

export default function Detailed() {
    return (
        <>
            <Head>
                <title>Detailed</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={14} xl={12} style={{ backgroundColor: "pink" }}>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={4} xl={4} style={{ backgroundColor: "black" }}>

                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br />
                </Col>
            </Row>
        </>
    )
}
