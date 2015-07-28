PROJECT_ROOT_DIR=/home/pi/projects/sites/portfolio
SASS_SCSS_DIR=$(PROJECT_ROOT_DIR)/www/wp-content/themes/portfolio/scss
SASS_SCSS_MAIN=$(SASS_SCSS_DIR)/main.scss
SASS_CSS_BUILD_DIR=$(PROJECT_ROOT_DIR)/www/wp-content/themes/portfolio/styles
SASS_CSS_BUILD_MAIN_CSS=$(SASS_BUILD_DIR)/main.css
SASS_CSS_BUILD_MAIN_MAP=$(SASS_BUILD_DIR)/main.css.map
ROOT_JS_DIR=$(PROJECT_ROOT_DIR)/www/wp-content/themes/portfolio/javascript

restart: sass browserify
	sudo service apache2 restart

sass: FORCE
	mkdir -p $(SASS_CSS_BUILD_DIR)
	sass --update --style compressed $(SASS_SCSS_DIR):$(SASS_CSS_BUILD_DIR)

watch-sass: FORCE
	mkdir -p $(SASS_CSS_BUILD_DIR)
	sass --watch --style expanded $(SASS_SCSS_DIR):$(SASS_CSS_BUILD_DIR)

browserify: FORCE
	cd $(ROOT_JS_DIR) ; node ./node_modules/gulp/bin/gulp.js bundle

watch-browserify: FORCE
	cd $(ROOT_JS_DIR) ; node ./node_modules/gulp/bin/gulp.js watch

build-deps: FORCE
	cd $(ROOT_JS_DIR) ; node ./node_modules/gulp/bin/gulp.js dependencies

FORCE:
