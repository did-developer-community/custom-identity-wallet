import { LOCAL_STORAGE_VC, LOCAL_STORAGE_VC_REQUEST_KEY } from "../../configs/constants";
import { Manifest } from "../../types";

export interface StoredVC {
  id: string;
  format?: string;
  type: string[];
  vc: string;
  manifest: Manifest;
  credentialSubject: Record<string, string>;
  vcHistory?: VCHistory[];
}

export interface VCHistory {
  timestamp: number;
  message: string;
}

export interface VCList {
  [key: string]: StoredVC;
}

export const getVCs = (): VCList => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_VC));
};

export const getVC = (key: string): StoredVC => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_VC))[key];
};

export const getVCsByType = (VCID: string): { [key: string]: StoredVC } => {
  const VCs = getVCs();
  // Typeに一致するVCを取得
  let result = {};
  Object.keys(VCs).map((key) => {
    if (VCs[key].type.includes(VCID)) {
      result = { ...result, [key]: VCs[key] };
    }
  });
  return result;
};

export const saveVC = (key: string, vc: StoredVC): void => {
  localStorage.setItem(
    LOCAL_STORAGE_VC,
    JSON.stringify({
      ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_VC)),
      [key]: vc,
    })
  );
};

export const cleanVCRequest = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_VC_REQUEST_KEY);
};

export const deleteVC = (key: string): void => {
  const VCs = getVCs();
  delete VCs[key];
  localStorage.setItem(LOCAL_STORAGE_VC, JSON.stringify(VCs));
  if (VCs === {}) {
    localStorage.setItem(LOCAL_STORAGE_VC, undefined);
  }
};

export const addVCHistory = (key: string, message: string): void => {
  let vc = getVC(key);
  vc = { ...vc, vcHistory: [...vc.vcHistory, { timestamp: Date.now(), message }] };
  saveVC(key, vc);
};
