// eslint-disable-next-line max-classes-per-file
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
    const row = document.createElement('ul');
    row.className = 'ul-list';
    row.innerHTML = `
         <li id="none">${book.id}</li>
         <li class"li-content">${book.title}</li>
         <li class"li-content">${book.author}</li>
         
         <button class="delete">Remove</button>`;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
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
