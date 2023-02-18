import { useSetRecoilState } from "recoil";
import { Conditions, IToDo, toDoState } from "../atoms";

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
      {condition !== Conditions.TO_DO && (
        <button name={Conditions.TO_DO} onClick={onClick}>
          🛫
        </button>
      )}
      {condition !== Conditions.DOING && (
        <button name={Conditions.DOING} onClick={onClick}>
          ✈️
        </button>
      )}
      {condition !== Conditions.DONE && (
        <button name={Conditions.DONE} onClick={onClick}>
          🛬
        </button>
      )}
    </li>
  );
}

export default ToDo;
