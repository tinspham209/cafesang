/* eslint-disable react-hooks/exhaustive-deps */
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { Button, Form, Image, Text } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import { signInAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { TokenService } from 'src/services';
import { getErrorMessageSignin } from 'src/utils';
import * as Yup from 'yup';
import ForgotPassword from './forgotPassword';
import './styles.scss';

type FormValue = {
  email: string;
  password: string;
};

const INTIAL: FormValue = { email: '', password: '' };

const signInFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin: React.FC<Props> = ({ error, loading, isSigningIn, onSignIn }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  React.useEffect(() => {
    TokenService.clearToken();
  }, []);

  const handleLogin = (values: FormValue) => {
    const { email, password } = values;
    onSignIn({ email, password });
  };

  React.useEffect(() => {
    if (error) {
      formRef.current?.setErrors({
        email: '',
        password: getErrorMessageSignin(error),
      });
    } else {
      formRef.current?.setErrors({
        email: '',
        password: '',
      });
    }
  }, [error]);

  return (
    <div className="ctn-uam">
      <div className="ctn-uam__header">
        <Image className="ctn-uam__logoImage mb-32" alt="logo" src={IMAGES.logoOnly} />
        <Text className="text-is-32 fw-bold mb-32">Welcome</Text>
      </div>

      <div className="ctn-uam__body">
        <Formik initialValues={INTIAL} onSubmit={handleLogin} validationSchema={signInFormSchema} innerRef={formRef}>
          {({ dirty, values, errors, getFieldProps, touched, isValid, handleSubmit }) => (
            <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
              <MuiTextField
                label={`User Email / Window Email`}
                errorMessage={touched.email && errors.email ? errors.email : ' '}
                placeholder="Enter your email"
                className="mb-24"
                {...getFieldProps('email')}
              />
              <MuiTextField
                label="Password"
                placeholder="Enter your password"
                errorMessage={touched.password && errors.password ? errors.password : ' '}
                className="mb-8"
                isPassword
                {...getFieldProps('password')}
              />

              <Button
                type="button"
                variant="link"
                className="ctn-uam__link mb-24 fw-normal"
                onClick={() => {
                  setShowForgotPassword(true);
                }}>
                {'Forgot your password?'}
              </Button>

              <Button type="submit" isLoading={loading || isSigningIn}>
                LOG IN
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  isSigningIn: state.auth.isSigningIn,
  loading: state.auth.loading,
  error: state.auth.error?.message || '',
});

const mapDispatchToProps = {
  onSignIn: signInAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
