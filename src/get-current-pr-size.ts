import { octokit } from './octokit';
import * as github from '@actions/github';
import { getInput } from '@actions/core';
import { PrSize } from './get-size-thresholds';

export const getCurrentPrSize = async (prSizes: PrSize[]) => {
  const { data } = await octokit.rest.pulls.listFiles({
    ...github.context.repo,
    pull_number: github.context.issue.number,
  });

  const lines = data.reduce((acc, file) => {
    if (file.filename.match(getInput('excluded_files'))) {
      return acc;
    }

    return (acc += file.changes);
  }, 0);

  return prSizes.find((prSize) => lines <= prSize.diff) || prSizes[prSizes.length - 1];
};
