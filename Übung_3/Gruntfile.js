module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    /**
     * Concat all .js files into one big file
     */
    concat: {
      dist: {
        src: 'public/js/*.js',
        dest: 'built/js/main.js'
      }
    },
    
    /**
     * Uglify the js code (server + website)
     */
    uglify: {
      options: {
        mangle: { toplevel: true }
      },
      serverjs: {
        src: 'server.js',
        dest: 'built/server.min.js'
      },
      websitejs: {
        src: 'built/js/main.js',
        dest: 'built/js/main.min.js'
      }
    },
    
    /**
     * Copy all the files from the public directory
     */
    copy : {
      main: {
        files: [
          // includes all files in public except the js files
          {expand: true, cwd: 'public', src: ['**', '!js/**'], dest: 'built/'},
        ],
      }
    },
    
    /**
     * Run jasmine tests
     */
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec'
      },
      all: ['tests/']
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Test task
  grunt.registerTask('test', ['jasmine_node']);    
  // Default task
  grunt.registerTask('default', ['jasmine_node', 'concat', 'uglify', 'copy']);
 
};