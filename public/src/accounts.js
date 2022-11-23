function findAccountById(accounts, id) {
 return accounts.find(accountobj => accountobj.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((A1, A2) => A1.name.last > A2.name.last ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((bookobj) => {
    let {borrows} = bookobj;
    borrows.forEach((borrowsobj)=>{ 
      if (borrowsobj.id === account.id) {
      total++;
      }
    })
  })
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksborrowed = books.filter((bookobj)=> {
    let {borrows} = bookobj;
    let matchingborrower = borrows.find((borrowsobj)=>{
      return borrowsobj.id === account.id && borrowsobj.returned === false
    })
    return matchingborrower
  })
  let value = booksborrowed.map((booksobj)=>{
    let {authorId} = booksobj;
    let matchingauthor = authors.find((authorobj)=>{
      return authorobj.id === authorId
    })
    booksobj.author = matchingauthor;

    return booksobj
  })
  return value
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
