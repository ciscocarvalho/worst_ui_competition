export type ScoreRange = Readonly<{ start: number, end: number }>;

export type RebaseDistanceOptions = {
  distance: number;
  canvasSize: number;
  otherCanvasSize: number;
};

export type Country = {
  name: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
};
