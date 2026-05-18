import type { Meta, StoryObj } from '@storybook/nextjs';

import type { EligibilityHint as EligibilityHintModel } from '@/features/candidates/registration/model/eligibilityHint';

import { EligibilityHint } from './EligibilityHint';

const sampleHint: EligibilityHintModel = {
  title: 'Likely eligible for Level I',
  message: 'The candidate meets the education or experience threshold for Level I registration.',
  tone: 'eligible',
};

const meta = {
  title: 'Candidates/EligibilityHint',
  component: EligibilityHint,
  args: {
    hint: sampleHint,
  },
} satisfies Meta<typeof EligibilityHint>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Eligible: Story = {};

export const VerificationRequired: Story = {
  args: {
    hint: {
      title: 'Additional verification required',
      message: 'Prior exam history must be verified before confirming this program level.',
      tone: 'verificationRequired',
    },
  },
};

export const NotEligible: Story = {
  args: {
    hint: {
      title: 'Eligibility gap',
      message: 'The candidate needs a qualifying degree or at least four years of experience.',
      tone: 'notEligible',
    },
  },
};
