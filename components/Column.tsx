import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

interface Props {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}
const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = ({ id, todos, index }: Props) => {
  const [searchString] = useBoardStore((state) => [state.searchString]);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: any) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided: any, snapshot: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                  <span className="bg-gray-200 text-gray-500 px-2 py-1 text-sm font-normal rounded-full">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title.toLowerCase().includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title.toLowerCase().includes(searchString.toLowerCase())
                    )
                      return null;
                    return (
                      <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                        {(provided: any) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex justify-end items-end p-2">
                    <button onClick={openModal} className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10 " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
