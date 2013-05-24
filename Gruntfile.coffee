
module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "selectfilter.jquery.json"
    banner: """
            /*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>
             * <%= pkg.homepage %>
             * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */
            """
    clean:
      files: ["dist"]
    uglify:
      options:
        banner: "<%= banner %>"
      dist:
        src: "src/jquery.selectfilter.js"
        dest: "dist/jquery.selectfilter.min.js"
    qunit:
      files: ["test/*.html"]

    # Run predefined tasks whenever watched file patterns are added, changed or deleted.
    watch:
      scripts:
        files: "src/**/*.js"
        tasks: ["uglify"]
        options:
          interrupt: true

  grunt.loadNpmTasks "grunt-contrib-qunit"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["qunit", "clean", "uglify"]

