import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./About.scss";
import { AppWrap, MotionWrap } from "../../wrapper";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const About = () => {
  const [abouts, setAbouts] = useState([]);
  // const imgpri =
  //   "https://firebasestorage.googleapis.com/v0/b/portfolio-deaf2.appspot.com/o";
  // const imgsuf = "?alt=media&token=31c0bad4-32fa-4d8e-bf08-6099b73b2996";
  useEffect(() => {
    const collectionRef = collection(db, "abouts");

    getDocs(collectionRef)
      .then((snapshot) => {
        const aboutsData = snapshot.docs.map((doc) => doc.data());
        setAbouts(aboutsData);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(abouts);
  console.log(abouts);
  return (
    <>
      <h2 className="head-text">
        I know That <span>Good Dev</span>
        <br />
        means <span>Good Bussiness</span>
      </h2>
      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            key={about.title + index}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              borderRadius: "8px",
            }}
          >
            <img
              src={about.image}
              alt={about.title}
              style={{
                border: "5px solid #cbd3dd", // Add your preferred border style here
                // Add your preferred border-radius
                // Set the width of the image
                height: "150px", // Set the height of the image
                objectFit: "cover",
                // Ensure the image covers the container
              }}
            />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
