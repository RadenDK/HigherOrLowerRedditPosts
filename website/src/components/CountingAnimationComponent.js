import React, { useRef, useEffect } from "react";

function CountingAnimation({ start, end, duration }) {
  const countRef = useRef();

  useEffect(() => {
    const obj = countRef.current;

    const easeOut = (t) => 1 - Math.pow(1 - t, 2); // Simple ease-out function

    const animateValue = (start, end, duration) => {
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeOut(progress); // Apply ease-out function
        obj.textContent = Math.floor(easedProgress * (end - start) + start);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    animateValue(start, end, duration);
  }, [start, end, duration]);

  return <span ref={countRef} />;
}

export default CountingAnimation;
