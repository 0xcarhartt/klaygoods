import { createContext, useContext, useEffect, useState } from "react";
// import Caver from "caver-js"; // or const Caver = require('caver-js')

/*

HOW THIS WORKS:
0. We want all child components to access the web3 object and saved address
1. We first create the context and initialize it to an empty state
2. Then we fetch the injected provider from UP extension, instantiate the Web3 object, and set it to context
3. We can now use the useKlaytn hook to access the Web3 object anywhere in our app
4. Furthermore, once we save the user's address from the Landing page, we can use that anywhere as well

*/

type KlaytnContextType = {
  //   caver: any;
  provider: any;
  address: string;
  setAddress: (address: string) => void;
  balance: string;
};

const initContext: KlaytnContextType = {
  //   caver: null,
  provider: null,
  address: "",
  setAddress: () => {},
  balance: "",
};

const KlaytnContext = createContext<KlaytnContextType>(initContext);

// hook that allows any component to access the Klaytn context
export const useKlaytn = () => useContext(KlaytnContext);

export const KlaytnProvider = ({ children }: any) => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  let provider: any = null;
  // let caver: any = null;

  // givenProvider is window.ethereum under the hood
  // @ts-expect-errorts-ignore
  if (typeof window !== "undefined" && typeof window.klaytn !== "undefined") {
    provider = window["klaytn"];
    // caver = new Caver(provider);
  }

  // hook to handle address changes
  useEffect(() => {
    const fetchedAddress = window.localStorage.getItem("KLAYTN_ADDRESS");
    if (!address && fetchedAddress) setAddress(fetchedAddress);
    if (address && address !== fetchedAddress)
      window.localStorage.setItem("KLAYTN_ADDRESS", address);
  }, [address]);

  //   // hook to handle balance changes
  //   useEffect(() => {
  //     async function fetchBalance() {
  //       if (!provider || !address) return;
  //       const fetchedBalance = await web3.eth.getBalance(address);
  //       const formattedBalance = web3.utils.fromWei(fetchedBalance, "ether");
  //       setBalance(formattedBalance);
  //     }
  //     fetchBalance();
  //   }, [address, web3]);

  return (
    <KlaytnContext.Provider value={{ provider, address, setAddress, balance }}>
      {children}
    </KlaytnContext.Provider>
  );
};
