import MyPageLayout from '@/components/myPage/MyPageLayout';
import Profile from '@/components/myPage/Profile';
import MyPagesTabs from '@components/myPage/MyPagesTabs';
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
      <MyPagesTabs />
    </MyPageLayout>
  );
};

export default MyPage;
