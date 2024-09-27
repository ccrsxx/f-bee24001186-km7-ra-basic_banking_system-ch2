import { number, rawlist } from '@inquirer/prompts';
import { BankAccount, InsufficientBalanceError } from './bank_account.js';
import { spinner, quitCli, showLogo, quitOrBackToMenu } from './utils/ui.js';
import { formatCurrency } from './utils/helper.js';

export async function showMenu() {
  const bankAccount = new BankAccount();

  while (true) {
    await showLogo();

    try {
      const answer = await rawlist({
        message: 'Choose menu',
        choices: [
          {
            name: 'Check balance',
            value: 'checkBalance'
          },
          {
            name: 'Deposit',
            value: 'depositBalance'
          },
          {
            name: 'Withdraw',
            value: 'withdrawBalance'
          },
          {
            name: 'Reset',
            value: 'resetBalance'
          },
          {
            name: 'Quit',
            value: 'quitCli'
          }
        ]
      });

      if (answer === 'quitCli') quitCli();

      if (answer === 'checkBalance') {
        await showLogo();

        spinner.start();

        const currentBalance = await bankAccount.getCurrentBalance();

        spinner.success({
          text: `Current balance: ${formatCurrency(
            /** @type {number} */ (currentBalance)
          )}\n`
        });

        await quitOrBackToMenu();
      }

      if (answer === 'depositBalance') {
        await showLogo();

        const inputNumber = await number({
          message: 'Enter amount to deposit',
          validate: (value) => {
            const isNotValid = typeof value === 'number' && value <= 0;

            if (isNotValid) return 'Number of inputs must be greater than 0';

            return true;
          }
        });

        spinner.start();

        await bankAccount.deposit(/** @type {number} */ (inputNumber));

        spinner.success({
          text: `Deposited ${formatCurrency(
            /** @type {number} */ (inputNumber)
          )}\n`
        });

        await quitOrBackToMenu();
      }

      if (answer === 'withdrawBalance') {
        await showLogo();

        const inputNumber = await number({
          message: 'Enter amount to withdraw',
          validate: (value) => {
            const isNotValid = typeof value === 'number' && value <= 0;

            if (isNotValid) return 'Number of inputs must be greater than 0';

            return true;
          }
        });

        spinner.start();

        await bankAccount.withdraw(/** @type {number} */ (inputNumber));

        spinner.success({
          text: `Withdrawn ${formatCurrency(
            /** @type {number} */ (inputNumber)
          )}\n`
        });

        await quitOrBackToMenu();
      }

      if (answer === 'resetBalance') {
        await showLogo();

        spinner.start();

        await bankAccount.resetBalance();

        spinner.success({ text: 'Balance has been reset\n' });

        await quitOrBackToMenu();
      }
    } catch (error) {
      if (error instanceof InsufficientBalanceError) {
        spinner.error({ text: 'Insufficient balance\n' });

        const backToMenu = await quitOrBackToMenu();

        if (backToMenu) continue;
      }

      break;
    }
  }
}
