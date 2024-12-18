import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import '../../StyleCSS/StudentProfile.css';

const StudentProfile = () => {
    const [student, setStudent] = useState(null);


    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/getUser', {
                    headers: { 'auth-token': token },
                });
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student data', error);
            }
        };
        fetchStudent();
    }, []);



    if (!student) {
        return <Typography className="loading-text">Loading...</Typography>;
    }

    return (
        <Container maxWidth="md" className='MuiContainer-root'>
            <Paper className="profile-paper" elevation={3}>

                <Typography variant="h4" align="center" className="welcome-text" gutterBottom>
                    Welcome, {student.name}
                </Typography>

                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <Typography><strong>Email:</strong> {student.email}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Roll Number:</strong> {student.rollNumber}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</Typography>
                    </Grid>

                    <Grid item>
                        <Typography><strong>Department:</strong> {student.department}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Semester:</strong> {student.semester}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Section:</strong> {student.section}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Year of Study:</strong> {student.yearOfStudy}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Phone:</strong> {student.phone}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Address:</strong> {student.address}</Typography>
                    </Grid>

                    <Grid item>
                        <Typography><strong>Guardian Name:</strong> {student.nameOfGuardian}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Relation:</strong> {student.relationWithGuardian}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Phone of Guardian:</strong> {student.phoneOfGuardian}</Typography>
                    </Grid>
                </Grid>

            </Paper>
        </Container>
    );
};

export default StudentProfile;
