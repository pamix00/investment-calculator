'use client';

import { useState } from 'react';
import { InvestmentForm, InvestmentResult } from './InvestmentForm';
import { InvestmentChart } from './InvestmentChart';
import { InvestmentSummary } from './InvestmentSummary';
import { Card } from '@/components/ui/card';
import { Calculator, TrendingUp } from "lucide-react";

export const InvestmentCalculator = () => {
  const [results, setResults] = useState<InvestmentResult[]>([]);

  const handleCalculate = (data: InvestmentResult[]) => {
    setResults(data);
  };

  const finalResult = results.length > 0 ? results[results.length - 1] : null;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-pink-500/30 via-purple-500/30 to-indigo-500/30 mb-2">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">
            Kalkulator inwestycyjny
          </h1>
          <p className="text-lg text-muted-foreground mt-2 font-light">
            Sprawdź, jak Twoje oszczędności mogą rosnąć w czasie
          </p>
        </div>

        {finalResult && <InvestmentSummary result={finalResult} />}

        <div className="grid lg:grid-cols-6 gap-8 items-stretch">

          {/* Formularz  */}
          <Card className="lg:col-span-2 p-6 h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <InvestmentForm onCalculate={handleCalculate} />
          </Card>

          {/* Wykres inwestycji */}
          <Card className="lg:col-span-4 p-6 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            {results.length > 0 ? (
              <div className="w-full h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    Wzrost wartości inwestycji
                  </h3>
                </div>
                
                <div className="flex-1 w-full min-h-[300px] flex flex-col">
                  <InvestmentChart data={results} />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Wykres pokazuje prognozowany wzrost wartości Twojej inwestycji przez {finalResult?.year} lat.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 m-auto">
                <div className="bg-gradient-to-b from-pink-500/20 via-purple-500/20 to-indigo-500/20 p-4 rounded-full inline-block mb-4">
                  <TrendingUp className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Brak danych do wyświetlenia
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Użyj formularza po lewej stronie, aby zobaczyć wyniki.
                </p>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};