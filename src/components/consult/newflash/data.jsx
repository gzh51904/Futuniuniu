import React, { Component } from 'react';
import axios from 'axios';

import './flash.scss'
class Data extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            nowtime: Date.now(),
        }
        this.getdata = this.getdata.bind(this);
        this.scroll = this.scroll.bind(this);
    }

    async getdata() {
        let data = (await axios.get("http://47.101.143.75:3001/api/news/news-list?page=0&page_size=10&_=" + this.state.nowtime)).data.data.news_list


        // 延迟执行
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500)
        })

        this.setState({
            data: [...this.state.data, ...data],
            nowtime: Date.now() - 122431158721,
        })


    }

    scroll() {
        let scrollTop =
            document.documentElement.scrollTop || document.getElementsByClassName("flash-data")[0].scrollTop;

        let windowHeight = document.getElementsByClassName("flash-data")[0].clientHeight;

        let scrollHeight = document.getElementsByClassName("flash-data")[0].scrollHeight;

        let ih = scrollHeight - scrollTop - windowHeight

        if (ih <= 1) {
            this.getdata();
        }

    }

    componentWillMount() {
        this.getdata();
    }

    render() {
        return (
            <div className="flash-data" onScroll={this.scroll}>
                {/* <div className="flash-item">
                    <div className="flash-item-time">
                        time
                    </div>
                    <div className="flash-item-content">
                        contentsafsdfsf水电费水电费是水电费是否水电费水电费说的翻水电费发斯蒂芬斯蒂芬 是大V说的
                    </div>
                    <div className="flash-item-comment">
                        comment
                    </div>
                </div> */}
                {
                    this.state.data.map(item => {
                        return (
                            <div className="flash-item" key={item.id}>
                                <div className="flash-item-time">
                                    {item.create_time_str}
                                </div>
                                <div className="flash-item-content">
                                    {item.content}
                                </div>
                                <div className="flash-item-comment">
                                    {item.id}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}

export default Data;