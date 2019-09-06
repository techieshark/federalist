import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SITE } from '../propTypes';
import { IconView } from './icons';

const isDefaultBranch = (branchName, site) => branchName === site.defaultBranch;
const isDemoBranch = (branchName, site) => branchName === site.demoBranch;

const getUrlAndViewText = (branchName, site, completedAt) => {
  if (isDefaultBranch(branchName, site)) {
    return { url: site.viewLink, viewText: 'View site' };
  }
  if (isDemoBranch(branchName, site)) {
    return { url: site.demoViewLink, viewText: 'View demo' };
  }

  // temp for migration - should be removed by end of year 2019
  if (completedAt && ((new Date(completedAt) < new Date('2019-09-06')))) {
    return {
      url: `https://federalist-proxy.app.cloud.gov/preview/${site.owner}/${site.repository}/${branchName}/`,
      viewText: 'Preview site',
    };
  }

  return {
    url: `https://${site.awsBucketName}.app.cloud.gov/preview/${site.owner}/${site.repository}/${branchName}/`,
    viewText: 'Preview site',
  };
};

export const BranchViewLink = ({ branchName, site, showIcon, completedAt }) => {
  const { url, viewText } = getUrlAndViewText(branchName, site, completedAt);

  if (showIcon) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-site-link"
      >
        { viewText }
        <IconView />
      </a>
    );
  }
  return (<a href={url} target="_blank" rel="noopener noreferrer">{ viewText }</a>);
};

BranchViewLink.propTypes = {
  branchName: PropTypes.string.isRequired,
  site: SITE.isRequired,
  showIcon: PropTypes.bool,
  completedAt: PropTypes.string,
};

BranchViewLink.defaultProps = {
  showIcon: false,
};

export default connect()(BranchViewLink);
