'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import * as Slider from "@radix-ui/react-slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface InvestmentResult {
  period: number;
  year: number;
  totalInvested: number;
  interestEarned: number;
  interestForPeriod: number;
  totalBalance: number;
  label: string;
}

interface InvestmentFormProps {
  onCalculate?: (results: InvestmentResult[]) => void;
}

export const InvestmentForm = ({ onCalculate }: InvestmentFormProps) => {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [contributionAmount, setContributionAmount] = useState(500);
  const [contributionFrequency, setContributionFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(20);

  const calculateResults = () => {
    const results: InvestmentResult[] = [];
    let currentBalance = initialAmount;
    let totalInvested = initialAmount;

    const startDate = new Date();
    startDate.setDate(1);

    const isMonthly = contributionFrequency === 'monthly';
    const periodsPerYear = isMonthly ? 12 : 1;
    const totalPeriods = years * periodsPerYear;
    const ratePerPeriod = (annualRate / 100) / periodsPerYear;

    let startLabel = 'Rok inwestowania: 0';
    if (isMonthly) {
        const monthNameRaw = startDate.toLocaleString('pl-PL', { month: 'long' });
        const monthName = monthNameRaw.charAt(0).toUpperCase() + monthNameRaw.slice(1);
        startLabel = `Rok inwestowania: 0, ${monthName}`;
    }

    results.push({
      period: 0,
      year: 0,
      totalInvested: initialAmount,
      interestEarned: 0,
      interestForPeriod: 0,
      totalBalance: initialAmount,
      label: startLabel
    });

    for (let period = 1; period <= totalPeriods; period++) {

      currentBalance += contributionAmount;
      totalInvested += contributionAmount;

      const interestForPeriod = currentBalance * ratePerPeriod;
      currentBalance += interestForPeriod;

      const year = Math.ceil(period / periodsPerYear);
      let label = `Rok inwestowania: ${year}`;

      if (isMonthly) {
        const dateForPeriod = new Date(startDate);
        dateForPeriod.setMonth(startDate.getMonth() + (period));
        
        const monthNameRaw = dateForPeriod.toLocaleString('pl-PL', { month: 'long' });
        const monthName = monthNameRaw.charAt(0).toUpperCase() + monthNameRaw.slice(1);
        
        const displayYear = Math.floor(period / 12);
        label = `Rok inwestowania: ${displayYear}, ${monthName}`;
      }

      results.push({
        period,
        year,
        totalInvested: parseFloat(totalInvested.toFixed(2)),
        interestEarned: parseFloat((currentBalance - totalInvested).toFixed(2)),
        interestForPeriod: parseFloat(interestForPeriod.toFixed(2)),
        totalBalance: parseFloat(currentBalance.toFixed(2)),
        label: label
      });
    }

    if (onCalculate) {
      onCalculate(results);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateResults();
  }; 

  return (
    <form onSubmit={handleSubmit} className="space-y-3 min-[2000px]:space-y-6 select-none">
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
          min={0}
        />
      </div>

      {/* Dopłata */}
      <div className="space-y-3">
        <Label>Wysokość dopłaty (PLN)</Label>
        <Input
          type="number"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(Number(e.target.value))}
          placeholder="500"
          min={0}
        />
      </div>

      {/* Częstotliwość dopłaty */}
      <div className="space-y-3">
        <Label>Częstotliwość dopłaty</Label>
        <Select 
          value={contributionFrequency} 
          onValueChange={(value) => setContributionFrequency(value as 'monthly' | 'yearly')}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz częstotliwość dopłaty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Miesięcznie</SelectItem>
            <SelectItem value="yearly">Rocznie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Oprocentowanie roczne */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label>Oprocentowanie roczne (%)</Label>
          <span className="text-sm text-primary font-mono font-semibold cursor-default select-none">{annualRate}%</span>
        </div>
        <Input
          type="number"
          step="0.1"
          value={annualRate}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setAnnualRate(Math.min(Math.max(val, 0), 20));
          }}
          className="mb-2"
        />
        <Slider.Root
          value={[annualRate]}
          min={0}
          max={20}
          step={0.1}
          onValueChange={(v) => setAnnualRate(v[0])}
          className="relative flex w-full h-5 items-center touch-none select-none cursor-pointer"
        >
          <Slider.Track className="bg-secondary relative flex-1 h-2 rounded-full overflow-hidden">
            <Slider.Range className="absolute h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-5 rounded-full bg-background shadow-md transition-all duration-200 border-2 border-primary hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Slider.Root>
      </div>

      {/* Lata inwestycji */}
      <div className="space-y-3">
         <div className="flex justify-between">
          <Label>Czas trwania (lata)</Label>
          <span className="text-sm text-primary font-mono font-semibold cursor-default select-none">{years} lat</span>
        </div>
        <Input
          type="number"
          value={years}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setYears(Math.min(Math.max(val, 1), 50));
          }}
           className="mb-2"
        />
        <Slider.Root
          value={[years]}
          min={1}
          max={50}
          step={1}
          onValueChange={(v) => setYears(v[0])}
          className="relative flex w-full h-5 items-center touch-none select-none cursor-pointer"
        >
          <Slider.Track className="bg-secondary relative flex-1 h-2 rounded-full overflow-hidden">
            <Slider.Range className="absolute h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-5 rounded-full bg-background shadow-md transition-all duration-200 border-2 border-primary hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Slider.Root>
      </div>

      <Button type="submit" variant={'gradient'} className="w-full" size="lg">
        Oblicz
      </Button>
    </form>
  );
};