import React from 'react'
import Todo from './Todo'

const TodoList=({ list, removeTodoListProp, editTodoListProp })=> {
    const renderedList = list.map(
        (item) => (
            <Todo
                title={item.value}
                completed={item.field}
                removeTodoItemProp={(e) => removeTodoListProp(item.id)}
                editTodoItemProp={(updatedItem) => editTodoListProp(item.id, updatedItem)}
                key={item.id}
            />
        )
    );
    return (
        <div className="ui grid center aligned">
            {renderedList}
        </div>
    );
};

export default TodoList
