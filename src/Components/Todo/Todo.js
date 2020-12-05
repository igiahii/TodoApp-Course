import React , { useState , useContext } from 'react'
import EditTodo from './EditTodo';
import TodosContext from '../../Context/todos';
import axios from 'axios'
import {Link} from 'react-router-dom'

function Todo(props) {

    const { item } = props;

    const [ edit , setEdit ] = useState(false);
    const todosContext = useContext(TodosContext);
    
    let editHandler = text => {

        axios.put(`https://todoapp-40146.firebaseio.com/todos/${item.key}.json` , {done : item.done , text})
                .then(response =>{
                    todosContext.dispatch({ type : 'edit_todo' , payload : { key : item.key , text }})
                    setEdit(false);
                })
                .catch(err => console.log(err))
    }

    let deleteHandler = e => {
        // ajax 
        axios.delete(`https://todoapp-40146.firebaseio.com/todos/${item.key}.json` )
                .then(response => todosContext.dispatch({ type : 'delete_todo' , payload : { key : item.key}}))
                .catch(err => console.log(err))
        
    }

    let doneHandler = e =>{
        axios.put(`https://todoapp-40146.firebaseio.com/todos/${item.key}.json` , {done : !item.done , text :item.text})
                .then(response => todosContext.dispatch({ type : 'toggle_todo' , payload : { key : item.key}}))
                .catch(err => console.log(err))

    }

    return (
        <>
            {
                ! edit
                    ? (
                        <div className="col-6 mb-2">
                            <div className="d-flex justify-content-between align-items-center border rounded p-3">
                                <div>
                                    <Link className="nav-link text-dark" target='_blank' to ={`/TodoInfo/${item.key}`}>
                                        <strong>
                                            {item.text}
                                        </strong>
                                    </Link>
                                </div>
                                <div>
                                    <button type="button" className={`btn btn-sm mr-1 ${ !item.done ? 'btn-success' : 'btn-warning'}`} onClick={doneHandler}>{ item.done ? 'undone' : 'done'}</button>
                                    <button type="button" className="btn btn-info btn-sm mr-1" onClick={() => setEdit(true)}>edit</button>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={deleteHandler}>delete</button>
                                </div>
                            </div>
                        </div>
                    )  
                    : <EditTodo text={item.text} edit={editHandler}/> 
            }
        </>
    )
}



export default Todo;