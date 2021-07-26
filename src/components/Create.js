import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import React, { useState } from 'react'
import { Container } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
});

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault()

    setTitleError(false)
    setDetailsError(false)

    if (title === "") {
      setTitleError(true)
    }
    if (details === "") {
      setDetailsError(true)
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          variant="outlined"
          label="Note Title"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          variant="outlined"
          label="Details"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio color="primary" />} label="Money" />
            <FormControlLabel value="todos" control={<Radio color="primary" />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio color="primary" />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio color="primary" />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}
