# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 5.0.0 (2021-04-15)


### Bug Fixes

* allow to use PF Textarea props in the Formik adapter ([bffb090](https://github.com/josejulio/insights-common-typescript/commit/bffb09078773afc405f54aa87cd5a8c89f561058))
* cancel button is of type "link" (blue color, not gray) ([9d0ee3f](https://github.com/josejulio/insights-common-typescript/commit/9d0ee3f5bb84d77554a3286a9c88fc1eb011faf7))
* changed text from Delete to Remove ([772010a](https://github.com/josejulio/insights-common-typescript/commit/772010aca886d3be5192a3b15e2f2c2021e0d698))
* fix stage environment name ([76d7cf7](https://github.com/josejulio/insights-common-typescript/commit/76d7cf78ce7623f226769de0f7140db0fc4e7504))
* insightsEmailOptIn doesnt need bundle ([21a56d5](https://github.com/josejulio/insights-common-typescript/commit/21a56d5d0f755d4fc73e236c63214ac6952a9b92))
* titleIconVariant was supposed to be warning on DeleteModal ([f4196f8](https://github.com/josejulio/insights-common-typescript/commit/f4196f8143ae1c56662765a86c7791241c1195a8))
* updates wording on EmailOptIn ([292fd5c](https://github.com/josejulio/insights-common-typescript/commit/292fd5c86cbe5f0e01c1ffdf61a4815c4666e355))
* use flat imports on react-tokens/icons to decrease size when importing components ([719ee4b](https://github.com/josejulio/insights-common-typescript/commit/719ee4b188519de9a5278fc3751c1f35e5a280f4))


### Code Refactoring

* **mockinsights:** removed mockInsights from the main package ([0a81e3e](https://github.com/josejulio/insights-common-typescript/commit/0a81e3ec9a1a76bbbe39c49444085e4e09e7301e))


### Features

* add hooks to represent feature flags ([3b3b8bc](https://github.com/josejulio/insights-common-typescript/commit/3b3b8bca76d678896ed5c643a58dc8515e10f398))
* add support for more feature flags ([85cb915](https://github.com/josejulio/insights-common-typescript/commit/85cb91536636f6a933749d47c7a9d66e7e2713b2))
* adding titleIconVariant to ActionModal (& friends) ([73c6e67](https://github.com/josejulio/insights-common-typescript/commit/73c6e6733db664239d53b8776414d82d46bafbdf))
* Adding types to schema.Actions ([#25](https://github.com/josejulio/insights-common-typescript/issues/25)) ([7ed4e0b](https://github.com/josejulio/insights-common-typescript/commit/7ed4e0bc2ab4396f2a65cf9e2e6c5c4130751479))
* Adds more convenient methods for notifications and its options ([#12](https://github.com/josejulio/insights-common-typescript/issues/12)) ([23e8925](https://github.com/josejulio/insights-common-typescript/commit/23e892595efb3dff49b2f01889f1e6be1ee5e788))
* allows filters to select multiple elements from options list (exclusive = false) ([6f70f20](https://github.com/josejulio/insights-common-typescript/commit/6f70f205e1ea176c947867d9e31ea88803e55b55))
* allows to configure the redux store with initialState and reducers ([f75938b](https://github.com/josejulio/insights-common-typescript/commit/f75938b5d0ead59d5c18d84217956b4f0e56dfd7))
* allows to specify a notification description as a node ([f6ca0f6](https://github.com/josejulio/insights-common-typescript/commit/f6ca0f6f52504fd9a7db590bc109ad9054830921))
* Expose variant in delete and save modals ([#27](https://github.com/josejulio/insights-common-typescript/issues/27)) ([2b86686](https://github.com/josejulio/insights-common-typescript/commit/2b86686435bb8bd95f490ac16c8c9981996f0821))
* filter now allows arrays of objects ([cf03bfc](https://github.com/josejulio/insights-common-typescript/commit/cf03bfc3982c5e4d67202367c7fe0111a7099c1c))
* update Rbac to handle better the Rbac permissions from the server ([3c0782f](https://github.com/josejulio/insights-common-typescript/commit/3c0782f3c94e690b46aed60def3bb64c8d795667))
* uses notification preferences instead of email-preferences (require bundle) ([d3a692c](https://github.com/josejulio/insights-common-typescript/commit/d3a692c9e81aa33fe9c31feae76951e7bd9a754f))


* Split into multiple packages to reduce dependencies (#30) ([0bdee21](https://github.com/josejulio/insights-common-typescript/commit/0bdee219cc5a1beb4115bdaa3b6045b610ec0da0)), closes [#30](https://github.com/josejulio/insights-common-typescript/issues/30)


### BREAKING CHANGES

* To support arrays on the useFilters, had to set the default as undefined, so the
options are undefined | T | array<T>
* **mockinsights:** Removing mockInsights
* Split some functionality in other packages

* Remove deprecated code

* Add correct package to openapi2typescript-cli workflow

* Fix default path for openapi2typescript and insights-common-typescript-dev

* Pushes yarn.lock file

* Using @patternfly/react-core instead of own variables

* Remaining update changes





## [4.6.1](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.6.0...@redhat-cloud-services/insights-common-typescript@4.6.1) (2021-03-29)


### Bug Fixes

* insightsEmailOptIn doesnt need bundle ([21a56d5](https://github.com/RedHatInsights/insights-common-typescript/commit/21a56d5d0f755d4fc73e236c63214ac6952a9b92))





# [4.6.0](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.5.2...@redhat-cloud-services/insights-common-typescript@4.6.0) (2021-03-29)


### Features

* uses notification preferences instead of email-preferences (require bundle) ([d3a692c](https://github.com/RedHatInsights/insights-common-typescript/commit/d3a692c9e81aa33fe9c31feae76951e7bd9a754f))





## [4.5.2](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.5.1...@redhat-cloud-services/insights-common-typescript@4.5.2) (2021-02-09)


### Bug Fixes

* use flat imports on react-tokens/icons to decrease size when importing components ([719ee4b](https://github.com/RedHatInsights/insights-common-typescript/commit/719ee4b188519de9a5278fc3751c1f35e5a280f4))





## [4.5.1](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.5.0...@redhat-cloud-services/insights-common-typescript@4.5.1) (2021-01-28)


### Bug Fixes

* allow to use PF Textarea props in the Formik adapter ([bffb090](https://github.com/RedHatInsights/insights-common-typescript/commit/bffb09078773afc405f54aa87cd5a8c89f561058))





# [4.5.0](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.4.0...@redhat-cloud-services/insights-common-typescript@4.5.0) (2021-01-26)


### Features

* allows to configure the redux store with initialState and reducers ([f75938b](https://github.com/RedHatInsights/insights-common-typescript/commit/f75938b5d0ead59d5c18d84217956b4f0e56dfd7))





# [4.4.0](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.3.1...@redhat-cloud-services/insights-common-typescript@4.4.0) (2021-01-15)


### Features

* update Rbac to handle better the Rbac permissions from the server ([3c0782f](https://github.com/RedHatInsights/insights-common-typescript/commit/3c0782f3c94e690b46aed60def3bb64c8d795667))





## [4.3.1](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.3.0...@redhat-cloud-services/insights-common-typescript@4.3.1) (2021-01-13)


### Bug Fixes

* titleIconVariant was supposed to be warning on DeleteModal ([f4196f8](https://github.com/RedHatInsights/insights-common-typescript/commit/f4196f8143ae1c56662765a86c7791241c1195a8))





# [4.3.0](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.2.2...@redhat-cloud-services/insights-common-typescript@4.3.0) (2021-01-12)


### Features

* adding titleIconVariant to ActionModal (& friends) ([73c6e67](https://github.com/RedHatInsights/insights-common-typescript/commit/73c6e6733db664239d53b8776414d82d46bafbdf))
* allows to specify a notification description as a node ([f6ca0f6](https://github.com/RedHatInsights/insights-common-typescript/commit/f6ca0f6f52504fd9a7db590bc109ad9054830921))





## [4.2.2](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.2.1...@redhat-cloud-services/insights-common-typescript@4.2.2) (2021-01-04)


### Bug Fixes

* cancel button is of type "link" (blue color, not gray) ([9d0ee3f](https://github.com/RedHatInsights/insights-common-typescript/commit/9d0ee3f5bb84d77554a3286a9c88fc1eb011faf7))
* changed text from Delete to Remove ([772010a](https://github.com/RedHatInsights/insights-common-typescript/commit/772010aca886d3be5192a3b15e2f2c2021e0d698))





## [4.2.1](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.2.0...@redhat-cloud-services/insights-common-typescript@4.2.1) (2020-11-26)


### Bug Fixes

* fix stage environment name ([76d7cf7](https://github.com/RedHatInsights/insights-common-typescript/commit/76d7cf78ce7623f226769de0f7140db0fc4e7504))





# [4.2.0](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.1.0...@redhat-cloud-services/insights-common-typescript@4.2.0) (2020-11-17)


### Features

* add hooks to represent feature flags ([3b3b8bc](https://github.com/RedHatInsights/insights-common-typescript/commit/3b3b8bca76d678896ed5c643a58dc8515e10f398))





# [4.1.0](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@4.0.0...@redhat-cloud-services/insights-common-typescript@4.1.0) (2020-11-13)


### Features

* add support for more feature flags ([85cb915](https://github.com/RedHatInsights/insights-common-typescript/commit/85cb91536636f6a933749d47c7a9d66e7e2713b2))





# [4.0.0](https://github.com/RedHatInsights/insights-common-typescript/compare/@redhat-cloud-services/insights-common-typescript@3.0.7...@redhat-cloud-services/insights-common-typescript@4.0.0) (2020-11-04)


### Features

* allows filters to select multiple elements from options list (exclusive = false) ([6f70f20](https://github.com/RedHatInsights/insights-common-typescript/commit/6f70f205e1ea176c947867d9e31ea88803e55b55))
* filter now allows arrays of objects ([cf03bfc](https://github.com/RedHatInsights/insights-common-typescript/commit/cf03bfc3982c5e4d67202367c7fe0111a7099c1c))


### BREAKING CHANGES

* To support arrays on the useFilters, had to set the default as undefined, so the
options are undefined | T | array<T>





## 3.0.7 (2020-10-21)

**Note:** Version bump only for package @redhat-cloud-services/insights-common-typescript





## 3.0.6 (2020-10-13)

**Note:** Version bump only for package @redhat-cloud-services/insights-common-typescript





## 3.0.5 (2020-10-13)

**Note:** Version bump only for package @redhat-cloud-services/insights-common-typescript





## 3.0.4 (2020-10-12)

**Note:** Version bump only for package @redhat-cloud-services/insights-common-typescript
