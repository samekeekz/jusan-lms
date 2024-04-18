import React, { useState, ChangeEvent, FormEvent } from "react";

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Generate a preview URL for images
    if (selectedFile.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewURL(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewURL("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      console.log("Selected image file:", file);
      // You can perform image upload or further processing here
    } else {
      console.log("No image file selected.");
    }
  };

  return (
    <div className="w-[170px] h-[150px] border border-gray-300 border-dashed rounded-lg px-5 py-6 flex flex-col items-start justify-end">
      <form onSubmit={handleSubmit}>
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
        {/* <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Upload Image
        </button> */}
      </form>
    </div>
  );
};

export default ImageUploader;
