"use client";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided: any) => (
          <div
            className="flex flex-1 overflow-x-scroll"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
