import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';

function camelCaseToLabel(name: string) {
  return name.replace(/^[a-z]|[A-Z]/g, function (v, i) {
    return i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase();
  });
}

type FormikTextFieldProps = TextFieldProps & {
  name: string;
  trimOnBlur?: boolean;
};

export const FormikTextField = ({ name, trimOnBlur, ...props }: FormikTextFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const onBlur = trimOnBlur ? () => helpers.setValue(field.value.trim()) : undefined;

  return (
    <TextField
      id={field.name}
      name={field.name}
      label={camelCaseToLabel(name)}
      value={field.value}
      onChange={field.onChange}
      onBlur={onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      type="text"
      variant="outlined"
      size="small"
      {...props}
    />
  );
};
