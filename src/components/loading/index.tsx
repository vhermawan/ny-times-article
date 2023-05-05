import { FC } from 'react';

type LoadingProps = {
  isLoading: boolean;
};

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin  border-t-transparent"></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
};

export default Loading;
