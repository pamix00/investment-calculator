'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import * as Slider from "@radix-ui/react-slider";

export const InvestmentForm = () => {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }; 

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      <div>
        <h2 className="text-2xl font-light text-foreground mb-1">Parametry inwestycji</h2>
      </div>

      {/* Kwota początkowa */}
      <div className="space-y-3">
        <Label>Kwota początkowa (PLN)</Label>
        <Input
          type="number"
          value={initialAmount}
          onChange={(e) => setInitialAmount(Number(e.target.value))}
          placeholder="10000"
        />
      </div>

      {/* Miesięczna dopłata */}
      <div className="space-y-3">
        <Label>Miesięczna dopłata (PLN)</Label>
        <Input
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          placeholder="500"
        />
      </div>

      {/* Oprocentowanie roczne */}
      <div className="space-y-3">
        <Label>Oprocentowanie roczne (%)</Label>
        <Input
          type="number"
          step="0.1"
          value={annualRate}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setAnnualRate(Math.min(Math.max(val, 0), 20));
          }}
        />
        <Slider.Root
          value={[annualRate]}
          min={0}
          max={20}
          step={0.1}
          onValueChange={(v) => setAnnualRate(v[0])}
          className="relative flex w-full h-5 items-center"
        >
          <Slider.Track className="bg-muted relative flex-1 h-2 rounded-full">
            <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-5 rounded-full bg-white shadow transition-all duration-200 border-2 border-primary hover:scale-110 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        </Slider.Root>
      </div>

      {/* Lata inwestycji */}
      <div className="space-y-3">
        <Label>Jak długo będziesz inwestować?</Label>
        <Input
          type="number"
          value={years}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setYears(Math.min(Math.max(val, 1), 50));
          }}
        />
        <Slider.Root
          value={[years]}
          min={1}
          max={50}
          step={1}
          onValueChange={(v) => setYears(v[0])}
          className="relative flex w-full h-5 items-center"
        >
          <Slider.Track className="bg-muted relative flex-1 h-2 rounded-full">
            <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-5 rounded-full bg-white shadow transition-all duration-200 border-2 border-primary hover:scale-110 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        </Slider.Root>
      </div>

      <Button type="submit" variant="gradient" className="w-full">
        Oblicz
      </Button>
    </form>
  );
};
