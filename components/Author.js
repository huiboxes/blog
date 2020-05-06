import { Avatar, Divider } from 'antd'
import { WechatOutlined, GithubOutlined, QqOutlined } from '@ant-design/icons'
import '../public/style/components/author.css'

export default function Author(){
    return (
        <div className="author-frame comm-frame">
            <div><Avatar size={120} shape="square" src="http://aftert.life:888/images/tx.png" /></div>
            <div className="author-introduction">
                <div><span className="name">谢少辉</span></div>
                <span>记录学习生活</span>
                <Divider>社交帐号</Divider>
                <Avatar size={28} className="account" icon={<WechatOutlined />}/>
                <Avatar size={28} className="account" icon={<GithubOutlined />}/>
                <Avatar size={28} className="account" icon={<QqOutlined />}/>
            </div>
        </div>
    )
}