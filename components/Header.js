import React,{ useState,useEffect } from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, AppstoreOutlined, HourglassOutlined } from '@ant-design/icons'


export default function Header(){
    useEffect(() => {
        window.addEventListener('scroll', active)
        return () => {
            window.removeEventListener('scroll',active)
        }
    }, [])
    
    const active = ()=>{
        if (window.scrollY > 0) {
            setSticky(true)
        } else{
            setSticky(false)
        }
    }

    const [sticky,setSticky] = useState(false)

    return(
        <div className={[`topNavBar ${sticky ? "sticky" : null}`]}>
            <Row type="flex" justify="center" className="topNavBar-menu">
                <Col xs={22} sm={22} md={13} lg={10} xl={8}>
                    <span className="logo">海胆</span>
                    <span className="text">前端开发爱好者</span>
                </Col>
                <Col xs={0} sm={0} md={10} lg={8} xl={8} push={2}>
                    <Menu mode="horizontal">
                        <Menu.Item key="mail" icon={<HomeOutlined />} title="首页">
                            首页
                        </Menu.Item>
                        <Menu.Item key="categories" icon={<AppstoreOutlined />} title="分类">
                            分类
                        </Menu.Item>
                        <Menu.Item key="archives" icon={<HourglassOutlined />} title="归档">
                            归档
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    ) 
}



