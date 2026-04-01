import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { BrandBar } from "./BrandBar";
import { BulletList } from "./BulletList";
import { CTABanner } from "./CTABanner";
import { QuestionCard } from "./QuestionCard";
import { COLORS } from "./theme";

export const estatePostSchema = z.object({
  question: z.string(),
  bullets: z.array(z.string()),
  cta: z.string(),
});

type Props = z.infer<typeof estatePostSchema>;

// Timeline (at 30fps):
//   0–20   : background + brand bar fade in
//  20–90   : question slides up
//  90–162  : bullets stagger in (4 bullets × 18 frames)
// 162–230  : CTA banner rises
// 230–270  : hold
// 270–300  : fade to black

export const EstatePlanningPost: React.FC<Props> = ({
  question,
  bullets,
  cta,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const globalOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: globalOpacity }}>
      {/* Subtle grid overlay for texture */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <QuestionCard question={question} />
      <BulletList bullets={bullets} startFrame={90} />
      <CTABanner cta={cta} startFrame={210} />
      <BrandBar />
    </AbsoluteFill>
  );
};
