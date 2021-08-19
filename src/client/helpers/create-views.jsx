import Button from '@material-ui/core/Button';
import React from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { motion } from "framer-motion"


export const generateCreateFormMarkup = ({category, handleSubmit, classes, setTitle, setDetails, setCategory, titleError, detailsError}) => {
    return (
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          variant="outlined"
          label="Note Title"
          autoFocus
          fullWidth
          required
          error={titleError}
          component={motion.div}
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ ease: "easeIn", type: "spring", stiffness: 100 }}
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
          component={motion.div}
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ ease: "easeIn", type: "spring", stiffness: 90 }}
        />
        <FormControl
          className={classes.field}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", type: "spring", stiffness: 11 }}
          component={motion.div}
        >
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio color="primary" />} label="Money" />
            <FormControlLabel value="todos" control={<Radio color="primary" />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio color="primary" />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio color="primary" />} label="Work" />
          </RadioGroup>
        </FormControl>
        <motion.div
          initial={{ y: 130 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeIn", type: "spring", stiffness: 120 }}
          component={motion.div}
        >
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
          >
            Submit
          </Button>
        </motion.div>
      </form>
    )
}