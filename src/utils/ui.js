import gradient from 'gradient-string';
import { confirm } from '@inquirer/prompts';
import { createSpinner } from 'nanospinner';
import { figletAsync } from './helper.js';
import { CancelPromptError, ExitPromptError } from '@inquirer/core';

export const spinner = createSpinner('Loading...');

export async function showLogo() {
  console.clear();

  const figletString = await figletAsync('Banking uWu :3');

  console.log(gradient.pastel.multiline(figletString));
}

export async function quitCli() {
  console.clear();

  const figletString = await figletAsync('Good Bye!');

  console.log(gradient.pastel.multiline(figletString));

  process.exit(0);
}

export async function quitOrBackToMenu() {
  const answerPrompt = confirm({
    message: 'Do you want to back to menu?'
  });

  try {
    const backToMenu = await answerPrompt;

    if (!backToMenu) quitCli();

    return true;
  } catch (err) {
    if (err instanceof CancelPromptError) return false;
    if (err instanceof ExitPromptError) await quitCli();

    console.log('Error has occurred!');

    return false;
  }
}
