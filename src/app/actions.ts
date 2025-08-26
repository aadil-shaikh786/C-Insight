'use server';

import { generateUnitTests, GenerateUnitTestsInput, GenerateUnitTestsOutput } from '@/ai/flows/generate-unit-tests';
import { z } from 'zod';

const formSchema = z.object({
  cCode: z.string().min(10, { message: 'C code must be at least 10 characters.' }),
  functionName: z.string().min(1, { message: 'Function name is required.' }),
});

export type FormState = {
  data: GenerateUnitTestsOutput | null;
  error: string | null;
}

export async function handleGenerateTests(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    cCode: formData.get('cCode'),
    functionName: formData.get('functionName'),
  };

  const validatedFields = formSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errorMessage = fieldErrors.cCode?.[0] 
      || fieldErrors.functionName?.[0]
      || 'Invalid input.';
    return {
      data: null,
      error: errorMessage,
    };
  }

  try {
    const result = await generateUnitTests(validatedFields.data as GenerateUnitTestsInput);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { data: null, error: `Failed to generate tests: ${errorMessage}` };
  }
}
