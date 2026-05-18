import { redirect } from 'next/navigation';

import { candidateRoutes } from '@/features/candidates/constants/routes';

const HomePage = () => {
  redirect(candidateRoutes.dashboard);
};

export default HomePage;
