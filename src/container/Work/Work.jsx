import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
// import { urlFor, client } from "../../client";
import "./Work.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  // const imgpri =
  //   "https://firebasestorage.googleapis.com/v0/b/portfolio-deaf2.appspot.com/o";
  // const imgsuf = "?alt=media&token=31c0bad4-32fa-4d8e-bf08-6099b73b2996";
  useEffect(() => {
    const collectionRefex = collection(db, "works");

    getDocs(collectionRefex)
      .then((snapshot) => {
        const ExperiencesData = snapshot.docs.map((doc) => doc.data());
        setWorks(ExperiencesData);
        setFilterWork(ExperiencesData);
      })
      .catch((err) => console.log(err));

    const collectionTags = collection(db, "tags");
    getDocs(collectionTags)
      .then((snapshot) => {
        const TagData = snapshot.docs.map((doc) => doc.data());
        setTags(TagData);
        // setFilterWork(ExperiencesData);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(works);
  // ...

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(
          works.filter(
            (work) => work.tags && work.tags.split(",").includes(item)
          )
        );
      }
    }, 500);
  };

  // ...

  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span> Section
      </h2>
      <div className="app__work-filter">
        {
          // ["Landing Page", "MERN", "React JS", "wordpress", "All"].map(
          tags.map((item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item.name)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item.name ? "item-active" : ""
              }`}
            >
              {item.name}
            </div>
          ))
        }
        {/* work.tags.split(",").map((tag, index) => {}) */}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={work.image} alt={work.name} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="__blank" rel="noreferrer">
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
                <a href={work.codeLink} target="__blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.descrip}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">
                  {work.tags &&
                    work.tags
                      .split(",")
                      .map((tag, index) => <span key={index}>{tag}</span>)}
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
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
