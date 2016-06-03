'use es6';

import LocationOption from '../data/LocationOption';

const helpText = `To get Fooda data, type fooda menu [location_option]. For example, fooda menu davenport.\n`;
const locationOptionText = `Location options are: ${LocationOption.HUBSPOT.toLowerCase()}, ${LocationOption.DAVENPORT.toLowerCase()}`;

export default {
  TEXT: `${helpText}${locationOptionText}`,
};