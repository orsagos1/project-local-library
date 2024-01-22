/* Return the number of book objects inside of the arra */
function getTotalBooksCount(books) {
  let totalBooks = books.length;
  return totalBooks;
};

/* Return number of account objects inside of the array */
function getTotalAccountsCount(accounts) {
  let totalAccounts = accounts.length;
  return totalAccounts;
};

/* Return the number of books that are currently checked out of the library */
function getBooksBorrowedCount(books) {
  const borrowedBooks = books.filter(book => book.borrows.some(transaction => !transaction.returned));
  return borrowedBooks.length;
};

/* Return an array containing 5 objects or fewer that represents the most common occurring genres, ordered from most common to least. */
function getMostCommonGenres(books) {
  // Want to define an open array to return the objects
  const commonGenres = {};
  // Search through the books object and count each genre
  books.forEach(book => {
    const genre = book.genre;
    commonGenres[genre] = (commonGenres[genre] || 0) + 1;
  });
  // Convert the object into an array of objects with the name and count keys
  const genreArray = Object.keys(commonGenres).map(genre => ({
    name: genre,
    count: commonGenres[genre],
  }));
  // Sort the array in descending order based on the count
  genreArray.sort((a, b) => b.count - a.count);
  // Return the array up to 5 objects
  return genreArray.slice(0, 5);
};

/* Return an array containing five objects or fewer that represents the most popular books in the library. Popularity = # of times a book has been borrowed. */
function getMostPopularBooks(books) {
  // Define an open array to return the objects
  const popularBooks = [];
  // Search through each book and get the number of borrows
  books.forEach(book => {
    const borrowed = book.borrows.length;
    popularBooks.push({name: book.title, count: borrowed}); 
  });
  // Sort the array based on the borrow count in descending order
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  // Return the array up to 5 objects
  return popularBooks.slice(0, 5);
};

function getMostPopularAuthors(books, authors) {
  // Create an object to store the borrow count for each author
  const authorBorrowCount = {};
  // Search through each book and add the borrow count for each author
  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    const borrowCount = book.borrows.length;

    // Update the borrow count for the author
    authorBorrowCount[authorName] = (authorBorrowCount[authorName] || 0) + borrowCount;
  });
  // Convert the object into an array of objects
  const authorArray = Object.keys(authorBorrowCount).map(authorName => ({
    name: authorName,
    count: authorBorrowCount[authorName],
  }));
  // Sort the array based on the borrow count in descending order
  authorArray.sort((authorA, authorB) => authorB.count - authorA.count);

  // Return only the top 5 most popular authors or fewer
  return authorArray.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
