'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { handleGenerateTests, FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeInputFormProps {
  state: FormState;
  onAction: (state: FormState) => void;
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

export function CodeInputForm({ state, onAction, setIsLoading }: CodeInputFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formState, formAction, isPending] = useActionState(handleGenerateTests, state);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);
  
  useEffect(() => {
    if (formState) {
      onAction(formState);
      if (formState.error) {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: formState.error,
        });
      }
    }
  }, [formState, onAction, toast]);

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
