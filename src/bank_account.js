export class BankAccount {
  constructor() {
    this.balance = 0;
  }

  /** @returns {Promise<number>} */
  getCurrentBalance() {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.balance), 500)
    );
  }

  /** @returns {Promise<void>} */
  resetBalance() {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.balance = 0;
        resolve();
      }, 500)
    );
  }

  /**
   * @param {number} amount
   * @returns {Promise<void>}
   */
  deposit(amount) {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.balance += amount;
        resolve();
      }, 500)
    );
  }

  /**
   * @param {number} amount
   * @returns {Promise<void>}
   */
  withdraw(amount) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (this.balance < amount) {
          reject(new InsufficientBalanceError());
          return;
        }

        this.balance -= amount;

        resolve();
      }, 500)
    );
  }
}

export class InsufficientBalanceError extends Error {
  constructor() {
    super('Insufficient balance');
  }
}
