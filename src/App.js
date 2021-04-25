// React-context
// https://www.youtube.com/watch?v=IB140yvLfh8
// 40:20...
//<>
// hw:
// кожна тудушка повиннамати дві кнопки (1-mark as done, 2-delete)
// onClick 1: текст стає перекресленим, а кнопка стає mark as in progress
// onClick 2: видалити
// в хедері: каунт тотал тудус, каунт дан тудус, каунт ектів тудус
//https://www.youtube.com/watch?v=TViec4LuO3c&list=PLY1sAemBLA5xCCp5XcNlPkoyPks72Q7b0&index=62
//19:48

import React, {createContext, useContext, useState} from 'react';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom';

const TodoContext = createContext();

const TodoContextProvider = ({children}) => {
    const [todos, setTodos] = useState([]);
    const [doneTodos, setDoneTodos] = useState([]);


    const onTodoCreate = (newTodo) => {
        if (!newTodo || !newTodo.title || !newTodo.description) {
            console.error('wrong arg for new todo, should be smth like {title: "...", description: "..."}')
            return
        }
        setTodos([newTodo, ...todos])
    }

    const onTodoRemove = (todoId) => {
        if (!todoId) {
            console.error('todo id looks wrong', todoId)
            return
        }
        setTodos(todos.filter(el => el.id !== todoId))
        setDoneTodos(doneTodos.filter(id => id !== todoId))
    }

    const isDoneToggle = (todoId) => {
        const isTodosMarkedAsDone = doneTodos.includes(todoId);

        if (isTodosMarkedAsDone) {
            return setDoneTodos(doneTodos.filter(id => id !== todoId))
        }

        setDoneTodos([...doneTodos, todoId])
    }

    return (
        <TodoContext.Provider value={{
            todos,
            onTodosCreate: onTodoCreate,
            onTodoRemove,
            isDoneToggle,
            doneTodos
        }}>
            {children}
        </TodoContext.Provider>
    )
}

const TodoItem = ({todo, onTodoRemove, isDoneToggle, isDone}) => {
    // const {onTodoRemove} = useContext(TodoContext);

    const onTodoDelete = () => {
        const answer = window.confirm('are you sure you want to delete this todo?');
        if (answer) {
            //...
            onTodoRemove(todo.id);
        }
    }

    const onMarkIsDoneToggle = () => isDoneToggle(todo.id)

    return (
        <div>
            <div style={{
                textDecoration: isDone ? 'line-through' : ''
            }}>
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
            </div>
            <button onClick={onTodoDelete}>delete todo</button>
            <button onClick={onMarkIsDoneToggle}>mark as {isDone ? 'active' : 'done'}</button>
        </div>
    )
}

const TodosList = () => {
    const {
        todos,
        onTodoRemove,
        isDoneToggle,
        doneTodos
    } = useContext(TodoContext);

    console.log(doneTodos);

    // console.log(todos, 'from list');

    return (
        // <h1>todos list</h1>
        <div>
            {todos.map(el => (
                <TodoItem
                    key={el.title + el.description}
                    todo={el}
                    onTodoRemove={onTodoRemove}
                    isDoneToggle={isDoneToggle}
                    isDone={doneTodos.includes(el.id)}
                />
            ))}
        </div>
    )
}


const AddTodo = () => {
    const [todoValues, setTodoValues] = useState({
        title: '',
        description: '',
        id: null,
    })

    // const {todos, onTodosCreate} = useContext(TodoContext);
    // console.log(todos);
    console.log(Math.round((204.23000000000002)*100)/100);
    const {
        onTodosCreate
    } = useContext(TodoContext);

    const onTodoChange = ({target: {name, value}}) => setTodoValues({...todoValues, [name]: value});

    const onCreate = () => {
        // onTodoAdd (from context)
        onTodosCreate({...todoValues, id: Math.random()});
        setTodoValues({
            title: '',
            description: '',
            id: null
            // uuid - бібліотека генерації id
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
    const {
        todos,
        doneTodos
    } = useContext(TodoContext);


    return (
        <header>
            <Link to="/">list</Link>
            <Link to="/create-todo">add new todo</Link>

            <div style={{flex: 1}}/>

            <h3 style={{marginRight: '6px'}}>tottal todos: {todos.length}</h3>
            <h3 style={{marginRight: '6px'}}>active todos: {todos.length - doneTodos.length}</h3>
            <h3 style={{marginRight: '6px'}}>done todos: {doneTodos.length}</h3>

            {/*total todos*/}
            {/*active todos*/}
            {/*done todos*/}
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
