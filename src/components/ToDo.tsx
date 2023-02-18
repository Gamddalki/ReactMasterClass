import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, condition, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, condition: name as any };
      console.log(oldToDos);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {condition !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          🛫
        </button>
      )}
      {condition !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          ✈️
        </button>
      )}
      {condition !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          🛬
        </button>
      )}
    </li>
  );
}

export default ToDo;
