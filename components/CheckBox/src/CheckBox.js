/**
 * Created by ZuoXiaoFei on 2018.8.29.
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types';
import CheckBoxGroup from './CheckBoxGroup'
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native'


export default class CheckBox extends Component{
  static CheckBoxGroup=CheckBoxGroup;
  static propTypes={
    value:PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired]),
    trueValue:PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string]),
    type:PropTypes.string
  };
  static defaultProps={
    fontSize:font(20),
    type:'checkbox',
    trueValue:null,
    falseValue:null,
    img:require('../img/icon.png'),
    imgSel:require('../img/icon-sel.png')
  };
  state={
    value:this.getValue(),
    checked:this.props.checked
  };

  getValue(){
    if((this.props.trueValue!==null
      &&this.props.trueValue!==undefined)
      ||(this.props.falseValue!==null
      && this.props.falseValue!==undefined)){
      return this.props.trueValue;
    }
    return this.props.value
  }
  handlePress=()=>{
    const status=!this.state.checked;
    if(this.props.onChange){
      this.props.onChange(this.state.value,status)
    }else{
      console.error('missing onChange callback on CheckBox');
    }
  };
  renderImg(checked){
    if(this.props.type==='checkbox'){
      return (
        <React.Fragment>
          <Image style={[style.icon,this.props.iconStyle]} source={checked?this.props.imgSel:this.props.img}/>
          {this.props.children}
        </React.Fragment>
      )
    }
    else{
      return this.props.children(checked)
    }
  };
  shouldComponentUpdate(nextProps){
    return nextProps.checked!==this.props.checked;
  }
  render(){
    const {checked}=this.props;
    return(
      <View style={[Object.assign({height:50,justifyContent:'center'},this.props.style)]}>
        <TouchableWithoutFeedback    onPress={this.handlePress}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            {this.renderImg(checked)}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const style=StyleSheet.create({
  checkbox:{
    width:50,
    height:50,
    borderRadius:50
  },
  icon:{
    width:dp(45),
    height:dp(45),

  }
});