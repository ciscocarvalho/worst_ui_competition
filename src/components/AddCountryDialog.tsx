"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Country } from "@/types";
import React, { useState } from "react";
import ShootingArea from "./ShootingArea";
import { Input } from "./ui/input";

interface AddCountryDialogProps {
  trigger: React.ReactNode;
  add: (country: Country) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddCountryDialog: React.FC<AddCountryDialogProps> = ({ trigger, add, open, setOpen }) => {
  const [country, setCountry] = useState<Country>({ name: "", medals: { gold: 0, silver: 0, bronze: 0 } });
  const [medals, setMedals] = useState<("gold" | "bronze" | "silver")[]>(["gold", "silver", "bronze"]);
  const medalNameToLabel = { gold: "Ouro", bronze: "Bronze", silver: "Prata" };

  const shootHandler = (score: number) => {
    score = Math.floor(score);
    const currentMedal = medals[0];
    country.medals[currentMedal] = score;
    const newMedals = [...medals];
    newMedals.shift();
    setMedals(newMedals);

    if (newMedals.length === 0) {
      add(country);
      setCountry({ name: "", medals: { gold: 0, silver: 0, bronze: 0 } })
      setMedals(["gold", "silver", "bronze"]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry({ ...country, name: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mt-5 items-center">
          <DialogTitle>Atire no alvo</DialogTitle>
          <DialogDescription className="text-center px-[20%]">
            Atire de acordo com a pontuação que você quer dar para o país
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-4 py-4">
          <Input placeholder="Nome do país" value={country.name} onChange={handleNameChange} />
          <p>Medalha: {medalNameToLabel[medals[0]]}</p>
          <ShootingArea onShoot={shootHandler} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCountryDialog;
