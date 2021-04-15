# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.5.0 (2021-04-15)


### Bug Fixes

* apiDescriptor now holds information of circular dependencies found ([df4db4b](https://github.com/josejulio/insights-common-typescript/commit/df4db4bfc7b3f02185e64fbcdc8d71e1f47f8615))
* ensure order of elements are stable ([15ee759](https://github.com/josejulio/insights-common-typescript/commit/15ee7598255f48667f43f7e46aa5003ea9f579be))
* fixes a bug when having circular types and using react-fetching-library ([03a6cd2](https://github.com/josejulio/insights-common-typescript/commit/03a6cd2ea00d7c2382fe9ca457858a8c21235fff))
* fixes cyclic type dependencies by using lazy evaluation of the zod schema (z.lazy) ([7062edd](https://github.com/josejulio/insights-common-typescript/commit/7062eddd59399f1cfd19d7b49fc9f5c548fbc0d1))
* remove assert-never from dependencies ([e70a55d](https://github.com/josejulio/insights-common-typescript/commit/e70a55d46eaf804f5602611bb4ff549b1a0822c5))
* remove type from react-fetching-library plugin when using --skip-types ([375e391](https://github.com/josejulio/insights-common-typescript/commit/375e391ef22ddead5d282560eef5742758e0a3aa))
* type inference for ValidateRule ([20c0bfb](https://github.com/josejulio/insights-common-typescript/commit/20c0bfbedb8eb065d0dcf50f91cfe29afec1ec70))
* uses the function name of the schema instead of the type ([362d83a](https://github.com/josejulio/insights-common-typescript/commit/362d83a6d702faaffbf0056f62f73dffb6543333))


### Features

* add option to build explicit types ([d04ef74](https://github.com/josejulio/insights-common-typescript/commit/d04ef74dd6b8ec09d9d9704f5e4fe24be9201dd3))
* adding no-strict mode to allow unknown keys in the response ([e7f328a](https://github.com/josejulio/insights-common-typescript/commit/e7f328a8395e8a08b70926427faf22b0b883457d))
* groups generated code into modules / namespaces ([a0ad81d](https://github.com/josejulio/insights-common-typescript/commit/a0ad81d5fe3e223eb164f28d5a3723349b3b8f05))
* use unknown for the string "type" when we have anonymous types ([939d731](https://github.com/josejulio/insights-common-typescript/commit/939d731eefb395f74af6447d4bc426611d8d83a2))


* Split into multiple packages to reduce dependencies (#30) ([0bdee21](https://github.com/josejulio/insights-common-typescript/commit/0bdee219cc5a1beb4115bdaa3b6045b610ec0da0)), closes [#30](https://github.com/josejulio/insights-common-typescript/issues/30)


### BREAKING CHANGES

* Split some functionality in other packages

* Remove deprecated code

* Add correct package to openapi2typescript-cli workflow

* Fix default path for openapi2typescript and insights-common-typescript-dev

* Pushes yarn.lock file

* Using @patternfly/react-core instead of own variables

* Remaining update changes





## [0.4.1](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.4.0...openapi2typescript-cli@0.4.1) (2021-01-04)


### Bug Fixes

* type inference for ValidateRule ([20c0bfb](https://github.com/RedHatInsights/insights-common-typescript/commit/20c0bfbedb8eb065d0dcf50f91cfe29afec1ec70))





# [0.4.0](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.3.1...openapi2typescript-cli@0.4.0) (2021-01-04)


### Features

* use unknown for the string "type" when we have anonymous types ([939d731](https://github.com/RedHatInsights/insights-common-typescript/commit/939d731eefb395f74af6447d4bc426611d8d83a2))





## [0.3.1](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.3.0...openapi2typescript-cli@0.3.1) (2020-11-27)


### Bug Fixes

* ensure order of elements are stable ([15ee759](https://github.com/RedHatInsights/insights-common-typescript/commit/15ee7598255f48667f43f7e46aa5003ea9f579be))





# [0.3.0](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.2.3...openapi2typescript-cli@0.3.0) (2020-11-04)


### Features

* groups generated code into modules / namespaces ([a0ad81d](https://github.com/RedHatInsights/insights-common-typescript/commit/a0ad81d5fe3e223eb164f28d5a3723349b3b8f05))





## [0.2.3](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.2.2...openapi2typescript-cli@0.2.3) (2020-10-27)


### Bug Fixes

* fixes a bug when having circular types and using react-fetching-library ([03a6cd2](https://github.com/RedHatInsights/insights-common-typescript/commit/03a6cd2ea00d7c2382fe9ca457858a8c21235fff))





## [0.2.2](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.2.1...openapi2typescript-cli@0.2.2) (2020-10-27)


### Bug Fixes

* uses the function name of the schema instead of the type ([362d83a](https://github.com/RedHatInsights/insights-common-typescript/commit/362d83a6d702faaffbf0056f62f73dffb6543333))





## [0.2.1](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.2.0...openapi2typescript-cli@0.2.1) (2020-10-26)


### Bug Fixes

* remove type from react-fetching-library plugin when using --skip-types ([375e391](https://github.com/RedHatInsights/insights-common-typescript/commit/375e391ef22ddead5d282560eef5742758e0a3aa))





# [0.2.0](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.1.0...openapi2typescript-cli@0.2.0) (2020-10-26)


### Bug Fixes

* apiDescriptor now holds information of circular dependencies found ([df4db4b](https://github.com/RedHatInsights/insights-common-typescript/commit/df4db4bfc7b3f02185e64fbcdc8d71e1f47f8615))
* fixes cyclic type dependencies by using lazy evaluation of the zod schema (z.lazy) ([7062edd](https://github.com/RedHatInsights/insights-common-typescript/commit/7062eddd59399f1cfd19d7b49fc9f5c548fbc0d1))


### Features

* add option to build explicit types ([d04ef74](https://github.com/RedHatInsights/insights-common-typescript/commit/d04ef74dd6b8ec09d9d9704f5e4fe24be9201dd3))





# [0.1.0](https://github.com/RedHatInsights/insights-common-typescript/compare/openapi2typescript-cli@0.0.5...openapi2typescript-cli@0.1.0) (2020-10-23)


### Features

* adding no-strict mode to allow unknown keys in the response ([e7f328a](https://github.com/RedHatInsights/insights-common-typescript/commit/e7f328a8395e8a08b70926427faf22b0b883457d))





## 0.0.5 (2020-10-21)

**Note:** Version bump only for package openapi2typescript-cli





## 0.0.4 (2020-10-13)

**Note:** Version bump only for package openapi2typescript-cli





## 0.0.3 (2020-10-13)

**Note:** Version bump only for package openapi2typescript-cli





## 0.0.2 (2020-10-12)

**Note:** Version bump only for package openapi2typescript-cli
