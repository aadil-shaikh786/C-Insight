import type { GenerateUnitTestsOutput } from '@/ai/flows/generate-unit-tests';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, TestTube2, BrainCircuit } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface TestResultsProps {
  output: GenerateUnitTestsOutput | null;
  isLoading: boolean;
  error: string | null;
}

export function TestResults({ output, isLoading, error }: TestResultsProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (error) {
    return (
      <Card className="h-full w-full shadow-lg">
        <CardHeader>
          <CardTitle>Generation Failed</CardTitle>
          <CardDescription>An error occurred while generating tests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!output) {
    return (
      <Card className="h-full w-full flex flex-col items-center justify-center border-dashed shadow-none bg-transparent">
        <CardContent className="text-center">
            <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                    <BrainCircuit className="h-10 w-10 text-primary" />
                </div>
            </div>
          <p className="text-lg font-medium text-foreground font-headline">Generated tests will appear here</p>
          <p className="text-muted-foreground mt-1">
            Fill out the form to let our AI generate your first test case.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Generated Test Suite</CardTitle>
        <CardDescription>Review the AI-generated tests, mocks, and stubs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">Unit Tests</TabsTrigger>
            <TabsTrigger value="mocks">Mocks</TabsTrigger>
            <TabsTrigger value="stubs">Stubs</TabsTrigger>
          </TabsList>
          <TabsContent value="tests" className="mt-4">
            <CodeBlock code={output.unitTests} />
          </TabsContent>
          <TabsContent value="mocks" className="mt-4">
            <CodeBlock code={output.mocks} />
          </TabsContent>
          <TabsContent value="stubs" className="mt-4">
            <CodeBlock code={output.stubs} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <Card className="h-full w-full shadow-lg">
      <CardHeader>
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-1">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/3" />
        </div>
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  );
}
