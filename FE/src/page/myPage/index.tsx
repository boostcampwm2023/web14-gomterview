import MyPageLayout from '@/components/myPage/MyPageLayout';
import MyPageHeader from '@/components/myPage/MyPageHeader';
import Profile from '@/components/myPage/Profile';
import Logo from '@common/Logo/Logo';
import MyPagesTabs from '@components/myPage/MyPagesTabs';

const MyPage: React.FC = () => {
  return (
    <MyPageLayout>
      <Logo />
      <MyPageHeader />
      <Profile />
      <MyPagesTabs />
    </MyPageLayout>
  );
};

export default MyPage;
