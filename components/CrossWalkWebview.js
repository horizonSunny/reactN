/**
 * Created by zxf on 2018.9.4.
 *
 */
import React from 'react'
import PropTypes from 'prop-types';
import ReactNative, {requireNativeComponent,   ActivityIndicator, View,StyleSheet} from 'react-native';

const NativeModules=ReactNative.NativeModules;

const UIManager=NativeModules.UIManager;

const CrosswalkWebViewManager=NativeModules.CrosswalkWebViewManager

const JSNavigationScheme=NativeModules.JSNavigationScheme

const WEBVIEW_REF = 'crosswalkWebView';

const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
const { StatusBarManager } = NativeModules;
class MyWebview extends React.Component{
  static JSNavigationScheme=JSNavigationScheme;
  static propTypes={
    injectedJavaScript:      PropTypes.string,
    onError:                 PropTypes.func,
    onMessage:               PropTypes.func,
    onNavigationStateChange: PropTypes.func,
    onProgress:              PropTypes.func,
    onFinished:              PropTypes.func,
    allowUniversalAccessFromFileURLs: PropTypes.bool,
    domStorageEnabled: PropTypes.bool,
    mediaPlaybackRequiresUserAction:PropTypes.bool,
    javaScriptEnabled:PropTypes.bool,
    userAgent:PropTypes.string,
    scalesPageToFit:PropTypes.bool,
    saveFormDataDisabled:PropTypes.bool,
    source:                  PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,  // URI to load in WebView
      }),
      PropTypes.shape({
        html: PropTypes.string, // static HTML to load in WebView
      }),
      PropTypes.number,           // used internally by React packager
    ]),
    url:PropTypes.string,
    ...View.propTypes
  }
  static defaultProps
    ={
    localhost: false,
    javaScriptEnabled:true,
    domStorageEnabled:true
  }
  constructor(props){
    super(props);
    this.crosswalkWebView=React.createRef();
    this.state={
      showLoading:true
    }
  }
  getWebViewHandle () {
    return ReactNative.findNodeHandle(this.crosswalkWebView.current);
  }
  onNavigationStateChange (event) {
    let { onNavigationStateChange } = this.props;
    if (onNavigationStateChange) {
      onNavigationStateChange(event.nativeEvent);
    }
  }
  onError (event) {
    let { onError } = this.props;
    if (onError) {
      onError(event.nativeEvent);
    }
  }
  onFinished(){
    console.log('加载页面完成')
    this.setState({
      showLoading:false
    });
    this.props.onFinished&&this.props.onFinished();
  }
  onProgress (event) {
    console.log('加载进度',event.nativeEvent.progress)
    if (this.props.onProgress) {
      this.props.onProgress(event.nativeEvent.progress / 100);

    }
  }

  goBack () {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.CrosswalkWebView.Commands.goBack,
      null
    );
  }
  goForward () {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.CrosswalkWebView.Commands.goForward,
      null
    );
  }
  reload () {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.CrosswalkWebView.Commands.reload,
      null
    );
  }
  load (url) {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.CrosswalkWebView.Commands.load,
      [String(url)]
    );
  }
  postMessage (data) {

    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.CrosswalkWebView.Commands.postMessage,
      [String(data)]
    );
  }
  onMessage (event) {
    let {onMessage} = this.props;
    onMessage && onMessage(event);
  }
  render(){
    let source = this.props.source || {};
    if (this.props.url) {
      source.uri = this.props.url;
    }
    if(source.number){//加载rn本地的html
      source=source.number;
    }
    let nativeProps = Object.assign({}, this.props, {
      messagingEnabled: typeof this.props.onMessage === 'function',
      onCrosswalkWebViewNavigationStateChange: this.onNavigationStateChange.bind(this),
      onCrosswalkWebViewError: this.onError.bind(this),
      onCrosswalkWebViewLoadFinished:this.onFinished.bind(this),
      onCrosswalkWebViewProgress: this.onProgress.bind(this)
    });
    console.log('render webview',source.uri)
    //key 是必须得，否则url时界面不会更新
    return (
      <React.Fragment>
        {this.state.showLoading&&<View style={style.loading}><ActivityIndicator  size="large" color="#0000ff" /></View>}
        <NativeCrosswalkWebView
          { ...nativeProps }
          key={source.uri}
          ref={this.crosswalkWebView }
          source={ resolveAssetSource(source) }
        />
      </React.Fragment>
    );
  }
}

/**
 * 此处requireNativeComponent的第一个参数为源码corssWalkWebViewGroupManager 中
 * public static final String REACT_CLASS = "CrosswalkWebView"; 的值，不能随便写，否则会提示找不到模块
 */
const NativeCrosswalkWebView = requireNativeComponent('CrosswalkWebView', MyWebview, {
  nativeOnly: {
    messagingEnabled: PropTypes.bool,
  },
});
const style=StyleSheet.create({
  loading:{
    width:'100%',
    height:'100%',
    position:'absolute',
    zIndex:2,
    alignItems:'center',
    justifyContent:'center'
  }
})
export default MyWebview;