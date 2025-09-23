deploy:
	npm run build
	firebase deploy

test:
	npm test

test-deploy: test
	npm run build
	firebase deploy