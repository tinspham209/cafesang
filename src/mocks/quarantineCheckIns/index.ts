import { wrapIntoResponse } from '../helpers';

const initial = [];

const getCheckIns = () => {
  const response = {
    data: initial,
    total: initial.length,
  };

  return wrapIntoResponse(response);
};

const detailData = {
  id: '78a3eabb-2eb5-4508-bde8-9ede63ae1ca0',
  tripId: '79e68865-2d59-461a-9246-3f4d1eb8c531',
  travelerId: 'c836bc2f-ee36-4a14-8d0a-fc6501ff641a',
  selfCheckInStartTime: '2021-10-01T10:00:00.000Z',
  selfCheckInEndTime: '2021-10-18T10:00:00.000Z',
  selfCheckInInterval: { hours: 24 },
  selfCheckIn: [
    {
      id: '1a2a98b1-fc4e-44da-a739-a39d4fac5e70',
      lat: 16.0502651,
      long: 108.2496261,
      location: { type: 'Point', coordinates: [108.2496261, 16.0502651] },
      submissionTime: '2021-09-25T02:12:28.691Z',
      result: {
        title:
          'Do not leave your quarantine location! Please contact a health professional for more questions about your condition.',
        riskLevel: 'Not Clear',
      },
    },
    {
      id: 'd2749a72-5833-49e3-b4ca-5a4fcef797f3',
      lat: 16.0502651,
      long: 108.2496261,
      location: { type: 'Point', coordinates: [108.2496261, 16.0502651] },
      submissionTime: '2021-09-25T04:36:38.138Z',
      result: {
        title:
          'Do not leave your quarantine location! Please contact a health professional for more questions about your condition.',
        riskLevel: 'Not Clear',
      },
    },
  ],
};

const getCheckInById = () => {
  const response = detailData;
  return wrapIntoResponse(response);
};

export default { getCheckIns, getCheckInById };

//
