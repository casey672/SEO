import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "./theme";

interface Props {
  question: string;
}

export const QuestionCard: React.FC<Props> = ({ question }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide up from below + fade in starting at frame 20
  const progress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 80, stiffness: 120, mass: 1 },
  });

  const translateY = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 160,
        left: 60,
        right: 60,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Gold accent line */}
      <div
        style={{
          width: 60,
          height: 4,
          backgroundColor: COLORS.gold,
          marginBottom: 28,
          borderRadius: 2,
        }}
      />
      <h1
        style={{
          fontFamily: FONT.heading,
          fontSize: 72,
          fontWeight: "bold",
          color: COLORS.white,
          margin: 0,
          lineHeight: 1.2,
          whiteSpace: "pre-line",
        }}
      >
        {question}
      </h1>
    </div>
  );
};
