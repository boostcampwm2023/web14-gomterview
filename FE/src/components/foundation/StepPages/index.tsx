import enhanceChildElement from '@/utils/enhanceChildElement';
import Step from './Step';

type StepPageProps<T> = {
  page: T;
  children?: React.ReactNode;
};

const StepPage = <T,>({ page, children }: StepPageProps<T>) => {
  return (
    <div>
      {enhanceChildElement({
        children,
        component: Step<T>,
        newProps: {
          page,
        },
      })}
    </div>
  );
};

StepPage.step = Step;

export default StepPage;
