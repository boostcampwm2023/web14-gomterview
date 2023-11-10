import MyPageLayout from '@/components/myPage/MyPageLayout';
import MyPageHeader from '@/components/myPage/MyPageHeader';
import Profile from '@/components/myPage/Profile';

const MyPage: React.FC = () => {
  return (
    <MyPageLayout>
      <MyPageHeader />
      <Profile />
    </MyPageLayout>
  );
};

export default MyPage;
