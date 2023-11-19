import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../../components/Header';
import axios from 'axios';
import { useState } from 'react';

const checkUserRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      return payload.Role === 'Admin';
    } catch (error) {
      console.error('Error decoding JWT token:', error);
    }
  }
  return false;
};

const initialValues = {
  FullName: '',
  Email: '',
  Password: '',
  UserRole: '',
  University: '',
};

const userSchema = yup.object().shape({
  FullName: yup.string().required('Required'),
  Email: yup.string().email("Invaild email").required('Required'),
  Password: yup.string().required('Required'),
  UserRole: yup.string().required('Required'),
});

const validationMessages = {
  submit: {
    success: 'User invited successfully',
    error: 'Invite failed',
    cError: 'Unknown error',
  },
};

const InviteUser = () => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleOnSubmit = async (values, { resetForm, setErrors, setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/invite-user', values);

      if (response.data.message === 'User Invited') {
        // Registration was successful
        setSuccessMessage(validationMessages.submit.success);
        resetForm();
        setSubmitting(false);

        setTimeout(() => setSuccessMessage(null), 5000);

      } else {
        setErrors('submit', validationMessages.submit.error);
        setSubmitting(false);


      }
    } catch (error) {
      console.error('Error:', error);
      setErrors('submit', validationMessages.submit.cError);
      setSubmitting(false);
    }
  };

  if (checkUserRole()) {
    return (
      <Box m="20px">
        <Header title="Invite User" subTitle="Enter User Details" />

        <Formik
          onSubmit={handleOnSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}
              gap="30px"
              gridtemplatecolumns="repeat(4, minmax(0, 1fr))">
              <Box display="grid" gap="30px" gridtemplatecolumns="repeat(4, minmax(0, 1fr))">
                <TextField
                  fullWidth
                  label="Full Name"
                  name="FullName"
                  value={values.FullName}
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.FullName && !!errors.FullName}
                  helperText={touched.FullName && errors.FullName}
                  sx={{ gridColumn: "span 4" }} />
                <TextField
                  fullWidth
                  label="Email"
                  name="Email"
                  type="email"
                  autoComplete="new-password"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.Email && !!errors.Email}
                  helperText={touched.Email && errors.Email}
                  sx={{ gridColumn: "span 2" }} />
                <TextField
                  fullWidth
                  label="Password"
                  name="Password"
                  type="password"
                  autoComplete="off"
                  value={values.Password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.Password && !!errors.Password}
                  helperText={touched.Password && errors.Password}
                  sx={{ gridColumn: "span 2" }} />
                <TextField
                  fullWidth
                  label="User Role"
                  name="UserRole"
                  select
                  value={values.UserRole}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.UserRole && !!errors.UserRole}
                  helperText={touched.UserRole && errors.UserRole}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="" disabled>
                    Select a role
                  </MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Evaluator">Evaluator</MenuItem>
                  <MenuItem value="Mentor">Mentor</MenuItem>
                  <MenuItem value="Management">Management</MenuItem>
                </TextField>
                {values.UserRole === 'Intern' && (
                  <TextField
                    fullWidth
                    label="University"
                    name="University"
                    value={values.University}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.University && !!errors.University}
                    helperText={touched.University && errors.University}
                    sx={{ gridColumn: "span 2" }}
                  />
                )}
              </Box>
              <Box display="flex" mt="20px" justifyContent="space-between" >
                <Box>
                  {errors.submit && <Typography color="error">{errors.submit}</Typography>}
                  {successMessage && <Typography color="success">{successMessage}</Typography>}
                </Box>
                <Box>
                  <Button type="submit" color="secondary" variant="contained">
                    Invite New User
                  </Button>
                </Box>

              </Box>
            </form>
          )}
        </Formik>
      </Box>
    )
  } else {
    return (
      <Box m="20px">
        <Header title="Access Denined"/>
        <Typography variant="h4" color="error">You are not authorized to access this page</Typography>
      </Box>
    )
  }
}

export default InviteUser;
