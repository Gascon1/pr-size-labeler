import { getInput } from '@actions/core';

export enum Size {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export const prSizes = {
  [Size.XS]: {
    diff: parseInt(getInput('xs_diff'), 10),
    label: getInput('xs_label'),
  },
  [Size.S]: {
    diff: parseInt(getInput('s_diff'), 10),
    label: getInput('s_label'),
  },
  [Size.M]: {
    diff: parseInt(getInput('m_diff'), 10),
    label: getInput('m_label'),
  },
  [Size.L]: {
    diff: parseInt(getInput('l_diff'), 10),
    label: getInput('l_label'),
  },
  [Size.XL]: {
    diff: parseInt(getInput('xl_diff'), 10),
    label: getInput('xl_label'),
  },
};
