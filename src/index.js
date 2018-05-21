// @flow

import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

type Props = {|
  +children: React.Node,
  +isLoaded: boolean,
  +maskWidth: any,
  +maskHeight: any,
  +outlineSource: any,
  +solidSource: any,
  +brandColor: any,
  +secondaryColor: any,
  +secondaryColor: any
|};

type State = {|
  loadingProgress: Animated.Value,
  animationDone: boolean
|};

export default class Loader extends React.Component<Props, State> {
  static defaultProps = {
    isLoaded: false
  };

  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isLoaded && !this.props.isLoaded) {
      Animated.timing(this.state.loadingProgress, {
        toValue: 100,
        duration: 1500,
        useNativeDriver: true
      }).start(() => {
        this.setState({
          animationDone: true
        });
      });
    }
  }

  render() {
    const { height: winHeight, width: winWidth } = Dimensions.get("window");

    const startOpacityVisibletoClear = this.state.loadingProgress.interpolate({
      inputRange: [0, 9.9, 10],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });

    const endOpacityVisibletoClear = this.state.loadingProgress.interpolate({
      inputRange: [0, 99.9, 100],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });

    const appAnimStyle = {
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [1.1, 1]
          })
        }
      ]
    };

    const maskBorderAnimStyle = {
      opacity: startOpacityVisibletoClear
    };

    const outlineAnimStyle = {
      opacity: startOpacityVisibletoClear
    };

    const maskAnimStyle = {
      opacity: endOpacityVisibletoClear,
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 3, 6, 9, 100],
            outputRange: [1, 0.5, 2, 0.5, 70]
          })
        }
      ]
    };

    const {
      maskHeight,
      maskWidth,
      brandColor,
      secondaryColor,
      solidSource,
      outlineSource
    } = this.props;

    const renderMask = this.state.animationDone ? null : (
      <View style={[StyleSheet.absoluteFill]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            maskBorderAnimStyle,
            {
              width: winWidth,
              height: winHeight,
              borderColor: brandColor,
              borderTopWidth: winHeight / 2 - maskHeight / 2,
              borderLeftWidth: winWidth / 2 - maskWidth / 2,
              borderBottomWidth: winHeight / 2 - maskHeight / 2,
              borderRightWidth: winWidth / 2 - maskWidth / 2
            }
          ]}
        />
        <Animated.View
          style={[
            maskAnimStyle,
            {
              width: winWidth,
              height: winHeight,
              borderColor: brandColor,
              borderTopWidth: winHeight / 2 - maskHeight / 2,
              borderLeftWidth: winWidth / 2 - maskWidth / 2,
              borderBottomWidth: winHeight / 2 - maskHeight / 2,
              borderRightWidth: winWidth / 2 - maskWidth / 2
            }
          ]}
        >
          <View
            style={{
              width: maskWidth,
              height: maskHeight
            }}
          >
            {solidSource ? (
              <Animated.View
                style={[StyleSheet.absoluteFill, outlineAnimStyle]}
              >
                {solidSource}
              </Animated.View>
            ) : (
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  outlineAnimStyle,
                  { backgroundColor: secondaryColor }
                ]}
              />
            )}
            <View style={[StyleSheet.absoluteFill]}>
              {outlineSource}
            </View>
          </View>
        </Animated.View>
      </View>
    );

    return (
      <View style={styles.loaderWrapper}>
        <StatusBar animated={true} hidden={!this.state.animationDone} />
        <Animated.View style={[styles.centeredFullScreen, appAnimStyle]}>
          {this.props.children}
        </Animated.View>
        {renderMask}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1
  },
  centeredFullScreen: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
