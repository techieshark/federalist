const { Site } = require('../models');

module.exports = {

  request: (site, branch_type) => new Promise((resolve, reject) => {
    if (site[branch_type]) {
      return resolve();
    }
    return reject(new Error(`{branch_type} is not set`));
  }),

};
