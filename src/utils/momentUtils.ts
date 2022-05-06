import momentTz from 'moment-timezone';

export const DateFormat = 'MM/DD/YYYY';
export const DateFormatDisplay = 'MMMM DD, YYYY';
export const DateFormatDisplayShort = 'MMM DD, YYYY';
export const DateFormatDisplayMonthYear = 'MMMM yyyy';
export const DateFormatApi = 'YYYY-MM-DD';

export const TimeFormat = 'HH:mm';
export const TimeFormat12 = 'hh:mm A';
export const HST_TIMEZONE = 'US/Hawaii';

/**
 * Get date display
 * @param {string|date|moment} value
 * @param {string} languageCode
 */
export const getDateDisplay = (value: string) => {
  return momentTz(value).tz(HST_TIMEZONE).format(DateFormat);
};

/**
 * Get date display
 * @param {string|date|moment} value
 * @param {string} languageCode
 */
export const getTimeDisplay = (value: string) => {
  return momentTz(value).tz(HST_TIMEZONE).format(TimeFormat);
};

export const localTimeToHawaii = (datetime, isDate = false) => {
  const date = momentTz(datetime).startOf('day');
  const dateInHawaii = momentTz(date).utcOffset(-10, true);
  const dateWithOffset = dateInHawaii.tz('US/Hawaii');

  return isDate ? dateWithOffset.format(momentTz.HTML5_FMT.DATE) : dateWithOffset.toISOString(true);
};

export const hawaiiTimeToLocal = datetime => {
  return momentTz(
    momentTz(momentTz(datetime).tz('US/Hawaii').toISOString(true)).format('MM/DD/YYYY'),
    'MM/DD/YYYY',
  ).toISOString(true);
};

export const samoaTimeToLocal = datetime => {
  const hawaiiTime = momentTz(datetime).utcOffset(-11);
  const offset = new Date().getTimezoneOffset() / 60;
  const localTime = hawaiiTime.utcOffset(-offset, true);
  return localTime.toISOString(true);
};

export const dateResponseToData = (date: Date | string) => {
  if (!date) return undefined;
  return momentTz(date).toDate();
};

export const isUnder12 = value => momentTz(value).add(12, 'years').isSameOrAfter(momentTz(), 'day');
