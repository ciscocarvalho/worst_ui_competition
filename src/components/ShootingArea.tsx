"use client"

import ScoreRangeSelector from "@/components/ScoreRangeSelector";
import React, { useState } from "react";
import Target from "./Target";

const SCORE_RANGE_LIMIT = 5000;

interface ShootingAreaProps {
  onShoot: (score: number) => void;
}

const ShootingArea: React.FC<ShootingAreaProps> = ({ onShoot }) => {
  const [scoreRange, setScoreRange] = useState({ start: 0, end: 500 });

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center">
        <p>Intervalo:</p>
        <ScoreRangeSelector scoreRange={scoreRange} setScoreRange={setScoreRange} limit={SCORE_RANGE_LIMIT} />
      </div>

      <Target scoreRange={scoreRange} onShoot={onShoot} />
    </div>
  );
};

export default ShootingArea;
