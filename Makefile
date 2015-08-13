PROJECT_ROOT_DIR=/home/pi/projects/sites/portfolio
SASS_SCSS_DIR=www/wp-content/themes/portfolio/scss
SASS_SCSS_MAIN=$(SASS_SCSS_DIR)/main.scss
SASS_CSS_BUILD_DIR=www/wp-content/themes/portfolio/styles
SASS_CSS_BUILD_MAIN_CSS=$(SASS_BUILD_DIR)/main.css
SASS_CSS_BUILD_MAIN_MAP=$(SASS_BUILD_DIR)/main.css.map
RELATIVE_JS_DIR=www/wp-content/themes/portfolio/javascript
ROOT_JS_DIR=$(PROJECT_ROOT_DIR)/$(RELATIVE_JS_DIR)
JS_EXCLUDES='["jquery", "velocity-animate"]'

restart: build
	sudo service apache2 restart

sass: FORCE
	mkdir -p $(SASS_CSS_BUILD_DIR)
	sass --update --style compressed $(SASS_SCSS_DIR):$(SASS_CSS_BUILD_DIR)

watch-sass: FORCE
	mkdir -p $(SASS_CSS_BUILD_DIR)
	sass --watch --style expanded $(SASS_SCSS_DIR):$(SASS_CSS_BUILD_DIR)

browserify: FORCE
	cd $(ROOT_JS_DIR) ; node ./node_modules/gulp/bin/gulp.js js-deps\
    --gulpfile $(ROOT_JS_DIR)/gulpfile.js\
    --base_js $(RELATIVE_JS_DIR)\
    --entry_js '{"JS_IN":"main.js"}'\
    --exclude_js $(JS_EXCLUDES)\
    --compiled_js $(RELATIVE_JS_DIR)/build\
    --base $(PROJECT_ROOT_DIR)

watch-browserify: FORCE
	cd $(ROOT_JS_DIR) ; node ./node_modules/gulp/bin/gulp.js watch-js\
    --gulpfile $(ROOT_JS_DIR)/gulpfile.js\
    --base_js $(RELATIVE_JS_DIR)\
    --entry_js '{"JS_IN":"main.js"}'\
    --exclude_js $(JS_EXCLUDES)\
    --compiled_js $(RELATIVE_JS_DIR)/build\
    --base $(PROJECT_ROOT_DIR)

watch: FORCE
	cd $(ROOT_JS_DIR) ; node ./node_modules/gulp/bin/gulp.js watch\
    --gulpfile $(ROOT_JS_DIR)/gulpfile.js\
    --base_js $(RELATIVE_JS_DIR)\
    --entry_js '{"JS_IN":"main.js"}'\
    --exclude_js $(JS_EXCLUDES)\
    --compiled_js $(RELATIVE_JS_DIR)/build\
    --base_sass $(SASS_SCSS_DIR)\
    --compiled_sass $(SASS_CSS_BUILD_DIR)\
    --entry_sass '[{"SASS_IN":"main.scss"}]'\
    --base $(PROJECT_ROOT_DIR)

build: FORCE
	cd $(ROOT_JS_DIR) ; node ./node_modules/gulp/bin/gulp.js build\
    --gulpfile $(ROOT_JS_DIR)/gulpfile.js\
    --base_js $(RELATIVE_JS_DIR)\
    --entry_js '{"JS_IN":"main.js"}'\
    --exclude_js $(JS_EXCLUDES)\
    --compiled_js $(RELATIVE_JS_DIR)/build\
    --base_sass $(SASS_SCSS_DIR)\
    --compiled_sass $(SASS_CSS_BUILD_DIR)\
    --entry_sass '[{"SASS_IN":"main.scss"}]'\
    --base $(PROJECT_ROOT_DIR)

FORCE:
