'use strict';
var chalk = require('chalk');
var githubRemoveAllReleases = require('github-remove-all-releases');
var plur = require('plur');

var DESC = 'Remove all releases of a GitHub repo';

module.exports = function(grunt) {
  grunt.registerMultiTask('githubRemoveAllReleases', DESC, function() {
    var done = this.async();
    var opts = this.options();

    githubRemoveAllReleases(opts.auth, opts.owner, opts.repo, function(err, data) {
      if (err) {
        done(err);
        return;
      }

      var tally = data.length;

      if (tally) {
        grunt.log.write('Removed ' + chalk.cyan(tally.toString()) + plur(' release', tally));
      }

      grunt.log.writeln();
      done();
    }, opts.filter);
  });
};
