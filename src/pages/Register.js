import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import UserService from '../services/UserSevices';
import toast, { Toaster } from 'react-hot-toast';
import { Link as RouterLink } from 'react-router-dom';

const theme = createTheme();

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [position, setPosition] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
  });

  const formValidation = () => {
    let status = true;
    let localErrors = { ...errors };

    if (firstname === '') {
      localErrors.firstname = 'Firstname is required';
      status = false;
    }
    if (lastname === '') {
      localErrors.lastname = 'Lastname is required';
      status = false;
    }

    if (email === '') {
      localErrors.email = 'Email is required';
      status = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      localErrors.email = 'Email is invalid';
      status = false;
    }

    if (password === '') {
      localErrors.password = 'Password is required';
      status = false;
    } else if (password.length < 8) {
      localErrors.password = 'Password must be at least 8 characters';
      status = false;
    }

    if (confirmPassword === '') {
      localErrors.confirmPassword = 'Please confirm password';
      status = false;
    } else if (password !== confirmPassword) {
      localErrors.confirmPassword = 'Passwords do not match';
      status = false;
    }

    if (position === '') {
      localErrors.position = 'Please select a position';
      status = false;
    }

    setErrors(localErrors);
    return status;
  };
  if (isAdmin === '') {
    localErrors.isAdmin = 'Please select admin status';
    status = false;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formValidation()) {
      try {
        const userData = {
          firstname,
          lastname,
          email,
          password,
          position,
          isAdmin,
        };
        await UserService.register(userData);
        toast.success('Registration successful');
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#034694',
  backdropFilter: 'blur(6px)',
  borderRadius: '10px',
  padding: '20px',
  marginBottom:"100px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={errors.firstname !== ''}
              helperText={errors.firstname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={errors.lastname !== ''}
              helperText={errors.lastname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email !== ''}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password !== ''}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword !== ''}
              helperText={errors.confirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              select
              fullWidth
              name="position"
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              SelectProps={{
                native: true,
              }}
              error={errors.position !== ''}
              helperText={errors.position}
            >
              <option value="">Select Position</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
              <option value="Designer">Designer</option>
              <option value="Designer">administrator</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
  <FormControlLabel
    control={
      <Checkbox
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
        name="isAdmin"
        color="primary"
      />
    }
    label="Admin"
  />
  </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    <Toaster />
  </Container>
</ThemeProvider>
);
}

export default Register;