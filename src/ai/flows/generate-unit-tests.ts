'use server';

/**
 * @fileOverview AI-powered unit test generator for C code.
 *
 * - generateUnitTests - A function that handles the generation of unit tests for C code.
 * - GenerateUnitTestsInput - The input type for the generateUnitTests function.
 * - GenerateUnitTestsOutput - The return type for the generateUnitTests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateUnitTestsInputSchema = z.object({
  cCode: z
    .string()
    .describe('The C code to generate unit tests for.'),
  functionName: z.string().describe('The function to generate the unit tests for.')
});
export type GenerateUnitTestsInput = z.infer<typeof GenerateUnitTestsInputSchema>;

const GenerateUnitTestsOutputSchema = z.object({
  unitTests: z.string().describe('The generated unit tests for the C code.'),
  mocks: z.string().describe('The generated mocks for the C code.'),
  stubs: z.string().describe('The generated stubs for the C code.'),
});
export type GenerateUnitTestsOutput = z.infer<typeof GenerateUnitTestsOutputSchema>;

export async function generateUnitTests(input: GenerateUnitTestsInput): Promise<GenerateUnitTestsOutput> {
  return generateUnitTestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUnitTestsPrompt',
  input: {schema: GenerateUnitTestsInputSchema},
  output: {schema: GenerateUnitTestsOutputSchema},
  prompt: `You are an expert software engineer specializing in generating unit tests for C code. Given the following C code and function name, generate unit tests, mocks, and stubs using the PyTest framework.

C Code:
{{{cCode}}}

Function Name:
{{{functionName}}}

Ensure that the generated code is complete and correct.
`,
});

const generateUnitTestsFlow = ai.defineFlow(
  {
    name: 'generateUnitTestsFlow',
    inputSchema: GenerateUnitTestsInputSchema,
    outputSchema: GenerateUnitTestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
