import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, LinearProgress } from '@material-ui/core'

const ConfirmationDialog = ({ open, handleClose, title, content, handleSubmit, showProgress, isSubmitting }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>

      {showProgress && isSubmitting && <LinearProgress />}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary" autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmationDialog