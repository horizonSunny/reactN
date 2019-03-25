#react-native 单选按钮组件
## 使用方法
1.导出组件
```javascript
import {Radio} from '../components/Radio'
```
2.
```javascript
 <Radio.RadioGroup model={this.state.country} onChange={this.onChange}>
          <Radio value={1}>java</Radio>
          <Radio value={2}>php</Radio>
 </Radio.RadioGroup>
```
radioGroup 的model必填，onChange也是必填,自己需要在里面执行setState方法更改state的值例如:
```javascript
  onChange=(value)=>{
    this.setState({
      country:value
    })
  }
```
Radio的value也是必填
## props 介绍
1.Radio 组件
 value: 是单选按钮的实际值
 fontSize:按钮右边文字大小
 img:按钮未被选中时的图片
 imgSel:按钮选中时的图片
 type:默认值：'radio',当值为'other'时，可以修改radio展示的样式，此时默认看到的内容全部消失，需要写renderProps函数:
 可以任意渲染任何东西，回调的value是当前按钮的值,概念类似vue的slotProps
 ```javascript
  <Radio value={1} type="other">
            {value =>{
              return ((
                <Switch></Switch>
              ))
            }}
  </Radio>
 ```