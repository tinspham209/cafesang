import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { FaInfo } from 'react-icons/fa';
import { IRootState } from 'src/redux/rootReducer';
import { Tooltip, withStyles } from '@material-ui/core';
import { BsInfoCircle } from 'react-icons/bs';

export const InfoToolTip = withStyles({
  tooltip: {
    color: '#fff',
    backgroundColor: '#393939',
    fontSize: 14,
    padding: '8px 12px',
    fontWeight: 'normal',
    borderRadius: 8,
  },
  arrow: {
    color: '#393939',
    bottom: '1px !important',
  },
})(Tooltip);

export const PillCounterTooltip = withStyles({
  tooltip: {
    color: '#fff',
    backgroundColor: '#393939',
    fontSize: 14,
    padding: '8px 12px',
    fontWeight: 'normal',
    borderRadius: 11,
  },
  arrow: {
    color: '#393939',
    position: 'absolute',
    left: '5px !important',
    bottom: '0px !important',
  },
})(Tooltip);

const renderToolTip = (status, message, placement, customIcon, isPillCounterCmp) => {
  switch (status) {
    case 'info-secondary':
      return (
        <InfoToolTip title={message} placement={placement} arrow>
          <span>
            <BsInfoCircle
              style={{ color: '#888' }}
              size={16}
              className={'cmp-tool-tip__icon cmp-tool-tip__icon--info'}
            />
          </span>
        </InfoToolTip>
      );
    case 'custom':
      return isPillCounterCmp ? (
        <PillCounterTooltip title={message} placement={placement} arrow>
          <span>{customIcon}</span>
        </PillCounterTooltip>
      ) : (
        <InfoToolTip title={message} placement={placement} arrow>
          <span>{customIcon}</span>
        </InfoToolTip>
      );
    default:
      return (
        <InfoToolTip title={message} placement={placement} arrow>
          <span>
            <FaInfo className={'cmp-tool-tip__icon cmp-tool-tip__icon--info-secondary'} />
          </span>
        </InfoToolTip>
      );
  }
};

const ToolTip: React.FC<Props> = ({
  status = 'info',
  message,
  placement = 'top',
  customIconContent,
  isPillCounterCmp = false,
  ...props
}) => {
  return <span {...props}>{renderToolTip(status, message, placement, customIconContent, isPillCounterCmp)}</span>;
};

type Status = 'info' | 'info-secondary' | 'warning' | 'rejected' | 'custom';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  HTMLProps<HTMLSpanElement> & {
    status?: Status;
    message: string | React.ReactNode;
    customIconContent?: React.ReactNode;
    isPillCounterCmp?: boolean;
    placement?:
      | 'top-start'
      | 'top'
      | 'top-end'
      | 'left-start'
      | 'left'
      | 'left-end'
      | 'right-start'
      | 'right'
      | 'right-end'
      | 'bottom-start'
      | 'bottom'
      | 'bottom-end';
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ToolTip);
