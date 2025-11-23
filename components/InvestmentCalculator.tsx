'use client';

import { InvestmentForm } from './InvestmentForm';
import { Card } from '@/components/ui/card';
import { Calculator } from "lucide-react";

export const InvestmentCalculator = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">
            Kalkulator inwestycyjny
          </h1>
          <p className="text-lg text-muted-foreground mt-2 font-light">
            Sprawdź, jak Twoje oszczędności mogą rosnąć w czasie
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <Card className="lg:col-span-2 p-6">
            <InvestmentForm />
          </Card>

          <Card className="lg:col-span-3 p-6 flex items-center justify-center">
            <span className="text-muted-foreground text-lg">
              Wykres inwestycji pojawi się tutaj po wypełnieniu formularza.
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
