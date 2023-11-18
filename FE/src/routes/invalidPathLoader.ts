import { redirect } from 'react-router-dom';
import { PATH } from '@constants/path';

const invalidPathLoader = () => redirect(PATH.ROOT);

export default invalidPathLoader;
