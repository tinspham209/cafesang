import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { Button, Grid, LoadingCommon, Text, View, ViewItem } from 'src/components/common';
import { getOrderAsync } from 'src/redux/ordersRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import EditOrderDialog from '../EditOrderDialog';
import { formatFireStoreTime } from '../helpers';
import { formatTagStatus } from './helpers';
import './styles.scss';

const clsPrefix = 'order-detail';

const OrderDetail: React.FC<Props> = ({ onGetOrder, loading, order }) => {
  const { id } = useParams<{ id: string }>();
  const { address, cardType, dateCreated, fbLink, name, phoneNumber, status } = order || {};

  useEffect(() => {
    onGetOrder({ uid: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    Navigator.goBack(PATHS.orders);
  };

  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <View className={`${clsPrefix} mb-40`}>
      <View>
        <Button
          className="mt-8"
          variant="text"
          style={{ alignSelf: 'flex-start' }}
          icon={<BsArrowLeft />}
          onClick={handleGoBack}>
          VIEW ALL ORDERS
        </Button>

        <View isRow justify="space-between">
          <View isRow>
            <View isRow align="center">
              <Text size={24} className="fw-bold mr-16">
                Order #{id || '...'}
              </Text>
              {formatTagStatus(status)}
            </View>
            {loading && <LoadingCommon className="ml-16" />}
          </View>
          <Button icon={<FaPen />} onClick={() => setShowEditDialog(true)}>
            Edit
          </Button>
        </View>

        <View className={'section__container mt-16'} renderIf={!loading}>
          <Grid.Wrap>
            <ViewItem label={'Name'} value={name} />
            <ViewItem label={'Phone Number'} value={phoneNumber} />
            <ViewItem label={'Date Created'} value={formatFireStoreTime(dateCreated)} />
            <ViewItem label={'Facebook URL'} value={fbLink} />
            <ViewItem label={'Type'} value={cardType} />
            <ViewItem label={'Address'} value={address} />
          </Grid.Wrap>
        </View>
      </View>

      {showEditDialog && <EditOrderDialog order={order} onClose={() => setShowEditDialog(false)} />}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => {
  const { detail } = state.orders;
  return {
    order: detail.data,
    loading: detail.loading,
  };
};

const mapDispatchToProps = {
  onGetOrder: getOrderAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
