/**
 * Created by zxf on 2018.10.10.
 */
import React from "react";
import ButtonImg from "../ButtonImg/ButtonImg";
import {Text,Modal,View,TouchableNativeFeedback} from "react-native";
import PropTypes from 'prop-types';
const Sound = require('react-native-sound');
import PrevButton from '../../pages/PageComponent/PrevButton/PrevButton'
export default class Audio1 extends React.PureComponent{
  static propTypes={
    src:PropTypes.string.isRequired
  }
  constructor(props){
    super(props);
		console.log('============')
	  console.log(props)
    this.audioPauseImg=require('./img/audio.png');
    this.audioPlayingImg=require('./img/audio-press.png');
    this.status=false;
    this.state={
     audioIcon:this.audioPauseImg,
	    wanbi : false,
	    dingshiqi:'',
	    jishi:16
    }
    this.whoosh = new Sound(props.src, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);

      }
    });
  }
  guanbi = () =>{
	  this.setState({
		  wanbi:false
	  });
  }
  xiayiti = () => {
	  this.props.updateParentState();
	  this.setState({
		  wanbi:false
	  });
  }
  handlePress=()=>{
	  clearInterval(this.state.dingshiqi)
	  if(this.state.jishi<=0){
		  this.setState({
			  jishi:20
		  });
	  }
	  this.state.dingshiqi=setInterval(()=>{
	  	let miao = --this.state.jishi
		  this.setState({
			  jishi:miao
		  });
		  if(this.state.jishi<=0){
			  clearInterval(this.state.dingshiqi)
			  this.setState({
				  wanbi:true
			  });
		  }
	  },1000)
    if(!this.status){
      this.status=true;
      this.setState({
        audioIcon:this.audioPlayingImg
      });
      // loaded successfully
      this.whoosh.play(success => {
        if (success) {
          this.status=false;
          this.setState({
            audioIcon:this.audioPauseImg
          });
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          whoosh.reset();
        }
      });
    }else{
	    clearInterval(this.state.dingshiqi)
      this.setState({
        audioIcon:this.audioPauseImg
      });
      this.whoosh.pause();
      this.status=false;
    }

  }
  componentWillUnmount(){
    this.whoosh.release();
    this.whoosh=null;
  }
  render(){
    console.log(this.state.audioIcon)
    return(
      <React.Fragment>
        <ButtonImg
          onPress={this.handlePress}
          style={{width: dp(230), height: dp(230), marginLeft: dp(80)}}
          source={this.state.audioIcon}/>
        <Text style={{fontSize: font(30), color: '#479e13', marginLeft: dp(50)}}>点击播放</Text>
	      <Modal animationType="slide"
	             transparent={true}
	             presentationStyle="overFullScreen"
	             onRequestClose={() => {
	             }}
	             visible={this.state.wanbi}>
		      <View
			      style={{
				      flex: 1,
				      backgroundColor: 'rgba(0,0,0,0.7)',
				      alignItems: 'center',
				      justifyContent: 'center'
			      }}>
			      <View style={{width: dp(780), height: dp(450), backgroundColor: '#ffffff'}}>
				      <View style={{flexDirection: 'row', justifyContent: 'flex-end',backgroundColor:'#406dce',height:dp(100)}}>
					      <Text style={{fontSize: font(38),marginTop:dp(20),color:'#fff',textAlign:'center',marginRight:dp(240),}}>温馨提示</Text>
					      <TouchableNativeFeedback  background={TouchableNativeFeedback.SelectableBackground()}>
						      <ButtonImg
							      onPress={() => {
							      this.setState({wanbi: false})
						      }}
							      style={{width: dp(28), height: dp(28),marginTop:dp(35),marginRight:dp(25)}}
							      source={require('./img/end.png')}/>
					      </TouchableNativeFeedback>
				      </View>
				      <View style={{
					      alignItems: 'center' ,
					      flex: 1,
					      justifyContent: 'center',
					      marginTop: dp(0),width:dp(780)
				      }}>
					      <View style={{flexDirection:'row'}}>
						      <Text style={{fontSize: font(34),color:'#333'}}>如果您听清楚了,请点击 </Text>
						      <Text style={{fontSize: font(36),color:'#406dce'}}> “确定” </Text>
						      <Text style={{fontSize: font(34),color:'#333'}}> 如果没听清楚</Text>
					      </View>
					      <View style={{flexDirection:'row',marginTop:dp(20)}}>
						      <Text style={{fontSize: font(34),color:'#333'}}>请点击 </Text>
						      <Text style={{fontSize: font(36),color:'#406dce'}}> “再听一遍” </Text>
						      <Text style={{fontSize: font(34),color:'#333'}}> 按钮</Text>
					      </View>
				      </View>
				      <View style={{flexDirection: 'row'}}>
					      <View style={{width:'50%',boxSizing:'border-box',borderLeftWidth:dp(0.5),borderColor:'#e6e6e6',height:dp(130),borderTopWidth:dp(1)}}>
						      <PrevButton  text="再听一遍"  onPress={this.guanbi} buttonStyle={{
							      color: "#406dce",
							      marginLeft: dp(115),
							      width:dp(200),
							      height:dp(70),
							      marginTop:dp(30),
							      borderRadius:dp(5),
							      borderColor:'#406dce'
						      }} textStyle={{color: "#406dce",fontSize:font(30)}}/>
					      </View>
					      <View style={{width:'50%',boxSizing:'border-box',borderColor:'#e6e6e6',height:dp(130),borderTopWidth:dp(1)}}>
						      <PrevButton text="确定" onPress={this.xiayiti} buttonStyle={{
							      color: "#406dce",
							      marginLeft: dp(75),
							      width:dp(200),
							      backgroundColor:'#406dce',
							      height:dp(70),
							      marginTop:dp(30),
							      borderRadius:dp(5),
							      borderColor:'#406dce'
						      }} textStyle={{color: "#fff",fontSize:font(30)}}/>
					      </View>
				      </View>
			      </View>
		      </View>
	      </Modal>
      </React.Fragment>
    )
  }
}
