import React , { useReducer  } from 'react';
import { BrowserRouter as Router,Route , Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import loadable from '@loadable/component'

// impor Contexts
import TodosContext from './../Context/todos';
import AuthContext from './../Context/auth';

// import Reducers
import AppReducer from './../Reducers/appReducer';


// Import Components
const Home = loadable(()=> import('./../Routes/Home'))
const Header = loadable(()=> import('./Layouts/Header'))
const About = loadable(()=> import('../Routes/About'))
const Contact = loadable(()=> import('../Routes/Contact'))
const TodoInfo = loadable(()=> import('../Routes/TodoInfo'))
const NotFound = loadable(()=> import('../Routes/NotFound'))
// import Header from './Layouts/Header';
// import Home from './../Routes/Home'
// import About from '../Routes/About';
// import Contact from '../Routes/Contact';
// import TodoInfo from '../Routes/TodoInfo';
// import NotFound from '../Routes/NotFound';





function App() {

    const [state , dispatch] = useReducer(AppReducer , {
        todos : [],
        authenticated : false 
    })
  
    
   

    return (
       <Router>
            <AuthContext.Provider value={{ 
            authenticated : state.authenticated,
            dispatch
        }}>
            <TodosContext.Provider value={{
                            todos: state.todos,
                            dispatch
                        }}>
                            <div className="App">
                                <Header />
                                <main>
                                    <Switch>

                                        <Route path ="/" exact component ={Home}/>
                                        <Route path ="/About" component ={About}/>
                                        <Route path ="/Contact" component ={Contact}/>
                                        {/* todo informations */}
                                        <Route path ="/TodoInfo/:id" component ={TodoInfo}/>
                                        <Route path ="" component= {NotFound} />
                                        <Route path ="/404" component= {NotFound} />


                                    </Switch>
                                
                                </main>
                            </div>
                        </TodosContext.Provider>
        </AuthContext.Provider>   

       </Router>
    )
}

export default App;
