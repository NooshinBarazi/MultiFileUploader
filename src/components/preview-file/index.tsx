import { FileObject } from "@/types";
import Image from "next/image";
import { FC } from "react";

const PreviewFile: FC<{
  data: FileObject;
  onDelete: (name: string) => void;
}> = ({ data, onDelete }) => {
  return (
    <div className="border px-2 py-2 border-gray-300 rounded-md  w-34 flex flex-col items-center justify-between">
      {data.preview ? (
        <Image
          src={data.preview}
          alt={data.name}
          width={148}
          height={1480}
          className="w-full h-20 object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-20 flex px-4 items-center justify-center bg-gray-100 text-sm text-gray-500 rounded-md">
          {data.name.split(".").pop()?.toUpperCase()} File
        </div>
      )}
      <div className="mt-2 select-none px-4">
        <p className="text-sm text-gray-800 truncate">{data.name}</p>
        <p className="text-xs text-gray-500">{data.size}</p>
      </div>
      <button
        type="button"
        onClick={() => onDelete(data.name)}
        className="text-red-500 text-sm mt-2"
      >
        Remove
      </button>
    </div>
  );
};

export default PreviewFile;
