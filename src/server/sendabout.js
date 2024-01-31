import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Sendabout = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null, // store the File object
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Perform any image-related processing if needed
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async () => {
    try {
      const collectionRef = collection(db, "abouts");

      // Upload image to Firebase storage
      const storageRef = ref(storage, `about_images/${formData.image.name}`);
      const imageSnapshot = await uploadBytes(storageRef, formData.image);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageSnapshot.ref);

      // Add document to Firestore with the image URL
      await addDoc(collectionRef, { ...formData, image: imageUrl });

      // Clear form data after submission
      setFormData({
        title: "",
        description: "",
        image: null,
      });

      console.log("Document added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Add About Information</h2>
      <form style={formStyle}>
        <label style={labelStyle}>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ ...inputStyle, height: "100px" }}
          />
        </label>

        <label style={labelStyle}>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            style={inputStyle}
          />
        </label>

        <button type="button" onClick={handleSubmit} style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  maxWidth: "400px",
  margin: "auto",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "#fce4ec", // Lavender color
};

const headerStyle = {
  color: "#333",
  marginBottom: "20px",
  fontSize: "24px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const labelStyle = {
  textAlign: "left",
  width: "100%",
  marginBottom: "10px",
  fontSize: "16px",
  color: "#7d3c98", // Plum color
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ddd",
  marginBottom: "20px",
  fontSize: "16px",
};

const submitButtonStyle = {
  backgroundColor: "#9b59b6", // Amethyst color
  color: "#fff",
  padding: "15px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  fontSize: "18px",
  width: "100%",
};

export default Sendabout;
