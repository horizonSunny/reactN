/**
 * Created by zxf on 2018.9.14.
 */
import React from 'react';
import {ImageBackground, View} from 'react-native'
import PropTypes from 'prop-types'

export class BackgroundImage extends React.Component {
		static defaultProps={
			scu:false
		}
		static propTypes={
			scu:PropTypes.bool
		}
    shouldComponentUpdate(nextProps) {
        return this.props.source !== nextProps.source||this.props.scu;
    };

    render() {
        return (
            <View style={{justifyContent: 'center',width:"100%",height:dp(552),flexDirection: 'row',
                alignItems: 'center',}}>
                <ImageBackground style={{width: this.props.width, height: this.props.height}} {...this.props}>
                    {this.props.children}
                </ImageBackground>
            </View>
        )
    }
}
