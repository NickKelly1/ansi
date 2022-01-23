# @nkp/ansi

[![npm version](https://badge.fury.io/js/%40nickkelly1%2Fansi.svg)](https://www.npmjs.com/package/@nkp/ansi)
[![deploy status](https://github.com/nickkelly1/nkp-ansi/actions/workflows/release.yml/badge.svg)](https://github.com/nickkelly1/nkp-ansi/actions/workflows/release.yml)
[![known vulnerabilities](https://snyk.io/test/github/nickkelly1/nkp-ansi/badge.svg)](https://snyk.io/test/github/nickkelly1/nkp-ansi)

ANSI escape codes for terminal styling

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [pnpm](#pnpm)
  - [Exports](#exports)
- [Usage](#usage)
- [Updating Dependencies](#updating-dependencies)

## Installation

### npm

```sh
npm install @nkp/ansi
```

### yarn

```sh
yarn add @nkp/ansi
```

### pnpm

```sh
pnpm add @nkp/ansi
```

### Exports

`@nkp/ansi` targets CommonJS and ES modules. To utilise ES modules consider using a bundler or setting `package.json#module` to `module`.

## Usage

---USAGE-TEXT---

## Updating dependencies

To update dependencies run one of

```sh
# if npm
# update package.json
npx npm-check-updates -u
# install
npm install

# if yarn
# update package.json
yarn create npm-check-updates -u
# install
yarn

# if pnpm
# update package.json
pnpx npm-check-updates -u
# install
pnpm install
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
