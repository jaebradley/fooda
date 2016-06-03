'use es6';

const HUBSPOT = 'HUBSPOT';
const DAVENPORT = 'DAVENPORT';
const OPTIONS = [HUBSPOT, DAVENPORT];

export default {
  HUBSPOT: HUBSPOT,
  DAVENPORT: DAVENPORT,
  isValid: function(candidate) {
    return OPTIONS.indexOf(candidate.toUpperCase()) > -1;
  },
};