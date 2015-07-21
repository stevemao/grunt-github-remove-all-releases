'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      coverage: 'coverage'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js',
        'test/*.js',
        'tasks/*.js'
      ]
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      all: [
        '*.js',
        'test/*.js',
        'tasks/*.js'
      ]
    },
    nodeunit: {
      tests: ['test/*.js']
    },
    conventionalGithubReleaser: {
      test: {
        options: {
          auth: {
            type: 'oauth',
            token: process.env.GRUNT_GITHUB_REMOVE_ALL_RELEASES_TOKEN
          },
          changelogOpts: {
            allBlocks: true
          },
          context: {
            host: 'https://github.com',
            owner: 'stevemaotest',
            repository: 'grunt-github-remove-all-releases-test'
          }
        }
      }
    },
    githubRemoveAllReleases: {
      all: {
        options: {
          auth: {
            type: 'oauth',
            token: process.env.GRUNT_GITHUB_REMOVE_ALL_RELEASES_TOKEN
          },
          owner: 'stevemaotest',
          repo: 'grunt-github-remove-all-releases-test'
        }
      }
    },
    instrument: {
      files: 'tasks/**/*.js',
      options: {
        lazy: true,
        basePath: 'coverage/instrument/'
      }
    },
    reloadTasks : {
      rootPath : 'coverage/instrument/tasks'
    },
    storeCoverage: {
      options: {
        dir: 'coverage/reports'
      }
    },
    makeReport: {
      src: 'coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },
    coveralls: {
      // Options relevant to all targets
      options: {
        // When true, grunt-coveralls will only print a warning rather than
        // an error, to prevent CI builds from failing unnecessarily (e.g. if
        // coveralls.io is down). Optional, defaults to false.
        force: false
      },
      all: {
        // LCOV coverage file (can be string, glob or array)
        src: 'coverage/lcov.info',
        options: {
          // Any options for just this target
        }
      },
    },
    bump: {
      options: {
        updateConfigs: ['pkg'],
        commitFiles: ['package.json'],
        commitMessage: 'chore: release v%VERSION%'
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadTasks('tasks');

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('githubRemoveAllReleases:test', ['githubRemoveAllReleases:all']);
  grunt.registerTask('test', ['lint', 'conventionalGithubReleaser:test', 'githubRemoveAllReleases:test', 'nodeunit']);
  grunt.registerTask('coverage', ['clean', 'conventionalGithubReleaser:test', 'instrument', 'reloadTasks', 'githubRemoveAllReleases:test', 'storeCoverage', 'makeReport']);
  grunt.registerTask('sendCoverallsInfo', ['coverage', 'coveralls', 'clean']);
  grunt.registerTask('default', ['lint', 'coverage', 'clean']);
  grunt.registerTask('release', 'bump, GitHub release and publish to npm.', function(type) {
    grunt.task.run([
      'bump:' + (type || 'patch') + ':bump-only',
      'bump-commit',
      'npm-publish'
    ]);
  });
};
