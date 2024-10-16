export interface IsErrorProps {
  isError: boolean | string;
}

const IsError = (props: IsErrorProps) => {
  const { isError } = props;
  return (
    <>
      {isError && (
        <div className="w-full">
          <p className="text-sm font-bold bg-red-100 text-red-800 text-center px-3 py-2 mb-6 rounded-lg">
            Something went wrong, Please try again!
          </p>
        </div>
      )}
    </>
  );
};

export default IsError;
