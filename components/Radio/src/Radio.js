/**
 * Created by ZuoXiaoFei on 2018.8.29.
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types';
import RadioGroup from './RadioGroup'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import {GroupContext} from "./RadioGroupContext";
 class Radio extends Component{
  constructor(props) {
    super(props);
  }
  static propTypes={
    value:PropTypes.number.isRequired,
    type:PropTypes.string
  };
  static defaultProps={
    fontSize:font(20),
    type:'radio',
    img:require('../img/icon.png'),
    imgSel:require('../img/icon-sel.png')
  };
  state={
    value:this.props.value
  };
  handlePress=()=>{
    if(this.props.onChange){
      this.props.onChange(this.state.value)
    }else{
      console.error('missing onChange callback');
    }
  };
  renderImg(model,value){
    if(this.props.type==='radio'){
      return (
        <React.Fragment>
          <Image style={[style.icon,this.props.style]} source={model===value?this.props.imgSel:this.props.img}/>
          {this.props.children&&this.props.children}
        </React.Fragment>
      )
    }
    else{
      return this.props.children(this.state.value)
    }
  };
  shouldComponentUpdate(nextProps){
    if(nextProps.model!==this.props.model){
      return true
    }
    return false;
  }
  render(){
    const {value}=this.state;
    console.log('this.props.radioStyle_', this.props.styleHight)
    const outHeight = this.props.styleHight ? {height:20,justifyContent:'center'}:{height:50,justifyContent:'center'}
    return(
      <View style={[outHeight]}>
        <TouchableWithoutFeedback hitSlop={this.props.hitSlop?this.props.hitSlop:{top:50,left:50,right:50,bottom:50}}    onPress={this.handlePress}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            {this.renderImg(this.props.model,value)}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
const WithRadio=props=>(
  <GroupContext.Consumer>
    {(group)=>{

      return(<Radio
          {...props}
          onChange={group.onChange}
          model={group.model}/>
      )
    }}
  </GroupContext.Consumer>
)
WithRadio.RadioGroup=RadioGroup;
export default WithRadio
const style=StyleSheet.create({
  radio:{
    width:50,
    height:50,
    borderRadius:50
  },
  icon:{
    width:50,
    height:50,

  }
});