import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles';

import {
  BACKGROUND_GRAY_BOTTOM,
  BACKGROUND_DARK,
  BACKGROUND_CENTER,
  STATUS_BAR_COLOR,
} from '../../constants/colors';

const startGradientPosition = { x: 0.2, y: 1 };
const endGradientPosition = { x: 1, y: 0 };
const gradientLocation = [0.20, 0.8, 1];

class BackgroundView extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.node,
        null,
      ])),
      PropTypes.node,
      null,
    ]),
    style: PropTypes.object,
  }

  static defaultProps = {
    children: [],
    style: {},
  }

  render() {
    const { children, style } = this.props;

    return (
      <LinearGradient
        style={styles.container}
        end={endGradientPosition}
        start={startGradientPosition}
        locations={gradientLocation}
        colors={[BACKGROUND_GRAY_BOTTOM, BACKGROUND_CENTER, BACKGROUND_DARK]}
      >
        <StatusBar
          backgroundColor={STATUS_BAR_COLOR}
          barStyle={'light-content'}
        />
        <View style={[styles.childrenContainer, style]}>
          {children}
        </View>
      </LinearGradient>
    );
  }
}

export default BackgroundView;