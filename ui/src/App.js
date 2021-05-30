import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SampleContainer from "./components/sample/SampleContainer";
import { SamplesStoreProvider } from "./store/samplesStore";
import { EuiPageContent,EuiCard,EuiSpacer, EuiPageTemplate } from "@elastic/eui";
import TodoForm from "./components/Todo/TodoForm";
import Section from "./components/Todo/Section";
import TodoList from "./components/Todo/TodoList";

const appTitle = "To-Do App";

const list = [
  { id: 1, title: "Test #1", completed: false },
  { id: 2, title: "Test #2", completed: false },
  { id: 3, title: "Test #3", completed: false },
];

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:8000/samples");
    
      console.log("todolist1", todoList);
      let newSamples = [];

      data.forEach((element) => {
        const object = {
          id: element.id,
          field:
            Object.entries(element.content) &&
            Object.entries(element.content)[0]
              ? Object.entries(element.content)[0][0]
              : "",
          value:
            Object.entries(element.content) &&
            Object.entries(element.content)[0]
              ? Object.entries(element.content)[0][1]
              : "",
        };
        newSamples.push(object);
      });
      setTodoList([...newSamples]);
      console.log("todolist2", todoList);
    }

    fetchData();
  }, []);

  const addTodo = async (item) => {
    console.log("todolist2", todoList);
   
    axios.post('http://localhost:8000/samples', item)
    .then(response => {
      const newSamples=[...todoList];
      const object = {
        id: response.data.id,
        field:
          Object.entries(response.data.content) &&
          Object.entries(response.data.content)[0]
            ? Object.entries(response.data.content)[0][0]
            : "",
        value:
          Object.entries(response.data.content) &&
          Object.entries(response.data.content)[0]
            ? Object.entries(response.data.content)[0][1]
            : "",
      }; 
      newSamples.push(object);
      setTodoList([...newSamples]);
     console.log('test3',response.data)
    })
    .catch((error) => {
      console.log("An error occurred while trying to send a new JSON to the server:" + error);
  });
   
  
  };

  const removeTodo = async (id) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.delete(`http://localhost:8000/samples/${id}`);
    setTodoList((oldList) => oldList.filter((item) => item.id !== id));
  };

  const editTodo = async (id, item) => {
    const { data } = await axios.put(
      `http://localhost:8000/samples/${id}`,
      item
    ).then(response => {
      const newSamples=[...todoList];
      const object = {
        id: response.data.id,
        field:
          Object.entries(response.data.content) &&
          Object.entries(response.data.content)[0]
            ? Object.entries(response.data.content)[0][0]
            : "",
        value:
          Object.entries(response.data.content) &&
          Object.entries(response.data.content)[0]
            ? Object.entries(response.data.content)[0][1]
            : "",
      }; 
      newSamples.push(object);
      setTodoList([...newSamples]);
     console.log('test3',response.data)
    })
  };

  return (
    <SamplesStoreProvider>
      <SampleContainer />
      <EuiPageTemplate title="Lists" template="centeredBody" >
      <EuiSpacer size="xs" />
      <div className="ui container center aligned">
        <Section>
          <TodoForm addTodo={addTodo} />
        </Section>
        <Section>
          <TodoList
            editTodoListProp={editTodo}
            removeTodoListProp={removeTodo}
            list={todoList}
          />
        </Section>
      </div>
      </EuiPageTemplate>
    </SamplesStoreProvider>
  );
}

export default App;
