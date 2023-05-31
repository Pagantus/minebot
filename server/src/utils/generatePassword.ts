const generatePassword = (length: number): string => {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()';

  let password =
    lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)] +
    upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

  const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

  for (let i = 4; i < length; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
};
