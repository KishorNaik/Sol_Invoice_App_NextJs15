import React from "react";
import { ZodIssue } from "zod";

interface ErrorMessageProps {
  errors: ZodIssue[];
  fieldName: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { errors, fieldName } = props;

  const error = errors.find((error) => error.path[0] === fieldName);

  if (!error) {
    return null;
  }

  return <p className="text-red-500 text-sm">{error.message}</p>;
};

export default ErrorMessage;
