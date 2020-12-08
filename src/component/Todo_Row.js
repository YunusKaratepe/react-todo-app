import { Button, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import './Todo_Row.css';
import db from '../firebase';


function Todo_Row(props) {
    return (
        <div>
                <ListItem>
                    <ListItemAvatar>  
                        <ListItemText
                           primary={props.todo.todo} secondary="Todo ⏰ "
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon/>}
                            onClick={event => db.collection('todos').doc(props.todo.id).delete()}
                        >
                            Delete
                        </Button> 
                    </ListItemAvatar>      
        </ListItem> 
                      
        </div>
    )
}

export default Todo_Row
