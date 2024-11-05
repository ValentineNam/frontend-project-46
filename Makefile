install:	install-deps

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

gendiff:
	node src/gendiff.js

test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8