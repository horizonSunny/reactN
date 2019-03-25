/**
 * Created by zxf on 2018.9.10.
 */
import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../../router/NavigationService';
import {inject} from 'mobx-react'

function Circle(props) {
	//大灰色
	return (
		<View style={[style.defaultOuterStyle, props.outerStyle]}>
			<View style={[style.defaultInnerStyle, props.innerStyle]}>
				<Text style={[style.defaultInnerText]}>{props.text}</Text>
			</View>
		</View>
	)

}

function Line(props) {
	return (
		<View style={[style.lineStyle, props.lineColor]}/>
	)
}

@inject('rootStore')
export default class ProgressBar extends React.PureComponent {
	static propTypes = {
		type: PropTypes.number,//代表几级量表如一级量表就传1
		currentIndex: PropTypes.number// 某级量表所在的索引
	};

	constructor(props) {
		super(props);
		this.scaleList = {
			1: ["BaseInfo", "Cogntive", "CogntiveAbility", "PicrureMemory"],
			3: ["MMSE", "ADL", "Syndrome", "Emotion", "Sleep"]
		};
	}

	handleNavigation = (route) => {
		NavigationService.navigate(route)
	}

	render() {
		const lists = this.scaleList[this.props.type];
		const finishedScale = this.props.rootStore.finishedScale.slice();

		return (
			<View style={style.container}>
					<ImageBackground source={require('./img/top.png')} style={[style.bkContainer]}>
					{
						this.props.rootStore.commonInfo.schedule!=='14'&&lists.map((item, index) => {
							//已经做过的
							if (finishedScale.indexOf(item) > -1) {
								if (index === lists.indexOf(this.props.currentRoute)) {// 当前正在做的
									return (
										<React.Fragment key={index}>
											<Circle
												outerStyle={style.currentOuterStyle}
												innerStyle={style.currentInnerStyle}
												innerText={style.innerText}
												text={index + 1}/>
											{index !== lists.length - 1 && <Line lineColor={item.lineColor}/>}
										</React.Fragment>
									)
								}
								return (
									<React.Fragment key={index}>
										<TouchableNativeFeedback
											onPress={this.handleNavigation.bind(this, item)}
											background={TouchableNativeFeedback.Ripple('#a2a4a6')}
										>
											<View>
												<Circle
													innerStyle={style.innerStyle}
													innerText={style.innerText}
													text={index + 1}/>
											</View>
										</TouchableNativeFeedback>

										{index !== lists.length - 1 && <Line lineColor={item.lineColor}/>}
									</React.Fragment>
								)
							}
							// 没有做过的
							return (
								<React.Fragment key={index}>
									<Circle text={index + 1} innerStyle={{backgroundColor: '#ffffff'}}/>
									{index !== lists.length - 1 && <Line lineColor={item.lineColor}/>}
								</React.Fragment>
							)
						})
					}
				</ImageBackground>
			</View>
		)
	}
}

const style = StyleSheet.create({
	container: {
		marginTop: dp(50)
	},
	defaultOuterStyle: {
		width: dp(77),
		height: dp(77),
		borderRadius: dp(77),
		backgroundColor: '#d9edfb',
		alignItems: 'center',
		justifyContent: 'center'
	},
	defaultInnerStyle: {
		width: dp(57),
		height: dp(57),
		borderRadius: dp(57),
		alignItems: 'center',
		justifyContent: 'center'
	},
	defaultInnerText: {
		fontSize: font(40),
		color: '#d9edfb'
	},
	currentOuterStyle: {
		width: dp(90),
		height: dp(90),
		borderRadius: dp(90)
	},
	currentInnerStyle: {
		width: dp(67),
		height: dp(67),
		borderRadius: dp(67),
		backgroundColor: '#3a63b8'
	},
	innerStyle: {
		backgroundColor: '#3a63b8'
	},
	innerText: {
		fontSize: font(40),
		color: '#d9edfb'
	},

	bkContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	lineStyle: {
		width: dp(300),
		height: dp(15),
		backgroundColor: '#d9edfb'
	}
})
