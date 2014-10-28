/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.

    patterns: {
      pub: 'public',
      gruntfile: 'Gruntfile.js',
      clientjs: '<%= patterns.pub %>/js/{,**/}*.js',
      clientbuildjs: '<%= patterns.pub %>/js/<%= pkg.name %>',
      serverjs: '<%= patterns.pub %>/app{,**/}*.js',
      vendordir: '<%= patterns.pub %>/js/vendor',
      vendorjs: '<%= patterns.vendordir %>/{,**/}*.js',
      sass: '<%= patterns.pub %>/css/sass/{,**/}*.{scss,sass}',
      views: '<%= patterns.pub %>/{,**/}*.html',
      spec: {
        client: 'spec/client/{,**/}*.js',
        server: 'spec/server/{,**/}*.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= patterns.clientbuildjs %>.js',
        dest: '<%= patterns.clientbuildjs %>.min.js'
      }
    },

    // browserify: {
    //   options: {
    //     alias: [
    //       'public/js/vendor/jquery.js:jquery',
    //       'public/js/vendor/lodash.js:underscore',
    //       //'public/js/vendor/underscore.js:underscore',
    //       'public/js/vendor/backbone.js:backbone'
    //     ]
    //   },
    //   dist: {
    //     files: {
    //       '<%= patterns.clientbuildjs %>.js': [
    //         '<%= patterns.clientjs %>', '!<%= patterns.clientbuildjs %>*.js'
    //       ],
    //     }
    //   }
    // },

    develop: {
      server: {
        file: 'server.js',
        env: { NODE_ENV: 'local', PATH: process.env.PATH }
      }
    },

    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      frontend: {
        src: [
          '<%= patterns.clientjs %>',
          '!<%= patterns.vendorjs %>',
          '!<%= patterns.clientbuildjs %>*'
        ]
      },
      server: {
        src: ['<%= patterns.serverjs %>']
      },
      spec: {
        src: [
          '<%= patterns.spec.client %>',
          '<%= patterns.spec.server %>'
        ]
      }
    },

    connect: {
      site: {
        options: {
          port: 3000,
          hostname: 'localhost',
          base: ['public'],
          directory: 'public',
          // keepalive: false,
          debug: true,
          livereload: 3001,
          open: true
        }
      }
    },

    compass: {
      options: {
        sassDir: 'src/sass',
        cssDir: 'public/css',
        imagesDir: 'public/img',
        javascriptsDir: 'public/js',
        outputStyle: 'expanded',
        noLineComments: false,
        force: false
      },
      dev: {
        options: {
          debugInfo: false
        }
      },
      build: {
        options: {
          noLineComments: true,
          debugInfo: false
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      develop: {
        browsers: ['PhantomJS'],
        reporters: ['progress'],
        singleRun: true
      },
      thorough: {
        browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
        reporters: ['progress', 'coverage']
      }
    },

    bower: {
      client: {
        js_dest: '<%= patterns.vendordir %>',
        css_dest: '<%= patterns.pub %>/css/vendor',
        options: {
          ignorePackages: ['jasmine', 'jasmine-jquery'],
          packageSpecific: {
          }
        }
      }
    },

    useminPrepare: {
      build: {
        src: ['index.html']
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
        options: {
          reload: true
        }
      },
      frontend: {
        files: '<%= patterns.clientjs %>',
        tasks: ['jshint:frontend', 'karma:develop'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.site.options.livereload %>'
        },
        files: 'public/{,**/}*'
      },
      server: {
        files: [
          '<%= patterns.serverjs %>',
          'server.js'
        ],
        tasks: ['jshint:server', 'develop']
      },
      spec: {
        files: '<%= patterns.spec.client %>',
        tasks: ['jshint:spec', 'karma:develop']
      },
      compass: {
        files: 'src/sass/{,**/}*.{sass,scss}',
        tasks: ['compass:dev']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-usemin');

  // Default task.
  grunt.registerTask('default', ['bower', 'compass:dev', 'jshint', 'karma:develop', 'connect:site',
      'watch']);

  grunt.registerTask('build', ['bower', 'compass:build', 'jshint', 'karma:develop', 'useminPrepare']);

};
