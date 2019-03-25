/**
 * Created by zxf on 2018.9.12.
 */
import React from 'react';
import PropsType from 'prop-types'
import {View, Text, FlatList, TouchableNativeFeedback, StyleSheet, TextInput, Modal} from 'react-native';

class SelectItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.value);
    this.props._onPressItem();
  };

  render() {

    return (
      <TouchableNativeFeedback
        style={{height: 100}}
        background={TouchableNativeFeedback.Ripple(this.props.rippleColor ? this.props.rippleColor : '#a2a4a6', false)}
        onPress={this._onPress}>
        <View style={[this.props.index !== this.props.length - 1 ? styles.item : styles.itemLast]}>
          <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: font(26), color: '#484848'}}>
            {this.props.value}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default class SelectDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    dropDownShow: false
  }
  static defaultProps = {
    style: {
      width: dp(364),
      height: dp(77),
      backgroundColor: 'red'
    }
  }
  onPressItem = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }
  _onPressItem = (value) => {
    this.setState({
      dropDownShow: !this.state.dropDownShow
    })
  }
  renderItem = ({item, index}) => {
    return (
      <SelectItem
        value={item.value}
        index={index}
        length={this.props.data.length}
        _onPressItem={this._onPressItem}
        onPressItem={this.onPressItem}/>
    )
  }
  _onPressSelect = () => {
    this.setState({
      dropDownShow: !this.state.dropDownShow
    })
  }

  render() {
    return (
      <View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(this.props.rippleColor ? this.props.rippleColor : '#a2a4a6', false)}
          onPress={this._onPressSelect}>
          <View style={[styles.select, this.props.style]}>
            <Text>{this.props.value}</Text>
          </View>
        </TouchableNativeFeedback>
        <Modal onRequestClose={() => {
        }} transparent={false} visible={this.state.dropDownShow} presentationStyle="overFullScreen">
          {this.state.dropDownShow &&
          <View style={[{top: dp(77), height: dp(300), width: this.props.width}, styles.dropdown]}>
            <FlatList
              data={this.props.data}
              initialNumToRender={10}
              refreshing={true}
              keyExtractor={(item, key) => key.toString()}
              renderItem={this.renderItem}
            />
          </View>}
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: '#484848',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  item: {
    height: dp(50),
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: dp(1.5)
  },
  itemLast: {
    height: dp(77),
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: dp(15),
    borderBottomRightRadius: dp(15),
  },

  dropdown: {
    position: 'absolute',
    zIndex: 999,
    marginTop: dp(10),
    borderWidth: dp(1.5),
    backgroundColor: '#f9f9f9',
    paddingBottom: dp(10),
    paddingTop: dp(10),
    borderRadius: dp(15),

  }
})
