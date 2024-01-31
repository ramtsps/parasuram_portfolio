import React, { useState } from "react";
import { BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
// import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://skpgroupofinstitutions.in/mainfile/send_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // or "multipart/form-data" if needed
          },
          body: new URLSearchParams(formData).toString(),
        }
      );

      if (response.ok) {
        setLoading(false);
        setIsFormSubmitted(true);
      } else {
        console.error("Failed to send email");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending email", error);
      setLoading(false);
    }
    try {
      const collectionRef = collection(db, "Contact");
      const docRef = await addDoc(collectionRef, formData);

      console.log("Document written with ID: ", docRef.id);

      setLoading(false);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:ayushsaha111@gmail.com" className="p-text">
            tspsparasuram@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 6387607285" className="p-text">
            +91 7603805116
          </a>
        </div>
      </div>

      <div className="app__footer-social">
        <a href="https://www.linkedin.com/in/parasu-ram/" target="__blank">
          <BsLinkedin />
        </a>
        <a href="https://github.com/ramtsps" target="__blank">
          <BsGithub />
        </a>
        <a href="https://www.instagram.com/parasu_.ram/" target="__blank">
          <BsInstagram />
        </a>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {!loading ? "Send Message" : "Sending..."}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
