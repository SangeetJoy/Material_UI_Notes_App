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

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const classes = useNoteStyle()

  useEffect(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8000/notes')
      const data = await res.json()
      setNotes(data)
      setIsLoading(false)
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

    setDeleteId(id)
    setIsModalOpen(true)

  }

  const handleDelete = async () => {
    await fetch('http://localhost:8000/notes/' + deleteId, {
      method: "DELETE"
    })

    const newNotes = notes.filter(note => note.id != deleteId)
    setNotes(newNotes)

    setIsModalOpen(false)
  }

  return (
    <Container>
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
        breakpointCols={3}
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