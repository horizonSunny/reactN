/**
 * Created by zxf on 2018.9.4.
 */
import React, { PureComponent } from "react";
import {
  Text,
  View,
  PanResponder,
  ART,
  requireNativeComponent,
  InteractionManager,
  Image
} from "react-native";
import ReactNative from "react-native";

const NativeModules = ReactNative.NativeModules;
const UIManager = NativeModules.UIManager;
const NativeCanvas = requireNativeComponent("CanvasView");
class Canvas extends PureComponent {
  parentTop = 0;
  parentLeft = 0;
  startX = 0;
  startY = 0;
  state = {
    marginLeft: 0,
    marginTop: 0,
    path: null,
    show: false
  };
  constructor(props) {
    super(props);
    this._initPanResponder();
    this.parentView = React.createRef();
    this.webview = React.createRef();
    this.nativeCanvas = React.createRef();
    setTimeout(() => {
      this.setState({
        show: true
      });
    }, 16);
  }
  componentDidUpdate() {
    console.log("更新完成", new Date().getTime());
  }
  _initPanResponder() {
    const _this = this;
    this._panResponder = PanResponder.create({
      //是否相应触摸
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      //是否相应触摸移动
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      //触摸开始响应
      onPanResponderGrant: this.touchStart.bind(this),
      //触摸进行中
      onPanResponderMove: this.touchMove.bind(this),
      //触摸结束
      onPanResponderRelease: (evt, gestureState) => {
        this.touchEnd();
      },
      //触摸被中断
      onPanResponderTerminate: (evt, gestureState) => {}
    });
    console.log("mount", this._panResponder);
  }
  touchMove(evt, gestureState) {
    const { x0, y0, moveX, moveY, dx, dy } = gestureState;
    const oldPath = new ART.Path();
    oldPath.moveTo(this.startX, this.startY); //将起始点移动到(1,1) 默认(0,0)
    oldPath.lineTo(moveX - this.parentLeft, moveY - this.parentTop); //连线到目标点(300,1)
    this.setState({
      path: oldPath
    });
    this.startX = moveX - this.parentLeft;
    this.startY = moveY - this.parentTop;
  }
  touchStart(evt, gestureState) {
    const { x0, y0 } = gestureState;
    this.startX = x0 - this.parentLeft;
    this.startY = y0 - this.parentTop;
    const oldPath = new ART.Path();
    oldPath.moveTo(this.startX, this.startY); //将起始点移动到(1,1) 默认(0,0)
    this.setState({
      path: oldPath
    });
    console.log("开始触摸");
  }
  touchEnd = () => {};
  _onLayout = event => {
    //获取根View的宽高，以及左上角的坐标值
    NativeModules.UIManager.measure(
      event.target,
      (x, y, width, height, pageX, pageY) => {
        this.parentLeft = pageX;
        this.parentTop = pageY;
        console.log(`view的${this.parentLeft},${this.parentTop}`);
      }
    );
  };
  buildImg = () => {
    console.log("buildImg");
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this.nativeCanvas.current),
      UIManager.CanvasView.Commands.buildDrawingCache,
      null
    );
  };
  resetCanvas = () => {
    console.log("reset");
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this.nativeCanvas.current),
      UIManager.CanvasView.Commands.restCanvas,
      null
    );
  };
  getBase64 = event => {
    if (this.props.getBase64) {
      this.props.getBase64("data:image/png;base64," + event.nativeEvent.base64);
    }
  };
  render() {
    console.log("开始更新", new Date().getTime());
    var {
      Surface, //  一个矩形可渲染的区域，是其他元素的容器
      Group, // 可容纳多个形状、文本和其他的分组
      Shape, // 形状定义，可填充
      Path, // 路径
      LinearGradient, // 渐变色
      Pattern, // 填充图片
      ClippingRectangle // 剪辑
    } = ART;
    return (
      <View ref={this.parentView}>
        {this.state.show && (
          <NativeCanvas
            onLayout={this._onLayout}
            {...this._panResponder.panHandlers}
            backgroundColor="rgb(240,240,240)"
            ref={this.nativeCanvas}
            onToBase64={this.getBase64}
            style={this.props.canvasStyle}>
            <Shape
              d={this.state.path}
              stroke="#000000"
              strokeWidth={this.props.strokeWidth}
            />
            {this.props.children}
          </NativeCanvas>
        )}
      </View>
    );
  }
}

export default Canvas;
