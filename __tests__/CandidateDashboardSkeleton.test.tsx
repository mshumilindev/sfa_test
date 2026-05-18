import { render, screen } from '@testing-library/react';

import { CandidateDashboardSkeleton } from '@/features/candidates/components/CandidateDashboardSkeleton';

describe('CandidateDashboardSkeleton', () => {
  it('renders a layout-stable skeleton surface', () => {
    render(<CandidateDashboardSkeleton />);

    expect(screen.getByTestId('candidate-dashboard-skeleton')).toBeInTheDocument();
  });
});
