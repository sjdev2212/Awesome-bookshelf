class BookShelf {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBooks(book) {
    const books = BookShelf.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBooks(x) {
    const books = BookShelf.getBooks();
    const booksFiltered = [];
    for (let i = 0; i < books.length; i += 1) {
      // eslint-disable-next-line eqeqeq
      if (books[i].id != x) {
        booksFiltered.push(books[i]);
      }
    }

    localStorage.setItem('books', JSON.stringify(booksFiltered));
  }

  static displayBooks() {
    const books = BookShelf.getBooks();
    books.forEach((book) => {
      BookShelf.addBookToShelf(book);
    });
  }

  static addBookToShelf(book) {
    const list = document.querySelector('#info');
    const row = document.createElement('div');
    row.className = 'books-added';
    row.innerHTML = `
    
         <p id="none">${book.id}</p>
         <span class="items ">${book.title}</span>
         <span class="items ">by:</span>
         <span class="items ">${book.author}</span>
         
         <button class="remove-btn">Remove</button>`;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.remove();
    }
  }

  static reset() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', BookShelf.displayBooks());
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Date.now();
  const book = new BookShelf(title, author, id);
  BookShelf.addBookToShelf(book);
  BookShelf.addBooks(book);
  BookShelf.reset();
});
document.getElementById('info').addEventListener('click', (e) => {
  BookShelf.deleteBook(e.target);
  BookShelf.removeBooks(e.target.parentElement.firstElementChild.textContent);
});

// navigation-------------

function showSection(x) {
  const list = document.getElementById('book-list');
  const addNew = document.getElementById('add-new');
  const contact = document.getElementById('contact');

  if (x === 'book-list') {
    list.style.display = 'block';
    addNew.style.display = 'none';
    contact.style.display = 'none';
  } else if (x === 'add-new') {
    list.style.display = 'none';
    addNew.style.display = 'block';
    contact.style.display = 'none';
  } else if (x === 'contact') {
    list.style.display = 'none';
    addNew.style.display = 'none';
    contact.style.display = 'block';
  }
}
showSection();
function setDate() {
  const date = document.getElementById('time');

  // eslint-disable-next-line no-undef
  const { DateTime } = luxon;

  date.innerHTML = DateTime.now().toFormat('LLL dd yyyy, t');
}
setDate();