import React, { useState, useContext, useEffect } from 'react'
import TodoItem from './todoItem';
import TodoService from '../services/todoService';
import { AuthContext } from '../context/authContext';
import todoService from '../services/todoService';
import Message from './message';


const Todos = (props) => {
    const [todo, setTodo] = useState({ name: "" });
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        TodoService.getTodos().then(data => {
            setTodos(data.todos);
        });
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        todoService.postTodo(todo).then(data => {
            const { msgBody, msgErr } = data;
            resetForm();
            if (!msgErr) {
                TodoService.getTodos().then(getData => {
                    setTodos(getData.todos);
                    setMessage(msgBody);
                })
            }
            else if (msgBody === "Unauthorized") {
                setMessage(message);
                authContext.setUser({ username: "", role: "" });
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(msgBody);
            }
        })
    }

    const onChange = (e) => {
        setTodo({ name: e.target.value });
    }

    const resetForm = () => {
        setTodo({ name: "" })
    }
    
    return (
        <div>
            <ul className="list-group">
                {
                    todos.map(todo => {
                        return <TodoItem key={todo._id} todo={todo} />
                    })
                }
            </ul>
            <br />
            <form onSubmit={onSubmit}>
                <label htmlFor="todo">Enter Todo: </label>
                <input type="text" value={todo.name} onChange={onChange} className="form-controls name="todo  placeholder="please enter todo" />
                <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
            </form>
            { message ? <Message message={message} ></Message> : null }
        </div>
        

    )
}

export default Todos;