"use client";

import NextError from "next/error";

interface ErrorProps {
  error: Error;
}

export default function Error(params: ErrorProps) {
  return (
    <>
      <NextError statusCode={500} title={params.error.message} />
    </>
  );
}
