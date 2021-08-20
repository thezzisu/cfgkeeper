#!/usr/bin/env node
import './prelude'

import yargs from 'yargs'
import { checkHeader } from './parser'

void yargs
  .command(
    ['sync', '$0'],
    'Synchronize all config files',
    yargs =>
      yargs
        .option('machine', { demandOption: true, type: 'string' })
        .option('user', { type: 'string' }),
    argv => {
      if (argv.user) {
        //
      } else {
        //
      }
    }
  )
  .command('check', 'Check CfgKeeper repo', () => {}, argv => {
    //
  })
  .command(
    'test <path>',
    'Test a config template',
    yargs =>
      yargs.positional('path', { type: 'string', demandOption: true }),
    argv => {
      void checkHeader(argv.path)
    }
  )
  .argv
