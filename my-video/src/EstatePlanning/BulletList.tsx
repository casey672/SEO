import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "./theme";

interface Props {
  bullets: string[];
  startFrame: number;
}

const BULLET_STAGGER = 18; // frames between each bullet

export const BulletList: React.FC<Props> = ({ bullets, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top: 430,
        left: 60,
        right: 60,
      }}
    >
      {bullets.map((text, i) => {
        const bulletStart = startFrame + i * BULLET_STAGGER;
        const progress = spring({
          frame: frame - bulletStart,
          fps,
          config: { damping: 90, stiffness: 140 },
        });

        const translateX = interpolate(progress, [0, 1], [-30, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: 24,
              opacity,
              transform: `translateX(${translateX}px)`,
            }}
          >
            {/* Gold dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS.gold,
                flexShrink: 0,
                marginTop: 14,
                marginRight: 20,
              }}
            />
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 38,
                color: COLORS.white,
                lineHeight: 1.4,
              }}
            >
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
