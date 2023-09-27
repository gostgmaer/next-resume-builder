// components/ImageUpload.js
import Image from "next/image";
import React, { useState } from "react";

import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { firebaseStorage } from "@/config/firebase";
import { useGlobalAppContext } from "@/context/context";

const ImageUpload = ({ imagePreview, setImagePreview }) => {
  const { loader, loaderFalse, loaderTrue } = useGlobalAppContext();
  const [progrss, setProgrss] = useState(0);
  const [url, setUrl] = useState(undefined);
  const [file, setFile] = useState(undefined);

  const onFileUpload = () => {
    if (!file) return;
    loaderTrue()
    const storageRef = ref(firebaseStorage, `/resumeImage/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgrss(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          setImagePreview(url);
          console.log(uploadTask.snapshot.ref);
        });
      }
    );
    loaderFalse()
  };
  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    onFileUpload();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if a file was selected
    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-600">Upload an Image</label>
      <div className="mt-2 flex items-center justify-start">
        <label
          htmlFor="file-upload"
          className="px-4 py-2 w-max flex items-center gap-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Choose File
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
      {imagePreview && (
        <div className="mt-4">
          <p className="font-semibold">Image Preview:</p>
          <Image
            src={imagePreview}
            alt="Preview"
            className="mt-2 w-40 h-40 rounded-lg"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
