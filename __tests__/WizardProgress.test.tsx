import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { WizardProgress } from '@/features/candidates/registration/components/WizardProgress';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';

describe('WizardProgress', () => {
  it('renders steps and allows selecting a previous or current step', async () => {
    const user = userEvent.setup();
    const onStepSelect = jest.fn();

    renderWithIntl(
      <WizardProgress currentStep={1} isPending={false} onStepSelect={onStepSelect} />,
    );

    expect(
      screen.getByRole('navigation', { name: candidatesMessages.registration.stepsLabel }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /personal information/i }));
    expect(onStepSelect).toHaveBeenCalledWith(0);
  });

  it('disables future steps until the wizard reaches them', () => {
    renderWithIntl(<WizardProgress currentStep={0} isPending={false} onStepSelect={jest.fn()} />);

    expect(screen.getByRole('button', { name: /education & experience/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /program selection & review/i })).toBeDisabled();
  });

  it('disables step buttons while pending', () => {
    renderWithIntl(<WizardProgress currentStep={1} isPending onStepSelect={jest.fn()} />);

    expect(screen.getByRole('button', { name: /personal information/i })).toBeDisabled();
  });
});
