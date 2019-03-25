/**
 * Created by ZuoXiaoFei on 2018.9.2.
 */
import React from 'react'
import {View, Image, Text, ToastAndroid} from 'react-native'
import PropTypes from 'prop-types';
import {BackgroundImage} from "../BackgroundImage/BackgroundImage";
const Sound = require('react-native-sound');

class Jishi extends React.Component{
	state={
		disabled:0,
		tupian:{
			ge:require('./img/0.png'),
			shi:require('./img/0.png'),
			bai:require('./img/0.png'),
			qian:require('./img/0.png'),
		},
		dingshi:''
	}
	tingzhi=()=>{
		// clearInterval(this.state.dingshi)
	}
	componentDidMount(){
		this.props.onRef(this)
	}
	componentWillUnmount(props) {
		this.props.jilushijian(this.state.disabled)
		clearInterval(this.state.dingshi)
	}
	constructor(props){
		super(props);
		this.whoosh = new Sound('piqiu', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);

			}
		});
		let tupian = {
			png0:require('./img/0.png'),
			png1:require('./img/1.png'),
			png2:require('./img/2.png'),
			png3:require('./img/3.png'),
			png4:require('./img/4.png'),
			png5:require('./img/5.png'),
			png6:require('./img/6.png'),
			png7:require('./img/7.png'),
			png8:require('./img/8.png'),
			png9:require('./img/9.png')
		}
		this.state.dingshi = setInterval(()=>{
			let newTupian =  Object.assign({}, this.state.tupian);
			let sj = this.state.disabled
			sj++
			if(sj/60<1){
				newTupian.qian = tupian.png0
				newTupian.bai = tupian.png0
			}
			if(sj/60<10&&sj/60>=1){
				newTupian.qian = tupian.png0
				let bai = 'png'+Math.floor(sj/60)%10
				newTupian.bai = tupian[bai]
			}
			if(sj/60>=10){
				let bai = 'png'+Math.floor(sj/60)%10
				let qian = 'png' + Math.floor(sj/60/10)
				console.log(qian)
				console.log(bai)
				newTupian.qian = tupian[qian]
				newTupian.bai = tupian[bai]
			}
			if(sj == 300){
				clearInterval(this.state.dingshi)
				this.props.dakaipaizhao()

			}
			let shi = 'png' + Math.floor(sj%60/10)
			let ge = 'png'+ sj%60%10
			newTupian.shi = tupian[shi]
			newTupian.ge = tupian[ge]
			this.setState({
				tupian: newTupian,
				disabled:sj
			});
		},1000)
	}
	componentDidMount(){

	}

	// shouldComponentUpdate(nextProps,nextState){
	// 	console.log(this.props.scu!==nextProps.scu,nextState.disabled!==this.state.disabled)
	//   return this.props.scu!==nextProps.scu||nextState.disabled!==this.state.disabled
	// }
	render(){
		return (
			<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%',height:dp(125)}}>
				<View style={{width:dp(90),marginLeft:dp(5),marginRight:dp(5)}}>
					<BackgroundImage scu={true} style={{width:dp(90),height:dp(125),alignItems:'center',justifyContent:'center'}} source={require('./img/szbg.png')}>
						<Image style={{width:dp(90),height:dp(125)}} source={this.state.tupian.qian}></Image>
					</BackgroundImage>
				</View>
				<View style={{width:dp(90),marginLeft:dp(5),marginRight:dp(5)}}>
					<BackgroundImage scu={true} style={{width:dp(90),height:dp(125),alignItems:'center',justifyContent:'center'}} source={require('./img/szbg.png')}>
						<Image style={{width:dp(90),height:dp(125)}} source={this.state.tupian.bai}></Image>
					</BackgroundImage>
				</View>
				<View style={{width:dp(90),marginLeft:dp(5),marginRight:dp(5)}}>
					<BackgroundImage scu={true} style={{width:dp(90),height:dp(125),justifyContent:'center',alignItems:'center'}} source={require('./img/szbg.png')}>
						<Image style={{height:dp(40),width:dp(11)}} source={require('./img/maohao.png')}></Image>
					</BackgroundImage>
				</View>
				<View style={{width:dp(90),marginLeft:dp(5),marginRight:dp(5)}}>
					<BackgroundImage scu={true} style={{width:dp(90),height:dp(125),alignItems:'center',justifyContent:'center'}} source={require('./img/szbg.png')}>
						<Image style={{width:dp(90),height:dp(125)}} source={this.state.tupian.shi}></Image>
					</BackgroundImage>
				</View>
				<View style={{width:dp(90),marginLeft:dp(5)}}>
					<BackgroundImage scu={true} style={{width:dp(90),height:dp(125),marginRight:dp(5),alignItems:'center',justifyContent:'center'}} source={require('./img/szbg.png')}>
						<Image style={{width:dp(90),height:dp(125)}} source={this.state.tupian.ge}></Image>
					</BackgroundImage>
				</View>
			</View>
		)
	}
}
export default Jishi

