import { atom, selector } from "recoil";

export enum Conditions {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  condition: Conditions;
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
      toDos.filter((toDo) => toDo.condition === Conditions.TO_DO),
      toDos.filter((toDo) => toDo.condition === Conditions.DOING),
      toDos.filter((toDo) => toDo.condition === Conditions.DONE),
    ];
  },
});
