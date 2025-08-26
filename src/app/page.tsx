'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { CodeInputForm } from '@/components/code-input-form';
import { TestResults } from '@/components/test-results';
import type { FormState } from '@/app/actions';

export default function Home() {
  const [formState, setFormState] = useState<FormState>({ data: null, error: null });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto grid gap-6 lg:grid-cols-2 items-start h-full">
          <div className="h-full">
            <CodeInputForm
              state={formState}
              onAction={setFormState}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="h-full">
            <TestResults output={formState.data} isLoading={isLoading} error={formState.error} />
          </div>
        </div>
      </main>
    </div>
  );
}
