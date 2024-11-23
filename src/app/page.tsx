'use client'
import {ArrowUpOnSquareStackIcon} from '@heroicons/react/24/outline';
import {ChangeEvent, useState} from "react";

interface FileObject {
    name: string;
    type: string;
    size: string;
    preview: string | null;
}

export default function Home() {
    const [files, setFiles] = useState<FileObject[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;

        const selectedFiles = Array.from(event.target.files)
        const mappedFiles = selectedFiles.map((file) => ({
            name: file.name,
            type: file.type,
            size: (file.size / 1024).toFixed(2) + "KB",
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        }))
        setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
    }


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(false);
        const droppedFiles = Array.from(event.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const processFiles = (fileList: File[]) => {
        const mappedFiles = fileList.map((file) => ({
            name: file.name,
            type: file.type,
            size: (file.size / 1024).toFixed(2) + 'KB',
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        }));
        setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
    };

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
    const removeFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    }


    return (
        <div
            className="flex flex-col items-center justify-items-center min-h-screen p-8 gap-8">
                <form className='w-full'>
                    <label htmlFor="image" className='block text-lg font-medium text-gray-700 mb-2'>Images</label>
                    <div
                        className={`w-full border-2 ${
                            isDragging ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'
                        } rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById('image')?.click()}
                    >
                        <input
                            type='file'
                            multiple
                            id="image"
                            className='hidden'
                            onChange={handleFileChange}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        />
                        <ArrowUpOnSquareStackIcon className="w-10 h-10 text-gray-400 mb-2"/>
                        <p className='mt-2 text-sm text-gray-500'>Drag & drop files here, or click to select files</p>
                        <p className='text-sm text-gray-400'>You can upload 4 files (up to 4 MB each)</p>
                    </div>
                    <div>
                    </div>
                </form>

            <div className="w-full">
                <h2 className="text-lg font-medium text-gray-700 mb-2">File Preview</h2>
                <div className="flex flex-wrap gap-4">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-md p-2 w-32 flex flex-col items-center justify-between"
                            >
                                {file.preview ? (
                                    <img
                                        src={file.preview}
                                        alt={file.name}
                                        className="w-full h-20 object-cover rounded-md"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-20 flex items-center justify-center bg-gray-100 text-sm text-gray-500 rounded-md">
                                        {file.name.split(".").pop()?.toUpperCase()} File
                                    </div>
                                )}
                                <div className="mt-2">
                                    <p className="text-sm text-gray-800 truncate">{file.name}</p>
                                    <p className="text-xs text-gray-500">{file.size}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(file.name)}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}
