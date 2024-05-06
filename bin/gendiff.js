#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .version('0.1.1')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  // .option('-h, --help', 'output usage information')

program.parse();
