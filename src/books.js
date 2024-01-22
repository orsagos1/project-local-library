/* returns the author object that has the matching ID */
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
};

/* returns the book object that has the matching ID */
function findBookById(books, id) {
  return books.find(book => book.id === id);
};

/* returns an array with two arrays inside of it. all of the inputted books are present in either the first or second array. */
function partitionBooksByBorrowedStatus(books) {
  /* Separate books into two arrays based on their borrow status */
  const checkedOutBooks = books.filter(book => !book.borrows[0].returned);
  const returnedBooks = books.filter(book => book.borrows[0].returned);
  /* Return array containing two arrays */
  return [checkedOutBooks, returnedBooks];
};

/* return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's borrows array. each account object should include the returned entry from the corresponding transaction object in the borrows array. */
function getBorrowersForBook(book, accounts) {
  const borrowedAccounts = book.borrows.map(borrow => {
    const account = accounts.find(acc => acc.id === borrow.id);
    return {...account, returned: borrow.returned};
  });
  return borrowedAccounts.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
