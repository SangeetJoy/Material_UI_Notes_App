import React, { useState } from "react"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { DeleteOutlined } from "@material-ui/icons";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import { green, pink, yellow, blue } from "@material-ui/core/colors";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if (note.category === "work") { return yellow[700] }
            if (note.category === "money") { return green[500] }
            if (note.category === "todos") { return pink[500] }
            return blue[500]
        }
    },
    editTextField: {
        padding: "1rem",
        width: "90%",
    },
    saveBtn: {
        backgroundColor: "#689f38",
        padding: "3px",
        width: "90%",
        marginLeft: "4%",
        marginBottom: "4%",
        "&:hover": {
            backgroundColor: "#99d066"
        }
    },
    closeBtn: {
        padding: "3px",
        width: "90%",
        marginLeft: "4%",
        marginBottom: "4%",
        backgroundColor: pink[500],
        "&:hover": {
            backgroundColor: pink[400]
        }
    },
    editBtn: {
        marginRight: "-10px"
    }
})

export default function NoteCard({ note, onDeleteButtonClick }) {

    const classes = useStyles(note)

    const [hasEditingStarted, setHasEditingStarted] = useState(false)
    const [noteDetailsForEdit, setNoteDetailsForEdit] = useState("")
    const [editedNotes, setEditedNotes] = useState("")

    const onEditButtonClick = (noteDetails) => {
        setHasEditingStarted(true)
        setNoteDetailsForEdit(noteDetails)
    }

    const onEditTextFieldChange = (value) => {
        setEditedNotes(value)
    }

    const onSaveClick = async (noteId) => {
        const { title, category } = note
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, details: editedNotes, category, id: noteId })
        };

        try {
            await fetch('http://localhost:8000/notes/' + noteId, requestOptions)
            setHasEditingStarted(false)
        }
        catch (err) {
            console.log(err);
        }
    }

    const onCloseClick = () => {
        setHasEditingStarted(false)
        setEditedNotes("")
    }
    return (
        <div>
            <Card elevation={3}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>
                    }
                    action={
                        <ButtonGroup >
                            <IconButton className={classes.editBtn} onClick={() => onEditButtonClick(note.details)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => onDeleteButtonClick(note.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </ButtonGroup>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                {
                    hasEditingStarted ?
                        <div>
                            <TextField
                                className={classes.editTextField}
                                onChange={(e) => onEditTextFieldChange(e.target.value)}
                                variant="outlined"
                                multiline
                                rows={10}
                                defaultValue={noteDetailsForEdit}
                            />
                            <Button
                                className={classes.saveBtn}
                                variant="contained"
                                endIcon={<SaveIcon />}
                                onClick={() => onSaveClick(note.id)}
                            >
                                Save
                            </Button>
                            <Button
                                className={classes.closeBtn}
                                variant="contained"
                                endIcon={<CancelIcon />}
                                onClick={onCloseClick}
                            >
                                Close
                            </Button>
                        </div>
                        :
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">{!editedNotes ? note.details : editedNotes}</Typography>
                        </CardContent>
                }
            </Card>
        </div>
    )
}