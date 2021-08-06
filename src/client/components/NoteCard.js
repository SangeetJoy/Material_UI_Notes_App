import React, { useState } from "react"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import { motion } from "framer-motion"
import { useNodeCardStyles } from "../styles/NoteCardStyle";

export default function NoteCard({ note, onDeleteButtonClick }) {

    const classes = useNodeCardStyles(note)

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
        <motion.div
            animate={note.category === "work" && {
                rotate: [0, 3, -3, 3, -3, 3, -3, 3, -3, 0]
            }}
            transition={{ delay: 1.5, ease: "easeOut", duration: 3.9 }}
        >
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
                        <motion.div
                            animate={{ scaleY: [0, 1] }}
                            transition={{ ease: "easeOut", type: "spring", stiffness: 150 }}
                        >
                            <TextField
                                className={classes.editTextField}
                                onChange={(e) => onEditTextFieldChange(e.target.value)}
                                variant="outlined"
                                multiline
                                rows={10}
                                defaultValue={noteDetailsForEdit}
                            />
                            <motion.div
                                animate={{ rotate: [0, 1, -1, 1, -1, 1, -1, 1, -1, 0] }}
                                transition={{ delay: 10.5, ease: "easeOut", duration: 3.9 }}
                            >
                                <Button
                                    className={classes.saveBtn}
                                    variant="contained"
                                    endIcon={<SaveIcon />}
                                    onClick={() => onSaveClick(note.id)}
                                >
                                    Save
                                </Button>
                            </motion.div>
                            <Button
                                className={classes.closeBtn}
                                variant="contained"
                                endIcon={<CancelIcon />}
                                onClick={onCloseClick}
                            >
                                Close
                            </Button>
                        </motion.div>
                        :
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">{!editedNotes ? note.details : editedNotes}</Typography>
                        </CardContent>
                }
            </Card>
        </motion.div>
    )
}