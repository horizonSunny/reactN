/**
 * Created by ZuoXiaoFei on 2018.8.27.
 */
import React from "react";
import { enableLogging } from "mobx-logger";
import { BackHandler } from "react-native";
import { Provider } from "mobx-react";
import RouterView from "./router";
import Store from "./store";
import Orientation from "react-native-orientation";
import NavigationService from "./router/NavigationService";
import PubSub from "./components/PubSub/PubSub";

enableLogging({
  predicate: () => __DEV__ && Boolean(window.navigator.userAgent),
  action: true,
  transaction: true,
  reaction: true,
  compute: true
});

export default class App extends React.PureComponent {
  startTime() {
    console.log("app_js_startTime");
    global.time.timer && clearInterval(global.time.timer);
    global.time.timer = setInterval(() => {
      global.time.number += 1;
      PubSub.publish("updateTime");
    }, 1000);
  }
  componentDidMount() {
    this.lockDirection(); //锁定方向
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
    this.pubHandler = null;
    global.time = {};
    global.time.number = 0;
    this.startTimeHandler = PubSub.subscribe("startTime", this.startTime);
    this.stopTimeHandler = PubSub.subscribe("stopTime", () => {
      global.time.timer && clearInterval(global.time.timer);
    });
  }
  componentWillUnmount() {
    console.log("app unmount");
    global.time.timer && clearInterval(global.time.timer);
    global.time.number = 0;
    PubSub.unsubscribe(this.startTimeHandler);
    PubSub.unsubscribe(this.stopTimeHandler);
    PubSub.clearAllSubscriptions();
    this.backHandler.remove();
  }

  lockDirection() {
    Orientation.lockToLandscapeLeft();
    Orientation.addOrientationListener(orientation => {});
  }
  render() {
    const rootStore = new Store();
    return (
      <React.Fragment>
        <Provider rootStore={rootStore}>
          <RouterView
            ref={navigatorRef => {
              console.log(navigatorRef);
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Provider>
      </React.Fragment>
    );
  }
}
