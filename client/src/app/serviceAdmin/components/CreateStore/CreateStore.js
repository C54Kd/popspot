"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { s3UploadMultipleImages, s3UploadSingleImage } from "../imageUploader";
import axios from "axios";
import Form from "../Form/Form.js";

export default function CreateStore() {
  const router = useRouter();

  const formIntialState = {
    name: "",
    brand: "",
    category: "",
    address: "",
    zipcode: "",
    location: "",
    summary: "",
    description: "",
    start_date: "",
    end_date: "",
  };

  const [formData, setFormData] = useState(formIntialState);
  const [newImages, setNewImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState({});

  const createPopupStore = async () => {
    setIsPending(true);
    const [imageURL, mainURL] = await Promise.all([
      s3UploadMultipleImages(newImages),
      s3UploadSingleImage(mainImage),
    ]);

    const updatedFormData = { ...formData, imageURL, mainURL };
    await axios.post(`http://localhost:4000/api/popupStore`, updatedFormData);
    setIsPending(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isPending) return;

      await createPopupStore();
      router.push("/serviceAdmin/popupstore");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Form
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newImages={newImages}
        setNewImages={setNewImages}
        mainImage={mainImage}
        setMainImage={setMainImage}
      />
    </>
  );
}
