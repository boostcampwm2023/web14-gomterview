import Box from '@/components/foundation/Box/Box';
import Icon from '@/components/foundation/Icon/Icon';
import Typography from '@/components/foundation/Typography/Typography';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';

type RecordRadioProps = {
  group: string;
  IconId: string;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
};

const RecordRadio: React.FC<RecordRadioProps> = ({
  group,
  IconId,
  children,
  onChange,
  defaultChecked,
}) => {
  return (
    <>
      <input
        id={`record-${IconId}`}
        onChange={onChange}
        type="radio"
        name={group}
        defaultChecked={defaultChecked}
        css={css`
          display: none;
          &:checked + label > div {
            border-left: 16px solid ${theme.colors.point.primary.default};
          }
        `}
      />
      <label htmlFor={`record-${IconId}`}>
        <Box
          css={css`
            display: flex;
            align-items: center;
            padding: 0.8rem 3rem;
            gap: 3rem;
          `}
        >
          <Icon id={IconId} width="3rem" height="3rem" />
          <Typography variant="title3" component="p">
            {children}
          </Typography>
        </Box>
      </label>
    </>
  );
};

export default RecordRadio;
