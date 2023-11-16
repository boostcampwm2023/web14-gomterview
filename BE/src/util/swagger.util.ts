import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ApiHeaderOptions, ApiResponseOptions } from '@nestjs/swagger';

export const createPropertyOption = (
  example: unknown,
  description: string,
  type: unknown,
): ApiPropertyOptions => {
  return {
    example,
    description,
    type,
  } as ApiPropertyOptions;
};

export const createApiResponseOption = (
  status: number,
  description: string,
  type: unknown,
) => {
  return {
    status,
    description,
    type,
  } as ApiResponseOptions;
};

export const createApiResponseOptionWithHeaders = (
  status: number,
  description: string,
  headers: unknown,
) => {
  return {
    status,
    description,
    headers,
  } as ApiResponseOptions;
};

export const createApiHeaderOption = (
  name: string,
  description: string,
  required: boolean,
) => {
  return {
    name,
    description,
    required,
  } as ApiHeaderOptions;
};
