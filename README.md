# Angular generic API service

Angular project for a generic API service that uses [class-transformer](https://www.npmjs.com/package/class-transformer).

The dependency packages for the demo components are:
- [angular-fontawesome](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)
- [http-status-codes](https://www.npmjs.com/package/http-status-codes)
- [ng-bootstrap](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap)

Check out [this blog post](https://peterrhodes.dev/blog/post/angular-generic-api-service) for more details.

[DEMO](https://peterrhodesdev.github.io/angular-generic-api-service/)

## Get the code

Use one of the methods given below to get the project source code on your local machine.

### Clone

SSH:

```bash
git clone git@github.com:peterrhodesdev/angular-generic-api-service.git
```

HTTPS:

```bash
git clone https://github.com/peterrhodesdev/angular-generic-api-service.git
```

GitHub CLI:

```bash
gh repo clone peterrhodesdev/angular-generic-api-service
```

### Fork and clone

```bash
gh repo fork peterrhodesdev/angular-generic-api-service --clone=true
```

### Add a remote + pull

```bash
mkdir angular-generic-api-service
cd angular-generic-api-service
git init
git remote add angular-generic-api-service git@github.com:peterrhodesdev/angular-generic-api-service.git
git pull angular-generic-api-service main
```

## Install dependencies

In the project root directory run

```bash
npm install
```

## Run

Start up a development server by running the following command in the project root directory

```bash
ng serve
```

Once the project has compiled successfully, open a web browser and navigate to `http://localhost:4200/`.

> These two steps can be combined by running `ng serve -o`, which will open the app automatically in your default browser.

To stop the app, go back to the terminal window and press `ctrl + C`.

## Test

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
