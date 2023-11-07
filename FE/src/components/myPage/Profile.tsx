import { css } from '@emotion/react';
import Box from '@foundation/Box/Box';
import Avatar from '@foundation/Avatar/Avatar';
import Typography from '../foundation/Typography/Typography';
const Profile: React.FC = () => {
  return (
    <Box>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          border: 1px solid red;
        `}
      >
        <Avatar />
        <Typography>milk717</Typography>
        <Typography>robolindasoo@gmail.com</Typography>
      </div>
    </Box>
  );
};
export default Profile;
