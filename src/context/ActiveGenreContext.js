import React from "react";
// Create Context for active genre state and Function
const CreateActiveGenreStateContext = React.createContext(undefined);
const CreateActiveGenreDispatchContext = React.createContext(undefined);

function ActiveGenreContextProvider({ children }) {
  const [activeGenre, setActiveGenre] = React.useState({
    name: "All Movies",
    _id: "1213",
  });
  // this function will be use set new value of active genre
  const handleGenreChange = (newData) => {
    setActiveGenre(newData);
  };

  return (
    <CreateActiveGenreStateContext.Provider value={{ activeGenre }}>
      <CreateActiveGenreDispatchContext.Provider value={{ handleGenreChange }}>
        {children}
      </CreateActiveGenreDispatchContext.Provider>
    </CreateActiveGenreStateContext.Provider>
  );
}

const useActiveGenreStateContext = () => {
  const context = React.useContext(CreateActiveGenreStateContext);
  if (context === undefined) {
    throw Error("Create Active Genre State Context Is Not Working");
  }
  return context;
};

const useActiveGenreDispatchContext = () => {
  const context = React.useContext(CreateActiveGenreDispatchContext);
  if (context === undefined) {
    throw Error("Create Active Genre Dispatch Context Is Not Working");
  }
  return context;
};

const useGenreDataContext = () => {
  return [useActiveGenreStateContext(), useActiveGenreDispatchContext()];
};
export { ActiveGenreContextProvider, useGenreDataContext };
