import { octokit } from './octokit';
import * as github from '@actions/github';
import { getInput, info } from '@actions/core';
import { prSizes, Size } from './pr-sizes';

export const getCurrentPrSize = async () => {
  const { data } = await octokit.rest.pulls.listFiles({
    ...github.context.repo,
    pull_number: github.context.issue.number,
  });

  const excludedFiles = getInput('excluded_files');

  const lines = data.reduce((acc, file) => {
    if (excludedFiles && file.filename.match(excludedFiles)) {
      return acc;
    }

    return acc + file.changes;
  }, 0);

  info(`Lines changed: ${lines}`);

  const prSizes = getPrSizeInputs();

  return Object.values(prSizes).find(({ diff }) => lines <= diff) || prSizes[Size.XL];
};
