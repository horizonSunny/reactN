/**
 * Created by ZuoXiaoFei on 2018.8.29.
 */
import {Text, View} from "react-native";
import React, {Component} from 'react'
import {GroupContext} from "./RadioGroupContext";

export default class RadioGroup extends Component {
  state = {
    checkedList: this.props.value || []
  };
  /**
   * 父组件接收子组件传入的值
   * @param {string,number} value 多选按钮的值
   * @param {boolean} checked 多选按钮的状态
   */
  onChange = (value) => {
    const index = this.state.checkedList.indexOf(value)
      if (this.state.checkedList.indexOf(value) === -1) {
        this.state.checkedList.push(value)
      } else {
        this.state.checkedList.splice(index, 1)
      }
    if (this.props.onChange) {
      this.props.onChange(this.state.checkedList)
    } else {
      console.error('missing onChange callback on CheckBoxGroup');
    }
  };

  render() {
    return (
      <GroupContext.Provider value={this.props.model}>
        <View style={[Object.assign({flexDirection: 'row'}, {...this.props.style})]}>
          {
            React.Children.map(this.props.children, element => {
                const value = element.props.trueValue ? element.props.trueValue : element.props.value;
                return React.cloneElement(element, Object.assign({}, element.props, {
                  checked: this.state.checkedList.indexOf(value) > -1,
                  onChange: this.onChange,
                  img:this.props.img,
                  imgSel:this.props.imgSel
                }))
              }
            )}
        </View>
      </GroupContext.Provider>
    )
  }
}