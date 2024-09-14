"use client"

import { RebaseDistanceOptions, ScoreRange } from "@/types";
import Image from "next/image";
import React from "react";

interface TargetProps
  extends Omit<
    Partial<React.ComponentProps<typeof Image>>,
    "width" | "height"
  > {
  size?: number;
  scoreRange: ScoreRange;
  onShoot: (score: number) => void;
}

const computePixelDistance = (eventPos: { x: number, y: number }, imageSize: number) => {
    const imageCenterPos = { x: Math.floor(imageSize / 2), y: Math.floor(imageSize / 2) };
    const axisDistances = { x: eventPos.x - imageCenterPos.x, y: eventPos.y - imageCenterPos.y };
    return Math.sqrt(Math.pow(axisDistances.x, 2) + Math.pow(axisDistances.y, 2));
};

const rebaseDistance = ({ distance, canvasSize, otherCanvasSize }: RebaseDistanceOptions) => {
    return (distance / canvasSize) * otherCanvasSize;
};

const computeScore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, canvasSize: number, range: ScoreRange) => {
    const eventPos = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const distance = rebaseDistance({
        distance: computePixelDistance(eventPos, canvasSize),
        canvasSize,
        otherCanvasSize: range.end - range.start,
    });

    return distance + range.start;
};

const Target: React.FC<TargetProps> = ({ size = 300, scoreRange, onShoot, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onShoot(computeScore(e, size, scoreRange));
  };

  return (
    <div onClick={handleClick} className="rounded-[50%] cursor-blue-aim">
      <Image
        width={size}
        height={size}
        alt="Shooting target"
        src={"/assets/target.png"}
        className="rounded-[50%] bg-blue-500"
        {...props}
      />
    </div>
  );
};

export default Target;
