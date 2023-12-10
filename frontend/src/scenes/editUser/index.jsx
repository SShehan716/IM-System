import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../../components/Header';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

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
  UserRole: '',
  University: '',
  Designation: '',
};

const userSchema = yup.object().shape({
  FullName: yup.string().required('Required'),
  Email: yup.string().email("Invaild email").required('Required'),
  UserRole: yup.string().required('Required'),
});

const validationMessages = {
  submit: {
    success: 'User updated successfully',
    error: 'User update failed',
    cError: 'Unknown error',
  },
};

const EditUser = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const { userID } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-user-by-id/${userID}`);
        setUserData(response.data.user);

        initialValues.FullName = response.data.user.FullName;
        initialValues.Email = response.data.user.Email;
        initialValues.UserRole = response.data.user.UserRole;

        if (response.data.user.UserRole === 'Intern') {
          initialValues.University = response.data.user.InternProfile.University;
        } else if (response.data.user.UserRole === 'Admin') {
          initialValues.Designation = response.data.user.AdminProfile.Designation;
        } else if (response.data.user.UserRole === 'Evaluator') {
          initialValues.Designation = response.data.user.EvaluatorProfile.Designation;
        } else if (response.data.user.UserRole === 'Mentor') {
          initialValues.Designation = response.data.user.MentorProfile.Designation;
        } else if (response.data.user.UserRole === 'Management') {
          initialValues.Designation = response.data.user.ManagementProfile.Designation;
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);


  const handleOnSubmit = async (values, { resetForm, setErrors, setSubmitting }) => {
    try {
      const response = await axios.put(`http://localhost:5000/update-user/${userID}`, values);

      if (response.data.message === 'User updated successfully') {
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
        <Header title="Edit User" subTitle="Edit User Details" />
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
                  autoComplete="off"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.Email && !!errors.Email}
                  helperText={touched.Email && errors.Email}
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
                {['Admin', 'Evaluator', 'Mentor', 'Management'].includes(
                  values.UserRole
                ) && (
                    <TextField
                      fullWidth
                      label="Designation"
                      name="Designation"
                      value={values.Designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Designation && !!errors.Designation}
                      helperText={touched.Designation && errors.Designation}
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
                    Update User
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
        <Header title="Access Denined" />
        <Typography variant="h4" color="error">You are not authorized to access this page</Typography>
      </Box>
    )
  }
}

export default EditUser;
