const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col'>
      <p className='text-red-600 my-2'>{children}</p>
    </div>
  );
};

export default ErrorMessage;
