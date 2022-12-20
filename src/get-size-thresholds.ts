import { getInput } from '@actions/core';

export enum Size {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export const SIZE_ORDER = [Size.XS, Size.S, Size.M, Size.L, Size.XL];

export type SizeThreshold = {
  size: Size;
  diff: number;
  label: string;
};

export const getSizeThresholds = (): SizeThreshold[] => {
  return SIZE_ORDER.map((size) => ({
    size,
    diff: parseInt(getInput(`${size}_diff`), 10),
    label: getInput(`${size}_label`),
  }));
};
