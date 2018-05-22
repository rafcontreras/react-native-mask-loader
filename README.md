# react-native-svg-mask-loader

This component provides a loading screen for React Native apps that is meant to reproduce Twitter's app loading animation.

## Installation

```
yarn add react-native-svg-mask-loader

# or npm i -S react-native-svg-mask-loader
```

## Usage

```javascript
import Loader from 'react-native-svg-mask-loader';

<Loader
  isLoaded={this.state.appReady}
  maskWidth={100}
  maskHeight={100}
  outlineSource={<MaskOutline width={100} fill={"#f0b41d"} />}
  solidSource={<MaskSolid width={100} />}
  brandColor={"#f0b41d"}
>
  <AppContent />
</Loader>
```
