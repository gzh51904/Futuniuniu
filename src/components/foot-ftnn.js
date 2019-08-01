import React from 'react';
import './foot.scss'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
// import fnhead from '../api/head'
class FootFtnn extends React.Component {
    constructor() {
        super();
        this.state = {
            title: [
                {
                    wenzi: "行情",
                    to: "/home",
                    icon: "icon-fund"
                }, {
                    wenzi: "开户",
                    to: "/aaa",
                    icon: "icon-plus"
                }, {
                    wenzi: "咨询",
                    to: "/consult",
                    icon: "icon-filesearch"
                }, {
                    wenzi: "牛牛圈",
                    to: "/clrcle",
                    icon: "icon-chrome"
                }, {
                    wenzi: "我的",
                    to: "/my",
                    icon: "icon-user"
                }
            ],
            head: [
                [
                    { leftbutton: false },
                    { headmiddle: ["自选", "市场"] },
                    {
                        rigthicon: [
                            {
                                icon: "icon-search"
                            },
                            {
                                icon: "icon-message"
                            }
                        ]
                    }
                ],
                [
                    { leftbutton: false },
                    { headmiddle: ["自选", "市场"] },
                    {
                        rigthicon: [
                            {
                                icon: "icon-search"
                            },
                            {
                                icon: "icon-message"
                            }
                        ]
                    }
                ],
                [
                    { leftbutton: false },
                    { headmiddle: ["咨询"] },
                    {
                        rigthicon: [
                            {
                                icon: "icon-search"
                            },
                            {
                                icon: "icon-message"
                            }
                        ]
                    }
                ],
                [
                    { leftbutton: false },
                    { headmiddle: ["牛牛圈·动态"] },
                    {
                        rigthicon: [
                            {
                                icon: "icon-search"
                            },
                            {
                                icon: "icon-message"
                            }
                        ]
                    }
                ],
                [
                    { leftbutton: false },
                    { headmiddle: [""] },
                    {
                        rigthicon: [
                            {
                                icon: "icon-setting"
                            },
                            {
                                icon: "icon-message"
                            }
                        ]
                    }
                ]
            ]
        }
        this.head = this.head.bind(this);
    }
    head(idx) {
        this.props.dispatch(
            {
                type: "HEAD",
                obj: this.state.head[idx],
            }
        )
        let obj = JSON.stringify(this.state.head[idx])
        window.localStorage.setItem("head", obj);
    }

    render() {
        return (
            <div className="foot">
                {
                    this.state.title.map((item, index) => {
                        return (
                            <NavLink to={item.to} key={index} activeStyle={{ color: "#1e87ce" }} className="navlink" onClick={this.head.bind(this, index)}>
                                <i className={`iconfont ` + item.icon}></i>
                                <span>{item.wenzi}</span>
                            </NavLink>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(state => state)(FootFtnn);
