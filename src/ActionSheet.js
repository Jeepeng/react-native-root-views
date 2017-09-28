/**
 * Created by Jeepeng on 2017/3/3.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  Dimensions,
  Animated,
  Easing,
  ActionSheetIOS,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import Roots from 'react-native-roots';

import Touchable from './Touchable';

const ROOT_VIEW_KEY = '__ActionSheet';

class ActionSheet extends Component {
  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
    this._onPressItem = this._onPressItem.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._onPressMask = this._onPressMask.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      easing: Easing.in,
      duration: 200,
      toValue: 1,
    }).start();
    BackHandler.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
  }

  _handleBack() {
    Roots.remove(ROOT_VIEW_KEY);
  }

  _onPressMask() {
    const { cancelButtonIndex } = this.props.options;
    this._onPressItem(cancelButtonIndex);
  }

  _onPressItem(buttonIndex) {
    Roots.remove(ROOT_VIEW_KEY);
    const { onPressItem } = this.props;
    onPressItem(buttonIndex);
  }

  _renderItem(item) {
    return (
      <Touchable onPress={() => this._onPressItem(item.index)} key={item.index}>
        <View style={styles.item}>
          <Text style={[styles.itemText, { color: item.color }]}>{item.text}</Text>
        </View>
      </Touchable>
    );
  }

  render() {
    const {
      title,
      message,
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      tintColor = '#2b3d54',
    } = this.props.options;
    return (
      <TouchableWithoutFeedback onPress={this._onPressMask}>
        <Animated.View style={[styles.container, { opacity: this.state.fadeAnim }]}>
          <View style={styles.content}>
            {title ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>{title}</Text>
              </View>
            ) : null}
            {message ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.message}>{message}</Text>
              </View>
            ) : null}
            {options.map((item, index) => {
              if (index === cancelButtonIndex) {
                return null;
              } else if (index === destructiveButtonIndex) {
                return this._renderItem({ text: item, color: '#f43f3c', index });
              }
              return this._renderItem({ text: item, color: tintColor, index });
            })}
          </View>
          {cancelButtonIndex ? (
            <View style={{ marginTop: 10 }}>
              <Touchable onPress={() => this._onPressItem(cancelButtonIndex)}>
                <View style={styles.cancel}>
                  <Text style={{ fontSize: 17, color: tintColor }}>
                    {options[cancelButtonIndex]}
                  </Text>
                </View>
              </Touchable>
            </View>
          ) : null}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    width,
    height: Platform.select({
      android: height - StatusBar.currentHeight,
      ios: height,
    }),
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  title: {
    paddingTop: 10,
    fontSize: 15,
    color: '#888',
  },
  message: {
    padding: 5,
    fontSize: 14,
    color: '#999',
  },
  item: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderTopColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  itemText: {
    fontSize: 17,
  },
  cancel: {
    padding: 15,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});

const api = {
  showActionSheetWithOptions(options, callback) {
    Roots.add(ROOT_VIEW_KEY, <ActionSheet options={options} onPressItem={callback} />);
  },
  showShareActionSheetWithOptions() {
    // TODO
  },
};

export default Platform.select({
  android: api,
  ios: api, //ActionSheetIOS,
});
