import React from 'react';

export const useDialog = <TDialogProps,>(
  Dialog: React.FC<TDialogProps>,
  props?: Partial<TDialogProps>,
): [() => JSX.Element, (register?: (close: () => void) => Partial<TDialogProps>, onClose?: () => void) => void] => {
  const [open, setOpen] = React.useState<boolean>(false);
  const actionRef = React.useRef<{ [k in keyof TDialogProps]?: TDialogProps[k] }>({});

  const handleCancel = () => setOpen(false);

  const show = (register: (close: () => void) => Partial<TDialogProps>, onClose?: () => void) => {
    const close = () => {
      handleCancel();
      onClose?.();
    };

    actionRef.current = register?.(close);
    setOpen(true);
  };

  const component = React.useCallback(
    () => <Dialog {...(props as TDialogProps)} {...actionRef.current} onClose={handleCancel} open={open} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, props, actionRef.current],
  );

  return [component, show];
};
