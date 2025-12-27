'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [initialAmountStr, setInitialAmountStr] = useState<string>(initialAmount.toString());
  const [initialAmountError, setInitialAmountError] = useState<string>('');

  const [contributionAmount, setContributionAmount] = useState<number>(500);
  const [contributionAmountStr, setContributionAmountStr] = useState<string>(contributionAmount.toString());
  const [contributionAmountError, setContributionAmountError] = useState<string>(''); 

  const [contributionFrequency, setContributionFrequency] = useState<'monthly' | 'yearly'>('monthly');

  const [annualRate, setAnnualRate] = useState<number>(7);
  const [annualRateStr, setAnnualRateStr] = useState<string>(annualRate.toString());
  const [annualRateError, setAnnualRateError] = useState<string>('');

  const [committedAnnualRate, setCommittedAnnualRate] = useState<number>(7);
  const [years, setYears] = useState<number>(20);
  const [yearsStr, setYearsStr] = useState<string>(years.toString());
  const [yearsError, setYearsError] = useState<string>('');

  const [committedYears, setCommittedYears] = useState<number>(20);
  const [hasCalculated, setHasCalculated] = useState(false);


  const calculateResults = useCallback(() => {
    const calcYears = committedYears;
    const calcRate = committedAnnualRate;
    const results: InvestmentResult[] = [];
    let currentBalance = initialAmount;
    let totalInvested = initialAmount;
    const startDate = new Date();
    startDate.setDate(1);
    const isMonthly = contributionFrequency === 'monthly';
    const periodsPerYear = isMonthly ? 12 : 1;
    const totalPeriods = calcYears * periodsPerYear;
    const ratePerPeriod = (calcRate / 100) / periodsPerYear;
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
        dateForPeriod.setMonth(startDate.getMonth() + period);
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
  }, [initialAmount, contributionAmount, contributionFrequency, committedAnnualRate, committedYears]);

  useEffect(() => {
    if (hasCalculated) {
      calculateResults();
    }
  }, [calculateResults, hasCalculated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommittedYears(years);
    setCommittedAnnualRate(annualRate);
    setHasCalculated(true);
  };

  const handleNumberChange = (
    setter: (n: number) => void,
    setterStr: (s: string) => void,
    value: string,
    min?: number,
    max?: number,
    setError?: (msg: string | '') => void
  ) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    setterStr(cleaned);

    const num = parseFloat(cleaned);
    if (!isNaN(num)) {
      let final = num;
      if (min !== undefined) final = Math.max(final, min);
      if (max !== undefined) final = Math.min(final, max);
      setter(final);

      if (setError) {
        if (max !== undefined && num > max) {
          setError(`Wartość nie może być większa niż ${max}.`);
        } else if (min !== undefined && num < min) {
          setError(`Wartość nie może być mniejsza niż ${min}.`);
        } else {
          setError('');
        }
      }
    }
  };

  const handleBlur = (
    setterStr: (s: string) => void,
    value: number,
    setError?: (msg: string | '') => void
  ) => {
    setterStr(value.toString());
    if (setError) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 min-[2000px]:space-y-6 select-none">
      <div>
        <h2 className="text-2xl font-light text-foreground mb-1">Parametry inwestycji</h2>
      </div>

      <div className="space-y-3">
        <Label>Kwota początkowa (PLN)</Label>
        <Input
          type="number"
          value={initialAmountStr}
          onChange={(e) => handleNumberChange(setInitialAmount, setInitialAmountStr, e.target.value, 0, 10000000, setInitialAmountError)}
          onBlur={() => handleBlur(setInitialAmountStr, initialAmount, setInitialAmountError)}
          min={0}
          max={10000000}
        />
        {initialAmountError && <p className="text-destructive text-sm mt-1">{initialAmountError}</p>}
      </div>

      <div className="space-y-3">
        <Label>Wysokość dopłaty (PLN)</Label>
        <Input
          type="number"
          value={contributionAmountStr}
          onChange={(e) => handleNumberChange(setContributionAmount, setContributionAmountStr, e.target.value, 0, 1000000, setContributionAmountError)}
          onBlur={() => handleBlur(setContributionAmountStr, contributionAmount, setContributionAmountError)}
          placeholder="500"
          min={0}
          max={1000000}
        />
        {contributionAmountError && <p className="text-destructive text-sm mt-1">{contributionAmountError}</p>}
      </div>

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

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label>Oprocentowanie roczne (%)</Label>
          <span className="text-sm text-primary font-mono font-semibold cursor-default select-none">{annualRate}%</span>
        </div>
        <Input
          type="number"
          step="0.1"
          value={annualRateStr}
          onChange={(e) => handleNumberChange(setAnnualRate, setAnnualRateStr, e.target.value, 0, 20, setAnnualRateError)}
          onBlur={() => handleBlur(setAnnualRateStr, annualRate, setAnnualRateError)}
          min={0}
          max={20}
        />
        <Slider.Root
          value={[annualRate]}
          min={0}
          max={20}
          step={1}
          onValueChange={(v) => {
            setAnnualRate(v[0]);
            setAnnualRateStr(v[0].toString());
          }}
          onValueCommit={(v) => setCommittedAnnualRate(v[0])}
          className="relative flex w-full h-5 items-center touch-none select-none cursor-pointer"
        >
          <Slider.Track className="bg-secondary relative flex-1 h-2 rounded-full overflow-hidden">
            <Slider.Range className="absolute h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-5 rounded-full bg-background shadow-md transition-all duration-200 border-2 border-primary hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Slider.Root>
        {annualRateError && <p className="text-destructive text-sm mt-1">{annualRateError}</p>}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label>Czas trwania (lata)</Label>
          <span className="text-sm text-primary font-mono font-semibold cursor-default select-none">{years} lat</span>
        </div>
        <Input
          type="number"
          value={yearsStr}
          onChange={(e) => handleNumberChange(setYears, setYearsStr, e.target.value, 1, 50, setYearsError)}
          onBlur={() => handleBlur(setYearsStr, years, setYearsError)}
          min={1}
          max={50}
        />
        <Slider.Root
          value={[years]}
          min={1}
          max={50}
          step={1}
          onValueChange={(v) => {
            setYears(v[0]);
            setYearsStr(v[0].toString());
          }}
          onValueCommit={(v) => setCommittedYears(v[0])}
          className="relative flex w-full h-5 items-center touch-none select-none cursor-pointer"
        >
          <Slider.Track className="bg-secondary relative flex-1 h-2 rounded-full overflow-hidden">
            <Slider.Range className="absolute h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-5 rounded-full bg-background shadow-md transition-all duration-200 border-2 border-primary hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Slider.Root>
        {yearsError && <p className="text-destructive text-sm mt-1">{yearsError}</p>}
      </div>

      <Button type="submit" variant={'gradient'} className="w-full" size="lg">
        Oblicz
      </Button>
    </form>
  );
};
