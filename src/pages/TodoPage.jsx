import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';
import { uuid } from 'uuidv4';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [ todos, setTodos ] = useState(dummyTodos)
  const [ inputValue, setInputValue ] = useState('')
  const handleChange = (value) => {
    setInputValue(value)
  }
  const handleAddTodo = () => {
    if (inputValue.length === 0) {
      return;
    }
    setTodos((prevTodo) => {
      return [
        ...prevTodo,
        {
          title: inputValue,
          isDone: false,
          isEdit: false,
          id: uuid(),
        },
      ];
    })
  }
  const handleKeyDown = () => {
    if (inputValue.length === 0) {
      return;
    }
    setTodos((prevTodo) => {
      return [
        ...prevTodo,
        {
          title: inputValue,
          isDone: false,
          isEdit: false,
          id: uuid(),
        },
      ];
    });
  }
  const handleToggleDone =(id) => {
    setTodos((prevTodo) => {
      return prevTodo.map(todo => {
        if(todo.id === id){
          return {
            ...todo,
            isDone: !todo.isDone
          }
        }
        return todo;
      })
    })
  }
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false }
      });
    });
  };
  const handleSave = ({id, title}) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) => {
        if(todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false
          }
        }
        return todo
      })
    })
  }
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id ));
  }
  
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onSave={handleSave}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onDelete={handleDelete}
      />
      <Footer quantity={todos.length} />
    </div>
  );
};

export default TodoPage;
