import React from 'react';
import { View, ViewPropTypes, StyleSheet, Text } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';
import moment from 'moment';
import { number } from 'prop-types';
import Constants from '../../constants';

const styles = StyleSheet.create({
  style: { flexDirection: 'row' },
  textStyle: {
    ...Constants.Fonts.tinyLargeBold,
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TRANSPARENT,
    color: Constants.Colors.BLACK,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 30,
  },
});

class Timer extends React.Component {
  static propTypes = {
    startTime: number.isRequired,
    style: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    style: {},
    textStyle: {},
  };

  constructor(props) {
    super(props);

    this.state = { startTime: props.startTime };
  }

  componentWillMount() {
    this.runTimer();
  }

  componentWillUnmount() {
    this.clearInterval(this.timer);
  }

  runTimer = () => {
    const self = this;
    const runTime = new Date().getTime();

    this.timer = this.setInterval(() => {
      if (self.state.startTime - 1 < 1) {
        self.props.onFinish();
        self.clearInterval(this.timer);
        self.setState({ startTime: 0 });

        return;
      }
      const duration = moment.duration(moment(new Date().getTime(), 'x').diff(moment(runTime, 'x')));
      const mins = duration.asSeconds().toFixed(0);

      self.setState({ startTime: self.props.startTime - mins });
    }, 1000);
  };

  render() {
    const {
      style, textStyle,
    } = this.props;
    const { startTime } = this.state;
    const minutes = Math.floor(startTime / 60);

    return (
      <View style={[styles.style, style]}>
        <Text style={[styles.textStyle, textStyle]}>
          {`0${minutes}`.slice(-2)}
          {':'}
          {`0${startTime - minutes * 60}`.slice(-2)}
        </Text>
      </View>
    );
  }
}

ReactMixin(Timer.prototype, TimerMixin);
export default Timer;
