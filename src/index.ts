import * as core from '@actions/core';
import * as github from '@actions/github';
import { getCurrentPrSize } from './get-current-pr-size';
import { prSizes, Size } from './pr-sizes';
import { octokit } from './octokit';

async function run() {
  try {
    if (!github.context.payload.pull_request) {
      core.info('Event is not pull request, exiting');
      return;
    }

    const currentPrSize = await getCurrentPrSize();

    core.info(`Current PR size: ${currentPrSize.label}`);

    const existingLabels: string[] = github.context.payload.pull_request.labels.map((label: any) => label.name);

    core.info(`Labels found: ${existingLabels.join()}`);

    if (currentPrSize.label === prSizes[Size.XL].label) {
      const messageXl = core.getInput('message_if_xl');

      await octokit.rest.issues.createComment({
        ...github.context.repo,
        issue_number: github.context.issue.number,
        body: messageXl,
      });

      if (core.getInput('fail_if_xl')) {
        core.setFailed(messageXl);
      }
    }

    if (existingLabels.includes(core.getInput(currentPrSize.label))) {
      return;
    }

    const labelToRemove = existingLabels.filter((label) =>
      Object.values(prSizes)
        .map((prSize) => prSize.label)
        .includes(label),
    );

    core.info(`Label to remove: ${labelToRemove[0]}`);

    if (labelToRemove[0]) {
      await octokit.rest.issues.removeLabel({
        ...github.context.repo,
        issue_number: github.context.issue.number,
        name: labelToRemove[0],
      });
    }

    await octokit.rest.issues.addLabels({
      ...github.context.repo,
      issue_number: github.context.issue.number,
      labels: [currentPrSize.label],
    });
  } catch (err) {
    const error = err as Error;
    core.setFailed(error.message);
  }
}

run();
