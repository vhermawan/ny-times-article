import { FC } from 'react';

export type ContainerProps = {
  children: React.ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="px-6">{children}</div>;
};

export default Container;
