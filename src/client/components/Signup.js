import React, { useState } from "react"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useSignupStyles } from "../styles/SignupStyle";
import { Grid, Paper, CardMedia, Avatar } from "@material-ui/core";
import signUpImage from "../../assets/image1.png"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Signup() {
    const classes = useSignupStyles()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullNameError, setFullNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSubmit = (e) => {
      e.preventDefault()
      setFullNameError(false)
      setEmailError(false)
      setPassword(false)

      if(fullName === "") setFullNameError(true)
      if(email === "") setEmailError(true)
      if(password === "") setPasswordError(true)

      if(fullName && email && password) {
          console.log("done");
      }
    }
    return (
        <Container component="main" maxWidth="md" className={classes.signUpContainer} onSubmit={handleSubmit}>
            <form noValidate autoComplete="off">
                <Grid container>
                    <Grid item xs={6}>
                        <div className={classes.signupHeader}>
                            <Avatar className={classes.signUpIcon}>
                                <AddCircleIcon />
                            </Avatar>
                            <Typography
                                variant="h5"
                                gutterBottom
                                style={{ marginTop: "1rem" }}
                            >
                                Welcome
                            </Typography>
                        </div>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="fullName"
                            label="Your Full Name"
                            name="fullName"
                            className={classes.signUpField}
                            error={fullNameError}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            className={classes.signUpField}
                            error={emailError}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className={classes.signUpField}
                            error={passwordError}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.signUpField}
                            size="large"
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <CardMedia
                            className={classes.imageCover}
                            image={signUpImage}
                            title="Live from space album cover"
                        />
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}