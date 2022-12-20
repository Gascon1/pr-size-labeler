# 🏷 Pull Request size labeler

Visualize and optionally limit the size of your Pull Requests

## 🚀 Usage

Create a file named `pr-labeler.yml` inside the `.github/workflows` directory and paste the following configuration.

🔻 You can find below a list of the default values for all the parameters 🔻

Note that only the `GITHUB_TOKEN` is required.

```yml
name: labeler

on: [pull_request]

jobs:
  labeler:
    runs-on: ubuntu-latest
    name: Label the PR size
    steps:
      - uses: Gascon1/pr-size-labeler@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          xs_label: 'size/xs'
          xs_diff: '10'
          s_label: 'size/s'
          s_diff: '50'
          m_label: 'size/m'
          m_diff: '250'
          l_label: 'size/l'
          l_diff: '500'
          xl_label: 'size/xl'
          fail_if_xl: 'false'
          message_if_xl: >
            This PR exceeds the recommended size of 1000 lines.
            Please make sure you are NOT addressing multiple issues with one PR.
            Note this PR might be rejected due to its size.
          excluded_files: ''
```

## 🎛️ Available parameters

- `*_label` (`xs_label`, `s_label`…): Adjust size label names
- `*_diff` (`xs_max_size`, `s_max_size`…): Adjust which amount of changes you consider appropriate for each size based on your project context
- `fail_if_xl`: Set to `'true'` will report GitHub Workflow failure if the PR size is xl allowing to forbid PR merge
- `message_if_xl`: Let the user(s) know that the PR exceeds the recommended size and what the consequences are
- `excluded_files`: Regex to ignore files from the line diff count (e.g. `/(\.test|\.spec)\.(js|jsx|ts|tsx)$/`)

## 🤔 Basic concepts or assumptions

- PR size labeler consider as a change any kind of line addition, deletion, or modification
- A PR will be labeled with the `xl_label` if it exceeds the amount of changes defined as `l_diff`

## ⚖️ License

[MIT](LICENSE)
