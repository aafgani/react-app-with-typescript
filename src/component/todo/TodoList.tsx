import { Grid, Container } from "@mui/material";
import React from "react";
import { TodoModel } from "../../model/todo.model";
import TodoItem from "./TodoItem";

const TodoList = ({ todos }: { todos: TodoModel[] }) => {
  return (
    <>
      <Container>
        <Grid item>
          {todos?.map((item: any, id: any) => (
            <TodoItem item={item} key={id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TodoList;
