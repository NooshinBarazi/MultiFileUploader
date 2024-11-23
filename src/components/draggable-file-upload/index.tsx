import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

const DraggableFileUpload: FC<{
    isDragging: boolean
    setIsDragging: (state:boolean) => void
    onChange: (e:any) => void,
    onDrop: (e:any) => void
    [key: string]: any;
}> = ({ isDragging, setIsDragging, onChange, onDrop,...props }) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  return (
    <>
      <label
        htmlFor="image"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Images
      </label>

      <div
        className={`w-full border-2 ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-dashed border-gray-300"
        } rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer`}
        onDragOver={handleDragOver}
        onDrop={onDrop}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById("image")?.click()}
      >
        <input
          type="file"
          multiple
          max={4}
          maxLength={4}
          id="image"
          className="hidden"
          onChange={onChange}
          onDragOver={handleDragOver}
          onDrop={onDrop}
        />
        <ArrowUpOnSquareStackIcon className="w-10 h-10 text-gray-400 mb-2" />
        <p className="mt-2 text-sm text-gray-500">
          Drag & drop files here, or click to select files
        </p>
        <p className="text-sm text-gray-400">
          You can upload at least 1 file and maximun 5 files (up to 4 MB each)
        </p>
      </div>
    </>
  );
};

export default DraggableFileUpload;
