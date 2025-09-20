import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const CircularTimer = ({
  duration = 300, // 5 minutes default
  onComplete = () => {},
  onStart = () => {},
  onPause = () => {},
  onResume = () => {},
  size = 200,
  strokeWidth = 8,
  color = "#007bff",
  backgroundColor = "#e9ecef",
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle circumference
  const progress = ((duration - timeLeft) / duration) * circumference;

  // Calculate dot position for React Native style circular progress
  const getDotPosition = () => {
    const progressRatio = (duration - timeLeft) / duration;

    // React Native style: 275 degree arc, rotated 222 degrees
    const centerX = 150;
    const centerY = 150;
    const radius = 141;

    // Start angle: 222 degrees (rotation offset)
    // Arc sweep: 275 degrees
    const startAngle = 222 * (Math.PI / 180);
    const endAngle = startAngle + 275 * (Math.PI / 180);

    // Calculate current angle based on progress
    const currentAngle = startAngle + progressRatio * (endAngle - startAngle);

    // Calculate dot position
    const x = centerX + radius * Math.cos(currentAngle);
    const y = centerY + radius * Math.sin(currentAngle);

    return { x, y };
  };

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, onComplete]);

  const startTimer = () => {
    if (!isRunning && !isPaused) {
      setIsRunning(true);
      onStart();
    } else if (isPaused) {
      setIsPaused(false);
      onResume();
    }
  };

  const pauseTimer = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
      onPause();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(duration);
    pausedTimeRef.current = 0;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")} hours`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")} minutes`;
  };

  return (
    <div className="circular-timer-container">
      <div className="timer-wrapper" style={{ width: size, height: size }}>
        {/* Custom SVG Circle Path */}

        <svg
          width={size}
          height={size}
          className="timer-svg"
          viewBox="0 0 485 417"
        >
          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r="141"
            fill="none"
            stroke="#DBD3C6"
            strokeWidth="18"
            strokeLinecap="round"
          />
          
          {/* Progress circle */}
          <circle
            cx="150"
            cy="150"
            r="141"
            fill="none"
            stroke="#DBD3C6"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={885.4} // 2 * π * 141
            strokeDashoffset={885.4 - (885.4 * ((duration - timeLeft) / duration))}
            transform="rotate(222 150 150)"
            className="progress-path"
          />

          {/* Moving dot (cap) */}
          <circle
            cx={getDotPosition().x}
            cy={getDotPosition().y}
            r="15"
            fill="#000000"
            className="progress-dot"
          />
        </svg>

        {/* Timer Content */}
        <div className="timer-content">
          <div className="timer-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="timer-display">{formatTime(timeLeft)}</div>
        </div>
      </div>

      {/* Timer Info */}
      <div className="timer-info">
        <div className="timer-duration">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span>{formatDuration(duration)} timer</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="timer-controls">
        {!isRunning || isPaused ? (
          <button className="timer-btn timer-btn-primary" onClick={startTimer}>
            {isPaused ? "Resume" : "Start"}
          </button>
        ) : (
          <button
            className="timer-btn timer-btn-secondary"
            onClick={pauseTimer}
          >
            Pause
          </button>
        )}

        <button className="timer-btn timer-btn-outline" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CircularTimer;
