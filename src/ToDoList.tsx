import { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register } = useForm();
  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder="Anything to do?" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
