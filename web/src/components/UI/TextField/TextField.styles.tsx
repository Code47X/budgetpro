import { styled, TextField as MuiTextField, TextFieldProps } from '@mui/material';

export const TextField = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
  // '& .MuiOutlinedInput-root': {
  //   '& fieldset': {
  //     borderColor: theme.palette.primary.main,
  //   },
  //   '&:hover fieldset': {
  //     borderColor: theme.palette.primary.dark,
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: theme.palette.primary.main,
  //   },
  // },
}));
