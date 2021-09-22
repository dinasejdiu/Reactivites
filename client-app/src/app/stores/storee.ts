import {createContext, useContext } from "react";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import FestivaliStore from "./festivaliStore";
import CommonStore from "./commonStore";

interface Store{
 festivaliStore: FestivaliStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store : Store = {
    festivaliStore: new FestivaliStore(),
    commonStore: new  CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
