import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class Progress extends React.PureComponent {
  static propTypes = { visible: bool.isRequired };

  render() {
    const { visible } = this.props;

    return <Spinner visible={visible} />;
  }
}

const mapStateToProps = ({ app: { visible } }) => ({ visible });

export default connect(mapStateToProps)(Progress);
