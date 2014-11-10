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
    },

    jshint: {
      all: ['Gruntfile.js', './js/*.js']
    },

    complexity: {
            generic: {
                src: ['./js/*.js'],
                options: {
                    breakOnErrors: false,
                    jsLintXML: 'report.xml',         // create XML JSLint-like report
                    checkstyleXML: 'checkstyle.xml', // create checkstyle report
                    errorsOnly: false,               // show only maintainability errors
                    cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
                    halstead: [8, 13, 20],           // or optionally a single value, like 8
                    maintainability: 100,
                    hideComplexFunctions: false,     // only display maintainability
                    broadcast: false                 // broadcast data over event-bus
                }
            }
        }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');

  grunt.registerTask('default', ['jshint','complexity','mochaTest','browserify']);

};