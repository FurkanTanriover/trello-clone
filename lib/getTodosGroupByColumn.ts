import { database } from "@/appwrite";
import { Models } from "appwrite";

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODOS_ID!
  );
  const todos = data.documents;

  const columns = todos.reduce((acc: Map<TypedColumn, Column>, todo: Models.Document) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    const column = acc.get(todo.status);
    if (column) {
      column.todos.push({
        $id: todo.$id,
        $createdAt: todo.$createdAt,
        title: todo.title,
        status: todo.status,
        ...(todo.image && { image: JSON.parse(todo.image) }),
      });
    }
    return acc;
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  //sort columns by columnTypes
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board; // return the created board
};
