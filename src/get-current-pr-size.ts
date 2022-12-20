import { octokit } from './octokit';
import * as github from '@actions/github';
import { getInput } from '@actions/core';
import { prSizes, Size } from './pr-sizes';

export const getCurrentPrSize = async () => {
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

  return Object.values(prSizes).find(({ diff }) => lines <= diff) || prSizes[Size.XL];
};
