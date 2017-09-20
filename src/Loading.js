/**
 * Created by Jeepeng on 2017/3/3.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Roots from 'react-native-roots';

const { width, height } = Dimensions.get('window');
const ROOT_VIEW_KEY = '__Loading';

class Loading extends Component {
  _hide() {
    Roots.remove(ROOT_VIEW_KEY);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._hide}>
        <View style={styles.container}>
          <View style={styles.mask}>
            <ActivityIndicator
              animating
              size="small"
              color="#fff"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  mask: {
    width: 42,
    height: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

export default {
  show() {
    Roots.add(ROOT_VIEW_KEY, <Loading />);
  },
  hide() {
    Roots.remove(ROOT_VIEW_KEY);
  },
};
