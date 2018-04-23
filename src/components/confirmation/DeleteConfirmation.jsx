import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide } from 'material-ui';


function SlideDown(props) {
  return <Slide direction="down" {...props} />;
}
const DeleteConfirmation = (props) => {
  const { handleDelete, handleClose } = props;
  return (
    <Dialog
      open={props.open}
      transition={SlideDown}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle >
        {'Delete Event'}
        <Divider />
      </DialogTitle>

      <DialogContent>
               Are you sure you want to delete this event? <br /> This can not be undone`
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Whaaat? of course not</Button>
        <Button onClick={handleDelete} color="primary">Yes, delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
