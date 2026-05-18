import type { Meta, StoryObj } from '@storybook/nextjs';

import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Candidates/StatusBadge',
  component: StatusBadge,
  args: {
    status: 'eligible',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'eligible', 'ineligible', 'withdrawn'],
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Eligible: Story = {};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <StatusBadge status="pending" />
      <StatusBadge status="eligible" />
      <StatusBadge status="ineligible" />
      <StatusBadge status="withdrawn" />
    </div>
  ),
};
