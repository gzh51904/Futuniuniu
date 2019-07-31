import React from 'react'
import { Row, Col } from 'antd'
import './grow.scss'

class GrowTask extends React.Component {
    constructor() {
        super();
        this.state = {
            datalist: [{
                h2: '新手奖励',
                p: '了解如下产品功能，领取奖励',
                icon: 'https://static.futunn.com/upload/credit/task_package/card_bg/20190419/pkg_level_01_icon-1fb72c27f6c69b8c892746411f48b368.png',
                list: [{
                    h4: '阅读一篇新闻资讯',
                    num: '5',
                    icon: 'https://postimg.futunn.com/201904230002280317e2295b57b.png/logo'
                }, {
                    h4: '添加一个自选股',
                    num: '30',
                    icon: 'https://postimg.futunn.com/2019042300022813c0c09e301ff.png/logo'
                }, {
                    h4: '关注一个牛友',
                    num: '10',
                    icon: 'https://postimg.futunn.com/2019042400022869d3b9854b6d9.png/logo'
                }]
            }, {
                h2: '进阶奖励',
                p: '学习如何投资港美股',
                icon: 'https://static.futunn.com/upload/credit/task_package/card_bg/20190419/pkg_level_02_icon-088e6985e7c5c4a2f11c387fdeb41657.png',
                // list:[{
                //     h4:'',
                //     num:'',
                //     icon:''
                // },{
                //     h4:'',
                //     num:'',
                //     icon:''
                // },{
                //     h4:'',
                //     num:'',
                //     icon:''
                // }]
            }, {
                h2: '开启投资之路',
                p: '开户入金，真枪实弹上战场',
                icon: 'https://static.futunn.com/upload/credit/task_package/card_bg/20190419/pkg_level_03_icon-0b586af5885c91dfeadc42d45ba99819.png',
                // list:[{
                //     h4:'',
                //     num:'',
                //     icon:''
                // },{
                //     h4:'',
                //     num:'',
                //     icon:''
                // },{
                //     h4:'',
                //     num:'',
                //     icon:''
                // }]
            }]
        }
    }
    render() {
        return <div className='task-grow'>
            {
                this.state.datalist.map(item => {
                    return <div key={item.h2} className='task-grow-h2'>
                        <Row className='h2-row'>
                            <Col span={6}>
                                <img src={item.icon} alt='' />
                            </Col>
                            <Col span={18}>
                                <h2>{item.h2}</h2>
                                <h3>{item.p}</h3>
                            </Col>
                        </Row>
                        {
                            (item.list != null) ? <div className='task-grow-h4'>{
                                item.list.map(item => {
                                    return <Row className='h4-row' key={item.h4}>
                                        <Col span={6}>
                                            <img src={item.icon} alt='' />
                                        </Col>
                                        <Col span={12}>
                                            <h4>{item.h4}</h4>
                                            <h6>积分 +{item.num}</h6>
                                        </Col>
                                        <Col><span>去完成</span></Col>
                                    </Row>
                                })
                            }</div> : null
                        }

                    </div>
                })
            }
        </div>
    }

}

export default GrowTask