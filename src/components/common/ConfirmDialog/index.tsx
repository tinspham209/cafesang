import { Button, Dialog, DialogActions, DialogContent, DialogProps, Typography } from '@material-ui/core';
import React from 'react';
import { useDialog } from '../useDialog/useDialog';

type VoidCallback = () => void;
type ConfirmDialogProps = {
  onYes: VoidCallback;
  onCancel: VoidCallback;
  question: string;
  yesButton?: string;
  cancelButton?: string;
  color?: 'primary' | 'secondary';
};

const ConfirmDialog: React.VFC<DialogProps & ConfirmDialogProps> = ({
  onYes,
  onCancel,
  question,
  yesButton = 'CONFIRM',
  cancelButton = 'CANCEL',
  color = 'primary',
  ...dialogProps
}) => {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <Typography variant="body1" component="h6">
          {question}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color={color}>
          {cancelButton}
        </Button>
        <Button onClick={onYes} color={color}>
          {yesButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const useConfirmDialog = (
  question: string,
  options?: Partial<Omit<ConfirmDialogProps, 'question' | 'onYes' | 'onCancel'>>,
): [() => JSX.Element, (onYes: VoidCallback, onCancel?: VoidCallback) => void] => {
  const [Dialog, show] = useDialog(ConfirmDialog, {
    question,
    ...options,
    maxWidth: 'xs',
    fullWidth: true,
  });

  const register = (onYes: VoidCallback, onCancel?: VoidCallback) =>
    show(close => ({
      onYes: () => {
        onYes();
        close();
      },
      onCancel: () => {
        onCancel?.();
        close();
      },
    }));

  return [Dialog, register];
};
