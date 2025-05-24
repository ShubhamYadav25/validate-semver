# SemVer Validator GitHub Action
*A Clean, Responsive Tool to Validate Semantic Versioning Strings*

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-SemVer--Validator-green.svg?logo=github&logoColor=white&style=flat&labelColor=2ea44f)](https://github.com/marketplace/actions/validate-semver)

Validate whether a given version string follows [Semantic Versioning 2.0.0](https://semver.org/) format. Lightweight and dependency-free!

## 🚀 Features

- ✅ Validates SemVer 2.0.0 strings  
- 🔒 Zero dependencies  
- ⚡ Fast, pure JavaScript implementation  
- 🎯 Fails workflow if version is invalid

## 📦 Installation

You can use this GitHub Action in any workflow by referencing it like this:

## 📥 Inputs

This action accepts the following input:

| Name      | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `version` | ✅ A string that should comply with [Semantic Versioning 2.0.0](https://semver.org/). If the version is valid, the workflow continues. Otherwise, it fails immediately. |

```yaml
- uses: ShubhamYadav25/validate-semver@v1.0.0
  with:
    version: '1.2.3-alpha+build.456'
```

## 🧪 Example Usage
```yaml
name: Validate SemVer on Push

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Validate SemVer string
        uses: ShubhamYadav25/validate-semver@v1.0.0
        with:
          version: 'version'
```

## 🖥️ UI: Try SemVer Validation in Browser

Want to manually check your version string before running the action?

🔗 **Check out the interactive demo of this tool at:**  
🌐 [https://semver-validator.onrender.com](https://semver-validator.onrender.com)

## 🧑‍💻 Contributing
Feel free to open issues or pull requests! The validator logic is implemented in pure JavaScript in SemVerValidator.js

## 🌐 Live Demo
Check out the interactive demo of this tool at
🔗 semver-validator.onrender.com
