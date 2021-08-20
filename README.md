# Angular Starter

Angular starter project with routing and SCSS that uses the following packages: [angular-fontawesome](https://www.npmjs.com/package/@fortawesome/angular-fontawesome) and [ng-bootstrap](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap).

Check out [this blog post](https://peterrhodes.dev/blog/post/angular-getting-started) for more details.

## Get the code

Use one of the methods given below to get the project source code on your local machine.

### Clone

SSH:

```bash
git clone git@github.com:peterrhodesdev/angular-starter.git
```

HTTPS:

```bash
git clone https://github.com/peterrhodesdev/angular-starter.git
```

GitHub CLI:

```bash
gh repo clone peterrhodesdev/angular-starter
```

### Fork and clone

```bash
gh repo fork peterrhodesdev/angular-starter --clone=true
```

### Add a remote + pull

```bash
mkdir angular-starter
cd angular-starter
git init
git remote add angular-starter git@github.com:peterrhodesdev/angular-starter.git
git pull angular-starter main
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
