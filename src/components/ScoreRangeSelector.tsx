"use client"

import { ScoreRange } from "@/types";
import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "./ui/button";

interface ScoreRangeSelectorProps {
  scoreRange: ScoreRange;
  setScoreRange: (scoreRange: ScoreRange) => void;
  limit: ScoreRange["end"];
  gap?: number,
}

const ScoreRangeSelector: React.FC<ScoreRangeSelectorProps> = ({ scoreRange, setScoreRange, limit, gap = 500 }) => {
  if (gap > limit) {
    throw new Error("gap cannot be greater than limit");
  }

  const decrease = () => {
    const newScoreRange = { ...scoreRange };

    newScoreRange.end = newScoreRange.start;
    newScoreRange.start = Math.max(newScoreRange.start - gap, 0);

    if (newScoreRange.end - newScoreRange.start === 0) {
        return;
    }

    setScoreRange(newScoreRange);
  };

  const increase = () => {
    const newScoreRange = { ...scoreRange };

    newScoreRange.start = newScoreRange.end;
    newScoreRange.end = Math.min(newScoreRange.end + gap, limit);

    if (newScoreRange.end - newScoreRange.start === 0) {
        return;
    }

    setScoreRange(newScoreRange);
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Button onClick={decrease} variant="outline" disabled={scoreRange.start === 0}>
        <SlArrowLeft size={20} />
      </Button>

      <p className="select-none">{scoreRange.start} - {scoreRange.end}</p>

      <Button onClick={increase} variant="outline" disabled={scoreRange.end === limit}>
        <SlArrowRight size={20} />
      </Button>
    </div>
  );
};

export default ScoreRangeSelector;
