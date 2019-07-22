import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  componentDidMount() {
    const context = this;

    context.setTimeout(() => {
      context.setState({ visible: false });
    }, 3000);
  }

  render() {
    const { visible } = this.state;

    return <Spinner visible={visible} />;
  }
}

ReactMixin(Loader.prototype, TimerMixin);

export default Loader;
