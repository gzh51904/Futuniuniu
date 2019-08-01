import React from 'react'
import axios from 'axios'
import './kecheng.scss'
import { Col,List,Menu,Button} from 'antd';
class MyKecheng extends React.Component{
    constructor(){
        super();
        this.state = {
            id:'',
            navs:[{
                title:'精选课程',
                url:'http://47.101.143.75:3100/live/t/batch-get-university-columns?column_codes%5B%5D=index_2&column_codes%5B%5D=index_3&column_codes%5B%5D=index_4&column_codes%5B%5D=index_6&column_codes%5B%5D=index_8&column_codes%5B%5D=index_9'
            },{
                title:'全部课程',
                url:'http://47.101.143.75:3100/live/t/get-university-course-collection?count=25&offset=0'
            },{
                title:'股票百科',
                url:'http://47.101.143.75:3100/my/wiki/list?formpage=wikilistnew&news_id='+this.id+'&page_size=50'
            },{
                title:'我的课程',
                url:''
            }],
            list:[],
            current:''
        }
        this.axiosGetUrl = this.axiosGetUrl.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.jiazai = this.jiazai.bind(this)
    }
    componentWillMount(){
        this.axiosget('http://47.101.143.75:3100/live//t/batch-get-university-columns?column_codes%5B%5D=index_2&column_codes%5B%5D=index_3&column_codes%5B%5D=index_4&column_codes%5B%5D=index_6&column_codes%5B%5D=index_8&column_codes%5B%5D=index_9')
        this.setState({current:'精选课程',id:50})
    }
    async axiosget(url){
        let {data:{data}} = await axios.get(url)
        console.log(data);
        this.setState({
            list:data.columns?data.columns:data
        })
        console.log(this.state.list);
        
    }
    axiosGetUrl(url){
        this.axiosget(url)
    }
    handleClick(e){
        this.setState({current:e.key})
    }
    async jiazai(){
        console.log(this.state.list);
        
        this.setState({id:this.state.id+50})
        let {data:{data}} = await axios.get(this.state.navs[2].url)
        // console.log(data.list);
        this.state.list.list.push(...data.list)
        
        // this.setState({list:{list:this.state.list.list.push(...data.list),total_count:2251}})
    }
    render(){
        return <div className='kecheng'>
            <img src='https://liveimg.futunn.com/20190617000020320bcf282eeba.jpg' alt='' />
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                {
                    this.state.navs.map(item=>{
                        return <Menu.Item onClick={this.axiosGetUrl.bind(this,item.url)} className='kecheng-row' key={item.title}>
                          <i></i>
                          <p>{item.title}</p>
                        </Menu.Item>
                    })
                } 
           </Menu>
            {
                this.state.list.length < 10?
                this.state.list.map(item=>{
                return <div className='kecheng-route' key={item.column_name}>
                    <h3>{item.column_name}</h3>
                    <List
                        dataSource={item.items}
                        renderItem={item => (
                        <List.Item key={item.course_id}>   
                            <Col span={10}>
                                <img src={item.item_pic_url} alt=''/>
                            </Col>
                            <Col span={14}>
                               <h4>{item.item_title}</h4> 
                               <h5>{item.item_subtitle}</h5>
                               <h5>217677次播放</h5>
                            </Col>
                        </List.Item>
                        )}
                    />
                </div>
                })
                :
                (this.state.list.total_count === 25?
                <div className='kecheng-route'>
                    <h3>共25门</h3>
                    <List
                        dataSource={this.state.list.items}
                        renderItem={item => (
                        <List.Item key={item.course_id}>   
                            <Col span={10}>
                                <img src={item.item_pic_url} alt=''/>
                            </Col>
                            <Col span={14}>
                               <h4>{item.item_title}</h4> 
                               <h5>{item.item_subtitle}</h5>
                            </Col>
                        </List.Item>
                        )}
                    />
                </div>
                :
                <div className='kecheng-route'>
                    <h3>共2251门</h3>
                    <List
                        dataSource={this.state.list.list}
                        renderItem={item => (
                        <a href={item.url} target='target' ><List.Item key={item.course_id}>   
                            <Col span={10}>
                                <img src={item.pic} alt=''/>
                            </Col>
                            <Col span={14}>
                               <h4>{item.title}</h4>
                               <h5><span  style={{backgroundColor:'#00a4ff',color:'#fff'}}>{item.stock_code}</span></h5> 
                               <h5>{item.abstract}</h5>
                            </Col>
                        </List.Item>
                        </a>
                        )}
                    />
                    <Button type="primary" onClick={this.jiazai}>加载更多</Button>
                </div>
                )
            }
            <div className='kecheng-img'>
                <img src='https://live.futunn.com/images/university-v2/bg.png' alt='' />
                <div className='kecheng-img-1'>
                    <img src='https://live.futunn.com/images/university-v2/bg01.png' alt='' />
                </div>
                <div className='kecheng-img-2'>
                    <img src='https://live.futunn.com/images/university-v2/bg02.png' alt='' />
                </div>
            </div>
        </div>
    }
}

export default MyKecheng