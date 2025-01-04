"use client";
import React, { useRef } from "react";
import styles from "./Dashboard.module.scss";

const DashBoard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY > 0 ? 50 : -50;
    }
  };

  return (
    <section className={styles.userDashSection}>
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className={styles.userStepsMainWrapper}
      >
        <ul>
          {/* <li className={styles.StepCompleted}> 
            if a step is completed add this class to the li for the style 
              */}

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <li
              className={`${item % 2 == 0 ? styles.StepCompleted : ""}`}
              key={index}
            >
              <div className={styles.stepCountWrapper}>
                <h5>step {item}</h5>

                {/* conditionaly render this span for the completed and incompleted step */}
                {item % 2 == 0 && <span>completed</span>}
              </div>
              <div className={styles.stepContent}>
                <h6>Company steps content</h6>

                <p className={styles.underlined}>
                  By default, the mouse wheel scrolls vertically. Even if your
                  section has overflow-x: scroll, the mouse wheel won't scroll
                  horizontally unless:
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.taskMainWrapper}>
        <ul>
          {[1, 2, 3, 4].map((_, index) => (
            <li key={index}>
              <div className={styles.taskHeader}>
                <h6>Task name</h6>

                <span className={styles.alertSpan}>Past Due</span>

                <span className={styles.requiredStyle}>required</span>
              </div>
              <p>
                This error happens because TypeScript doesn't know the type of
                the element attached to useRef. By default, useRef is inferred
                as if no type is provided. We need to explicitly type the
                reference to
              </p>

              <div className={styles.actionWrapper}>
                <button>
                  <span>Start Task</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DashBoard;
