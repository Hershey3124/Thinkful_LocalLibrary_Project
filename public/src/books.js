function findAuthorById(authors, id) {
  return authors.find(authorsobj => authorsobj.id === id);
}

function findBookById(books, id) {
  return books.find(booksobj => booksobj.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let didNotBorrow = books.filter((booksobj)=>{
    let {borrows} = booksobj;
    let whoBorrowed = borrows.every((borrowed) => {
      return borrowed.returned === true
    })
    return whoBorrowed
  })

  let DidBorrow = books.filter((booksobj) => {
    let {borrows} = booksobj
    let didNotBorrow = borrows.some((borrowed) => {
      return borrowed.returned === false 
    })
    return didNotBorrow
  })
return [DidBorrow, didNotBorrow]
}

function getBorrowersForBook(book={}, accounts) {
  let {borrows} = book
  let whoborrowed = borrows.map((borrowsobj) => {
    let total = accounts.find((accountsobj) => borrowsobj.id === accountsobj.id)
    total.returned = borrowsobj.returned 
    return total 
  })
  let borrowers = whoborrowed.slice(0,10)
  return borrowers
    
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
