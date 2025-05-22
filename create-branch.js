async function createBranch(octokit, repo, sha, branch) {
  try {
    await octokit.repos.getBranch({
      ...repo,
      branch,
    });
  } catch (error) {
    if (error.name === "HttpError" && error.status === 404) {
      await octokit.git.createRef({
        ref: `refs/heads/${branch}`,
        sha: sha,
        ...repo,
      });
    } else {
      console.log("Error while creating new branch");
      console.log(error.name);
      console.log(error.status);
      throw Error(error);
    }
  }
}

module.exports = createBranch;
