import './App.css';
import React, { useCallback, useReducer, useRef } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Todo {
  id: number;
  text: string;
}
// Todo[]
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  // useCallback
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <Box style={{ height: '100vh', margin: '30px 0px' }} className="App">

      <TextField sx={{ width: '30%' }} id="outlined-basic" label="User Name" variant="outlined" size='small' type="text" inputRef={newTodoRef} />
      <Button onClick={onAddTodo} variant="contained">Add User</Button>

      {todos.map((todo) => (
        <Box sx={{ width: '35%', display: 'flex', justifyContent: 'start', gap: 4, alignItems: 'center', margin: '20px auto' }} key={todo.id}>
          <AccountCircleIcon />
          <Typography variant='h6'>
            {todo.text}
          </Typography>
          <DeleteForeverIcon onClick={() => dispatch({ type: "REMOVE", id: todo.id })} />
        </Box >
      ))
      }
    </Box>
  );
}

export default App;
