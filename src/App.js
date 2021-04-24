// React-context
// https://www.youtube.com/watch?v=IB140yvLfh8
// 40:20...
//<>
// hw:
// кожна тудушка повиннамати дві кнопки (1-mark as done, 2-delete)
// onClick 1: текст стає перекресленим, а кнопка стає mark as in progress
// onClick 2: видалити
// в хедері: каунт тотал тудус, каунт дан тудус, каунт ектів тудус

import React, {createContext, useContext, useState} from 'react';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom';

const TodoContext = createContext();

const TodoContextProvider = ({children}) => {
  const [todos, setTodos] = useState([])

  const onTodosCreate = (newTodo) => {
    if (!newTodo || !newTodo.title || !newTodo.description) {
      console.error('wrong arg for new todo, should be smth like {title: "...", description: "..."}')
      return
    }

    setTodos([newTodo, ...todos])
  }

  return (
      <TodoContext.Provider value={{
        todos,
        onTodosCreate
      }}>
        {children}
      </TodoContext.Provider>
  )
}

const TodoItem = ({todo}) => {

  return (
      <div>
        <h4>{todo.title}</h4>
        <p>{todo.description}</p>
      </div>
  )
}

const TodosList = () => {
  const {
    todos
  } = useContext(TodoContext);

  // console.log(todos, 'from list');

  return (
      // <h1>todos list</h1>
      <div>
        {todos.map(el => <TodoItem key={el.title + el.description} todo={el}/>)}
      </div>
  )
}


const AddTodo = () => {
  const [todoValues, setTodoValues] = useState({
    title: '',
    description: '',
  })

  // const {todos, onTodosCreate} = useContext(TodoContext);
  // console.log(todos);
  const {
    onTodosCreate
  } = useContext(TodoContext);

  const onTodoChange = ({target: {name, value}}) => setTodoValues({...todoValues, [name]: value});

  const onCreate = () => {
    // onTodoAdd (from context)
    onTodosCreate(todoValues);
    setTodoValues({
      title: '',
      description: '',
    })
  }

  return (
      <div>
        <br/>
        <input value={todoValues.title} onChange={onTodoChange} type="text" name="title" placeholder="todo title"/>
        <br/>
        <br/>
        <input value={todoValues.description} onChange={onTodoChange} type="text" name="description"
               placeholder="todo description"/>
        <br/>
        <br/>

        <button onClick={onCreate}>add todo</button>
      </div>
  )
}
const Header = () => {
  return (
      <header>
        <Link to="/">list</Link>
        <Link to="/create-todo">add new todo</Link>
      </header>
  )
}

export default function App() {
  return (
      <TodoContextProvider>
        <main>
          {/*// 1 список тудушок, де ми можемо маркувати їх як виконані або видаляти*/}
          {/*// 2 формочка для створення нової тудушки*/}
          <Router>
            <Header/>

            <div style={{padding: 20}}>
              <Switch>
                <Route path="/" exact>
                  <TodosList/>
                </Route>

                <Route path="/create-todo">
                  <AddTodo/>
                </Route>
              </Switch>
            </div>
          </Router>
        </main>

      </TodoContextProvider>
  );
}

// </>
// React-context
// https://www.youtube.com/watch?v=IB140yvLfh8
// ... 1:14:39


// React-context
// https://www.youtube.com/watch?v=IB140yvLfh8
// 00:00...
//<>
// import './App.css';
// import React, {useState, createContext, useContext} from "react";
//
// const CounterContext = createContext();
// // console.log(CounterContext);
//
// const ContextProvider = ({children}) => {
//     const [counter, setCounter] = useState(0);
//
//     const incCounter = () => {
//         setCounter(counter + 1);
//     }
//     const decCounter = () => {
//         setCounter(counter - 1);
//     }
//
//     const paramsForContext = {
//         counter,
//         incCounter,
//         decCounter
//     }
//
//     return (
//         <CounterContext.Provider value={
//             // {counter, incCounter, decCounter}
//             paramsForContext
//         }>
//             {children}
//         </CounterContext.Provider>
//     )
// }
//
// const Counter = () => {
//     const {counter, incCounter, decCounter} = useContext(CounterContext);
//
//     return (
//         <>
//             {/*<h3 onClick={() => setCounter(counter + 1)}>Counter: {counter}</h3>*/}
//             <h3>Counter: {counter}</h3>
//             <button onClick={incCounter}>inc</button>
//             <button onClick={decCounter}>dec</button>
//         </>
//     )
// }
//
// const Header = () => {
//     // const counterContext = useContext(CounterContext);
//     // console.log(counterContext);
//     const {counter, incCounter} = useContext(CounterContext);
//
//     return (
//         <h1 onClick={incCounter}>Header counter: {counter}</h1>
//     )
//     // return (
//     //     <CounterContext.Consumer>
//     //         {(value) => (
//     //             <h1 onClick={incCounter}>Header counter: {counter}</h1>
//     //         )}
//     //     </CounterContext.Consumer>
//     // )
// }
//
// export default function App() {
//     return (
//         <ContextProvider>
//             <Header/>
//             <Counter/>
//         </ContextProvider>
//     );
// }
// </>
// React-context
// https://www.youtube.com/watch?v=IB140yvLfh8
// ...40:20
