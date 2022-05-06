import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { DB_COLLECTION } from 'src/appConfig/fireStoreCollection';
import { fireAuth, fireStore } from 'src/firebase';
import { ChangePasswordPayload, SignInPayload, User } from 'src/redux/authRedux/types';
import { EditOrderPayload, GetOrderPayload, OrderDetail } from 'src/redux/ordersRedux/types';
import { GetUserInfoPayload, UserInfo } from 'src/redux/userRedux/types';
import { TokenService } from '.';

axios.defaults.withCredentials = true;

const create = (baseURL = appConfig.API_URL) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  api.axiosInstance.interceptors.request.use(config => {
    // if (config?.url?.includes('export-custom-declaration')) {
    //   config.headers['response-Type'] = 'blob';
    // }
    return TokenService.getToken()
      .then(token => {
        config.headers.Authorization = 'Bearer ' + token;
        return Promise.resolve(config);
      })
      .catch(() => {
        return Promise.resolve(config);
      });
  });

  const getRoot = () => api.get('');

  // ====================== Auth ======================
  const signIn = (body: SignInPayload) => {
    return fireAuth.setPersistence('session').then(() => {
      return fireAuth.signInWithEmailAndPassword(body.email, body.password);
    });
  };
  const signUp = (body: SignInPayload) => {
    return fireAuth.createUserWithEmailAndPassword(body.email, body.password);
  };

  const signOut = () => fireAuth.signOut();

  const exchangeToken = (user: User) => {
    return fireAuth.onAuthStateChanged(authUser => {
      if (authUser) {
        return authUser;
      } else {
        return null;
      }
    });
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return fireAuth.currentUser.updatePassword(body.newPassword);
  };

  // Renew token is NOT working
  // const renewToken = () => api.get<{ status: string; data: { token: string } }>('/auth/renew', {});

  // const getUserPreference = (params: GetUserPreferencesParams) => {
  //   const { userId } = params;
  //   return api.get(`/users/${userId}/preferences`);
  // };

  // ====================== User Info ======================

  const getUserInfo = async (params: GetUserInfoPayload) => {
    const dbUser = fireStore.collection(DB_COLLECTION.USER);
    try {
      const snapshot = await dbUser.doc(params.uid).get();
      const data = snapshot.data() as UserInfo;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // ====================== END User Info ======================

  // ====================== Orders ======================

  const getOrders = async () => {
    try {
      const dbUser = await fireStore.collection(DB_COLLECTION.ORDERS).get();
      const data = dbUser.docs.map((doc, index) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      return data;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };

  const getOrder = async (params: GetOrderPayload) => {
    const dbOrders = fireStore.collection(DB_COLLECTION.ORDERS);
    try {
      const snapshot = await dbOrders.doc(params.uid).get();
      const data = snapshot.data() as OrderDetail;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };

  const editOrder = async (params: EditOrderPayload) => {
    const dbOrders = fireStore.collection(DB_COLLECTION.ORDERS);
    const { uid, order, editInfo } = params;
    try {
      await dbOrders.doc(uid).update({
        ...order,
        editBy: editInfo.editBy,
        updatedTime: editInfo.updatedTime,
      });
      return uid;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };

  // ====================== END Orders ======================

  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  //
  // Notice we're not returning back the `api` created in step 1. That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    getRoot,
    // ====================== Auth ======================

    signIn,
    signUp,
    signOut,
    changePassword,
    exchangeToken,

    // ====================== User Info ======================
    getUserInfo,
    // ====================== END User Info ======================

    // ====================== Orders ======================
    getOrders,
    getOrder,
    editOrder,
    // ====================== END Orders ======================
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
