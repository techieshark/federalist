import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// import fileDownload from 'js-file-download';
// import { BUILD_LOG } from '../../propTypes';

class RequestScanButton extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this, 'requestScan');
  }

  requestScan() {
    // let buildLogsData = this.props.buildLogsData || [];
    // buildLogsData = buildLogsData.map(data => [`Source: ${data.source}`, `Timestamp: ${(new Date(data.createdAt)).toISOString()}`, `Output:\n${data.output}`].join('\n'));
    // fileDownload(buildLogsData.join('\n\n'), `build-log-${this.props.buildId}.txt`);
    console.log('Scan Requested');
  }

  render() {
    return (
      <button className="usa-button" onClick={this.requestScan}>Request Scan</button>
    );
  }
}

RequestScanButton.propTypes = {
  // buildLogsData: PropTypes.arrayOf(BUILD_LOG).isRequired,
  siteId: PropTypes.number.isRequired,
};

export default RequestScanButton;
