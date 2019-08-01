import React from 'react'
import './help.scss'
import axios from 'axios'
import { Input ,Row,Col,List,Icon} from 'antd';


class Help extends React.Component{
    constructor(){
        super();
        this.state = {
            list:[]
        }
        this.gotoHelp = this.gotoHelp.bind(this)
    }
    async componentWillMount(){
        let {data:{list}} = await axios.get('http://47.101.143.75:3100/myapi/faq?of_json=1')
        // console.log(list);
        this.setState({list})
    }
    gotoHelp(id){
        let {history} = this.props
        history.push({
            pathname:'/helpdetails',
            search:'?font='+id,
            state:id

        })
    }
    render(){
        return <div className='my-kefu-help'>
            <img src='https://static.futunn.com/futu5_help/images/mobile/help/banner-5c2054031e0075978f3a6cd47f9a835d.png' alt='' />
            <div className='help-input-div'><Input className='help-input' placeholder="请输入您遇到的问题" /></div>
            {
                this.state.list.map(item=>{
                    return <Row key={item.cid} style={{borderBottom:'1px solid #ddd',margin:'10px 0'}}>
                    <Col span={6} className='help-col'>
                        <img src={item.icon_url} alt='' style={{width:'50%'}}/>
                        <p>{item.title}</p>
                    </Col>
                    <Col span={18}>
                    <List
                        itemLayout="horizontal"
                        dataSource={item.triple}
                        renderItem={item => (
                        <List.Item key={item.tid} onClick={this.gotoHelp.bind(this,item.tid)}>{item.subject}</List.Item>
                        )}
                    />
                    </Col>
                    </Row>
                })
            }
            <Row className='kefu-help-btm'>
                <Col span={8}>
                    <Icon type="customer-service" />
                    <p>在线客服</p>
                </Col>
                <Col span={8}>
                    <Icon type='phone' />
                    <p>电话咨询</p>
                </Col>
                <Col span={8}>
                    <Icon type='mail' />
                    <p>反馈建议</p>
                </Col>
            </Row>
        </div>
    }
}

export default Help