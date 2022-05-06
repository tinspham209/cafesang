import moment from 'moment';
import { generate } from 'shortid';
import { wrapIntoResponse } from '../helpers';

const initial = [
  {
    id: generate(),
    phone: '+18088080088',
    phoneVerified: true,
    isReviewed: false,
    immigrationStatus: null,
    healthStatus: null,
    firstTestingStatus: 'not_started',
    secondTestingStatus: 'not_started',
    thirdTestingStatus: 'not_started',
    questionnaireStatus: 'not_started',
    flyAwayStatus: null,
    createdDate: moment().toISOString(),
    status: null,
    name: 'Loc Tran',
    numberTravelers: 3,
    departureDate: moment().toISOString(),
    arrivalDate: null,
    arrivalFlightNo: null,
    destinationCity: null,
  },
];

const getTestings = () => {
  const response = {
    data: initial,
    total: initial.length,
  };

  return wrapIntoResponse(response);
};

export default { getTestings };
