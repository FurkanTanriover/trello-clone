import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
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
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);

  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="bg-white rounded-md space-y-2 drop-shadow-md">
        <div className="flex justify-between items-center p-2">
          <h3 className="font-bold text-lg">{todo.title}</h3>
          <button
            onClick={() => deleteTask(index, todo, id)}
            className="text-red-500 hover:text-red-600"
          >
            <XCircleIcon className="h-8 w-8 ml-5" />
          </button>
        </div>
        {/* ADD İMAGE HERE */}
        {imageUrl && (
          <div className="w-full h-full rounded-b-md relative">
            <Image
              src={imageUrl}
              alt="Task image"
              className="w-full object-contain rounded-b-md"
              width={400}
              height={200}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
