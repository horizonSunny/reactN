/**
 * Created by ZuoXiaoFei on 2018.8.25.
 */
import {PixelRatio,Dimensions,StatusBar} from "react-native";
const {width,height} = Dimensions.get('window');
const UIpx=1920;
const scale=PixelRatio.get();
const fontScale = PixelRatio.getFontScale();
/**
 * 转换设计稿px为dp
 * @param {number} px
 * @returns {*}
 * @constructor
 */
export  function px2dp(px) {
  if(px===1){
    return 1;
  }
  const layoutSize = px / UIpx * width;
  return PixelRatio.roundToNearestPixel(layoutSize);

}

/**
 *
 * @param {number} size
 * @returns {number} *
 *
 */
export const FontSize = (px) => {

  const layoutSize = px / UIpx * width/fontScale;
  return PixelRatio.roundToNearestPixel(layoutSize);
};
// const heightPx=PixelRatio.getPixelSizeForLayoutSize(height)
// const statusBarHeightPx=PixelRatio.getPixelSizeForLayoutSize(StatusBar.currentHeight)

const navigationHeight=0
const __HEIGHT__=height
export {__HEIGHT__,navigationHeight}