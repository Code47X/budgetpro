import { TextFieldProps } from '@mui/material';
import * as S from './TextField.styles';

function TextField(props: TextFieldProps) {
  return <S.TextField {...props} />;
}

export default TextField;
