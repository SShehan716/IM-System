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
    Password: '',
    UserRole: '',
    University: '',
    Designation: '',
    InterviewScore: '',
    InterviewFeedback: '',
    Evolution1Score: '',
    Evolution1Feedback: '',
    Evolution2Score: '',
    Evolution2Feedback: '',
    Accomplishments: '',
    GPA: '',
    ProjectDetails: '',
    AssignedTeam: '',
    Status: '',
};

const userSchema = yup.object().shape({
    InterviewScore: yup.number().min(0, 'Score must be greater than or equal to 0').max(100, 'Score must be less than or equal to 100'),
    Evolution1Score: yup.number().min(0, 'Score must be greater than or equal to 0').max(100, 'Score must be less than or equal to 100'),
    Evolution2Score: yup.number().min(0, 'Score must be greater than or equal to 0').max(100, 'Score must be less than or equal to 100'),
    GPA: yup.number().min(0, 'GPA must be greater than or equal to 0').max(4, 'GPA must be less than or equal to 4'),
});

const validationMessages = {
    submit: {
        success: 'User updated successfully',
        error: 'User update failed',
        cError: 'Unknown error',
    },
};

const UpdateIntern = () => {
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
                initialValues.University = response.data.user.InternProfile.University;
                initialValues.InterviewScore = response.data.user.InternProfile.InterviewScore;
                initialValues.InterviewFeedback = response.data.user.InternProfile.InterviewFeedback;
                initialValues.Evolution1Score = response.data.user.InternProfile.Evolution1Score;
                initialValues.Evolution1Feedback = response.data.user.InternProfile.Evolution1Feedback;
                initialValues.Evolution1Score = response.data.user.InternProfile.Evolution2Score;
                initialValues.Evolution2Feedback = response.data.user.InternProfile.Evolution2Feedback;
                initialValues.Accomplishments = response.data.user.InternProfile.Accomplishments;
                initialValues.GPA = response.data.user.InternProfile.GPA;
                initialValues.ProjectDetails = response.data.user.InternProfile.ProjectDetails;
                initialValues.AssignedTeam = response.data.user.InternProfile.AssignedTeam;
                initialValues.Status = response.data.user.InternProfile.Status;

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
                <Header title="Update Intern" subTitle="Update Intern Details" />
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
                                    label="Interview Score"
                                    name="InterviewScore"
                                    value={values.InterviewScore}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.InterviewScore && errors.InterviewScore}
                                    helperText={touched.InterviewScore && errors.InterviewScore}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Interview Feedback"
                                    name="InterviewFeedback"
                                    value={values.InterviewFeedback}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.InterviewFeedback && errors.InterviewFeedback}
                                    helperText={touched.InterviewFeedback && errors.InterviewFeedback}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Evolution 1 Score"
                                    name="Evolution1Score"
                                    value={values.Evolution1Score}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.Evolution1Score && errors.Evolution1Score}
                                    helperText={touched.Evolution1Score && errors.Evolution1Score}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Evolution 1 Feedback"
                                    name="Evolution1Feedback"
                                    value={values.Evolution1Feedback}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.Evolution1Feedback && errors.Evolution1Feedback}
                                    helperText={touched.Evolution1Feedback && errors.Evolution1Feedback}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Evolution 2 Score"
                                    name="Evolution2Score"
                                    value={values.Evolution2Score}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.Evolution2Score && errors.Evolution2Score}
                                    helperText={touched.Evolution2Score && errors.Evolution2Score}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Evolution 2 Feedback"
                                    name="Evolution2Feedback"
                                    value={values.Evolution2Feedback}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.Evolution2Feedback && errors.Evolution2Feedback}
                                    helperText={touched.Evolution2Feedback && errors.Evolution2Feedback}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Accomplishments"
                                    name="Accomplishments"
                                    value={values.Accomplishments}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.Accomplishments && errors.Accomplishments}
                                    helperText={touched.Accomplishments && errors.Accomplishments}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="GPA"
                                    name="GPA"
                                    value={values.GPA}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.GPA && errors.GPA}
                                    helperText={touched.GPA && errors.GPA}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Assign Team"
                                    name="AssignedTeam"
                                    value={values.AssignedTeam}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.AssignedTeam && errors.AssignedTeam}
                                    helperText={touched.AssignedTeam && errors.AssignedTeam}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Status"
                                    name="Status"
                                    select
                                    value={values.Status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.Status && !!errors.Status}
                                    helperText={touched.Status && errors.Status}
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    <MenuItem value="" disabled>
                                        Select the Status
                                    </MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                                    <MenuItem value="Interview Complete">Interview Complete</MenuItem>
                                    <MenuItem value="Hired">Hired</MenuItem>
                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                    <MenuItem value="Internship Started">Internship Started</MenuItem>
                                    <MenuItem value=" Internship Ended"> Internship Ended</MenuItem>
                                </TextField>

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

export default UpdateIntern;
