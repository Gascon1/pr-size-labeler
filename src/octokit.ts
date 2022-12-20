import { getInput } from '@actions/core';
import * as github from '@actions/github';

export const octokit = github.getOctokit(getInput('GITHUB_TOKEN'));
