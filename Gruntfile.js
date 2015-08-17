'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    simplemocha: {
      options: {
      globals: ['should'],
      timeout: 3000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'tap'
    },
    all: {
      src: ['test/**/*.js']
    }
  },

    jshint: {
      dev: {
        src: ['*.js', 'test/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'lib/**/*.js']
      },
      options: {
        node: true,
        globals: {
          describe: true,
          it: true,
          before: true,
          after: true,
          beforeEach: true,
          afterEach: true
        }
      }
    },

    watch: {
      options: {
        livereload: 3000
      },
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true,
          event: ['added', 'deleted', 'changed']
        }
      },
      scripts: {
        files: ['*.js', 'models/**/*.js', 'app/**/*.js', 'routes/**/*.js'],
        tasks: ['default'],
        options: {
          event: ['added', 'deleted', 'changed']
        }
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },

      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    }
  });

  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('default', ['build:dev']);
};