import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) => {
  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="bg-white rounded-md space-y-2 drop-shadow-md">
        <div className="flex justify-between items-center p-2">
          <h3 className="font-bold text-lg">{todo.title}</h3>
          <button className="text-red-500 hover:text-red-600">
            <XCircleIcon className="h-8 w-8 ml-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
