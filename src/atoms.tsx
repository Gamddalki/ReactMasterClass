import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  condition: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.condition === "TO_DO"),
      toDos.filter((toDo) => toDo.condition === "DOING"),
      toDos.filter((toDo) => toDo.condition === "DONE"),
    ];
  },
});
