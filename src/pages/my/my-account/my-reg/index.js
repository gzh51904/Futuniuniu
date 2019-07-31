import React from 'react'
import './reg.scss'
import { Form, Input, Select, Button, Row, Col } from 'antd'
const { Option } = Select;

class MyReg extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }
  handleSubmit() {

  }
  handleConfirmBlur() {

  }
  // 画布
  componentDidMount() { this.drawFill() }
  drawFill() {
    let canvas = document.getElementsByClassName("myCanvas")[0];
    // console.log(canvas)
    let cantxt = canvas.getContext("2d");
    canvas = canvas.height;
    cantxt.fillStyle = "pink";
    cantxt.fillRect(0, 0, canvas.width, canvas.height);
    function drawText(color, size, num, x, y) {
      cantxt.fillStyle = color;
      cantxt.font = size + "px Arial";
      let str = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLMNBVCXZ";
      for (let i = 0; i < num; i++) {
        let text = str[parseInt(Math.random() * str.length)];
        let pw = i * x + 10;
        let ph = Math.random() * y + 20;
        cantxt.fillText(text, pw, ph);
      };
    };
    drawText("blue", 20, 4, 15, 10);
    for (let n = 0; n < 3; n++) {
      this.drawLine(canvas, cantxt);
    };
    for (let m = 0; m < 30; m++) {
      this.drawPoint(canvas, cantxt);
    };
  };
  drawLine(canvas, cantxt) {
    let moveX = Math.random() * canvas.width;
    let lineX = Math.random() * canvas.width;
    let moveY = Math.random() * canvas.height;
    let lineY = Math.random() * canvas.height;
    cantxt.moveTo(moveX, moveY);
    cantxt.lineTo(lineX, lineY);
    cantxt.lineWidth = Math.random();
    cantxt.strokeStyle = "red";
    cantxt.stroke();
  };
  drawPoint(canvas, cantxt) {
    let pX = Math.random() * canvas.width;
    let pY = Math.random() * canvas.height;
    let pw = Math.random();
    cantxt.moveTo(pX, pY);
    cantxt.lineTo(pX + pw, pY + pw);
    cantxt.lineWidth = pw;
    cantxt.stroke();
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+86',
    })(
      <Select style={{ width: 90 }}>
        <Option value="中国内地">+86</Option>
        <Option value="中国香港">+852</Option>
        <Option value="中国澳门">+853</Option>
        <Option value="中国台湾">+886</Option>
        <Option value="美国">+1</Option>
      </Select>,
    );
    return <div className='my-reg'>
      <img src='https://cdn5.futunn.com/images/global/logo_futu5.svg?SYIuqfgjacA89RvGuKJBlRwf.cn' alt='' />
      <h2>请输入您的手机号码</h2>
      <Form className='reg-form' {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input placeholder='手机号码' addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item hasFeedback>
          <Row gutter={8}>
            <Col span={18}>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true,
                  message: 'Please confirm your password!',
                }],
              })(<Input placeholder='验证码' onBlur={this.handleConfirmBlur} />)}
            </Col>
            <Col span={6}>
              <canvas onClick={() => { this.drawFill() }} className="myCanvas" width="70px" height="30px"></canvas>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary"
            //   htmlType="submit" 
            className='reg-btn'
            onClick={() => {
              this.props.history.push('/stcku')
            }}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  }
}

MyReg = Form.create({})(MyReg);

export default MyReg