// Select elements
const form = document.getElementById('password-form');
const passwordList = document.getElementById('passwords');
const generateButton = document.getElementById('generate-password');

// Load saved passwords
document.addEventListener('DOMContentLoaded', () => {
  const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
  renderPasswords(savedPasswords);
});

// Save new password
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const site = document.getElementById('site').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const newPassword = { site, username, password };
  const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
  savedPasswords.push(newPassword);

  localStorage.setItem('passwords', JSON.stringify(savedPasswords));
  renderPasswords(savedPasswords);
  form.reset();
});

// Render passwords
function renderPasswords(passwords) {
  passwordList.innerHTML = '';
  passwords.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${entry.site} - ${entry.username}: ${entry.password}`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      passwords.splice(index, 1);
      localStorage.setItem('passwords', JSON.stringify(passwords));
      renderPasswords(passwords);
    });
    li.appendChild(deleteButton);
    passwordList.appendChild(li);
  });
}

// Generate password
generateButton.addEventListener('click', () => {
  const generatedPassword = generateRandomPassword();
  document.getElementById('password').value = generatedPassword;
});

// Password generator
function generateRandomPassword(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}
