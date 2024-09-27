#!/usr/bin/env node

import { showMenu } from './banking_system.js';
import { quitCli } from './utils/ui.js';

async function main() {
  await showMenu();
  await quitCli();
}

void main();
