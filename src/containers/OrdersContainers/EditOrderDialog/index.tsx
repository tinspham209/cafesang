import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Dialog, Text, View } from 'src/components/common';
import { editOrderAsync } from 'src/redux/ordersRedux/actions';
import { OrderDetail } from 'src/redux/ordersRedux/types';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { EditOrderFormSchema } from './helpers';
import './styles.scss';

const clsPrefix = 'edit-order';

const EditOrderDialog: React.FC<Props> = ({ onEditOrder, loading, order, onClose, user }) => {
  const { id } = useParams<{ id: string }>();
  const formRef = React.useRef(null);
  const { address, cardType, dateCreated, fbLink, name, phoneNumber, status } = order || {};

  const handleEditOrder = (formValues: OrderDetail) => {
    console.log('formValues: ', formValues);
    const payload = {
      uid: id,
      order: formValues,
      editInfo: {
        editBy: user.email || '',
        updatedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    };
    console.log('payload: ', payload);
    onEditOrder(payload);
  };

  const handleSubmitForm = () => {
    formRef?.current?.handleSubmit();
  };

  return (
    <Dialog
      className={`${clsPrefix}-dialog`}
      open={true}
      title="Edit Order"
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      overflowVisible
      dialogActions={
        <>
          <Button variant="outline" onClick={onClose} className="mr-16">
            Cancel
          </Button>
          <Button onClick={() => handleSubmitForm()} type="submit" isLoading={loading} disabled={true}>
            Update
          </Button>
        </>
      }>
      <View className={`${clsPrefix}-dialog-container my-16`}>
        <Formik<OrderDetail>
          initialValues={{
            address,
            cardType,
            dateCreated,
            fbLink,
            name,
            phoneNumber,
            status,
          }}
          onSubmit={handleEditOrder}
          validationSchema={EditOrderFormSchema}
          enableReinitialize
          innerRef={formRef}>
          {(formProps: FormikProps<OrderDetail>) => {
            return (
              <Form onSubmit={formProps.handleSubmit} autoComplete="off">
                <Text>Updating....</Text>
              </Form>
            );
          }}
        </Formik>
      </View>
    </Dialog>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { order: OrderDetail; onClose: Callback };

const mapStateToProps = (state: IRootState) => ({
  loading: state.orders.detail.loading,
  user: state.auth.user,
});

const mapDispatchToProps = {
  onEditOrder: editOrderAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderDialog);
