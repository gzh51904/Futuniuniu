import React from 'react';
import GpTitle from './gptitle';
import './gupiao.scss'
import { connect } from 'react-redux'
import Timesharingplan from './sharingplan.js'
import Sort from '../sort';
import All from '../maxin/all'
const axios = require('axios');
class Gupiao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutemap: null,
            details: null,
            time: null,
            jsq: null,
            times: null,
            id: null,
        }
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: "SORT",
            ok: true,
        })
        clearInterval(this.state.jsq)
    }
    async componentWillMount() {
        let date = new Date()
        this.state.time = date.getTime();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let hour = date.getHours();
        let minute = date.getMinutes() * 1 > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
        let seconds = date.getSeconds();
        this.setState({
            times: `${month}/${day} ${hour}:${minute}:${seconds}`
        })

        this.ajax(this.state.time, this.props.location.state.id)
        // const { data: { data: minute } } = await axios.get(`http://localhost:3100/api/trade/quote-minute-v2?security_id=${this.props.location.state.id}&_=${time}‬`);
        // const { data: { data: details } } = await axios.get(`http://localhost:3100/api/trade/quote-basic-v3?security_id=${this.props.location.state.id}&_=${time}`);
    }
    componentDidMount() {

        this.setState({
            jsq: setInterval(() => {
                this.ajax(this.state.time, this.props.location.state.id)
            }, 5000)
        })

    }
    async ajax(time, id) {
        const { data: { data: minutemap } } = await axios.get(`http://47.101.143.75:3100/api/trade/quote-minute-v2?security_id=${id}&_=${time}‬`);
        const { data: { data: details } } = await axios.get(`http://47.101.143.75:3100/api/trade/quote-basic-v3?security_id=${id}&_=${time}`);
        this.setState({
            minutemap: { ...minutemap },
            details: { ...details },
            time: new Date().getTime(),
        })
    }
    formatTime(time) {
        var days = time / 60 / 60 / 24;
        var daysRound = Math.floor(days);
        var hours = time / 60 / 60 - (24 * daysRound)
        var hoursRound = Math.floor(hours);
        var minutes = time / 60 - (60 * hoursRound) - (24 * 60 * daysRound)
        var minutesRound = Math.floor(minutes);
        return hoursRound + ":" + minutesRound;
    }
    render() {
        return (
            <div className="gupiao">
                <div className="gphead">
                    <p className="p1">
                        <span style={{ marginRight: "10px" }}>
                            {this.state.minutemap !== null ? this.state.minutemap.security_id : ""}</span>
                        <span> {this.state.minutemap !== null ? this.state.details.quote.security_name : ""}</span>
                    </p>
                    <p><span> 交易中  {this.state.times}</span>
                    </p>
                </div>
                <div className="flex1">
                    <GpTitle {...this.state.details} />
                    <div className="gpmx">
                        <Timesharingplan {...this.state.minutemap} />
                        <div className="mx">
                            <p className="p">
                                <span className="spamwhite">逐条明细</span>
                                <span>成交统计</span>
                            </p>
                            <div className="mxdiv">
                                {this.state.minutemap !== null ? this.state.minutemap.list.map((item, idx) => {
                                    return (
                                        <p key={idx + 'a'}>
                                            <span className="pdownspan">
                                                <span>{this.formatTime.bind(this, item.time)()}</span>
                                                {/* {console.log(item.time)} */}
                                                <span className={idx !== 0 ? item.ratio > this.state.minutemap.list[idx - 1].ratio ? "greenspan" : "redspan" : "greenspan"}> {item.price}</span>
                                            </span>
                                            <span className={idx !== 0 ? item.ratio > this.state.minutemap.list[idx - 1].ratio ? "greenspan" : "redspan" : "greenspan"} key={idx + 'b'}>{item.ratio}</span>
                                        </p>
                                    )
                                }) : ""}
                            </div>
                        </div>
                        <div className="shade"></div>
                    </div>

                    <div>
                        <p>成分股</p>
                        <Sort />
                        <All />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Gupiao);