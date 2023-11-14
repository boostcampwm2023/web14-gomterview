import MyPageLayout from '@/components/myPage/MyPageLayout';
import MyPageHeader from '@/components/myPage/MyPageHeader';
import Profile from '@/components/myPage/Profile';
import MyPagesTabs from '@components/myPage/MyPagesTabs';

const MyPage: React.FC = () => {
  return (
    <MyPageLayout>
      <MyPageHeader />
      <Profile />
      <MyPagesTabs />
    </MyPageLayout>
  );
};

export default MyPage;
