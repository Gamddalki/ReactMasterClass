import { useForm } from "react-hook-form";
import { atom, useSetRecoilState } from "recoil";
import { Conditions, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), condition: Conditions.TO_DO },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Nothing to do!" })}
        placeholder="Anything to do?"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
