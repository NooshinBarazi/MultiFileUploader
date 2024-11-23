"use client";
import { ChangeEvent, useState } from "react";
import PreviewFile from "@/components/preview-file";
import { useFileManagerContext } from "@/store";
import { toast } from "react-toastify";
import DraggableFileUpload from "@/components/draggable-file-upload";
import { validator } from "@/utils";

export default function Home() {
  const { state, dispatch } = useFileManagerContext();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const prepareDataAndValidation = (files: File[]) => {
    const stateFileLength = state.files.length;
    const totalFileLength = files.length + stateFileLength;
    if (totalFileLength > 5) {
        toast.error("You already have five image, if you want to replace image please remove image to replace it.")
        return;
    }
    const validation = validator(files.length);
    if (validation.isValid) {
      dispatch({ type: "UPLOAD", payload: files });
    } else {
      toast.error(validation.msg);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      prepareDataAndValidation(selectedFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    prepareDataAndValidation(droppedFiles);
  };

  const handleRemoveFile = (fileName: string) => {
    dispatch({ type: "REMOVE", payload: fileName });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validation = validator(state.files.length);

    if (validation.isValid) {
      toast.success("File's ready for upload");
    } else {
      toast.error(validation.msg);
    }
  };

  return (
    <section className="flex flex-col items-center justify-items-center min-h-screen p-8 gap-8">
      <form className="w-full" onSubmit={handleSubmit}>
        <DraggableFileUpload
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          onChange={handleFileChange}
          onDrop={handleDrop}
        />

        <button
          className="mt-4 bg-gray-700 text-white rounded p-2"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="w-full">
        <h2 className="text-lg font-medium text-gray-700 mb-2">File Preview</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {state.files.map((file, index) => (
            <PreviewFile
              key={index}
              data={file}
              onDelete={(name) => handleRemoveFile(name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
