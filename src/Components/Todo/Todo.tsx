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
  const [modal,setmodal] = useState<boolean>(false)
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
    setmodal(true)
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
  let oncancel = ()=>{
    setmodal(false)
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
        }}>
      <Input
         style={{ width: "calc(60% - 200px)" }}
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value)}
        placeholder="Enter a new todo item"
      />
      <Button type="primary" onClick={addTodo}>
        Add
      </Button>
      </Input.Group>
      <List  
      style={{
        display:"flex",
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        marginTop:50
      }}
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
            <List.Item style={{
              display:'flex',
              flexDirection:"row",
              justifyContent:"center",
              alignContent:"center",
              textAlign:"center",
              width:300,
              backgroundColor:"#5D6D7E",
              color:"#fff",
            }}>
              {todo.completed ? (
                <del style={{
                }}>{todo.title}</del>
              ) : (
                <Checkbox type="checkbox"  checked={todo.completed} onChange={() => handleTodoClick(todo.id)} style={{
                  color:"#fff"
                }}>{todo.title}</Checkbox>
              )}
              <div className="button-set">
              <Button onClick={() => setEditingTodoId(todo.id)} disabled={todo.completed} type="primary" style={{
              marginRight:40,
              }}>Edit</Button>
              <Button onClick={() => deleteTodo(todo.id)} type="primary" danger>Delete</Button>
              </div>
            </List.Item>
          )
        }
      />
    </div>
  );
};

export default Todo;

