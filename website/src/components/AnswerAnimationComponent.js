import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "../styles/AnswerAnimationComponentStyle.css";

const AnswerAnimation = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      startAnimation: startAnimation,
    };
  });

  const [animationClass, setAnimationClass] = useState("");

  function startAnimation(isCorrect) {
    let className = "answer-animation ";
    let type = "";
    if (isCorrect) {
      type = "correct";
    } else {
      type = "wrong";
    }
    className += type;

    className += " answer-animation-intro";

    setAnimationClass(className);

    setTimeout(() => {
      setAnimationClass("answer-animation " + type + " answer-animation-outro");
    }, 2000);

    setTimeout(() => {
      setAnimationClass("");
    }, 3000);
  }

  return <div className={animationClass}></div>;
});

export default AnswerAnimation;
