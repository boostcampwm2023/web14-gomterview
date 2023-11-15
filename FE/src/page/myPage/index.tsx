import MyPageLayout from '@/components/myPage/MyPageLayout';
import Profile from '@/components/myPage/Profile';
import MyPagesTabs from '@components/myPage/MyPagesTabs';

const MyPage: React.FC = () => {
  return (
    <MyPageLayout>
      <Profile />
      <MyPagesTabs />
    </MyPageLayout>
  );
};

export default MyPage;
