import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh } from 'antd-mobile';
import { Carousel, WingBlank } from 'antd-mobile';
import { Modal, List, Button, WhiteSpace, Icon } from 'antd-mobile';

function genData() {
    const dataArr = [];
    for (let i = 0; i < 1; i++) {
      dataArr.push(i);
    }
    return dataArr;
  }
  function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }
  class Ringc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal1: false,
        refreshing: false,
        down: true,
        height: document.documentElement.clientHeight,
        data: [],
        datas: ['1', '2', '3','4','5','6','7','8','9','10'],
            pin:[
                {
                    id:1,
                    title:'雲狄',
                    titles:'季度',
                    img:require('../tz.jpg'),
                    time:'21:15',
                    zan:23
                },
                {
                    id:2,
                    title:'随机数',
                    titles:'鼠标',
                    img:require('../txtwo.jpg'),
                    time:'16:00',
                    zan:'51'
                },
                {
                    id:3,
                    title:'痞客邦',
                    titles:'土方车',
                    img:require('../txcs.jpg'),
                    time:'15:23',
                    zan:'10'
                }
            ]
      };
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
      onClose = key => () => {
        this.setState({
          [key]: false,
        });
      }
    
      onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
      }
      
      
  
    componentDidMount() {
      const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
      setTimeout(() => this.setState({
        height: hei,
        data: genData(),
      }), 0);
    }
  
    render() {
      return (<div>
        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
          }}
        >
          {
            <>
            <div className="uli">
                    <p className="portrait">
                        <img src={require('../txcs.jpg')} className="tx" alt="头像"/>
                        <span><i className="iconfont icon-edit" style={{fontSize:'18px'}} />分享心情或投资心得</span>
                        <span className="grass">草稿(1)</span>
                    </p>
                    <ul className="share">
                        <li><em className="iconfont icon-plus-square" style={{fontSize:'20px',color:'#50a6f2'}} /><span>照片</span></li>
                        <li><em className="iconfont icon-edit-square" style={{fontSize:'20px',color:'#ff9a12'}} /><span>专栏</span></li>
                        <li><em className="iconfont icon-video" style={{fontSize:'20px',color:'#f566b4'}} /><span>直播</span></li>
                    </ul>
            </div>
            <div className="uli">
                    <ul className="sign">
                        <li><em className="iconfont icon-calendar" style={{fontSize:'24px',background: '#ff7a2d'}} />
                            <WingBlank>
                            <span onClick={this.showModal('modal1')} style={{margin:' 0.5rem 0 0 0',display: 'inline-block'}}>签到</span>
                            <WhiteSpace />
                            <Modal
                            visible={this.state.modal1}
                            transparent
                            maskClosable={false}
                            onClose={this.onClose('modal1')}
                            title="通知"
                            footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            >
                            <div style={{ height: 30, overflow: 'scroll' }}>
                                签到已成功
                            </div>
                            </Modal>
                            </WingBlank>
                        </li>
                        <li><em className="iconfont icon-share" style={{fontSize:'24px',background: '#ff4b0c'}} /><span>游戏</span></li>
                        <li><em className="iconfont icon-home-fill" style={{fontSize:'24px',background: '#3492fd'}} /><span>商城</span></li>
                        <li><em className="iconfont icon-share" style={{fontSize:'24px',background: '#fdba52'}} /><span>模拟炒股</span></li>
                    </ul>
                </div>
                <div className="discuss">
                    <p><span>热门讨论</span><span>></span></p>
                        <WingBlank>
                            <Carousel className="space-carousel"
                            frameOverflow="visible"
                            cellSpacing={15}
                            slideWidth={0.4}
                            autoplay={false}
                            infinite={false}
                            dots={false}
                            afterChange={index => this.setState({ slideIndex: index })}
                            >
                            {this.state.datas.map((val, index) => (
                                <button
                                key={val}
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
                                >
                                <span className="tao">#浑水失手?如何看待安踏股价创新高?</span>
                                <span className="lun"><img src={require('../txtwo.jpg')} alt="头像"/><em>正在讨论</em></span>
                                </button>
                            ))}
                            </Carousel>
                        </WingBlank>
                </div>
                {
                    this.state.pin.map(item=>{
                        return (
                            <div className="interest" key={item.id}>
                                <p className="p"><span>你可能感兴趣</span><span><em className="iconfont icon-ellipsis" style={{fontSize:'24px'}} /></span></p>
                                <p className="portrait">
                                    <img src={item.img} className="tx" alt="头像"/>
                                    <span className="span"><em>{item.title}</em>发表了文章</span>
                                    <span className="spant"><em className="iconfont icon-plus" style={{fontSize:'16px',color:'#50a6f2'}} />关注</span>
                                    <span className="spanr">05-25 {item.time}
                                        <em className="iconfont icon-fire-fill" style={{fontSize:'16px',color:'#fe4c0e',margin:'0'}} />
                                        <em className="iconfont icon-crown-fill" style={{fontSize:'16px',color:'#febe40'}} />
                                    </span>    
                                </p>
                                <p className="essay">
                                <img src={require('../gushi.jpg')} className="tx" alt="gushi" style={{height:'100%',width:'100%'}}/>
                                </p>
                                <p className="zan">
                                    <span><em className="iconfont icon-like-fill" style={{fontSize:'16px',color:'#ffd2bb'}} /><em>{item.zan}</em></span><span style={{float:'right'}}><em>13</em>评论·<em>14262</em>浏览</span>
                                </p>
                                <p className="discuss">
                                    <span><em className="iconfont icon-like" style={{fontSize:'16px',color:'#cdcdcd'}} />赞</span>
                                    <span><em className="iconfont icon-message-fill" style={{fontSize:'16px',color:'#cdcdcd'}} />评论</span>
                                    <span><em className="iconfont icon-share" style={{fontSize:'16px',color:'#cdcdcd'}} />分享</span>
                                </p>
                                <p className="speak">
                                    <span><em>{item.titles}</em>回复<em>{item.title}</em> ：你好啊！</span>
                                    <span><em>{item.title}</em>回复<em>{item.titles}</em> ：你也好！</span>
                                </p>
                            </div>
                        )
                    })
                }
            </>
          }
        </PullToRefresh>
      </div>);
    }
  }

export default Ringc;