export interface IsCanceledProps {
  isCanceled: boolean | string;
}

const IsCanceled = (props: IsCanceledProps) => {
  const { isCanceled } = props;
  return (
    <>
      {isCanceled && (
        <div className="w-full">
          <p className="text-sm font-bold bg-red-100 text-yellow-800 text-center px-3 py-2 mb-6 rounded-lg">
            Something went wrong, Please try again!
          </p>
        </div>
      )}
    </>
  );
};

export default IsCanceled;
