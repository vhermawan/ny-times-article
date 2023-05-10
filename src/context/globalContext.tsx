import React, { useMemo, useState } from 'react';

interface IGlobalContextProps {
  user: UserData;
  setDataUser: (user: UserData) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: {
    totalCoin: 0,
    totalTicket: 0,
    limitFree: 0,
    books: {
      list: [],
    },
  },
  setDataUser: () => {},
});

export const GlobalContextProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
}) => {
  const [currentUser, setCurrentUser] = useState<UserData>({
    totalCoin: 0,
    totalTicket: 0,
    limitFree: 0,
    books: {
      list: [],
    },
  });

  const contextValue = useMemo(
    () => ({
      user: currentUser,
      setDataUser: setCurrentUser,
    }),
    [currentUser],
  );

  return <GlobalContext.Provider value={contextValue}>{props.children}</GlobalContext.Provider>;
};
