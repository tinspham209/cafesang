import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { Button, Dialog, Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import './styles.scss';

const clsPrefix = 'forgot-password';

const ForgotPasswordDialog: React.FC<Props> = ({ onClose }) => {
  return (
    <Dialog
      open={true}
      title={'Forgot Password'}
      iconTitle={<RiErrorWarningFill size={24} color="#F4762F" />}
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      loading={false}
      dialogActions={
        <>
          <>
            <Button variant="outline" onClick={onClose} className="mr-16">
              Thanks
            </Button>
            <Button onClick={onClose} isLoading={false}>
              Ok, try again.
            </Button>
          </>
        </>
      }>
      <View className={`${clsPrefix}-content my-16`}>
        <Text size={16} className="mb-24">
          Relax and try to remember your password.
        </Text>
      </View>
    </Dialog>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    onClose: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordDialog);
