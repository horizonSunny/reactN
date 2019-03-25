import { ART } from "react-native";
import React, { StatelessComponent, Component } from "react";

const {
  Surface, //  一个矩形可渲染的区域，是其他元素的容器
  Group, // 可容纳多个形状、文本和其他的分组
  Shape, // 形状定义，可填充
  Path, // 路径
  Text,
  LinearGradient, // 渐变色
  Pattern, // 填充图片
  ClippingRectangle // 剪辑
} = ART;
export class DrawNumberCircle extends Component {
  // circle 画圆
  constructor(props) {
    super(props);
  }
  render() {
    const circle = this.props.circle;
    const numberCircle = Path()
      .moveTo(...circle["start"])
      .arc(...circle["circleStart"])
      .arc(...circle["circleEnd"])
      .close();
    const text = this.props.text;
    let textX, textY;
    if (typeof text === "number") {
      textX = circle["start"][0] - 6;
      textY = circle["start"][1] + 4;
    } else {
      textX = circle["start"][0] - 10;
      textY = circle["start"][1] + 4;
    }
    return (
      <React.Fragment>
        <Shape
          d={numberCircle}
          stroke="#000000"
          strokeWidth={1}
          fill="rgb(240,240,240)"
        />
        <Text
          strokeWidth={1}
          stroke="black"
          font="20px Arial"
          x={textX}
          y={textY}
          fill="#000000"
        >
          {text + ""}
        </Text>
      </React.Fragment>
    );
  }
}
