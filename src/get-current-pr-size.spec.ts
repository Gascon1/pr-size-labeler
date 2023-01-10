import { getCurrentPrSize } from './get-current-pr-size';

import { getMultilineInput } from '@actions/core';
import { octokit } from './octokit';
import { getPrSizeInputs } from './pr-sizes';

jest.mock('@actions/github', () => {
  return { context: { repo: 'some/repo', issue: { number: '666' } } };
});
jest.mock('@actions/core');
jest.mock('./pr-sizes');
jest.mock('./octokit', () => {
  const listFiles = jest.fn().mockResolvedValue({
    headers: {},
    status: 200,
    url: 'url',
    data: [
      { filename: 'file1.txt', changes: 3, additions: 7, deletions: 4, status: 'modified', ...fileBaseInfo },
      { filename: 'file2.txt', changes: 2, additions: 6, deletions: 4, status: 'modified', ...fileBaseInfo },
      { filename: 'server.js', changes: 8, additions: 6, deletions: 4, status: 'modified', ...fileBaseInfo },
    ],
  });

  return {
    octokit: { rest: { pulls: { listFiles } } },
  };
});

const fileBaseInfo = {
  sha: 'sha',
  blob_url: 'blob_url',
  raw_url: 'raw_url',
  contents_url: 'content_url',
};

describe('getCurrentPrSize', () => {
  let prSize: {
    diff: number;
    label: string;
  };

  beforeEach(() => {
    jest.mocked(getPrSizeInputs).mockReturnValue({
      xs: {
        diff: 2,
        label: 'size/xs',
      },
      s: {
        diff: 5,
        label: 'size/s',
      },
      m: { diff: 20, label: 'size/m' },
      l: {
        diff: 40,
        label: 'size/l',
      },
      xl: { diff: 100, label: 'size/xl' },
    });
  });

  describe('when excluded_files is not defined', () => {
    beforeEach(async () => {
      jest.mocked(getMultilineInput).mockReturnValue([]);
      prSize = await getCurrentPrSize();
    });

    it('returns the sum of all changes', () => {
      expect(prSize).toEqual({ diff: 20, label: 'size/m' });
    });
  });

  describe('when excluded_files uses one file pattern', () => {
    beforeEach(async () => {
      jest.mocked(getMultilineInput).mockReturnValue(['.*.js$']);
      prSize = await getCurrentPrSize();
    });

    it('returns the sum of all changes', () => {
      expect(prSize).toEqual({ diff: 5, label: 'size/s' });
    });
  });

  describe('when excluded_files uses multiple file patterns', () => {
    beforeEach(async () => {
      jest.mocked(getMultilineInput).mockReturnValue(['.*.js$', 'file1.*']);
      prSize = await getCurrentPrSize();
    });

    it('returns the sum of all changes', () => {
      expect(prSize).toEqual({ diff: 2, label: 'size/xs' });
    });
  });
});
