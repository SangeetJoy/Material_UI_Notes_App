import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import { useCreateStyles } from '../styles/CreateStyle';
import firebase from '../../server/firebase';
import { generateCreateFormMarkup } from '../helpers/create-views';
import Typography from '@material-ui/core/Typography'
import { motion } from "framer-motion"

export default function Create() {
  const classes = useCreateStyles()
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
      try {
        //POST call to firebase
        const notesRef = firebase.database().ref("notes")
        const body = { title, details, category }
        notesRef.push(body);
        history.push('/')
      }
      catch (err) {
        console.log("err",err);
      }
    }
  }

  return (
    <Container>
      <Typography
        component={motion.div}
        initial={{ y: -200 }}
        animate={{ y: -10 }}
        transition={{ ease: "easeIn", type: "spring" }}
        variant="h6"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>
      {generateCreateFormMarkup({
        handleSubmit,
        classes,
        setTitle,
        setDetails,
        setCategory,
        titleError,
        detailsError,
        category
      })}
    </Container>
  )
}
