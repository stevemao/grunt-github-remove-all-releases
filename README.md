#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

> Remove all releases of a GitHub repo using [github-remove-all-releases](https://github.com/stevemao/github-remove-all-releases)

*Issues with the output should be reported on the `github-remove-all-releases` [issue tracker](https://github.com/stevemao/github-remove-all-releases/issues).*


## Install

```
$ npm install --save-dev grunt-github-remove-all-releases
```


## Usage

```js
grunt.loadNpmTasks('grunt-github-remove-all-releases');

grunt.initConfig({
  githubRemoveAllReleases: {
    all: {
      options: {
        auth: {
          type: 'oauth',
          token: process.env.GRUNT_GITHUB_REMOVE_ALL_RELEASES_TOKEN
        },
        owner: 'stevemaotest',
        repo: 'grunt-github-remove-all-releases-test',
        filter: function() {
          return true;
        }
      }
    }
  }
});

grunt.registerTask('default', ['githubRemoveAllReleases']);
```


## API

See the [github-remove-all-releases](https://github.com/stevemao/github-remove-all-releases) docs.


## License

MIT


[npm-image]: https://badge.fury.io/js/grunt-github-remove-all-releases.svg
[npm-url]: https://npmjs.org/package/grunt-github-remove-all-releases
[travis-image]: https://travis-ci.org/stevemao/grunt-github-remove-all-releases.svg?branch=master
[travis-url]: https://travis-ci.org/stevemao/grunt-github-remove-all-releases
[daviddm-image]: https://david-dm.org/stevemao/grunt-github-remove-all-releases.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stevemao/grunt-github-remove-all-releases
[coveralls-image]: https://coveralls.io/repos/github/stevemao/grunt-github-remove-all-releases/badge.svg
[coveralls-url]: https://coveralls.io/r/stevemao/grunt-github-remove-all-releases
