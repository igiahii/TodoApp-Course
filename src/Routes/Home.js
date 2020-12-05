import React ,{useState ,useContext ,useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner'

import FormAddTodo from './../Components/Todo/FormAddTodo';
import TodoList from './../Components/Todo/TodoList';
import axios from 'axios';
import TodosContext from './../Context/todos';

function Home(){
    const [loading , setloading ] = useState();
    const todosContext =useContext(TodosContext)


    var getjason = (data) =>{
                    setloading(false)
                     let todos = Object.entries(data) 
                                    .map(([key,value]) => {
                                        return {
                                            ...value,
                                                key

                                }
                            })

        todosContext.dispatch({type :'init_todo' , payload : {todos}})
    }

    useEffect(() =>{
        setloading(true)
        axios.get(`https://todoapp-40146.firebaseio.com/todos.json`)
        .then(response => getjason(response.data))
        .catch(err => console.log(err))


    },[])



    
    return(
        <>
              <section className="jumbotron">
                    <div className="container d-flex flex-column align-items-center">
                        <h1 className="jumbotron-heading" style ={{paddingRight: "50px"}}>   <Spinner animation="grow" variant="dark" style ={{width :"3rem" ,height: "3rem" }} /> Welcome!</h1>
                        <p className="lead text-muted">To get started, add some items to your list:</p>
                        <FormAddTodo />
                    </div>
                </section>
                <div className="todosList">
                        <div className="container">
                            <div className="d-flex flex-column align-items-center ">
                                {
                                    loading 
                                    ? <Spinner animation="border" role="status" variant="primary"> 

                                    </Spinner>
                                    : <TodoList />
                                }
                            </div>
                        </div>
                </div>
        
        
        </>


    )
} 

export default Home ;