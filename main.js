import { DateTime } from './modules/luxon.min.js';
import BookDB from './modules/myBooks.js';

const myBookDB = new BookDB();
const form = document.forms[0];
const menuItems = document.querySelectorAll('.nav-link');

menuItems.forEach((menuItem) => menuItem.addEventListener('click', () => {
  const show = menuItem.getAttribute('data-section');
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove('active');
  });
  menuItem.classList.add('active');
  const toggleSections = document.querySelectorAll('.content-area');
  toggleSections.forEach((el) => {
    el.classList.add('d-none');
    document.getElementById(show).classList.remove('d-none');
  });
}));

window.onload = () => { myBookDB.displayBooks(); };

setInterval(() => {
  const currentDate = DateTime.now().setLocale('en-US').toLocaleString(DateTime.DATETIME_MED);
  document.getElementById('timer').innerHTML = `${currentDate}`;
}, 1000);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  myBookDB.addBook(form.elements.title.value, form.elements.author.value);
  form.reset();
});