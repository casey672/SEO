import React from "react";
import { Composition } from "remotion";
import {
  EstatePlanningPost,
  estatePostSchema,
} from "./EstatePlanning/EstatePlanningPost";
import { DURATION, FPS, HEIGHT, WIDTH } from "./EstatePlanning/theme";
import { ESTATE_PROMPTS } from "./EstatePlanning/prompts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {ESTATE_PROMPTS.map((prompt) => (
        <Composition
          key={prompt.id}
          id={prompt.id}
          component={EstatePlanningPost}
          durationInFrames={DURATION}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          schema={estatePostSchema}
          defaultProps={{
            question: prompt.question,
            bullets: prompt.bullets,
            cta: prompt.cta,
          }}
        />
      ))}
    </>
  );
};
