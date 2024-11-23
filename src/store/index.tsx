"use client"
import { FileObject } from "@/types";
import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";

type STATE_TYPE = {
  files: FileObject[];
};

type ACTIONS_TYPE =
  | { type: "UPLOAD"; payload: File[] }
  | { type: "REMOVE"; payload: string };

const initialState: STATE_TYPE = {
  files: [],
};

const reducer = (state: STATE_TYPE, action: ACTIONS_TYPE): STATE_TYPE => {
  switch (action.type) {
    case "UPLOAD":
      const mappedFiles: FileObject[] = action.payload.map(
        (file: File) => ({
          name: file.name,
          type: file.type,
          size:
            typeof file.size === "number" // Ensure size is a number
              ? (file.size / 1024).toFixed(2) + "KB"
              : "Unknown size",
          preview:
            file instanceof File && file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : null,
        })
      );
      return {
        ...state,
        files: [...state.files, ...mappedFiles], // Append the new files to the existing ones
      };

    case "REMOVE":
      return {
        ...state,
        files: state.files.filter((file) => file.name !== action.payload), // Remove the file by name
      };

    default:
      return state;
  }
};

export const FileManagerContext = createContext<{
  state: STATE_TYPE;
  dispatch: React.Dispatch<ACTIONS_TYPE>;
} | null>(null);

export const FileManagerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FileManagerContext.Provider value={{ state, dispatch }}>
      {children}
    </FileManagerContext.Provider>
  );
};

// Custom hook to use the context
export const useFileManagerContext = () => {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error("useMyContext must be used within a FileManagerProvider");
  }
  return context;
};
