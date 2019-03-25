/**
 * Created by zxf on 2018.9.25.
 */
// NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params={}) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
function dispatch(action) {
  _navigator.dispatch(action)
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  dispatch
};