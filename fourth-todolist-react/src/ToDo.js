import React, { Component } from 'react'
import './style.css'

export default class ToDo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           newItem: '',
           list: []
        }
    }
    updateInput(key,value) {
        //update react state
        this.setState({
            [key]: value
        })
    }
    addItem() {
        // create item with unique id
       const newItem ={
           id : 1 + Math.random(),
           value: this.state.newItem.slice()
       }
       // copy of current list of items
       const list= [...this.state.list]

       //add new items to list
       list.push(newItem)

       //update list with newItem and reset newItem input
       this.setState({
           list,
           newItem: ''
       })
    }

    deleteItem(id) {
        // copy of current list of items
        const list = [...this.state.list]

        //filter out item being deleted
        const updateList = list.filter(item => item.id !== id)

        this.setState({ list : updateList})
    }
    
    render() {
        return (
            <div>
                <h1>To Do List</h1>
                <input
                    type="text"
                    className="input"
                    placeholder="new task"
                    value={this.state.newItem}
                    onChange={e => this.updateInput('newItem', e.target.value)}
                />
                <button
                    onClick={() => this.addItem()}
                >
                    + 
                </button>
                <ul>
                    {this.state.list.map(item => {
                        return(
                            <li key={item.id}>
                                {item.value}
                            <button
                                onClick={() => this.deleteItem(item.id)}
                            >
                                -
                            </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
