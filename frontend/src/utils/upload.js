import axios from "axios";
import API from "./api";

export const handleUpload = async (e, setDocuments, setActiveDoc) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await API.post("/uploader", formData);

    const newDoc = {
      id: res.data.file_id,
      name: file.name,
    };

    // sidebar update
    setDocuments((prev) => [...prev, newDoc]);

    // auto select
    setActiveDoc(newDoc);
    console.log("Uploading file:", file);

  } catch (err) {
    console.error(err);
  }
};