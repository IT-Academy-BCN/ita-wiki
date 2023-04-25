import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { Button } from './atoms'

interface TodoProps {
  todo: string
  index: number
  handleRemoveTodo: (index: number) => void
}

const Todo: React.FC<TodoProps> = ({ todo, index, handleRemoveTodo }) => (
  <li>
    {todo}
    <Button onClick={() => handleRemoveTodo(index)}>Remove</Button>
  </li>
)

const DummyLengthyComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')
  const [todos, setTodos] = useState<string[]>([])

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleAddTodo = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setTodos([...todos, inputValue])
    setInputValue('')
  }

  const handleRemoveTodo = (index: number): void => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1>Dummy Lengthy Component</h1>
      <div>
        <h2>Counter</h2>
        <p>Count: {count}</p>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
      </div>
      <div>
        <h2>Todo List</h2>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleAddTodo}>Add Todo</Button>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={todo}
              todo={todo}
              index={index}
              handleRemoveTodo={handleRemoveTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DummyLengthyComponent
