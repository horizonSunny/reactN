import React, {Component} from 'react';
import RNbridge from "../../components/RNbridge/RNbridge";
import qs from 'querystring'
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Image,
	ToastAndroid,
	ProgressBarAndroid,
	BackHandler,
	Modal, ActivityIndicator
} from 'react-native';
import {BackgroundImage} from '../../components/BackgroundImage/BackgroundImage'
import ButtonImg from "../../components/ButtonImg/ButtonImg"
import {parseTime, diffTime} from '../../utils/handleTime'
import {inject} from 'mobx-react'
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/Button";

@inject('rootStore')
export default class Report extends Component {
  state = {
    userInfo: {},
    data: [],
    pageIndex: 1,
		isLoading:false,
		resultData:{}
  }
  constructor(props){
    super(props);
    this.networkStatus=true
	  console.log('?????????????????')
	  console.log( this.props.rootStore.userInfo)
    this.userInfo = this.props.rootStore.userInfo
    this.state.data = this.props.rootStore.reportData
	  console.log(this.props.rootStore.commonInfo.schedule)
	  let a = this.props.rootStore.commonInfo.schedule != '14'
	  console.log(a)
    if(this.props.rootStore.commonInfo.schedule != '14') {
      // this.sendMasterId()
	    console.log(88)
	    this.sendToHe()
    }
    this.gameNames=["视空间能力专项测评","反应速度专项测评","执行功能专项测评","言语能力专项测评","工作记忆专项测评","记忆专项测评"]
		this.newGameData=this.state.data.filter((item,index)=>{
			return this.gameNames.indexOf(item.name)>-1
		})
		this.resultData={
    	doctorId:this.props.rootStore.commonInfo.doctorId,
			visuospatialCdt:1,
			executiveTmt:1,
			languageWcpair:1,
			attentionSdmt:1,
			memoryPicture:1,
			memoryNback:1,
			patientId:this.props.rootStore.commonInfo.patientId,
			patientName:this.props.rootStore.userInfo.name,
			stage:this.props.navigation.getParam("stage",1)
		}
		this.newGameData.map((item,index)=>{
			switch(item.name){
				case "视空间能力专项测评":
					this.resultData.visuospatialCdt=item.result==="正常"?1:0;
					break;
				case "反应速度专项测评":
					this.resultData.attentionSdmt=item.result==="正常"?1:0;
					break;
				case "执行功能专项测评":
					this.resultData.executiveTmt=item.result==="正常"?1:0;
					break;
				case "言语能力专项测评":
					this.resultData.languageWcpair=item.result==="正常"?1:0;
					break;
				case "工作记忆专项测评":
					this.resultData.memoryNback=item.result==="正常"?1:0;
					break;
				case "记忆专项测评":
					this.resultData.memoryPicture=item.result==="正常"?1:0;
					break;
			}
		});
    this.state.resultData=this.resultData
		this.state.newGameData=this.newGameData
  }
	componentDidMount(){

	}
  goNext =() => {
    this.setState({
      pageIndex: ++this.state.pageIndex
    })
  }
  goPre = () => {
    BackHandler.exitApp();
  }
  sendMasterId = () => {
    RNbridge.saveDataBase('pdfReport/generatingPdf', {},this.props.rootStore.commonInfo).then(res => {

    })
  };
  sendToHe = () => {
    const toHe = {};
    const data = this.state.data;
    const curTime = new Date().getTime()
    const durationTime = curTime - global.__START_TIME__
    toHe.duration = diffTime(durationTime)
    toHe.overDate = parseTime(curTime)
    data.map(item => {
      toHe[item.sendToHe] = item[item.sendToHe]
    })
	  if(this.props.rootStore.rzxj){
		  toHe.rzjk = 1
	  }
	  if(this.props.rootStore.rzss){
    	toHe.rzjk = 2
	  }
	  if(!this.props.rootStore.rzxj&&!this.props.rootStore.rzss){
		  toHe.rzjk = 0
	  }
	  if(this.props.rootStore.jieshuceping == 0){
		  toHe.completeForm = '0'
		  toHe.evaluationName = 'Cogntive1'
	  }
	  toHe.completeForm = ''
	  toHe.evaluationName = ''
	  toHe.pilotRemark = ''
    if(this.props.rootStore.commonInfo.schedule == 0||this.props.rootStore.commonInfo.schedule == 4||this.props.rootStore.commonInfo.schedule == 1||this.props.rootStore.commonInfo.schedule == 2||this.props.rootStore.commonInfo.schedule == 3||this.props.rootStore.commonInfo.schedule == 6||this.props.rootStore.commonInfo.schedule == 7){
	    RNbridge.saveDataBase('scaleScoreMaster/updateRadar', toHe,this.props.rootStore.commonInfo).then(res => {
		    if (res) {
			    // ToastAndroid.show("保存成功", ToastAndroid.SHORT);
		    } else {
			    ToastAndroid.show("保存失败", ToastAndroid.SHORT);
		    }
	    })
    }else{
    	console.log(toHe,'_____________')
	    RNbridge.saveDataBase('scaleScoreMaster/update', toHe,this.props.rootStore.commonInfo).then(res => {
		    if (res) {
			    ToastAndroid.show("保存成功", ToastAndroid.SHORT);
		    } else {
			    ToastAndroid.show("保存失败", ToastAndroid.SHORT);
		    }
	    })
    }
  }
  renderPages() {
    const pageIndex = this.state.pageIndex;
    if (pageIndex === 0) {
      return (
        <React.Fragment>
          <TopBar/>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <BackgroundImage source={require('./img/bk.jpg')}
                             style={{marginTop:dp(300),height: dp(500), width: dp(1725), alignItems: 'center'}}>
              <Text style={{
                fontSize: font(70),
                color: '#ffffff',
                marginTop: dp(120),
                fontWeight: "700"
              }}>{'尊敬的：' + this.userInfo.name}</Text>
              <Text style={{
                fontSize: font(70),
                color: '#ffffff',
                marginTop: dp(50),
                fontWeight: "700"
              }}>感谢您完成了全部测试</Text>
              <View style={{alignItems: 'center', marginTop: dp(50)}}>
                <ButtonImg
                  source={require('./img/btn-default.png')}
                  sourcePress={require('./img/btn-press.png')}
                  style={{
                    width: dp(382),
                    height: dp(95),
                    marginTop: dp(174),
                    borderRadius: dp(10),
                    overflow: 'hidden'
                  }}
                  onPress={this.goNext}>
                  <Text
                  style={{fontSize: font(40), fontWeight: 'bold', color: '#ffffff'}}>查看体检报告</Text>
                </ButtonImg>
              </View>
            </BackgroundImage>
          </View>

        </React.Fragment>
      )
    } else {
      return (
       <React.Fragment>
         <TopBar/>
         <View style={{alignItems: 'center'}}>
           <View style={styles.mainCont}>
             <View>
               <Text style={styles.reportTitle}>脑健康评估报告</Text>
             </View>
             <View style={styles.patientInfo}>
               <View style={styles.patientInfoItem}>
                 <Text style={styles.pKey}>姓名：</Text>
                 <Text style={styles.pValue}>{this.userInfo.name}</Text>
               </View>
               <View style={styles.patientInfoItem}>
                 <Text style={styles.pKey}>性别：</Text>
                 <Text style={styles.pValue}>{+this.userInfo.sex === 1 ? '男' : '女'}</Text>
               </View>
               <View style={styles.patientInfoItem}>
                 <Text style={styles.pKey}>年龄：</Text>
                 <Text style={styles.pValue}>{this.userInfo.age}</Text>
               </View>
             </View>
             <View style={{
               height: dp(650)
             }}>
               <View style={styles.tableRow} key={'111'}>
                 <Text style={[styles.tdh, styles.th, styles.tf]}>名称</Text>
                 <Text style={[styles.th, styles.tdh]}>内容</Text>
                 <Text style={[styles.th, styles.tdh]}>得分</Text>
                 <Text style={[styles.th, styles.tdh]}>正常参考值</Text>
                 <Text style={[styles.th, styles.tdh]}>结果</Text>
               </View>
               <ScrollView >
                 {this.renderTable()}
               </ScrollView>
             </View>
						 {(this.props.rootStore.commonInfo.schedule==="0"||this.props.rootStore.commonInfo.schedule==="4")&&<View><Button onPress={this.goTrain} style={{backgroundColor:'#406dce',width:dp(285),height:dp(60),marginTop:dp(10),backgroundColor:'#2591f4',borderRadius:dp(50)}}  scu={false}><Text style={{color:'#ffffff',fontSize:font(30)}}>开始训练</Text></Button></View>}
           </View>

         </View>

       </React.Fragment>
      )
    }
  }
  renderTable() {
    const data = this.state.data;
    return (
      data.map((item, index) => {
        return <View style={styles.tableRow} key={index + item.name}>
          <Text style={[styles.td, styles.tdh, styles.tf, styles.tdf]}>{item.name}</Text>
          <Text style={[styles.td, styles.tdh]}>{item.content}</Text>
          <Text style={[styles.td, styles.tdh]}>{item.score}</Text>
          <Text style={[styles.td, styles.tdh]}>{item.referenceScore}</Text>
          <Text style={[styles.td, styles.tdh, item.result === '正常' ? styles.tdl : styles.tdred]}>{item.result}</Text>
        </View>
      })
    )
  }
	goTrain=()=>{
  	let path;
  	let isOnline=false
		if(isOnline){
  		path="http://pub.brainsources.com/trainPlan/intelligentPlan"
		}else{
  		path="http://pub.brainsources.com/trainPlan/intelligentPlan"
		}
  	this.setState({
			isLoading:true
		},()=>{
			fetch(path,{
				method:'POST',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body:qs.stringify(this.resultData)
			})
				.then(response => {
					if(response.ok){
						return response.json()
					}
				}).then(json=>{
						if(json.code===0){
							this.props.rootStore.userInfo
							this.setState({isLoading:false})
							let nianling ;
							if(typeof this.props.rootStore.userInfo.age == 'number'){
								nianling = JSON.stringify(this.props.rootStore.userInfo.age)
							}else{
								nianling = this.props.rootStore.userInfo.age
							}
							RNbridge.startTrain({
								patientId:this.props.rootStore.commonInfo.patientId,
								name:this.props.rootStore.userInfo.name,
								phone:this.props.rootStore.userInfo.phone,
								idNumber:this.props.rootStore.userInfo.idNumber,
								age:nianling,
								sex:this.props.rootStore.userInfo.sex,
								...json.data
							})
						}
						else{
							ToastAndroid.show('保存失败,请稍后再试',ToastAndroid.SHORT)
						}
			}).catch((error) => {
					this.networkStatus=false
				console.log(error)
					ToastAndroid.show("网络连接失败，请检查网络是否通畅",ToastAndroid.SHORT)
					this.setState({isLoading:false})
				});
		})

	}
  render() {
    return (
     <View style={{justifyContent: 'center'}}>
       {this.renderPages()}
       <Modal
				 transparent={true}
				 visible={this.state.isLoading}
				 animationType="none"
				 onRequestClose={() => {
				 }}
				 presentationStyle="overFullScreen">
				 <View style={{width:'100%',height:'100%', alignItems:'center',justifyContent:'center'}}>
					 <ActivityIndicator size="large" color="#00ff00" />
				 </View>
			 </Modal>
     </View>

    );
  }
}

const BASE_COLOR = '#9ac0e5';
const styles = StyleSheet.create({
  topTip: {
    height: dp(100),
    width: '100%',
    paddingLeft: dp(50),
    paddingRight: dp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  font40: {
    fontSize: font(40)
  },
  mainCont: {
    height:dp(1070),
    width: '95%',
    alignItems: 'center',
    margin: dp(20),
    borderRadius: dp(10),
    borderBottomColor: '#c7c7c7',
    borderBottomWidth: dp(0.5),
    backgroundColor: '#fff'
  },
  ret: {
    fontSize: font(26)
  },
  right: {
    alignItems: 'flex-end'
  },
  table: {
    flexDirection: 'row',
    height: dp(320),
    alignItems: 'center',
    marginLeft: dp(240)
  },
  tableColumn1: {
    alignItems: 'center',
    borderBottomColor: BASE_COLOR,
    borderBottomWidth: dp(0.5),
  },
  tableRow: {
    flexDirection: 'row'
  },
  tdh: {
    width: dp(240),
    height: dp(80),
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: dp(1),
    borderColor: '#9ac0e5',
    borderLeftWidth: dp(0)
  },
  td: {
    fontSize: font(22),
    color: '#878787',
    backgroundColor: '#fff',
    borderTopWidth: dp(0)
  },
  th: {
    fontSize: font(26),
    color: '#2b2b2b',
    backgroundColor: '#e9f4ff'
  },
  tf: {
    borderLeftWidth: dp(1.)
  },
  tdf: {
    color: '#228be0',
  },
  tdl: {
    color: '#25bc3a',
  },
  tdred: {
    color: '#d11d1d',
  },
  reportTitle: {
    height: dp(50),
    width: dp(478),
    margin: dp(50),
    textAlign: 'center',
    // textAlignVertical: 'center',
    fontSize: font(42),
    color: '#333744',
    // borderBottomWidth: dp(0.5),
    // borderBottomColor: '#424242'
  },
  reportTime: {
    height: dp(84),
    width: dp(478),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: font(20),
    color: '#878787'
  },
  patientInfo: {
    width: dp(1070),
    height: dp(60),
    flexDirection: 'row',
    marginTop: dp(40),
    justifyContent: 'space-between'
  },
  patientInfoItem: {
    flexDirection: 'row'
  },
  pKey: {
    fontSize: font(26),
    fontWeight: 'bold'
  },
  pValue: {
    fontSize: font(24)
  }
});