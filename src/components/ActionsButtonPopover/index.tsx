import { Popover } from '@material-ui/core';
import React from 'react';
import './styles.scss';

const ActionsButtonPopover = ({ container, onClose, children, elevation = 3 }) => (
  <Popover
    open={!!container}
    anchorEl={container}
    onClose={onClose}
    elevation={elevation}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}>
    {children}
  </Popover>
);

export default ActionsButtonPopover;
