import { MyPageLayout, Profile, MyPageTabs } from '@components/myPage';
import useInterviewSettings from '@hooks/atoms/useInterviewSettings';
import { useEffect } from 'react';

const MyPage: React.FC = () => {
  const { resetAllSettings } = useInterviewSettings();

  useEffect(() => {
    resetAllSettings();
    return () => {
      resetAllSettings();
    };
  }, []);

  return (
    <MyPageLayout>
      <Profile />
      <MyPageTabs />
    </MyPageLayout>
  );
};

export default MyPage;
