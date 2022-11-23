import { Box, Checkbox, StepIconClassKey, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import { TodoModel } from "../../model/todo.model";
import {
  useDeleteTodoMutation,
  useUpsertTodoMutation,
} from "../../service/todoService";
import { toast } from "react-toastify";

const TodoItem = ({ item }: { item: TodoModel }) => {
  const initialState = {
    Id: "",
    itemName: "",
    isCompleted: false,
  };
  const [upsertTodo] = useUpsertTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [edit, setEdit] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  // const { Id, itemName, isCompleted } = formValue;

  const HandleOnEdit = (e: any) => {
    setEdit(!edit);
    upsertTodo(formValue);
    toast.success("updated successfully");
  };
  const HandleOnRemove = (Id: any) => {
    deleteTodo(Id);
    toast.success("deleted successfully");
  };
  const HandleOnComplete = () => {
    upsertTodo({
      Id: formValue.Id,
      itemName: formValue.itemName,
      isCompleted: !formValue.isCompleted,
    });
    toast.success("updated successfully");
  };

  const HandleItemNameOnChange = (e: any) => {
    setFormValue({ ...formValue, itemName: e.target.value });
  };

  useEffect(() => {
    setFormValue({ ...item });
  }, [item]);
  return (
    <Box display="flex" justifyContent="space-between">
      {edit ? (
        <Box>
          <TextField
            variant="standard"
            defaultValue={formValue?.itemName}
            onChange={HandleItemNameOnChange}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={HandleOnEdit}
          >
            <EditAttributesIcon />
          </IconButton>
        </Box>
      ) : (
        <>
          <Box>
            <Checkbox
              checked={item.isCompleted ? true : false}
              onChange={() => {
                HandleOnComplete();
              }}
            />
            <span>{formValue?.itemName}</span>
          </Box>
          <Box m={1} display="flex" justifyContent="flex-end">
            {!formValue?.isCompleted && (
              <>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  <CreateIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    HandleOnRemove(formValue?.Id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default TodoItem;
