import { css } from '@emotion/react';
import Box from '@foundation/Box/Box';
import Avatar from '@foundation/Avatar/Avatar';
import Typography from '../foundation/Typography/Typography';
import { QUERY_KEY } from '@constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { Navigate } from 'react-router-dom';
import { PATH } from '@constants/path';

const Profile: React.FC = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<User>(QUERY_KEY.MEMBER);

  if (!userInfo) return <Navigate to={PATH.ROOT} />;

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
      <Avatar src={userInfo.profileImg} />
      <Typography variant="title3">{userInfo.nickname}</Typography>
      <Typography variant="body3">{userInfo.email}</Typography>
    </Box>
  );
};
export default Profile;
