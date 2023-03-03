import * as yup from "yup";

export const RegisterValidation = yup.object().shape({
  firstName: yup.string().required(),
  email: yup.string().email().required(),
});
