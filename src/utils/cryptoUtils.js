// Caesar Cipher
export const caesarEncrypt = (text, shift) => {
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    })
    .join('');
};

export const caesarDecrypt = (text, shift) => {
  return caesarEncrypt(text, 26 - shift);
};

// Hill Cipher
const modInverse = (a, m) => {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
};

const getDeterminant = (matrix) => {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
};

const validateHillKey = (key) => {
  const matrix = [
    [parseInt(key[0]), parseInt(key[1])],
    [parseInt(key[2]), parseInt(key[3])]
  ];
  const det = getDeterminant(matrix);
  if (det === 0) {
    throw new Error('Invalid Hill key: determinant is zero');
  }
  const detMod = ((det % 26) + 26) % 26;
  if (modInverse(detMod, 26) === null) {
    throw new Error('Invalid Hill key: no modular inverse');
  }
  return matrix;
};

const textToNumbers = (text) => {
  return text
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .map(char => char.charCodeAt(0) - 65);
};

const numbersToText = (numbers) => {
  return numbers.map(num => String.fromCharCode((num % 26) + 65)).join('');
};

const padText = (text) => {
  if (text.length % 2 !== 0) {
    return text + 'X';
  }
  return text;
};

export const hillEncrypt = (text, key) => {
  const keyArray = key.trim().split(/\s+/);
  if (keyArray.length !== 4) {
    throw new Error('Hill cipher requires 4 numbers');
  }
  
  const matrix = validateHillKey(keyArray);
  const paddedText = padText(text.toUpperCase().replace(/[^A-Z]/g, ''));
  const numbers = textToNumbers(paddedText);
  const result = [];

  for (let i = 0; i < numbers.length; i += 2) {
    const vector = [numbers[i], numbers[i + 1]];
    const encrypted = [
      (matrix[0][0] * vector[0] + matrix[0][1] * vector[1]) % 26,
      (matrix[1][0] * vector[0] + matrix[1][1] * vector[1]) % 26
    ];
    result.push(...encrypted);
  }

  return numbersToText(result);
};

export const hillDecrypt = (text, key) => {
  const keyArray = key.trim().split(/\s+/);
  if (keyArray.length !== 4) {
    throw new Error('Hill cipher requires 4 numbers');
  }
  
  const matrix = validateHillKey(keyArray);
  const det = getDeterminant(matrix);
  const detMod = ((det % 26) + 26) % 26;
  const detInv = modInverse(detMod, 26);

  const inverseMatrix = [
    [
      ((detInv * matrix[1][1]) % 26 + 26) % 26,
      ((-detInv * matrix[0][1]) % 26 + 26) % 26
    ],
    [
      ((-detInv * matrix[1][0]) % 26 + 26) % 26,
      ((detInv * matrix[0][0]) % 26 + 26) % 26
    ]
  ];

  const numbers = textToNumbers(text);
  const result = [];

  for (let i = 0; i < numbers.length; i += 2) {
    const vector = [numbers[i], numbers[i + 1]];
    const decrypted = [
      (inverseMatrix[0][0] * vector[0] + inverseMatrix[0][1] * vector[1]) % 26,
      (inverseMatrix[1][0] * vector[0] + inverseMatrix[1][1] * vector[1]) % 26
    ];
    result.push(...decrypted);
  }

  return numbersToText(result);
};

// Vigenere Cipher
export const vigenereEncrypt = (text, key) => {
  if (!/^[a-zA-Z]+$/.test(key)) {
    throw new Error('Vigenere cipher requires LETTERS only in the key');
  }
  
  const keyUpper = key.toUpperCase();
  const keyLength = keyUpper.length;
  let keyIndex = 0;

  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        const shift = keyUpper.charCodeAt(keyIndex % keyLength) - 65;
        keyIndex++;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    })
    .join('');
};

export const vigenereDecrypt = (text, key) => {
  if (!/^[a-zA-Z]+$/.test(key)) {
    throw new Error('Vigenere cipher requires LETTERS only in the key');
  }
  
  const keyUpper = key.toUpperCase();
  const keyLength = keyUpper.length;
  let keyIndex = 0;

  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        const shift = keyUpper.charCodeAt(keyIndex % keyLength) - 65;
        keyIndex++;
        return String.fromCharCode(((code - base - shift + 26) % 26) + base);
      }
      return char;
    })
    .join('');
};

// Entropy calculation
export const calculateEntropy = (text) => {
  const frequencies = {};
  for (let char of text) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  
  let entropy = 0;
  const length = text.length;
  
  for (let char in frequencies) {
    const probability = frequencies[char] / length;
    entropy -= probability * Math.log2(probability);
  }
  
  return entropy;
};

// Avalanche effect calculation
export const calculateAvalanche = (originalText, encrypted1, encrypted2) => {
  if (encrypted1.length !== encrypted2.length) return 0;
  
  let differences = 0;
  for (let i = 0; i < encrypted1.length; i++) {
    if (encrypted1[i] !== encrypted2[i]) {
      differences++;
    }
  }
  
  return (differences / encrypted1.length) * 100;
};

