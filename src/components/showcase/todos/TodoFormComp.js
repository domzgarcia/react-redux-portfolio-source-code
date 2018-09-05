import React from 'react';

import './todo.css';

const TodoFormComp = (props) => {
    let isActive = props.isOpen ? '-active' : '';
    return (
        <div className={"card " + isActive}>
            <div className="title">New todo</div>
            <form onSubmit={props.onSubmit}>
                <input type="text" onChange={props.handleChange}/>
                <button type="submit" className="btn-add -green pull-right">Submit</button>
                <div className="clearfix"></div>
            </form>
        </div>
    )
}

export default TodoFormComp;