import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Util } from "expo";

import Loader from "react-native-svg-mask-loader";

type State = {|
  appReady: boolean,
  rootKey: number
|};

export default class App extends React.Component<{}, State> {
  state = {
    appReady: false,
    rootKey: Math.random()
  };

  constructor() {
    super();

    this._stencil = require("./assets/outline.svg");
    this._solid = require("./assets/solid.svg");
  }

  componentDidMount() {
    this.resetAnimation();
  }

  resetAnimation() {
    this.setState({
      appReady: false,
      rootKey: Math.random()
    });

    setTimeout(() => {
      this.setState({
        appReady: true
      });
    }, 1000);
  }

  render() {
    return (
      <View key={this.state.rootKey} style={styles.root}>
        <Loader
          isLoaded={this.state.appReady}
          maskWidth={100}
          maskHeight={100}
          outlineSource={this._outline}
          solidSource={this._solid}
          brandColor={"#f0b41d"}
        >
          <View style={styles.container}>
            <Button
              onPress={() => {
                this.resetAnimation();
              }}
              title="See it again"
            />
          </View>
        </Loader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  loadingBackgroundStyle: {
    backgroundColor: "rgba(125, 125, 255, 1)"
  }
});
