import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react'
import NoteCard from './NoteCard';
import Masonry from 'react-masonry-css';
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useNoteStyle } from '../styles/NoteStyle';
import firebase from '../../server/firebase';


const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 2,
  500: 1
};

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const classes = useNoteStyle()

  useEffect(async () => {
    setIsLoading(true);
    try {
      //GET call
      const notesRef = firebase.database().ref("notes");
      notesRef.on("value", (snapshot) => {
        if (snapshot.val()) {
          const notesObject = snapshot.val()
          const notesList = Object.entries(notesObject).map(([key, value]) => {
            return { id: key, ...value }
          })
          setNotes(notesList)
          setIsLoading(false)
        }
        else {
          setIsLoading(true)
        }
      })
    }
    catch (err) {
      console.log(err);
      setIsLoading(true)
    }
  }, [])

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onDeleteButtonClick = async (id) => {

    console.log({ id });

    setDeleteId(id)
    setIsModalOpen(true)

  }

  const handleDelete = async () => {
    try {
      //DELETE Call
      const notesRef = firebase.database().ref("notes").child(deleteId)
      notesRef.remove()

      const newNotes = notes.filter(note => note.id != deleteId)
      setNotes(newNotes)

      setIsModalOpen(false)
    }
    catch (err) {
      setIsModalOpen(false)
      console.log(err);
    }
  }

  return (
    <Container className={classes.notesContainer}>
      < Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }
        }
      >
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <Typography variant="h6" style={{ marginTop: "12px" }}>It will be permanently deleted</Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.deleteBtn}
              onClick={handleDelete}
            >
              OK
            </Button>
          </div>
        </Fade>
      </Modal >
      {isLoading && <LinearProgress className={classes.progressBar} />}
      {Boolean(notes.length) && <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
      >
        {notes.map(note => (
          <div key={note.id} style={{ marginBottom: "30px" }}>
            <NoteCard
              note={note}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          </div>
        ))}
      </Masonry>}
    </Container>
  )
}