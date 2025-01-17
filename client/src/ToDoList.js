import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css"; // Ensure semantic UI styles are loaded

const endpoint = "http://localhost:9000";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
    };
  }

  componentDidMount() {
    this.getTask();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = () => {
    const { task } = this.state;

    if (task) {
        console.log("creating task", task)
      axios
        .post(
          `${endpoint}/api/task`,
          { task }, // JSON payload
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.getTask();
          this.setState({ task: "" });
          console.log("Task added successfully:", res.data);
        })
        .catch((err) => {
          console.error("Error creating task:", err);
        });
    }
  };

  getTask = () => {
    axios
      .get(`${endpoint}/api/task`)
      .then((res) => {
        if (res.data) {
          this.setState({
            items: res.data.map((item) => {
              const color = item.status ? "green" : "yellow";
              const style = item.status
                ? { wordWrap: "break-word", textDecorationLine: "line-through" }
                : { wordWrap: "break-word" };

              return (
                <Card key={item._id} color={color} fluid>
                  <Card.Content>
                    <Card.Header textAlign="left">
                      <div style={style}>{item.task}</div>
                    </Card.Header>
                    <Card.Meta textAlign="right">
                      <Icon
                        name="check circle"
                        color="blue"
                        onClick={() => this.updateTask(item._id)}
                      />
                      <span style={{ paddingRight: 10 }}>Complete</span>

                      <Icon
                        name="undo"
                        color="yellow"
                        onClick={() => this.undoTask(item._id)}
                      />
                      <span style={{ paddingRight: 10 }}>Undo</span>

                      <Icon
                        name="delete"
                        color="red"
                        onClick={() => this.deleteTask(item._id)}
                      />
                      <span style={{ paddingRight: 10 }}>Delete</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              );
            }),
          });
        } else {
          this.setState({ items: [] });
        }
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  };

  updateTask = (id) => {
    axios
      .put(`${endpoint}/api/task/${id}`, null, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Task updated successfully:", res.data);
        this.getTask();
      })
      .catch((err) => {
        console.error("Error updating task:", err);
      });
  };

  undoTask = (id) => {
    axios
      .put(`${endpoint}/api/undotask/${id}`, null, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Task undone successfully:", res.data);
        this.getTask();
      })
      .catch((err) => {
        console.error("Error undoing task:", err);
      });
  };

  deleteTask = (id) => {
    axios
      .delete(`${endpoint}/api/deletetask/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Task deleted successfully:", res.data);
        this.getTask();
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
      });
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2" color="yellow">
            To-Do List
          </Header>
        </div>

        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
          </Form>
        </div>

        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
