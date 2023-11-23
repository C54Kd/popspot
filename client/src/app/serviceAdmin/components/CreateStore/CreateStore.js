"use client";

import "./CreateStore.scss";
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
  const [error, setError] = useState({});

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  const createPopupStore = async () => {
    const [imageURL, mainURL] = await Promise.all([
      s3UploadMultipleImages(newImages),
      s3UploadSingleImage(mainImage),
    ]);

    const updatedFormData = { ...formData, imageURL, mainURL };

    const { data } = await axios.post(
      `http://localhost:4000/api/popupStore`,
      updatedFormData
    );
    console.log(data);
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
      await createPopupStore();
      router.push("/serviceAdmin");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Form
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        setNewImages={setNewImages}
        handleComplete={handleComplete}
        newImages={newImages}
        mainImage={mainImage}
        setMainImage={setMainImage}
      />
    </div>
  );
}