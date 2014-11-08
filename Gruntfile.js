module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    /*** load defaults from package.json ***/
    pkg: grunt.file.readJSON('package.json'),
    
    /*** use browserify to tranform our Commonjs style files to browser compatible***/
    browserify: {
       dist: {
        files: {
          'target/bundle.js': ['js/*.js','app.js']
        }
      }  
    },

    /*** configure our tests runner - unit + integration ***/
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false // Optionally suppress output to standard out (defaults to false)
        },
        src: ['tests/*.js']
      }
    }


  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['mochaTest','browserify']);

};