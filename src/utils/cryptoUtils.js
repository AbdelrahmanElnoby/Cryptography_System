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

// DES Cipher (using crypto-js - imported in component)
// Note: These functions expect CryptoJS to be passed from the component
export const desEncrypt = (text, key, CryptoJS) => {
  if (!key || key.length < 8) {
    throw new Error('DES requires a key of at least 8 characters');
  }
  if (!CryptoJS) {
    throw new Error('CryptoJS library is required for DES encryption');
  }
  try {
    return CryptoJS.DES.encrypt(text, key).toString();
  } catch (error) {
    throw new Error('DES encryption failed: ' + error.message);
  }
};

export const desDecrypt = (text, key, CryptoJS) => {
  if (!key || key.length < 8) {
    throw new Error('DES requires a key of at least 8 characters');
  }
  if (!CryptoJS) {
    throw new Error('CryptoJS library is required for DES decryption');
  }
  try {
    const decrypted = CryptoJS.DES.decrypt(text, key);
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Decryption failed - invalid key or ciphertext');
    }
    return result;
  } catch (error) {
    throw new Error('DES decryption failed: ' + error.message);
  }
};

// Playfair Cipher
const generatePlayfairKey = (key) => {
  const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const keySet = new Set();
  const keyMatrix = [];
  
  // Add key characters
  for (let char of keyUpper) {
    if (!keySet.has(char)) {
      keySet.add(char);
      keyMatrix.push(char);
    }
  }
  
  // Add remaining alphabet (I and J are treated as same)
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    if (char !== 'J' && !keySet.has(char)) {
      keyMatrix.push(char);
    }
  }
  
  // Create 5x5 matrix
  const matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(keyMatrix.slice(i * 5, (i + 1) * 5));
  }
  
  return matrix;
};

const findInMatrix = (matrix, char) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  return null;
};

const prepareText = (text) => {
  let prepared = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const pairs = [];
  
  for (let i = 0; i < prepared.length; i += 2) {
    if (i + 1 < prepared.length) {
      if (prepared[i] === prepared[i + 1]) {
        pairs.push([prepared[i], 'X']);
        i--;
      } else {
        pairs.push([prepared[i], prepared[i + 1]]);
      }
    } else {
      pairs.push([prepared[i], 'X']);
    }
  }
  
  return pairs;
};

export const playfairEncrypt = (text, key) => {
  if (!key || key.length === 0) {
    throw new Error('Playfair cipher requires a key');
  }
  
  const matrix = generatePlayfairKey(key);
  const pairs = prepareText(text);
  let result = '';
  
  for (let [char1, char2] of pairs) {
    const pos1 = findInMatrix(matrix, char1);
    const pos2 = findInMatrix(matrix, char2);
    
    if (!pos1 || !pos2) continue;
    
    let [r1, c1] = pos1;
    let [r2, c2] = pos2;
    
    if (r1 === r2) {
      // Same row
      c1 = (c1 + 1) % 5;
      c2 = (c2 + 1) % 5;
    } else if (c1 === c2) {
      // Same column
      r1 = (r1 + 1) % 5;
      r2 = (r2 + 1) % 5;
    } else {
      // Rectangle
      [c1, c2] = [c2, c1];
    }
    
    result += matrix[r1][c1] + matrix[r2][c2];
  }
  
  return result;
};

export const playfairDecrypt = (text, key) => {
  if (!key || key.length === 0) {
    throw new Error('Playfair cipher requires a key');
  }
  
  const matrix = generatePlayfairKey(key);
  const pairs = prepareText(text);
  let result = '';
  
  for (let [char1, char2] of pairs) {
    const pos1 = findInMatrix(matrix, char1);
    const pos2 = findInMatrix(matrix, char2);
    
    if (!pos1 || !pos2) continue;
    
    let [r1, c1] = pos1;
    let [r2, c2] = pos2;
    
    if (r1 === r2) {
      // Same row
      c1 = (c1 - 1 + 5) % 5;
      c2 = (c2 - 1 + 5) % 5;
    } else if (c1 === c2) {
      // Same column
      r1 = (r1 - 1 + 5) % 5;
      r2 = (r2 - 1 + 5) % 5;
    } else {
      // Rectangle
      [c1, c2] = [c2, c1];
    }
    
    result += matrix[r1][c1] + matrix[r2][c2];
  }
  
  return result;
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



