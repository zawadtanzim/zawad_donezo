import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import getAxiosClient from "../axios-instance";
import axios from "axios";

export default function Todos() {
  const modalRef = useRef();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const axiosInstance = await getAxiosClient();

      const { data } = await axiosInstance.get("http://localhost:8080/todos");
      // const { data } = await axios.get("http://localhost:8080/todos")

      return data;
    }
  });

  const { mutate: createNewTodo } = useMutation({
    mutationKey: ["newTodo"],
    mutationFn: async (newTodo) => {
      const axiosInstance = await getAxiosClient();

      const { data } = await axiosInstance.post("http://localhost:8080/todos", newTodo);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

const { mutate: markAsCompleted } = useMutation({
  mutationKey: ["markAsCompleted"],
  mutationFn: async ({ id, completed }) => {
    const axiosInstance = await getAxiosClient();
    const { data } = await axiosInstance.put(
      `http://localhost:8080/todos/${id}/completed`,
      { completed }
    );
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries("todos");
  }
});

  if (isLoading) {
    return (
      <div className="">Loading Todos...</div>
    )
  }

  if (isError) {
    return (
      <div className="">There was an error</div>
    )
  }

  console.log(data);

  const toggleNewTodoModal = () => {
    if (modalRef.current.open) {
      modalRef.current.close();
    } else {
      modalRef.current.showModal();
    }
  }

  const handleNewTodo = (values) => {
    createNewTodo(values)
    toggleNewTodoModal();
  }

  function NewTodoButton() {
    return (
      <button className="btn btn-primary" onClick={() => toggleNewTodoModal()}>
        New Todo
      </button>
    )
  }

  function TodoModal() {
    return (
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Todo</h3>
          <form onSubmit={handleSubmit(handleNewTodo)}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name of Todo</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" {...register("name")} />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" {...register("description")} />
            </label>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Create Todo</button>
              <button type="button" onClick={() => toggleNewTodoModal()} className="btn btn-ghost">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    )
  }

  function TodoItemList() {
  if (!data || !data.todos || data.todos.length === 0) {
    return <p>No todos found. Add one to get started!</p>;
  }

  return (
    <ul>
      {data.todos.map(todo => (
        <li key={todo.id}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => markAsCompleted({ id: todo.id, completed: !todo.completed })}
            />
            Completed
          </label>
        </li>
      ))}
    </ul>
  );
}

  return (
    <>
      <NewTodoButton />
      <TodoItemList />
      <TodoModal />
    </>
  )
}
