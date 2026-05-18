import type { Meta, StoryObj } from '@storybook/nextjs';

import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';

import { RegistrationSummary } from './RegistrationSummary';

const sampleValues: RegistrationFormValues = {
  firstName: 'Elena',
  lastName: 'Meyer',
  email: 'elena.meyer@example.com',
  phone: '+49151444555',
  country: 'Germany',
  highestDegree: 'master',
  universityName: 'Technical University of Munich',
  graduationYear: 2022,
  yearsOfProfessionalExperience: 6,
  currentEmployer: 'Alpine Analytics',
  program: 'level_2',
  preferredExamWindow: '2026-11',
  acceptsTerms: true,
};

const meta = {
  title: 'Candidates/RegistrationSummary',
  component: RegistrationSummary,
  args: {
    examWindowLabel: 'November 2026',
    values: sampleValues,
  },
} satisfies Meta<typeof RegistrationSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Complete: Story = {};
