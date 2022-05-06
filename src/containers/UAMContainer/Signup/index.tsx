/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Button, Form, Grid, Image, Input, InputPassword, NavLink, Text, View } from 'src/components/common';
import Footer from 'src/components/Footer';
import { signUpAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Yup } from 'src/services';

type FormValue = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const INTIAL = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const SignUp: React.FC<Props> = ({ error, loading, isSigningIn, onSignUp }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);

  // =========================== SIGN UP ===========================

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  const handleCreateAccount = (values: FormValue) => {
    const payload = { ...values, username: values.email };
    onSignUp(payload);
  };

  const handleError = (error: AuthError) => {
    switch (error.code) {
      case 'InvalidPasswordException':
        return formRef.current.setErrors({ password: error.message });

      case 'UsernameExistsException':
        return formRef.current.setErrors({ email: error.message });

      default:
        return ErrorService.handler(error);
    }
  };

  // =========================== SCHEMA ===========================
  const SignupSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
  });

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.background} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <h1 className={cn('ctn-uam__title mb-8')}>{'Create an Account'}</h1>
          <Text className={cn('mb-40')}>{'Sign up to register and manage your services.'}</Text>

          <Formik
            initialValues={INTIAL}
            onSubmit={handleCreateAccount}
            validationSchema={SignupSchema}
            innerRef={formRef}>
            {({ values, errors, touched, getFieldProps, handleSubmit, setValues }) => (
              <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                <Grid.Wrap className="mb-1">
                  <Grid.Item variant="is-full">
                    <Input
                      label="Email"
                      placeholder="Email"
                      errorMessage={touched.email ? errors.email : ''}
                      {...getFieldProps('email')}
                    />
                  </Grid.Item>

                  <Grid.Item>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      errorMessage={touched.firstName ? errors.firstName : ''}
                      {...getFieldProps('firstName')}
                    />
                  </Grid.Item>

                  <Grid.Item>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      errorMessage={touched.lastName ? errors.lastName : ''}
                      {...getFieldProps('lastName')}
                    />
                  </Grid.Item>

                  <Grid.Item variant="is-full">
                    <InputPassword
                      label="Password"
                      placeholder="Password"
                      errorMessage={touched.password ? errors.password : ''}
                      containerClassName="mb-40"
                      {...getFieldProps('password')}
                    />
                  </Grid.Item>
                </Grid.Wrap>

                <Button type="submit" variant="secondary" className="mb-32" isLoading={isSigningIn || loading}>
                  {isSigningIn ? 'LOGGING IN' : 'CREATE'}
                </Button>

                <Text className="mb-20" size={14}>
                  Already had account? <NavLink to={PATHS.signIn}>LOG IN</NavLink>
                </Text>
              </Form>
            )}
          </Formik>
          <Footer className="ctn-uam__footer" />
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  isSigningIn: state.auth.isSigningIn,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  onSignUp: signUpAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
