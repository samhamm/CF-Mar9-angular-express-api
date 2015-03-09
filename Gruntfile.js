'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jshint: {
      dev: {
        options: {
          node: true,
          globals: {
            describe: true,
            it: true,
            before: true,
            after: true
          }
        },
        src: ['Gruntfile.js', 'app/**/*.js', 'routes/**/*.js', 'models/**/*.js', 'test/**/*.js', '*.js']
      }
    },

    simplemocha: {
      all: {
        src: ['test/**/*.js']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', 'style.css', '**/*.png'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    clean: {
      build: {
        src: ['build/']
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },

      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },
      karmatest: {
        src: ['test/karma_tests/*_test.js'],
        dest: 'test/karma_tests/karma_test_bundle.js'
      },
      options: {
        transform: ['debowerify']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }

  });

  grunt.registerTask('test', ['jshint:dev', 'simplemocha:all']);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('build', ['clean','browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
};
