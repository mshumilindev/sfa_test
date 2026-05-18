import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CountryCombobox } from '@/features/candidates/components/CountryCombobox';
import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';

describe('CountryCombobox', () => {
  it('filters countries and selects an option', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onBlur = jest.fn();

    renderWithIntl(
      <CountryCombobox id="country" value="" invalid={false} onBlur={onBlur} onChange={onChange} />,
    );

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'Ger');
    await user.pointer({
      keys: '[MouseLeft]',
      target: screen.getByRole('option', { name: 'Germany' }),
    });

    expect(onChange).toHaveBeenCalledWith('Germany');
  });

  it('shows an empty state for unmatched queries', async () => {
    const user = userEvent.setup();

    renderWithIntl(
      <CountryCombobox
        id="country"
        value=""
        invalid={false}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'zzzz');

    expect(screen.getByText(candidatesMessages.combobox.emptyResults)).toBeInTheDocument();
  });

  it('closes the listbox when focus leaves the combobox via Tab', async () => {
    const user = userEvent.setup();

    renderWithIntl(
      <div>
        <CountryCombobox
          id="country"
          value=""
          invalid={false}
          onBlur={jest.fn()}
          onChange={jest.fn()}
        />
        <button type="button">Next field</button>
      </div>,
    );

    const input = screen.getByRole('combobox');
    await user.click(input);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.tab();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on outside click and supports keyboard navigation', async () => {
    const user = userEvent.setup();

    renderWithIntl(
      <CountryCombobox
        id="country"
        value="Poland"
        invalid={false}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.keyboard('{ArrowDown}{ArrowUp}{Enter}{Escape}');
    await user.click(document.body);

    expect(input).toBeInTheDocument();
  });
});
