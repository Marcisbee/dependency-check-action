# Dependency Checker Action
This action checks if JavaScript dependencies are used but missing from package.json file.

Example of failed check:
![image](https://user-images.githubusercontent.com/16621507/76079779-13d69680-5fae-11ea-8a07-6b7fdb26d896.png)

## Inputs
### `PATH`

Relative path to project. Default value: `"."`.

### `IGNORE_PACKAGES`

List of packages to ignore from being reported as missing. Default value: `[]`.

### `IGNORE_FILES`

List of files to ignore from being checked. Default value: `[]`.

## Example usage
Example usage of dependency checker that will check `/projects/server` used code and compare to `/projects/server/package.json` listed dependencies:

> This example case will ignore @babel/core dependency and will ignore files that end with `.test.js` and `customfile.js`.

```yaml
name: Check
runs-on: ubuntu-latest
steps:
  - uses: Marcisbee/dependency-check-action
    with:
      PATH: "/projects/server"
      IGNORE_PACKAGES:
        - @babel/core
      IGNORE_FILES:
        - .test.js
        - /customfile.js
```
