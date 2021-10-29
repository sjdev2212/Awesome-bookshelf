/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
class BookShelf {
  constructor(title, author, id) {
    // eslint-disable-next-line no-unused-expressions
    this.title = title;
    this.author = author;
    this.id = id;
  }
}
class DisplayBookShelf {
  static displayBooks() {
    // eslint-disable-next-line no-use-before-define
    const books = StoredLocal.getBooks();
    books.forEach((book) => {
      DisplayBookShelf.addBookToShelf(book);
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

class StoredLocal {
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
    const books = StoredLocal.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBooks(x) {
    const books = StoredLocal.getBooks();
    const booksFiltered = [];
    for (let i = 0; i < books.length; i += 1) {
      // eslint-disable-next-line eqeqeq
      if (books[i].id != x) {
        booksFiltered.push(books[i]);
      }
    }

    localStorage.setItem('books', JSON.stringify(booksFiltered));
  }
}

document.addEventListener('DOMContentLoaded', DisplayBookShelf.displayBooks());
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Date.now();
  const book = new BookShelf(title, author, id);
  DisplayBookShelf.addBookToShelf(book);
  StoredLocal.addBooks(book);
  DisplayBookShelf.reset();
});
document.getElementById('info').addEventListener('click', (e) => {
  DisplayBookShelf.deleteBook(e.target);
  StoredLocal.removeBooks(e.target.parentElement.firstElementChild.textContent);
});

// luxon time

const time = document.getElementById('time');

const timeNow = luxon.DateTime.now().toFormat('LLL dd yyyy, t');
time.innerHTML = timeNow;

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
