import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

type CalendarProgressProps = {
  percent: number;
};

export const CalendarProgress: React.FC<CalendarProgressProps> = React.memo(({
  percent,
}) => {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 7;

  const percentSpring = useSpring(percent, {
    stiffness: 120,
    damping: 50,
  });

  React.useEffect(() => {
    percentSpring.set(percent);
  }, [percent, percentSpring]);

  const dashOffset = useTransform(
    percentSpring,
    (p) => circumference * (1 - p / 100),
  );

  const hue = useTransform(percentSpring, (h) => h);
  const strokeColor = useTransform(hue, (h) => `hsl(${h}, 92%, 68%)`);
  const bgColor = useTransform(hue, (h) => `hsl(${h}, 92%, 68%, 0.1)`);

  return (
    <svg width={32} height={32} viewBox="0 0 32 32">
      <motion.circle
        cx="16"
        cy="16"
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />

      <motion.circle
        cx="16"
        cy="16"
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeLinecap="round"
        style={{
          strokeDashoffset: dashOffset,
          rotate: -90,
          scaleX: -1,
          transformOrigin: '50% 50%',
        }}
        className="rounded-full"
      />
    </svg>
  );
});
