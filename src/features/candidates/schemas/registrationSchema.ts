import { z } from 'zod';

import { countries } from '@/features/candidates/constants/countries';
import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { highestDegreeSchema, programSchema } from '@/features/candidates/types/candidate';
import { getGraduationYearBounds } from '@/shared/lib/date';

const { validation, fields } = candidatesMessages;

const nameField = (label: string) =>
  z.string().trim().min(2, validation.nameMin(label)).max(50, validation.nameMax(label));

const normalizePhone = (value: string): string => value.replace(/[\s\-()]/g, '');

const isInternationalPhone = (value: string): boolean =>
  /^\+[1-9]\d{7,14}$/.test(normalizePhone(value));

const educationBaseSchema = z.object({
  highestDegree: highestDegreeSchema,
  universityName: z.string().trim(),
  graduationYear: z.coerce.number().int(validation.graduationYearInvalid),
  yearsOfProfessionalExperience: z.coerce
    .number()
    .int(validation.experienceWholeYears)
    .min(0, validation.experienceNegative)
    .max(50, validation.experienceMax),
  currentEmployer: z.string().trim().optional(),
});

type EducationValues = z.infer<typeof educationBaseSchema>;

const validateEducation = (value: EducationValues, context: z.RefinementCtx): void => {
  const { minYear, maxYear } = getGraduationYearBounds();

  if (value.graduationYear < minYear || value.graduationYear > maxYear) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: validation.graduationYearRange(minYear, maxYear),
      path: ['graduationYear'],
    });
  }

  if (!value.universityName.trim()) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: validation.universityRequired,
      path: ['universityName'],
    });
  }
};

export const personalInformationSchema = z.object({
  firstName: nameField(fields.firstName),
  lastName: nameField(fields.lastName),
  email: z.string().trim().email(validation.invalidEmail),
  phone: z
    .string()
    .trim()
    .refine((value) => value === '' || isInternationalPhone(value), validation.invalidPhone),
  country: z
    .string()
    .trim()
    .min(1, validation.countryRequired)
    .refine((value) => (countries as readonly string[]).includes(value), validation.countryInvalid),
});

export const educationExperienceSchema = educationBaseSchema.superRefine(validateEducation);

export const programSelectionSchema = z.object({
  program: programSchema,
  preferredExamWindow: z.string().trim().min(1, validation.examWindowRequired),
  acceptsTerms: z.boolean().refine((value) => value, validation.termsRequired),
});

export const registrationSchema = personalInformationSchema
  .merge(educationBaseSchema)
  .merge(programSelectionSchema)
  .superRefine(validateEducation);

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export type { RegistrationFieldName } from '@/features/candidates/types/registration';

export const defaultRegistrationValues: RegistrationFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  highestDegree: 'bachelor',
  universityName: '',
  graduationYear: getGraduationYearBounds().maxYear,
  yearsOfProfessionalExperience: 0,
  currentEmployer: '',
  program: 'level_1',
  preferredExamWindow: '',
  acceptsTerms: false,
};
