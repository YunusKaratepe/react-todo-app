import './App.css';
import {FormControl, Button, InputLabel, Input, List} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Todo_Row from './component/Todo_Row';
import db from './firebase';
import firebase from 'firebase';


function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when app loads, need listen to db for fetch todos!
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  const addTodo = (event) => {
    event.preventDefault();
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  };




  return (
    // this html called jsx
    <div className="App">
      <h1>My Todo App</h1>

      <form >
        <FormControl>
          <InputLabel>Add a TODO</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}></Input>
        </FormControl>
        <br/><br/>
      
        <Button type="submit" disabled={input === ''} variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </form>

     
        <List>
          {todos.map(todo => (
            <Todo_Row todo={todo}/>
          ))}
        </List>
      
      
    </div>

  
  );
}

export default App;
