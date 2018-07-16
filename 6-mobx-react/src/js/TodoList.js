import React from "react"
import {observer} from 'mobx-react'

@observer
export default class TodoList extends React.Component {
    filter(e) {
        this.props.store.filter = e.target.value
    }

    createTodo(e) {
        if (e.which === 13) {
            this.props.store.createTodo(e.target.value)
            e.target.value = ''
        }
    }

    // different way to bind & pass object?
    toggleComplete(todo) {
        todo.complete = !todo.complete
    }

    render() {

        const {todos, filter, filteredTodos, clearComplete} = this.props.store
        const todoItems = filteredTodos.map((todo, i) =>
            <li key={`todo-${i}`}>
                <input
                    type='checkbox'
                    onChange={this.toggleComplete.bind(this, todo)}
                    value={todo.id}
                    checked={todo.complete}
                />
                {todo.value}
            </li>
        )

        return (
            <div>
                <h1>todos</h1>
                <input className='create' onKeyPress={(e) => this.createTodo(e)}/>
                <input className='filter' value={filter} onChange={(e) => this.filter(e)}/>
                <ul>{todoItems}</ul>
                <a href="#"
                   onClick={this.props.store.clearComplete}>
                    Clear Complete
                </a>
            </div>
        )
    }
}
