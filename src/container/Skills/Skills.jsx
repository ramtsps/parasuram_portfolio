import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";

import { AppWrap, MotionWrap } from "../../wrapper";
// import { urlFor, client } from "../../client";
import "./Skills.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
const Skills = () => {
  const [education, seteducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [abouts, setAbouts] = useState([]);
  // const imgpri =
  //   "https://firebasestorage.googleapis.com/v0/b/portfolio-deaf2.appspot.com/o";
  // const imgsuf = "?alt=media&token=31c0bad4-32fa-4d8e-bf08-6099b73b2996";

  // useEffect(() => {
  //   const query = '*[_type == "education"]';
  //   const skillsQuery = '*[_type == "skills"]';

  //   client.fetch(query).then((data) => {
  //     seteducation(data);
  //   });

  //   client.fetch(skillsQuery).then((data) => {
  //     setSkills(data);
  //   });
  // }, []);
  useEffect(() => {
    const collectionRef = collection(db, "skills");

    getDocs(collectionRef)
      .then((snapshot) => {
        const skillsData = snapshot.docs.map((doc) => doc.data());
        setSkills(skillsData);
      })
      .catch((err) => console.log(err));
    const collectionRefex = collection(db, "education");

    getDocs(collectionRefex)
      .then((snapshot) => {
        const educationData = snapshot.docs.map((doc) => doc.data());
        seteducation(educationData);
      })
      .catch((err) => console.log(err));

    const collectionRefi = collection(db, "abouts");

    getDocs(collectionRefi)
      .then((snapshot) => {
        const aboutsData = snapshot.docs.map((doc) => doc.data());
        setAbouts(aboutsData);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(skills);
  console.log(education);
  return (
    <>
      <h2 className="head-text">Skills & Certified</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={skill.icon} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
          {abouts.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.title}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={skill.image} alt={skill.title} />
              </div>
              <p className="p-text">{skill.title}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="app__skills-exp">
          {education.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                <>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    data-tip
                    data-for={experience.coursename}
                    key={experience.coursename}
                  >
                    <h4 className="bold-text">{experience.coursename}</h4>
                    <p className="p-text">{experience.companyname}</p>
                  </motion.div>
                  <ReactTooltip
                    id={experience.coursename}
                    effect="solid"
                    arrowColor="#fff"
                    className="skills-tooltip"
                  >
                    <img
                      src={experience.image}
                      alt={experience.coursename}
                      style={{ width: "250px", height: "200px" }}
                    />
                  </ReactTooltip>
                </>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
