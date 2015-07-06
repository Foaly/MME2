module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Test task
  grunt.registerTask('test', ['jasmine_node']);
  // Default task
  grunt.registerTask('default', ['jasmine_node', 'uglify']);

};
