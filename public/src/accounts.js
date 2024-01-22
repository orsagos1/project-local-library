/* returns the account object that has the matching ID */
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
};

/* returns a sorted array of the provided account objects. The objects are sorted alphabeetically by last name. */
function sortAccountsByLastName(accounts) {
  /* Use the sort() method */
  accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? -1 : 1));
  return accounts;
};

/* returns a _number_ that represents the number of times the account's ID appears in any book's 'borrows' array */
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  /* Use reduce() method */
  const totalBorrows = books.reduce((acc, book) => {
    /* Use filter() method to get an array of borrows by the account ID */
    const totalBorrows = book.borrows.filter(borrow => borrow.id === accountId);
    acc += totalBorrows.length;
    return acc;
  }, 0);
  return totalBorrows;
};

/* returns an array of book objects that represents all books currently checked out by the given account */
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  return books
  .filter((book) => book.borrows.some(
    (borrow) => borrow.id === accountId && borrow.returned === false
  )
 )
 .map((book) => {
  const author = authors.find((author) => author.id === book.authorId);
  return {...book, author};
 });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
