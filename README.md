# NodeJsGMP2020Q3RuGroup1_Kondratskii

## Task 1

`cd task1` and then run task:

- `npm run task1-1`
- `npm run task1-2`
- `npm run task1-3`

## Task 2

### Overview

Task was done with TypeScript, ESLint and validation. File `.eslintrc` which was provided was incompatible with current project, so it was slightly changed to make it work with TypeScript and last version of ESLint.

First of all, `max-len` rule was changed. I have no idea, why, but newer versions of eslint throws error when in this rule escape symbol for equal sign is used (look at [this page on overflow](https://stackoverflow.com/questions/40776347/why-dont-i-have-to-escape-equal-sign) to see the philosophical question).


```sh
cd ./task2

# to run for development:
npm run dev
# or to build TS and start:
npm start
```

You can find Postman's collections with examples of requests in `postman` folder in root of repository.