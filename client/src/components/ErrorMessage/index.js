import React from "react";
import { FormHelperText } from "@material-ui/core";

export function FormErrorMessage({ errors, touched, field }) {
  return errors[field] && touched[field] ? (
    <FormHelperText id="component-error-text">{errors[field]}</FormHelperText>
  ) : null;
}
