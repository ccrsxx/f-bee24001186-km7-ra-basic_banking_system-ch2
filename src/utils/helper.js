import figlet from 'figlet';

const CURRENCY_FORMATTER = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
});

/**
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency(value) {
  return CURRENCY_FORMATTER.format(value);
}

/**
 * @param {string} message
 * @returns {Promise<string>}
 */
export async function figletAsync(message) {
  return new Promise((resolve, reject) =>
    figlet(message, (err, data) => {
      if (err) reject(err);

      resolve(/** @type {string} */ (data));
    })
  );
}

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
