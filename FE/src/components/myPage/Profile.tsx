import { css } from '@emotion/react';
import Box from '@foundation/Box/Box';
import Avatar from '@foundation/Avatar/Avatar';
import Typography from '../foundation/Typography/Typography';

const Profile: React.FC = () => {
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 0.75rem;
        padding: 1.5rem;
      `}
    >
      <Avatar src={'https://avatars.githubusercontent.com/u/66554167?v=4'} />
      <Typography variant="title3">milk717</Typography>
      <Typography variant="body3">robolindasoo@gmail.com</Typography>
    </Box>
  );
};
export default Profile;
