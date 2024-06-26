import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import { apiService } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { SignInResponse } from "../signin/signin.interface";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]?)[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase letter and one digit"
    )
    .required("Password is required"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {updateToken} = useUser()
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const body = 
      {
        email: values.email,
        password: values.password
      }

      try{
        const {access_token} = await apiService.post<SignInResponse>('auth/signup', body, {}, true)
        updateToken(access_token)
        setLoading(false)
        navigate('/')
      } catch(err) {
        console.log("err",err)
        setLoading(false)
      }
   
    },
  });


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("email", true)}
                error={!!formik.touched.email && !!formik.errors.email}
                helperText={
                  (formik.touched.email && formik.errors.email) || " "
                }
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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("password", true)}
                error={!!formik.touched.password && !!formik.errors.password}
                helperText={
                  (formik.touched.password && formik.errors.password) || " "
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formik.isValid || loading}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-in">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
