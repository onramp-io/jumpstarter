import type { NextPage } from 'next';
import UserPreferences from '@frontend/components/preferencesComponent';
import { useAuth } from '@frontend/context/AuthProvider';

const Preferences: NextPage = () => {
  const { interests } = useAuth();

  return (
    <>
      <UserPreferences categories={interests} />
    </>
  );
};

export default Preferences;
