import React, { useState, useEffect } from "react";

const Timer = ({ seconds, getDetails }: any) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    let interval: any = null;

    const countdown = () => {
      if (seconds > 0) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        setTimeLeft(
          `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }:${
            remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
          }`
        );
        interval = setTimeout(() => {
          countdown();
        }, 1000);
        seconds--;
      } else {
        setTimeLeft("Expired");
        clearTimeout(interval);
        getDetails();
      }
    };

    countdown();
    return () => clearTimeout(interval);
  }, [seconds]);

  return (
    <div className="mt-5 mb-5">
      <h3 className="card-title">Time left:</h3>
      <h4 className="card-text">{timeLeft}</h4>
    </div>
  );
};

export default Timer;
