module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({

    jshint: {
      options: {
        node: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'app/js/**/*.js', 'test/**/*.js']
    },

    simplemocha: {
      src: ['test/**/*.js']
    },

    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'app',
        src: '**/*.html',
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js',
      },

      test: {
        src: ['test/client-side/**/*.js'],
        dest: 'test/angular-testbundle.js',
      },
      options: {
          transform: ['debowerify']
        }
      }
      karmatest: {
        src: ['test/karma-tests/*-test.js'],
        dest: 'test/karma-tests/karma-test-bundle.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);

};
