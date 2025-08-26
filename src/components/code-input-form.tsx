'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleGenerateTests, FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  data: null,
  error: null,
};

interface CodeInputFormProps {
  onGenerationComplete: (state: FormState) => void;
  setIsLoading: (isLoading: boolean) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Generate Tests
    </Button>
  );
}

export function CodeInputForm({ onGenerationComplete, setIsLoading }: CodeInputFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(handleGenerateTests, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(pending);
  }, [pending, setIsLoading]);
  
  useEffect(() => {
    if (!pending && state) {
      onGenerationComplete(state);
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: state.error,
        });
      }
    }
  }, [state, pending, onGenerationComplete, toast]);

  return (
    <form action={formAction}>
      <Card className="h-full w-full shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Test Generation Pipeline</CardTitle>
          <CardDescription>
            Enter your C code and the target function name to generate unit tests, mocks, and stubs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cCode">C Code</Label>
            <Textarea
              id="cCode"
              name="cCode"
              placeholder="Paste your C code here..."
              className="font-code min-h-[300px] lg:min-h-[400px] bg-white dark:bg-black/20"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="functionName">Function Name</Label>
            <Input
              id="functionName"
              name="functionName"
              placeholder="e.g., process_data"
              className="font-code bg-white dark:bg-black/20"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
            <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
