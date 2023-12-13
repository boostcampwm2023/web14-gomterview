import { Button, Typography } from '@foundation/index';
import { useState } from 'react';
import { css } from '@emotion/react';
import { toast } from '@foundation/Toast/toast';

const LandingPage: React.FC = () => {
  const [count, setCount] = useState(0);
  const [toastId, setToastId] = useState('');
  const position = [
    'topLeft',
    'topRight',
    'topCenter',
    'bottomLeft',
    'bottomRight',
    'bottomCenter',
  ] as const;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 2rem;
        width: 100vw;
        height: 100svh;
      `}
    >
      <Typography variant="title3">토스트 위치</Typography>
      <div
        css={css`
          display: flex;
          gap: 1rem;
        `}
      >
        {position.map((p) => (
          <Button
            key={p}
            onClick={() => {
              const id = toast.success(`toast count ${count}`, {
                autoClose: 3000,
                position: p,
                closeOnClick: false,
                toggle: true,
              });
              setToastId(id);
              setCount((prev) => prev + 1);
            }}
          >
            {p}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => {
          toast.update(toastId, `toast count ${count}`);
          setCount((prev) => prev + 1);
        }}
      >
        토스트 업데이트
      </Button>
    </div>
  );
};

export default LandingPage;
