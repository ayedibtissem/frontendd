
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom'; 
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
import toast, { Toaster } from 'react-hot-toast';
import UserService from '../services/UserSevices';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      toast.error('Email and password are required');
      return;
    }

    if (!email) {
      toast.error('Email is required');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    try {
      const response = await UserService.signin({ email, password });
      const { user, token } = response.data;

      localStorage.setItem('user_data', JSON.stringify(user));
      localStorage.setItem('token', token);

      if (user.isAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/quizzes');
      }

      setEmail('');
      setPassword('');
      toast.success('User login successful');
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toaster />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(3, 70, 148, 0.8)',
            backdropFilter: 'blur(6px)',
            borderRadius: '10px',
            padding: '20px',
            backgroundImage: 'linear-gradient(to bottom, #034694, #0088C9)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon color="secondary.main" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                sx: {
                  color: 'white',
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  color: 'white',
                },
                "& .MuiInputBase-input::placeholder": {
                  color: 'white',
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  color: 'white',
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: 'white',
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: 'white',
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: 'white',
                },
                "& label.Mui-focused": {
                  color: 'white',
                },
                "& .MuiInput-underline.Mui-focused:after": {
                  borderBottomColor: 'white',
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: 'white',
                  },
                  "&:hover fieldset": {
                    borderColor: 'white',
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: 'white',
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                sx: {
                  color: 'white',
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  color: 'white',
                },
                "& .MuiInputBase-input::placeholder": {
                  color: 'white',
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  color: 'white',
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: 'white',
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: 'white',
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: 'white',
                },
                "& label.Mui-focused": {
                  color: 'white',
                },
                "& .MuiInput-underline.Mui-focused:after": {
                  borderBottomColor: 'white',
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: 'white',
                  },
                  "&:hover fieldset": {
                    borderColor: 'white',
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: 'white',
                  },
                },
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ color: 'white' }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2" style={{ color: 'black' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

