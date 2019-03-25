/**
 * Created by ZuoXiaoFei on 2018.8.29.
 */
import {View} from "react-native";
import React from 'react'
export default  function RadioGroup(props){
  return (
      <View style={[ Object.assign({flexDirection:'row'},{...props.style})]}>
        {
          React.Children.map(props.children,(element,index)=>{
              if(!element){
                return null;
              }
              return React.cloneElement(element,Object.assign({},element.props,{
                key:index,
                model:props.model,
                onChange:props.onChange
              }))
            }
          )}
      </View>
  )
}