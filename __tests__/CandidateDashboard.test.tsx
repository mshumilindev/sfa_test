import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CandidateDashboard } from '@/features/candidates/components/CandidateDashboard';
import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { buildCandidate } from '@/features/candidates/test-utils/builders';
import { createCandidateUiStoreState } from '@/features/candidates/test-utils/mocks';
const mockUseCandidates = jest.fn();
const uiStoreState = createCandidateUiStoreState();
const sampleCandidate = buildCandidate({ id: 'cand-1001' });

jest.mock('@/features/candidates/constants/pagination', () => ({
  candidatePageSize: 1,
}));

jest.mock('@/features/candidates/hooks/useCandidates', () => ({
  useCandidates: (...args: unknown[]) => mockUseCandidates(...args),
}));

jest.mock('@/store/candidateUiStore', () => ({
  useCandidateUiStore: (selector: (state: typeof uiStoreState) => unknown) =>
    selector(uiStoreState),
}));

describe('CandidateDashboard', () => {
  beforeEach(() => {
    mockUseCandidates.mockReset();
  });

  it('updates dashboard filters through the UI store actions', async () => {
    const user = userEvent.setup();
    uiStoreState.setName.mockClear();
    uiStoreState.setProgram.mockClear();
    uiStoreState.setStatus.mockClear();
    uiStoreState.setSort.mockClear();

    mockUseCandidates.mockReturnValue({
      candidates: [sampleCandidate],
      total: 1,
      isLoading: false,
      isError: false,
      hasListData: true,
      isRetrying: false,
      retryLoad: jest.fn(),
    });

    renderWithIntl(<CandidateDashboard />);

    await user.type(screen.getByLabelText(/^name$/i), 'Ava');
    await user.selectOptions(screen.getByLabelText(/^program$/i), 'level_2');
    await user.selectOptions(screen.getByLabelText(/^status$/i), 'eligible');
    await user.selectOptions(screen.getByLabelText(/sort by/i), 'nameAsc');

    expect(uiStoreState.setName).toHaveBeenCalled();
    expect(uiStoreState.setProgram).toHaveBeenCalled();
    expect(uiStoreState.setStatus).toHaveBeenCalled();
    expect(uiStoreState.setSort).toHaveBeenCalled();
  });

  it('renders dashboard filters, skeleton, and register link while loading', () => {
    mockUseCandidates.mockReturnValue({
      candidates: [],
      total: 0,
      isLoading: true,
      isError: false,
      hasListData: false,
      isRetrying: false,
      retryLoad: jest.fn(),
    });

    renderWithIntl(<CandidateDashboard />);

    expect(screen.getByTestId('candidate-dashboard-skeleton')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: candidatesMessages.dashboard.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: candidatesMessages.dashboard.registerLink }),
    ).toHaveAttribute('href', '/candidates/register');
  });

  it('renders results and pagination when data is available', async () => {
    const user = userEvent.setup();
    uiStoreState.setPage.mockClear();
    uiStoreState.filters.page = 1;

    mockUseCandidates.mockReturnValue({
      candidates: [sampleCandidate, buildCandidate({ id: 'cand-1002', firstName: 'Ben' })],
      total: 2,
      isLoading: false,
      isError: false,
      hasListData: true,
      isRetrying: false,
      retryLoad: jest.fn(),
    });

    renderWithIntl(<CandidateDashboard />);

    expect(screen.getAllByText('Ava Kowalski').length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(uiStoreState.setPage).toHaveBeenCalledWith(2);
  });

  it('shows an accessible error state when candidate loading fails', () => {
    const retryLoad = jest.fn();

    mockUseCandidates.mockReturnValue({
      candidates: [],
      total: 0,
      isLoading: false,
      isError: true,
      hasListData: false,
      isRetrying: false,
      retryLoad,
    });

    renderWithIntl(<CandidateDashboard />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(candidatesMessages.dashboard.loadError);
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.queryByTestId('candidate-dashboard-skeleton')).not.toBeInTheDocument();
  });

  it('shows an empty state when filters exclude all candidates', () => {
    mockUseCandidates.mockReturnValue({
      candidates: [],
      total: 0,
      isLoading: false,
      isError: false,
      hasListData: true,
      isRetrying: false,
      retryLoad: jest.fn(),
    });

    renderWithIntl(<CandidateDashboard />);

    expect(screen.getByText(candidatesMessages.dashboard.emptyState)).toBeInTheDocument();
  });
});
