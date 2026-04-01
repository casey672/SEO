import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "./theme";

interface Props {
  cta: string;
  startFrame: number;
}

export const CTABanner: React.FC<Props> = ({ cta, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  const translateY = interpolate(progress, [0, 1], [30, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
        backgroundColor: COLORS.bgCard,
        borderLeft: `6px solid ${COLORS.gold}`,
        padding: "28px 60px",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: 34,
          color: COLORS.goldLight,
          margin: 0,
          fontStyle: "italic",
          fontWeight: 500,
        }}
      >
        {cta}
      </p>
    </div>
  );
};
