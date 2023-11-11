import InterviewPageLayout from '@components/interviewPage/InterviewPageLayout';
import InterviewHeader from '@components/interviewPage/interviewHeader';
import InterviewCamera from '@/components/interviewPage/InterviewCamera';
import InterviewFooter from '@components/interviewPage/InterviewFooter';

const InterviewPage: React.FC = () => {
  return (
    <InterviewPageLayout>
      <InterviewHeader />
      <InterviewCamera />
      <InterviewFooter />
    </InterviewPageLayout>
  );
};

export default InterviewPage;
