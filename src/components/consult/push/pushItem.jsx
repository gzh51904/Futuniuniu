import React, { Component } from 'react';
import axios from 'axios';

// moment
import moment from 'moment';

import './pushitem.scss';


class PushItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: [],
            page: 98079,
            time: Date.now()
        }

        this.getdata = this.getdata.bind(this);
        this.scroll = this.scroll.bind(this);

    }

    async getdata() {
        let news = (await axios.get("http://47.101.143.75:3100/my/client/market-list?news_id=" + this.state.page)).data.data.list


        // 延迟加载
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500);
        })

        this.setState({
            news: [...this.state.news, ...news],
            page: this.state.page - 10,
        })


    }

    scroll() {
        let scrollTop = document.documentElement.scrollTop || document.getElementsByClassName("push-item")[0].scrollTop;
        let windowHeight = document.getElementsByClassName("push-item")[0].clientHeight;
        let scrollHeight = document.getElementsByClassName("push-item")[0].scrollHeight;

        let ih = scrollHeight - scrollTop - windowHeight



        if (ih <= 1) {
            this.getdata()
        }
    }

    componentWillMount() {
        this.getdata()
    }

    render() {
        return (
            <div className="push-item" onScroll={this.scroll}>
                {/* <div className="item">
                    <div className="item-left">
                        <h3 className="push-title">push-title</h3>
                        <p className="time">time</p>
                    </div>
                    <div className="item-right">
                        item-right
                        <img className="push-img" src="" alt="" />
                    </div>
                </div> */}
                {
                    this.state.news.map(item => {
                        return (
                            <div className="item" key={item.news_id}>
                                <div className="item-left">
                                    <h3 className="push-title">{item.title}</h3>
                                    <p className="time">{
                                        moment(item.time).format('HH:mm')}</p>
                                </div>
                                <div className="item-right">

                                    <img className="push-img" src={item.pic} alt="" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


}

export default PushItem;