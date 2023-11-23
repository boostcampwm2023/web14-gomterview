import MyPageLayout from '@/components/myPage/MyPageLayout';
import Profile from '@/components/myPage/Profile';
import MyPagesTabs from '@components/myPage/MyPagesTabs';
import { useEffect } from 'react';
import useInterviewSettings from '@hooks/atoms/useInterviewSettings';

const MyPage: React.FC = () => {
  const { resetAllSettings } = useInterviewSettings();

  useEffect(() => {
    return () => {
      resetAllSettings();
    };
  });

  return (
    <MyPageLayout>
      <Profile />
      <MyPagesTabs />
    </MyPageLayout>
  );
};

export default MyPage;
