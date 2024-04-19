import React, { useState, ChangeEvent, FormEvent } from "react";

interface ImageUploaderProps {
  selectedImage: File | null;
  previewURL: string;
  onImageSelect: (file: File | null, previewURL: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImage,
  previewURL,
  onImageSelect,
}) => {
  // const [file, setFile] = useState<File | null>(null);
  // const [previewURL, setPreviewURL] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    onImageSelect(selectedFile, URL.createObjectURL(selectedFile));
  };

  return (
    <div className="w-[170px] h-[150px] border border-gray-300 border-dashed rounded-lg px-5 py-6 flex flex-col items-start justify-end">
      <div className="">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer block">
          <div className="relative ">
            {previewURL ? (
              <img
                src={previewURL}
                alt="Preview"
                className="max-w-full max-h-48 mx-auto"
              />
            ) : (
              <div className="flex flex-col items-start text-left">
                <span className="text-gray-400">Логотип</span>
                <span className="text-gray-400">*параметры*</span>
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
