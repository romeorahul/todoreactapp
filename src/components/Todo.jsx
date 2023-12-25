import React, { useEffect, useState } from 'react';
import './CSS/Todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');


    // function to add new todo 
    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    // function to toggle line through
    const handleToggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };


    // function to delete todo
    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };



    // for storing in localStorage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        console.log('Retrieved todos from localStorage:', storedTodos);
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('todos', JSON.stringify(todos));
        }, 100);
    }, [todos]);


    // function to clear all todos 
    const clearAll = () => {
        setTodos([]);
    }

    return (
        <>
            <h1 className="text-center">REACT TODOS APP</h1>
            <div className="Todo-container">

                <div className="input-container">
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        className="input-field"
                        type="text"
                        placeholder="Enter your next todo..."
                    />
                    <button onClick={handleAddTodo} className="submit-btn" type="submit">
                        ADD +
                    </button>
                </div>

                <div className="list-container">
                    {todos.length === 0 ? (
                        <h2 className='no-todo-sms'>Right now you dont have any todos.</h2>
                    ) : (<ul>
                        {todos.map((todo, index) => (
                            <li key={index} >
                                <div className="checkbox-field">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => handleToggleComplete(index)}
                                    />
                                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                        {todo.text}
                                    </span>
                                </div>

                                <div className="delte-btn">
                                    <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                                </div>

                            </li>
                        ))}
                    </ul>

                    )}

                </div>

                <div className="clear-btn"> <button className="clear-all-btn" onClick={() => { clearAll() }}>CLEAR ALL</button></div>

            </div>
        </>
    );
};

export default Todo;
