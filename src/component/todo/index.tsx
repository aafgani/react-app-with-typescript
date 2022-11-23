import React, { useEffect } from "react";
import { Grid, Box, Typography, Stack, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  useFetchTodosQuery,
  useUpsertTodoMutation,
} from "../../service/todoService";
import AddIcon from "@mui/icons-material/Add";
import CustomizedSearch from "../others/CustomizedSearch";
import TodoList from "./TodoList";
import AccordionComp from "../others/Accordion";
import { toast } from "react-toastify";

const Todo = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useFetchTodosQuery();
  const [upsertTodo] = useUpsertTodoMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  }, [error]);

  const HandleOnAddItem = (itemName: string) => {
    const todo = {
      Id: "",
      itemName: itemName,
      isCompleted: false,
    };
    upsertTodo(todo);
    toast.success("updated successfully");
  };

  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={6} lg={4} alignContent="center">
            <Stack direction="row" spacing={2}>
              <CustomizedSearch
                searchHandler={HandleOnAddItem}
                placeholder="To do ..."
                iconButton={<AddIcon />}
              />
              <IconButton
                onClick={() => {
                  refetch();
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Stack>

            <br />
            {isLoading && <p>Loading...</p>}
            {isSuccess && (
              <>
                {" "}
                <Typography>
                  You have {todos?.filter((i) => !i.isCompleted).length} items
                  to complete!
                </Typography>
                <TodoList todos={todos?.filter((i) => !i.isCompleted)} />
                <br />
                {todos && (
                  <AccordionComp
                    title={
                      "Completed " + todos?.filter((i) => i.isCompleted).length
                    }
                  >
                    <TodoList todos={todos?.filter((i) => i.isCompleted)} />
                  </AccordionComp>
                )}
              </>
            )}
            {/* {isError && (
              <p>
                {error.status} {JSON.stringify(error.data)}
              </p>
            )} */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { Todo };
