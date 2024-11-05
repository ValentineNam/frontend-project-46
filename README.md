## Badges
#### Hexlet tests and linter status:
[![Actions Status](https://github.com/ValentineNam/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ValentineNam/frontend-project-46/actions)

#### Node CI status:
[![Node CI](https://github.com/ValentineNam/frontend-project-46/actions/workflows/node-check.yml/badge.svg)](https://github.com/ValentineNam/frontend-project-46/actions/workflows/node-check.yml)

#### Codeclimate status:
[![Maintainability](https://api.codeclimate.com/v1/badges/5e6835640b85ed3b0c8d/maintainability)](https://codeclimate.com/github/ValentineNam/frontend-project-46/maintainability)

#### Codeclimate Test Coverage:
[![Test Coverage](https://api.codeclimate.com/v1/badges/5e6835640b85ed3b0c8d/test_coverage)](https://codeclimate.com/github/ValentineNam/frontend-project-46/test_coverage)

# Difference generator
This program compares two files and generates the difference between them.
It can accept input files in the following formats: json, yml, yaml.
Examples of usage are in the [Usage](#usage) section.

## Setup

```bash
git clone https://github.com/ValentineNam/frontend-project-46.git
cd frontend-project-46
make install
```

### Usage

```bash
gendiff -h

  Usage: gendiff [options] <filepath1> <filepath2>

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -f, --format [type]  output format
    -h, --help           output usage information
```

[![asciicast](https://asciinema.org/a/1uMmqbNIVHze4dj7UDEUctt67.svg)](https://asciinema.org/a/1uMmqbNIVHze4dj7UDEUctt67)

#### Stylish formatter
[![asciicast](https://asciinema.org/a/Aj6dvplDMgE1puY5g8o6Nfcav.svg)](https://asciinema.org/a/Aj6dvplDMgE1puY5g8o6Nfcav)

#### Plain formatter
[![asciicast](https://asciinema.org/a/Z2TjM8fMfofueZZekWW2KqA6J.svg)](https://asciinema.org/a/Z2TjM8fMfofueZZekWW2KqA6J)

#### JSON formatter
[![asciicast](https://asciinema.org/a/Cqjpjk196oPzmHIsdwm0zmvmQ.svg)](https://asciinema.org/a/Cqjpjk196oPzmHIsdwm0zmvmQ)