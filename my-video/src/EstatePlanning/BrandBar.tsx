import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./theme";

export const BrandBar: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideX = interpolate(frame, [0, 20], [-40, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: COLORS.gold,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.bg,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Estate Planning · Texas
      </span>
    </div>
  );
};
