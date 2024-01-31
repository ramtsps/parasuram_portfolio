import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import "../../components/Navbar/Navbar.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
// import { urlFor, client } from "../../client";
import "./certified.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const Certified = () => {
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const [education, seteducation] = useState([]);

  useEffect(() => {
    const collectionskill = collection(db, "education");

    getDocs(collectionskill)
      .then((snapshot) => {
        const educationData = snapshot.docs.map((doc) => doc.data());
        seteducation(educationData);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("education", education);
  // ...

  return (
    <>
      <h2 className="head-text">
        Skills <span>&</span> Certified
      </h2>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {education.map((work, index) => (
          <div className="Certified-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={work.image} alt={work.coursename} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.image} target="__blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.coursename}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.descrip}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">
                  <span>{work.companyname}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Certified, "app__works"),
  "work",
  "app__primarybg"
);
