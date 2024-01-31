import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/config";

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    companyname: "",
    coursename: "",
    image: "",
    year: "",
  });
  const [certificateImage, setCertificateImage] = useState(null);
  const yearsOptions = Array.from({ length: 25 }, (_, index) => 2000 + index);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setCertificateImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `certificate_images/${certificateImage.name}`
      );
      await uploadBytes(storageRef, certificateImage);

      // Get download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Add certificate data to Firebase Firestore
      const certificatesCollection = collection(db, "education");
      await addDoc(certificatesCollection, {
        ...formData,
        image: imageUrl,
      });

      // Reset form data after successful submission
      setFormData({
        companyname: "",
        coursename: "",
        image: "",
        year: "",
      });
      setCertificateImage(null);

      console.log("Certificate added successfully!");
    } catch (error) {
      console.error("Error adding certificate: ", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Add Certificate</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Company Name:
          <input
            type="text"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Course Name:
          <input
            type="text"
            name="coursename"
            value={formData.coursename}
            onChange={handleChange}
            style={inputStyle}
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

        <label style={labelStyle}>
          Year:
          <select
            name="year"
            value={formData.years}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select a year</option>
            {yearsOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" style={submitButtonStyle}>
          Add Certificate
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  maxWidth: "400px",
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "#f8f8f8",
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
  color: "#555",
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
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "15px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  fontSize: "18px",
  width: "100%",
};

export default CertificateForm;
