# Contributing

Synthetics uses GitHub to manage reviews of pull requests.

* If you are a new contributor see: [Steps to Contribute](#steps-to-contribute)

* If you have a trivial fix or improvement, go ahead and create a pull request,
  addressing (with `@...`) a suitable maintainer of this repository (see
  [MAINTAINERS.md](MAINTAINERS.md)) in the description of the pull request.

* Relevant coding style guidelines are the [Go Code Review
  Comments](https://code.google.com/p/go-wiki/wiki/CodeReviewComments)
  and the _Formatting and style_ section of Peter Bourgon's [Go: Best
  Practices for Production
  Environments](https://peter.bourgon.org/go-in-production/#formatting-and-style).

* Be sure to sign off on the [DCO](https://github.com/probot/dco#how-it-works).

## Steps to Contribute

Should you wish to work on an issue, please claim it first by commenting on the GitHub issue that you want to work on it. This is to prevent duplicated efforts from contributors on the same issue.

If you have questions about one of the issues, with or without the tag, please comment on them and one of the maintainers will clarify it.


For quickly compiling and testing your changes do:

```bash
# For building.
npm i
npm run dev

# For testing.
npm run test         # Make sure all the tests pass before you commit and push :)
```

To run a collection of TS linters through do:
```bash
make lint
```


## Pull Request Checklist

* Branch from the main branch and, if needed, rebase to the current main branch before submitting your pull request. If it doesn't merge cleanly with main you may be asked to rebase your changes.

* Commits should be as small as possible, while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests).

* If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment.

* Add tests relevant to the fixed bug or new feature.

## Dependency management

The Synethtics project uses [NPM Node modules](https://docs.npmjs.com/about-packages-and-modules) to manage dependencies on external packages.

To add or update a new dependency, use the `npm i` command:

```bash
# Pick the latest tagged release.
npm i pkg@latest

# Pick a specific version.
npm i pkg@vX.Y.Z
```
