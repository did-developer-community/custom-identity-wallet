import ION from "@decentralized-identity/ion-tools";
import passworder from "browser-passworder";

import { LOCAL_STORAGE_KEY_PAIR } from "../../configs/constants";
import { KeyPair } from "../signer";

export const getKeyPair = async (password: string): Promise<KeyPair> => {
  //TODO: エラーハンドリングを書く
  const keyPair = await passworder.decrypt(password, localStorage.getItem(LOCAL_STORAGE_KEY_PAIR));
  return keyPair;
};

export const isExistKeyPair = (): boolean => {
  const keyPair = localStorage.getItem(LOCAL_STORAGE_KEY_PAIR);
  return keyPair !== null;
};

// 新規キーペアを作成する
export const initKeyPair = async (password: string): Promise<void> => {
  const keyPair: KeyPair = await ION.generateKeyPair();
  const keyPairBlob = await passworder.encrypt(password, keyPair);
  saveKeyPairBlob(keyPairBlob);
};

export const saveKeyPairBlob = (keyPairBlob: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY_PAIR, keyPairBlob);
};

export const deleteKeyPair = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY_PAIR);
};
