/**
 * Created by ZuoXiaoFei on 2018.8.29.
 */

import React from 'react'
import {GroupContext} from "./RadioGroupContext";
export default  class RadioGroup extends React.Component{
  shouldComponentUpdate(nextProps){
    return this.props.model!==nextProps.model
  }
 render(){
   const group={model:this.props.model,onChange:this.props.onChange};
   return (
     <GroupContext.Provider value={group} >
       {this.props.children}
     </GroupContext.Provider>
   )
 }
}