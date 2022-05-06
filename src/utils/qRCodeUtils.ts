const formatConfirmationCode = value => {
  return `${formatString(value, [4, 4, 4], '-')}`;
};

const formatString = (input, format, sep) => {
  var output = '';
  var idx = 0;
  for (var i = 0; i < format.length && idx < input.length; i++) {
    output += input.substr(idx, format[i]);
    if (idx + format[i] < input.length) {
      output += sep;
    }
    idx += format[i];
  }

  output += input.substr(idx);

  return output;
};

const qRCodeUtils = {
  formatConfirmationCode,
};

export default qRCodeUtils;
