# admin

Used to manage user accounts.

## Node.js configuration

We use NVM to control Node.js versions.

### NVM setup - Mac

Make the nvm folder
```
mkdir ~/.nvm  
```

Add to .bashrc:

```
# NVM
export NVM_DIR="$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"
```

Run

``` 
brew install nvm
```

## Installing deps and run commands

You will want to make sure your node version matches the projects by running:

```
	nvm use
```

You will then want to install all node packages. Run:

```
    pnpm install
```

In order to demo the project locally run:

```
    pnpm start
```

To lint and test run:

```
    pnpm test
```

To run unit testing to in watch mode run

```
    pnpm test:watch
```

## Test Coverage

We maintain 100% test coverage on this project. Coverage percentages will be printed to the terminal when you run `pnpm test`. This makes it easier for a code reviewer to determine if tests need to be worked on. Feel free to add coverage ignores for files or lines that given no value in unit testing.  If the coverage is less than 100% on your branch, here's how you can find out which code is not yet being tested:

* after running `pnpm test` you will see that an untracked `coverage` directory has been added to the root of the project. Copy the _full_ path to the `index.html` file within the `lcov-report` (it will be something like `file:///Users/your_name/projects_directory/time-cards-web/coverage/lcov-report/index.html`) folder and paste it into the address bar of your browser

* using the coverage report in the browser, identify which files have less than 100% coverage for statements, branches, functions, or lines and write tests to cover those cases
