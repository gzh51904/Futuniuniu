import React from 'react';
import './all.scss';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
const axios = require("axios")
class All extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id: new Date().getTime(),
            timer: null,
            data2: [],
        }
        this.gupiao = this.gupiao.bind(this);
    }
    gupiao(id) {
        this.props.history.push({
            pathname: "/home/gupiao",
            state: {
                id,
            }
        })
        window.localStorage.setItem("id", id)
        this.props.dispatch({
            type: "SORT",
            ok: false
        })
    }
    componentWillMount() {
        this.ajax(this.state.id);
    }
    componentDidMount() {
        this.setState({
            timer: setInterval(() => {
                this.setState({
                    id: new Date().getTime()
                })
                this.ajax(this.state.id);
            }, 5000)
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.data2 === prevState.data) {

        } else {
            this.setState({
                data2: prevState.data
            })
        }

    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }
    async  ajax(id) {
        const { data: { data: shdata } } = await axios.get(`http://47.101.143.75:3100/api/stock/stock-rank?plate_id=3000005&_=${id}`);
        this.setState({
            data: [
                ...shdata.downTopList,
                ...shdata.raiseTopList,
                ...shdata.turnoverTopList,
            ]
        })
    }
    render() {
        return (
            <ul className="all">
                {
                    this.state.data.map((item, idx) => {
                        return (
                            <li className="li" key={idx} onClick={this.gupiao.bind(this, item.security_id)}>
                                <div className="left">
                                    <span><i className={item.price_direct}>{item.price_direct}</i> {item.security_name} </span>
                                    <span>{item.security_code}</span>
                                </div>
                                <div className={item.change_ratio.slice(0, 1) !== "-" ? "rigth " : "green rigth"}>
                                    <div>{item.last_price}</div>
                                    <div>
                                        <span className={item.change_ratio.slice(0, 1) !== "-" ? "" : "span_green"}>{item.change_ratio}</span>
                                    </div>
                                </div>
                                <div className={
                                    this.state.data2.length > 0 ?
                                        (this.state.data2[idx].last_price * 1 > item.last_price * 1 ?
                                            "fudong greenli" : this.state.data2[idx].last_price * 1 === item.last_price * 1 ?
                                                "fudong" : "fudong redli") : "fudong"
                                } />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
All = withRouter(All)
export default connect(state => state)(All);
