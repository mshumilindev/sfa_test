import {
  educationExperienceSchema,
  personalInformationSchema,
  registrationSchema,
} from '@/features/candidates/schemas/registrationSchema';
import { buildRegistrationFormValues } from '@/features/candidates/test-utils/builders';
import { getGraduationYearBounds } from '@/shared/lib/date';

describe('personalInformationSchema', () => {
  it('accepts valid personal information', () => {
    const values = buildRegistrationFormValues();
    const result = personalInformationSchema.safeParse({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      country: values.country,
    });

    expect(result.success).toBe(true);
  });
});

describe('educationExperienceSchema', () => {
  it('requires university name when a degree is selected', () => {
    const result = educationExperienceSchema.safeParse({
      highestDegree: 'bachelor',
      universityName: '',
      graduationYear: getGraduationYearBounds().maxYear,
      yearsOfProfessionalExperience: 2,
      currentEmployer: '',
    });

    expect(result.success).toBe(false);
  });

  it('rejects graduation years outside the allowed range', () => {
    const result = educationExperienceSchema.safeParse({
      highestDegree: 'master',
      universityName: 'ETH Zurich',
      graduationYear: 1900,
      yearsOfProfessionalExperience: 3,
    });

    expect(result.success).toBe(false);
  });

  it('accepts valid education and experience values', () => {
    const result = educationExperienceSchema.safeParse({
      highestDegree: 'phd',
      universityName: 'MIT',
      graduationYear: getGraduationYearBounds().maxYear - 5,
      yearsOfProfessionalExperience: 8,
      currentEmployer: 'Example Corp',
    });

    expect(result.success).toBe(true);
  });
});

describe('registrationSchema', () => {
  it('accepts a complete registration payload', () => {
    const result = registrationSchema.safeParse(buildRegistrationFormValues());

    expect(result.success).toBe(true);
  });
});
