const input = document.querySelector('.input-1');
const input2 = document.getElementById('input2');
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector('ul');

let collection = JSON.parse(localStorage.getItem('book-authors'));

function Awesome(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

function displayBooks() {
  if (ul.querySelectorAll('li')) {
    Array.from(ul.querySelectorAll('li')).forEach((bookContainer) => {
      ul.removeChild(bookContainer);
    });
  }

  collection.forEach((book) => {
    const li = document.createElement('li');
    li.className = 'books-li';
    const author = document.createElement('p');
    author.className = 'paragraph-1';
    const bookName = document.createElement('p');
    bookName.className = 'paragraph-2';
    const deleteButton = document.createElement('button');
    deleteButton.id = book.id;
    deleteButton.className = 'remove-btn';
    deleteButton.textContent = 'remove';

    author.textContent = book.author;
    bookName.textContent = book.title;

    li.appendChild(author);
    li.appendChild(bookName);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
  // eslint-disable-next-line no-use-before-define
  assignRemoveBtn();
}
displayBooks();

function assignRemoveBtn() {
  if (collection.length) {
    const removeBtns = Array.from(document.querySelectorAll('.remove-btn'));

    removeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const array = [];
        collection.forEach((book) => {
          if (parseInt(btn.id, 10) !== book.id) {
            array.push(book);
          }
        });

        collection = array;
        localStorage.setItem('book-authors', JSON.stringify(collection));
        displayBooks();
      });
    });
  }
}

addBtn.addEventListener('click', () => {
  const inputs = new Awesome(input.value, input2.value, collection.length + 1);
  collection.push(inputs);

  localStorage.setItem('book-authors', JSON.stringify(collection));
  displayBooks();
});