/**
 * Created by Jeepeng on 2017/3/3.
 */

import React, { PureComponent } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight,
  View,
} from 'react-native';

class Touchable extends PureComponent {
  static defaultProps = {
    underlayColor: '#ddd',
  };
  render() {
    const { children, style, underlayColor, ...props } = this.props;
    const child = React.Children.only(children);
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback {...props}>
          <View style={style}>{child}</View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableHighlight underlayColor={underlayColor} style={style} {...props}>
        {child}
      </TouchableHighlight>
    );
  }
}

export default Touchable;
