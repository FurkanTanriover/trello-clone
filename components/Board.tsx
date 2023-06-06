"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Column from "./Column";

const Board = () => {
  const notify = () =>
    toast.success("Update task status successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [getBoard, board, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.getBoard,
    state.board,
    state.setBoardState,
    state.updateTodoInDB,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };
    const endCol: Column = {
      id: endColIndex[0],
      todos: endColIndex[1].todos,
    };
    if (!startCol || !endCol) return;

    if (source.index === destination.index && startCol === endCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);
    if (startCol.id === endCol.id) {
      // same column task drag
      const newColumns = new Map(board.columns);
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      //  dragging to another column
      const endTodos = Array.from(endCol.todos);
      endTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newStartCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newEndCol = {
        id: endCol.id,
        todos: endTodos,
      };
      newColumns.set(startCol.id, newStartCol);
      newColumns.set(endCol.id, newEndCol);
      // update db
      updateTodoInDB(todoMoved, endCol.id);
      setBoardState({ ...board, columns: newColumns });
      notify();
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <ToastContainer />
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
