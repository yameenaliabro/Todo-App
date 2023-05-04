import { useState } from "react";
import { Button, Checkbox, Divider, Input, List, Modal, message} from "antd";
import "./Todo.css"
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
  function handleTodoClick(todoId:number) {
    setTodos(prevTodoList => (
      prevTodoList.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    ));
  }
  return (
    <div style={{}}>
        <Divider/>
        <Input.Group compact style={{
          display:'flex',
          justifyContent:'center',
          alignContent:"center",
          alignItems:"center",
          height:50,
          backgroundColor:"#5D6D7E",
        }}>
      <Input
         style={{ width: "calc(30% - 200px)" }} 
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value)}
        placeholder="Enter a new todo item"
      />
      <Button type="primary" onClick={addTodo}>
        Add
      </Button>
      </Input.Group>
      <div className="middle-container">
      <List  
        dataSource={todos}
        header
        renderItem={(todo) =>
          editingTodoId === todo.id ? (
            <Modal open={true}     footer={[
              <Button onClick={() => editTodo(todo.id, editingTodoTitle)} type="primary">
              Save
            </Button>,
              <Button onClick={() => setEditingTodoId(null)} type="primary" danger>Cancel</Button>
            ]}>
            <List.Item style={{
              marginTop:50
            }}>
              <Input
                value={editingTodoTitle}
                onChange={(event) => setEditingTodoTitle(event.target.value)}
                onPressEnter={() => editTodo(todo.id, editingTodoTitle)}
              />
            </List.Item>
            </Modal>
          ) : (
            <div className="main">
            <List.Item>
              {todo.completed ? (
                <del>{todo.title}</del>
              ) : (
                <Checkbox type="checkbox"  checked={todo.completed} onChange={() => handleTodoClick(todo.id)} style={{
                  color:"#fff"
                }}>{todo.title}</Checkbox>
              )}
              <div className="button-set">
              <Button onClick={() => setEditingTodoId(todo.id)} disabled={todo.completed} type="primary" >Edit</Button>
              <Button onClick={() => deleteTodo(todo.id)} type="primary" danger>Delete</Button>
              </div>
            </List.Item>
            </div>
          )
        }
      />
      </div>
    </div>
  );
};

export default Todo;

