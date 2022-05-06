import { Tooltip, withStyles } from '@material-ui/core';

export default withStyles({
  tooltip: {
    color: '#393939',
    backgroundColor: '#D9E6F1',
    fontSize: 16,
    padding: 12,
    fontWeight: 'normal',
    borderRadius: 16,
  },
  arrow: {
    color: '#D9E6F1',
  },
})(Tooltip);
