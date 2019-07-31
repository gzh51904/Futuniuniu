import React from 'react';
// import axios from 'axios';
import { Carousel, WingBlank } from 'antd-mobile';
import './noticebar.scss';
const axios = require("axios")
class NoticeBar extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [0, 1,],
        }
    }
    componentWillMount() {
        this.ajax();
    }
    async ajax() {
        const { data: { data: shdata } } = await axios.get(`http://47.101.143.75:3100/api/quote/index-quote?_=${new Date().getTime()}`);

        this.setState({
            data: [...shdata.indexList,]
        })
        // console.log(sbdata, shdata, sddata)
    }
    render() {
        return (
            <div style={{ position: "relative" }} className="noticebar">
                <WingBlank>
                    <Carousel className="my-carousel"
                        vertical
                        dots={false}
                        dragging={false}
                        swiping={false}
                        autoplay
                        infinite
                    >
                        {
                            this.state.data.map((item, idx) => {
                                return (
                                    <div className={item.change_ratio === undefined ? "v-item div-s " : (item.change_ratio.slice(0, 1) !== "-" ? "v-item div-s " : "v-item div-s div-sx")} key={idx}>
                                        {console.log()}
                                        <span className="span1">{item.security_name}</span>
                                        <span className="span2">{item.price}</span>
                                        <span className="span3">{item.change}</span>
                                        <span className="span4">{item.change_ratio}</span>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </WingBlank>
                <i className="icon-up iconfont up"></i>
            </div>
        )
    }
}
export default NoticeBar;