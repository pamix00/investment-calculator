"use client";

import { useState } from "react";
import { InvestmentForm, InvestmentResult } from "./InvestmentForm";
import { InvestmentChart } from "./InvestmentChart";
import { InvestmentSummary } from "./InvestmentSummary";
import { Card } from "@/components/ui/card";
import { Calculator, ExternalLink, TrendingUp } from "lucide-react";
import { ThemeButton } from "./ThemeButton";

export const InvestmentCalculator = () => {
  const [results, setResults] = useState<InvestmentResult[]>([]);

  const currentYear = new Date().getFullYear();

  const handleCalculate = (data: InvestmentResult[]) => {
    setResults(data);
  };

  const finalResult = results.length > 0 ? results[results.length - 1] : null;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 relative selection:bg-primary selection:text-primary-foreground">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <ThemeButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 cursor-default select-none">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-pink-500/30 via-purple-500/30 to-indigo-500/30 mb-2 lg:mb-0">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">
            Kalkulator inwestycyjny
          </h1>
          <p className="text-lg text-muted-foreground mt-2 font-light">
            Sprawdź, jak Twoje oszczędności mogą rosnąć w czasie
          </p>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-700 ease-in-out ${
            finalResult ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden p-2 -m-2">
            {finalResult && <InvestmentSummary result={finalResult} />}
          </div>
        </div>

        <div className="grid lg:grid-cols-6 gap-8 items-stretch">
          {/* Formularz  */}
          <div className="lg:col-span-2 h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="p-6 h-full">
              <InvestmentForm onCalculate={handleCalculate} />
            </Card>
          </div>

          {/* Wykres inwestycji */}
          <div className="lg:col-span-4 h-full animate-in fade-in slide-in-from-bottom-8 duration-700 select-none">
            <Card className="p-6 h-full flex flex-col justify-center">
              {results.length > 0 ? (
                <div className="w-full h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl font-light flex items-center">
                      Wzrost wartości inwestycji
                    </h3>
                  </div>

                  <div className="flex-1 w-full min-h-[300px] flex flex-col cursor-default">
                    <InvestmentChart data={results} />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Wykres pokazuje prognozowany wzrost wartości Twojej
                        inwestycji przez {finalResult?.year} lat.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 m-auto select-none">
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

      <footer className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-both flex justify-center pb-8 select-none">
        <a
          href="https://patrykczech.me"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-background/50 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="text-xs text-muted-foreground/80 font-medium">
            © {currentYear}
          </span>

          <span className="w-px h-3.5 bg-border/80" />

          <span className="text-sm flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
            Stworzone przez
            <span className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 group-hover:decoration-primary group-hover:text-primary transition-all">
              Patryk Czech
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </span>
        </a>
        
      </footer>
    </div>
  );
};
