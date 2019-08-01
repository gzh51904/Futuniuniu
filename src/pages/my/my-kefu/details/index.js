import React from 'react'
import axios from 'axios'
import './details.scss'
import {Icon} from 'antd'


class HelpDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            html:''
        }
    }
    async componentWillMount(){
        let id = this.props.location.search.slice(6)
        // console.log(id);
        let {data:{topic}} = await axios.get('http://47.101.143.75:3100/myapi/faq/topic/tid/'+id+'?of_json=1&lang=null')
        this.setState({html:topic.content_html})
        // console.log(topic.content_html);
        
    }
    render(){
        return <div className='help-details'>
            <div className='help-details-html' dangerouslySetInnerHTML={{__html:this.state.html}}></div>
            <div className='help-details-wenti'>
                <p>以上内容是否解决您的问题？</p>
                <span>
                    <Icon className='span-icon' type='like'/>已解决
                </span>
                <span>
                    <Icon className='span-icon' type='dislike'/>未解决
                </span>
            </div>
        </div>
    }
}

export default HelpDetails