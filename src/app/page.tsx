"use client"

import AddCountryDialog from "@/components/AddCountryDialog";
import { Button } from "@/components/ui/button";
import { Country } from "@/types";
import React, { useState } from "react";
import { SlClose } from "react-icons/sl";

const Home: React.FC = () => {
  const trigger = <Button variant="outline">Adicionar país</Button>
  const [countries, setCountries] = useState<Country[]>([]);
  const [open, setOpen] = useState(false);

  const addCountry = (country: Country) => {
    setCountries([...countries.filter((v) => v.name !== country.name), country]);
    setOpen(false);
  };

  const removeCountry = (country: Country) => {
    setCountries([...countries.filter((v) => v.name !== country.name)]);
  };

  return (
    <div className="h-[100vh] flex gap-5 flex-col justify-center items-center bg-gray-200">
      <AddCountryDialog trigger={trigger} add={addCountry} open={open} setOpen={setOpen} />
      <div className="flex flex-col gap-2">
        {
          countries.map((country) => {
            return (
              <div className="flex justify-center items-center gap-5">
                <div>
                  Nome: {country.name} | Ouro: {country.medals.gold} | Prata:{" "}
                  {country.medals.silver} | Bronze: {country.medals.bronze}
                </div>
                <Button
                  onClick={() => removeCountry(country)}
                  variant="outline"
                  className="bg-transparent border-none shadow-none"
                >
                  <SlClose size={15} />
                </Button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Home;

