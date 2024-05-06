#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .version('0.1.1')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((path1, path2, opts) => {
    // console.log(`result will be here`);
    gendiff(path1, path2, opts);
  });

program.parse(process.argv);
