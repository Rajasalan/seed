import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import axios from "axios";

const StoreContext = React.createContext(null);

export const SamplesStoreProvider = ({ children }) => {
  const store = useLocalObservable(createSamplesStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useSamplesStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};

export const createSamplesStore = () => {
  return {
    samples: [],

    addSample(item) {
      axios.post('http://localhost:8000/samples', item)
        .then(response => {
          this.samples.push(response.data);
         console.log('test3',response.data)
        })
        .catch((error) => {
          console.log("An error occurred while trying to send a new JSON to the server:" + error);
      });
    },

    setSamples(samples) {
      this.samples.replace(samples);
      console.log('che',samples)
    }
  };
}