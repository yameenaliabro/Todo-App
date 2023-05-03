import { useState } from "react";
import { Button, Divider, Input, List, message } from "antd";
type Todotype = {
  id: number;
  title: string;
  completed: boolean;
};

function Todo(){
  const [todos, setTodos] = useState<Todotype[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState("");

  const addTodo = () => {
    if (newTodoTitle === "") {
    message.error("please enter a todo list")
      return;
    }
    const newTodo: Todotype = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    message.success("todo deleed successful")
  };

  const editTodo = (id: number, title: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoTitle("");
    message.success("todo edit successful")
  };
  return (
    <div>
        <Divider/>
        <Input.Group compact>
      <Input
         style={{ width: "calc(70% - 200px)" }}
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value)}
        placeholder="Enter a new todo item"
      />
      <Button type="primary" onClick={addTodo}>
        Add
      </Button>
      </Input.Group>
      <List
        dataSource={todos}
        renderItem={(todo) =>
          editingTodoId === todo.id ? (
            <List.Item>
              <Input
                value={editingTodoTitle}
                onChange={(event) => setEditingTodoTitle(event.target.value)}
                onPressEnter={() => editTodo(todo.id, editingTodoTitle)}
              />
              <Button onClick={() => editTodo(todo.id, editingTodoTitle)} type="primary">
                Save
              </Button>
              <Button onClick={() => setEditingTodoId(null)} type="primary" danger>Cancel</Button>
            </List.Item>
          ) : (
            <List.Item>
              {todo.completed ? (
                <del>{todo.title}</del>
              ) : (
                <span>{todo.title}</span>
              )}
              <Button onClick={() => setEditingTodoId(todo.id)} type="primary">Edit</Button>
              <Button onClick={() => deleteTodo(todo.id)} type="primary" danger>Delete</Button>
            </List.Item>
          )
        }
      />
    </div>
  );
};

export default Todo;

