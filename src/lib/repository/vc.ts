import { LOCAL_STORAGE_VC, LOCAL_STORAGE_VC_REQUEST_KEY } from "../../configs/constants";
import { Manifest } from "../../types";

export interface VC {
  format?: string;
  type: string[];
  vc: string;
  manifest: Manifest;
}

export interface VCList {
  [key: string]: VC;
}

export const getVCs = (): VCList => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_VC));
};

export const getVC = (key: string): VC => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_VC))[key];
};

export const getVCsByType = (VCID: string): { [key: string]: VC } => {
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

export const saveVC = (key: string, vc: VC): void => {
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
  const vc = localStorage.getItem(LOCAL_STORAGE_VC);
  delete vc[key];
  localStorage.setItem(LOCAL_STORAGE_VC, JSON.stringify(vc));
};
