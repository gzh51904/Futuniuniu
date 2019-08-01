import React from 'react';
// 头部导航组件
import ConsultHeader from '../../components/consult/header';
// 
import { withRouter } from 'react-router-dom'



class Consult extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: "#fff" }}>
                <ConsultHeader />
            </div>
        )
    }
}
Consult = withRouter(Consult)
export default Consult;