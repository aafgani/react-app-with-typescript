import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoModel } from "../model/todo.model";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7278/api" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    fetchTodos: builder.query<TodoModel[], void>({
      query: () => "/TodoFunction-GetAll",
      providesTags: ["Todo"],
    }),
    upsertTodo: builder.mutation<{}, TodoModel>({
      query: (todo) => ({
        url: "/TodoFunction-Upsert",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useUpsertTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
