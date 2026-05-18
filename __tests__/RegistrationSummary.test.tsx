import { screen } from '@testing-library/react';

import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { RegistrationSummary } from '@/features/candidates/registration/components/RegistrationSummary';
import { buildRegistrationFormValues } from '@/features/candidates/test-utils/builders';

describe('RegistrationSummary', () => {
  it('renders optional fields when they are provided', () => {
    const values = buildRegistrationFormValues();

    renderWithIntl(<RegistrationSummary examWindowLabel="November 2026" values={values} />);

    expect(screen.getByText('Elena Meyer')).toBeInTheDocument();
    expect(screen.getByText(values.phone)).toBeInTheDocument();
    expect(screen.getByText(values.currentEmployer ?? '')).toBeInTheDocument();
    expect(screen.getByText('November 2026')).toBeInTheDocument();
  });

  it('omits optional phone and employer rows when empty', () => {
    renderWithIntl(
      <RegistrationSummary
        examWindowLabel={candidatesMessages.registration.examWindowNotSelected}
        values={buildRegistrationFormValues({ phone: '', currentEmployer: '' })}
      />,
    );

    expect(
      screen.queryByText(candidatesMessages.registration.summary.phone),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(candidatesMessages.registration.summary.employer),
    ).not.toBeInTheDocument();
  });
});
