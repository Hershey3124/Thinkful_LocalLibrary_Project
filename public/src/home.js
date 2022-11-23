function getTotalBooksCount(books=[]) {
  return books.length
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
let returnedBooks = books.reduce((total,booksobj) => {
let {borrows} = booksobj
let booksborrowed = borrows.some((borrowsobj) => {
  return borrowsobj.returned === false
})
  if(booksborrowed === true){
    total++
  }
  return total
},0)

return returnedBooks

}


function getMostCommonGenres(books) {
  let obj = {}
  books.forEach((bookobj) => {
    const {genre} = bookobj;
    if(obj.hasOwnProperty(genre)){
      obj[genre] += 1;
    }else{
      obj[genre] =1
    }
  })
  const genreArray = Object.keys(obj)

  let total = genreArray.map((genre) =>{
    let count = obj[genre];
    let genreobj = {name : genre, count: count}
    return genreobj;
  })
  total.sort((a,b) => b.count - a.count)
  return total.slice(0,5)
}

function getMostPopularBooks(books) {
  books.sort((bookA, bookB) => {
    bookB.borrows.length - bookA.borrows.length
  })
  let total = books.map((bookobj) => {
    const {title,borrows} = bookobj;
    let popular = {name: title, count: borrows.length};
    return popular
  })
  total.sort((a,b) => b.count - a.count)
  return total.slice(0,5)
}

function getMostPopularAuthors(books, authors) {
books.sort((bookA, bookB)=> {
  return bookB.borrows.length - bookA.borrows.length
})



let total = books.map((bookobj)=> {
  const {authorId,borrows} = bookobj;
  let matchingAuthor = authors.find((authorobj) => {
    return authorobj.id === authorId;
  })
  let joinedName = helperFunctionJoinFirstAndLastName(matchingAuthor.name.first, matchingAuthor.name.last)
  let obj = {name: joinedName, count: borrows.length};
  return obj;
})
return total.slice(0,5)
}


function helperFunctionJoinFirstAndLastName(first, last) {
  return `${first} ${last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
