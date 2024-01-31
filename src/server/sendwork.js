import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/config";

const Sendwork = () => {
  const [formData, setFormData] = useState({
    codeLink: "https://github.com/ramtsps",
    company: "",
    descrip: "",
    description: "Achived 100%",
    name: "",
    projectLink: "",
    tags: "",
    title: "",
    years: "",
  });
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState([]);
  const yearsOptions = Array.from({ length: 25 }, (_, index) => 2000 + index);
  useEffect(() => {
    const collectionTags = collection(db, "tags");
    getDocs(collectionTags)
      .then((snapshot) => {
        const TagData = snapshot.docs.map((doc) => doc.data());
        setTag(TagData);
        // setFilterWork(ExperiencesData);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);

      const collectionRef = collection(db, "works");
      await addDoc(collectionRef, { ...formData, image: downloadURL });

      setFormData({
        // codeLink: "",
        company: "",
        descrip: "",
        // description: "",
        name: "",
        projectLink: "",
        tags: "",
        title: "",
        years: "",
      });
      setImage(null);

      console.log("Document added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>My Creative Portfolio Section and Education</h2>
      <form style={formStyle}>
        <label style={labelStyle}>
          Code Link:
          <input
            style={inputStyle}
            type="text"
            name="codeLink"
            value={formData.codeLink}
            onChange={handleChange}
          />
        </label>

        <label style={labelStyle}>
          Company:
          <input
            style={inputStyle}
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </label>

        <label style={labelStyle}>
          Descrip:
          <input
            type="text"
            name="descrip"
            value={formData.descrip}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>

        <label style={labelStyle}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Project Link:
          <input
            type="text"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Tags:
          <select
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="" disabled>
              Select a tag
            </option>
            {tag.map((tagItem) => (
              <option key={tagItem.name} value={tagItem.name}>
                {tagItem.name}
              </option>
            ))}
          </select>
        </label>

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
          Years:
          <select
            name="years"
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

        <button type="button" onClick={handleSubmit} style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  maxWidth: "600px",
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

export default Sendwork;
