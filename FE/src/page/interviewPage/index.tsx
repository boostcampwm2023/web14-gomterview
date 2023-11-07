import InterviewPageLayout from '@/components/interviewPage/Layout';
import InterViewHeader from '@/components/interviewPage/Header';
import InterViewCamera from '@/components/interviewPage/InterViewCamera';
import InterViewFooter from '@/components/interviewPage/InterViewFooter';
const InterviewPage: React.FC = () => {
  return (
    <InterviewPageLayout>
      <InterViewHeader />
      <InterViewCamera />
      <InterViewFooter />
    </InterviewPageLayout>
  );
};

export default InterviewPage;
