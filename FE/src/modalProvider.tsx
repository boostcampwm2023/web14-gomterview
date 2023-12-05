import { modalState } from '@atoms/modal';
import { useRecoilState } from 'recoil';

const ModalProvider = () => {
  const [state] = useRecoilState(modalState);
  return (
    <>
      {state.map(({ id, element }) => {
        return <Component key={id} component={element} />;
      })}
    </>
  );
};

const Component = ({ component, ...rest }: { component: React.FC }) => {
  return component({ ...rest });
};

export default ModalProvider;
