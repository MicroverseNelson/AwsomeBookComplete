let myLibrary = [];
let storage = [];

const bookShelf = document.querySelector('.books-list');
const titleInput = document.querySelector('.titleInput');
const authorInput = document.querySelector('.authorInput');
const addBtn = document.querySelector('.add');

storage = JSON.parse(localStorage.getItem('books')) || [];

function addBook(book, titleInput, authorInput) {
  book.titleInput = titleInput;
  book.authorInput = titleInput;

  const bookLabel = document.createElement('article');
  const bookText = document.createElement('h4');
  const deleteButton = document.createElement('button');

  bookLabel.classList.add('bookLabel');
  bookText.classList.add('bookText');
  deleteButton.classList.add('btn');
  deleteButton.classList.add('delete');

  bookShelf.appendChild(bookLabel);
  bookLabel.appendChild(bookText);
  bookLabel.appendChild(deleteButton);

  bookText.textContent = `"${titleInput}" by ${authorInput}`;
  deleteButton.textContent = 'Delete';

  const l = bookLabel.style;
  l.display = 'flex';
  l.alignItems = 'center';

  deleteButton.style.margin = '0 5px';
  deleteButton.style.flex = '1';
  bookText.style.flex = '7';
  deleteButton.style.transform = 'translateX(0)';
  deleteButton.style.height = '45px';

  deleteButton.addEventListener('click', (event) => {
    event.target.parentNode.remove();
    book.remove();
  });
}

class Books {
  constructor(titleInput, authorInput) {
    this.titleInput = titleInput;
    this.authorInput = authorInput;
  }

  add() {
    myLibrary.push(this);
    addBook(this, titleInput.value, authorInput.value);
    localStorage.setItem('books', JSON.stringify(myLibrary));
  }

  remove() {
    myLibrary = myLibrary.filter((element) => element !== this);
    localStorage.setItem('books', JSON.stringify(myLibrary));
  }
}
for (let i = 0; i < storage.length; i += 1) {
  const book = new Books();
  book.titleInput = storage[i].titleInput;
  book.authorInput = storage[i].authorInput;
  myLibrary.push(book);
  addBook(myLibrary[i], myLibrary[i].titleInput, myLibrary[i].authorInput);
}
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const book = new Books();
  book.add();
});