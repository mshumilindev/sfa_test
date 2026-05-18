import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ComponentProps } from 'react';
import { useState } from 'react';

import { CountryCombobox } from './CountryCombobox';

const CountryComboboxStory = (args: ComponentProps<typeof CountryCombobox>) => {
  const [value, setValue] = useState(args.value);

  return (
    <div style={{ maxWidth: '24rem' }}>
      <label htmlFor={args.id} style={{ display: 'grid', gap: '0.5rem' }}>
        Country of residence
        <CountryCombobox {...args} onChange={setValue} value={value} />
      </label>
    </div>
  );
};

const meta = {
  title: 'Candidates/CountryCombobox',
  component: CountryCombobox,
  args: {
    id: 'country-story',
    invalid: false,
    onBlur: () => undefined,
    onChange: () => undefined,
    value: 'Poland',
  },
} satisfies Meta<typeof CountryCombobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Searchable: Story = {
  render: (args) => <CountryComboboxStory {...args} />,
};
