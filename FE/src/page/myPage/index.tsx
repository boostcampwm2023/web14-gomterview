import { MyPageLayout, Profile, MyPageTabs } from '@components/myPage';

const MyPage: React.FC = () => {
  return (
    <MyPageLayout>
      <Profile />
      <MyPageTabs />
    </MyPageLayout>
  );
};

export default MyPage;
