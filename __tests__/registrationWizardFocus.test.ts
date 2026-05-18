import {
  focusFieldById,
  focusFirstInvalidField,
} from '@/features/candidates/utils/registrationWizardFocus';

describe('registrationWizardFocus', () => {
  it('focuses a field by id and falls back to the summary region', () => {
    document.body.innerHTML = '<input id="email" /><div id="summary" tabindex="-1"></div>';
    const summary = document.getElementById('summary');
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

    focusFieldById('email');
    focusFirstInvalidField(['firstName'], {}, summary);
    focusFirstInvalidField(
      ['email'],
      { email: { type: 'required', message: 'Required' } },
      summary,
    );

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});
