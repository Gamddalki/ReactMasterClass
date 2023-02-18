import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, condition, id }: IToDo) {
  return (
    <li>
      <span>{text}</span>
    </li>
  );
}

export default ToDo;
