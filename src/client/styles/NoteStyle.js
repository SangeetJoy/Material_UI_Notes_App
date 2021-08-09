
import { makeStyles } from '@material-ui/core/styles';
export const useNoteStyle = makeStyles((theme) => ({
    myMasonryGrid: {
      display: "flex",
      marginLeft: "-30px",
      width: "auto"
    },
    myMasonryGridColumn: {
      paddingLeft: "30px",
      backgroundClip: "padding-box",
      [theme.breakpoints.down('sm')]: {
        paddingLeft: "0"
      },
    },
    notesContainer: {
      [theme.breakpoints.down('sm')]: {
        paddingRight: "0",
        boxSizing: "content-box"
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #ffff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
      borderRadius: "19px"
    },
    deleteBtn: {
      marginTop: "15px"
    },
    progressBar: {
      marginBottom: "15px"
    }
  }))