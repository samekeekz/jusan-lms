import React, { ChangeEvent } from "react";

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
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      onImageSelect(selectedFile, base64String);
    };
    reader.readAsDataURL(selectedFile);
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
