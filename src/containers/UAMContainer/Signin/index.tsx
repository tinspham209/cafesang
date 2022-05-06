/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useRef, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { Form, Image, Loading, Text } from 'src/components/common';
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
        <Image className="ctn-uam__logoImage mb-32" alt="logo" src={IMAGES.logoFullWhite} />
        <Text className="text-is-32 fw-bold mb-32">Welcome</Text>
      </div>

      <div className="ctn-uam__body">
        <Formik initialValues={INTIAL} onSubmit={handleLogin} validationSchema={signInFormSchema} innerRef={formRef}>
          {({ dirty, touched, isValid, handleSubmit }) => (
            <Grid
              container
              spacing={3}
              component={Form}
              onSubmit={handleSubmit}
              autoComplete="off"
              className="ctn-uam__form">
              <Grid item xs={12}>
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      label="Email"
                      variant="outlined"
                      error={meta.touched && meta.error ? true : false}
                      helperText={(meta.touched && meta.error) || ''}
                      fullWidth
                      {...field}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field name="password">
                  {({ field, meta }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      error={meta.touched && meta.error ? true : false}
                      helperText={(meta.touched && meta.error) || ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(prevState => !prevState)}
                              edge="end">
                              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading || isSigningIn}
                  endIcon={loading ? <Loading size="small" loadingStyle={5} className="cmp-button__loading" /> : null}
                  fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Text size={14} onClick={() => setShowForgotPassword(true)} className="ctn-uam__forgotpassword-text">
                  Forgot Password?
                </Text>
              </Grid>
            </Grid>
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
