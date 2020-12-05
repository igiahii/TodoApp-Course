import React , { useEffect , useState } from 'react';

import { useParams } from 'react-router-dom'
import axios from 'axios'

function TodoInfo(props) {
    const params = useParams();
    const [todo , setTodo] = useState({})
    const [loading , setLoading] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://todoapp-40146.firebaseio.com/todos/${params.id}.json`)
            .then(response => {
                if (response.data){
                setLoading(false);
                setTodo({ ...response.data , key : params.id })
                } else {
                    props.history.push('/404')
                }
            })
            .catch(err => console.log(err));
    } , [])


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {
                        loading 
                            ? <h2>Loading Data ...</h2>
                            : (
                                <>
                                    <h2>Todo Detail</h2>
                                    <p>{todo.text}</p>
                                    <span className={`badge ${todo.done ? 'badge-success' : 'badge-warning'}`}>{ todo.done ? 'done' : 'undone' }</span>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoInfo;