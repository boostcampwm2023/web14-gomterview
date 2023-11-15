import MyPageLayout from '@/components/myPage/MyPageLayout';
import MyPagesTabs from '@components/myPage/MyPagesTabs';
import MyPageHeader from '@components/myPage/MyPageHeader';

const MyPage: React.FC = () => {
  return (
    <MyPageLayout>
      <MyPageHeader />
      {/*<Profile />*/}
      <MyPagesTabs />
    </MyPageLayout>
  );
};

export default MyPage;
