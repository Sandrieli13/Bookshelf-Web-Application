/*Declared all the main DOM elements that I will use for rendering first*/
//When re-rendered added comments appear below books.
// Left some older features in. Felt bad about getting rid of them.
const main = document.querySelector("main");
const div = document.createElement("div");
main.append(div);
const h2 = document.createElement("h2");
main.append(h2);
const div2 = document.createElement("div");
main.append(div2);
const ol = document.createElement("ol");
const ol2 = document.createElement("ol");
//almost every function that rerenders the bookshelf with a different from initial array
//will have a comment and favorite function called with its respective array.
class Book {
  constructor(author, language, subject, title) {
    this.author = author.toString().replace(",", "");
    this.language = language;
    this.subject = subject.toString();
    this.title = title;
    this.comment = [];
  }
  addcomment(string) {
    this.comment.push(string);
  }
}

for (i = 0; i < bookData.length; i++) {
  bookData[i].title = new Book(
    bookData[i].author,
    bookData[i].language,
    bookData[i].subject,
    bookData[i].title
  );
}
const arr = [];
for (i = 0; i < bookData.length; i++) {
  arr.push(bookData[i].title);
}
class Bookshelf {
  constructor(array) {
    this.books = array;
  }
  addNew(newObject) {
    this.books.push(newObject);
  }
  //Used map in render funtion but still needed my i from the for loop I was using before
  //to add unique ids to all of the books
  //added extra ids for different parts
  render() {
    let i = 0;
    let j = 0;
    let d = 0;
    div.append(ol);
    this.books.map((p) => {
      const li = document.createElement("li");
      const fav = document.createElement("button");
      const com = document.createElement("button");
      li.innerHTML = `<strong>${p.title}</strong> <br> ${p.author}`;
      ol.append(li);
      fav.innerHTML = "favorite";
      com.innerHTML = "comment";
      li.append(fav);
      li.append(com);
      li.setAttribute("id", "l" + [d++].toString());
      com.classList.add("fav");
      com.setAttribute("id", "c" + [j++].toString());
      fav.classList.add("fav");
      fav.setAttribute("id", [i++].toString());
      if (p.comment.length !== 0) {
        const div32 = document.createElement("section");
        div32.classList.add("comment");
        li.append(div32);
        div32.style.top = "60px";
        div32.innerHTML = p.comment[p.comment.length - 1];
      }
      return;
    });
  }
  //render2 is for favorite books which appear on a different shelf
  render2() {
    div2.append(ol2);
    this.books.map((p) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${p.title}</strong> <br> ${p.author}`;
      ol2.append(li);
    });
  }
  //by the time I am writing this comment I do not remember why I need render3 which basically
  //is the same method as render, but at some point I found it necessary in order to re-render
  //the bookshelf. I do not want to fix it if it isn't broken.
  render3() {
    let i = 0;
    let j = 0;
    let d = 0;
    div.append(ol);
    this.books.map((p) => {
      const li = document.createElement("li");
      const fav = document.createElement("button");
      const com = document.createElement("button");
      li.innerHTML = `<strong>${p.title}</strong> <br> ${p.author}`;
      ol.append(li);
      fav.innerHTML = "favorite";
      com.innerHTML = "comment";
      li.append(fav);
      li.append(com);
      li.setAttribute("id", "l" + [d++].toString());
      com.classList.add("fav");
      com.setAttribute("id", "c" + [j++].toString());
      fav.classList.add("fav");
      fav.setAttribute("id", [i++].toString());
      if (p.comment.length !== 0) {
        const div32 = document.createElement("section");
        div32.classList.add("comment");
        li.append(div32);
        div32.style.top = "60px";
        div32.innerHTML = p.comment[p.comment.length - 1];
      }
      return;
    });
  }
}
/*Used my addNew method to add another book to the list; it works*/
const Capital = new Book(
  "Marx, Karl",
  "de",
  "A Critique of Political Economy",
  "Das Kapital"
);
const shelf2 = new Bookshelf(arr);
shelf2.addNew(Capital);
shelf2.render();

//Add books UI;
const z = document.getElementById("addIt");
z.addEventListener("click", function () {
  let NewBook = new Book(
    (author = document.getElementById("a").value),
    (language = document.getElementById("l").value),
    (subject = document.getElementById("s").value),
    (title = document.getElementById("t").value)
  );
  ol.innerHTML = " ";
  shelf2.addNew(NewBook);
  shelf2.render();
  //I had to copy 'favorite' function in to update reset ut fir new books
  favorite(arr);
  comment(arr);
});
/*I already successfully automated individual id assigment to all the list elemtents above */
//Favorite button
let arrrrr = [];
const FavShelf = new Bookshelf(arrrrr);
function favorite(array) {
  for (i = 0; i < array.length; i++) {
    const b = document.getElementById([i].toString());
    b.addEventListener("click", function () {
      //condition that will make the event happen per one click on each
      //favorite button
      if (b.style.backgroundColor == "grey") {
        return null;
      }
      ol2.innerHTML = " ";
      b.style.backgroundColor = "grey";
      FavShelf.addNew(array[b.id]);
      FavShelf.render2();
      //use reduce to count favorite books
      const favCount = FavShelf.books
        .reduce(
          (accumulator, currentValue) => accumulator.concat(currentValue),
          []
        )
        .filter((item) => item.title).length;
      h2.innerHTML = "Number of Favorite Books: " + favCount;
    });
  }
}
favorite(arr);
//commenting
//I programmed this function before adding a function of addcomment to class Book
//some of its parts might be useless now but it got too complicated.
//While trying to makes sure the right textarea input was appended in the right list items
//I gave many elements individual ids. So far it has proved to be an overwhelming practice.
//after adding addcomment function to books I connected this function so that the input would be
//saved in class object and be rerendered with the object.
function comment(array) {
  for (j = 0; j < array.length; j++) {
    const c = document.getElementById("c" + [j].toString());
    c.addEventListener("click", function () {
      if (c.innerHTML == "send") {
        li = document.getElementById(c.id.replace("c", "l"));
        const x = document.getElementById(c.id.replace("c", "t"));
        const divC = document.getElementById(x.id.replace("t", "jj"));
        const h5 = document.createElement("h5");
        h5.innerHTML = `Anonymous: ` + x.value;
        divC.classList.add("comment");
        li.append(divC);
        divC.append(h5);
        array[c.id.replace("c", "")].addcomment(divC.innerHTML);
        return;
      }
      const divJ = document.createElement("section");
      const textarea = document.createElement("textarea");
      li = document.getElementById(c.id.replace("c", "l"));
      c.innerHTML = "send";
      li.append(textarea);
      li.append(divJ);
      textarea.setAttribute("id", c.id.replace("c", "t"));
      textarea.setAttribute("maxlength", "280");
      divJ.setAttribute("id", c.id.replace("c", "jj"));
      c.style.backgroundColor = "yellowgreen";
    });
  }
}
comment(arr);

//THE SEARCH ENGINE
const s = document.getElementById("searchbut");
s.addEventListener("click", function () {
  let x = document.getElementById("search").value;
  // searcharr= arr.filter(boo => boo.title === x)
  //At first I wanted to make the search engine work for accurate title entries with
  //the filter function above just to see it in action,
  // but below I use isRelevant function to improve the search capacity.
  searcharr = arr.filter(
    (boo) =>
      isRelevant(boo.title, x) ||
      isRelevant(boo.author, x) ||
      isRelevant(boo.subject, x) === true
  );
  //End of improving filter
  const SearchShelf = new Bookshelf(searcharr);
  ol.innerHTML = " ";
  SearchShelf.render3();
  favorite(searcharr);
  comment(searcharr);
});
//isRelevant() is the function that I use for the search filter
function isRelevant(a, v) {
  let words1 = a.split(" ");
  let words = v.split(" ");
  let wordsl1 = words.map((w) => {
    return w.toLowerCase();
  });
  let wordsl2 = words1.map((w) => {
    return w.toLowerCase();
  });
  if (wordsl2.some((r) => wordsl1.includes(r.replaceAll(",", "")))) {
    return true;
  } else {
    return false;
  }
}

//Sorting
//different sorting methods are triggered by different options selected,.
function sortt() {
  const q = document.getElementById("selector");
  q.addEventListener("change", function (event) {
    if (event.target.value == "Z-A") {
      let newarr = arr.sort(function (a, b) {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        {
          return 0;
        }
      });
      const SortedShelf = new Bookshelf(newarr);
      console.log(SortedShelf);
      ol.innerHTML = " ";
      SortedShelf.render3();
      comment(newarr);
      favorite(newarr);
    }
    if (event.target.value == "A-Z") {
      let newarr = arr.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        {
          return 0;
        }
      });
      const SortedShelf = new Bookshelf(newarr);
      console.log(SortedShelf);
      ol.innerHTML = " ";
      SortedShelf.render3();
      comment(newarr);
      favorite(newarr);
    }
    if (event.target.value == "A-Z a") {
      let newarr = arr.sort(function (a, b) {
        if (a.author < b.author) {
          return -1;
        }
        if (a.author > b.author) {
          return 1;
        }
        {
          return 0;
        }
      });
      const SortedShelf = new Bookshelf(newarr);
      console.log(SortedShelf);
      ol.innerHTML = " ";
      SortedShelf.render3();
      comment(newarr);
      favorite(newarr);
    }
    if (event.target.value == "Z-A a") {
      let newarr = arr.sort(function (a, b) {
        if (a.author > b.author) {
          return -1;
        }
        if (a.author < b.author) {
          return 1;
        }
        {
          return 0;
        }
      });
      const SortedShelf = new Bookshelf(newarr);
      console.log(SortedShelf);
      ol.innerHTML = " ";
      SortedShelf.render3();
      comment(newarr);
      favorite(newarr);
    }
    if (event.target.value == "number of topics") {
      let newarr = arr.sort(function (a, b) {
        if (a.subject.length < b.subject.length) {
          return 1;
        }
        if (a.subject.length > b.subject.length) {
          return -1;
        }
        {
          return 0;
        }
      });
      const SortedShelf = new Bookshelf(newarr);
      console.log(SortedShelf);
      ol.innerHTML = " ";
      SortedShelf.render3();
      comment(newarr);
      favorite(newarr);
    }
  });
}
sortt();

//Let's try Registration?
//Have not tested it much but it seems to work. One shorfall is that when redirected to a
//different page via navigator it will ask you to sign in again without remembering your
//account.
main.addEventListener("click", function () {
  if (matcharr.length == 0) {
    alert("Please Sign In.");
    div.innerHTML = "SIGN IN!";
  }
});
const SignInBody = document.getElementById("signBody");
const Register = document.getElementById("register");
const SignIn = document.getElementById("sign-in");
class Account {
  constructor(Name, Password) {
    this.Name = Name;
    this.Password = Password;
  }
}
class Accounts {
  constructor(Accs) {
    this.Accs = Accs;
  }
  addAccount(newAccount) {
    this.Accs.push(newAccount);
  }
}
const nuAccount = [];
const AccountData = new Accounts(nuAccount);
matcharr = [];
SignIn.addEventListener("click", function () {
  let U = document.getElementById("username").value;
  let P = document.getElementById("password").value;
  matcharr = nuAccount.filter((boo) => boo.Name === U && boo.Password === P);
  if (matcharr.length > 0) {
    SignInBody.innerHTML = `Hi ${nuAccount[0].Name}`;
    SignInBody.style.fontSize = "30px";
    div.innerHTML = "";
    shelf2.render();
  }
  if (matcharr.length == 0) {
    alert("the username or password you have entered is invalid.");
  }
});

Register.addEventListener("click", function () {
  let x = document.getElementById("password1").value;
  let y = document.getElementById("password2").value;
  let z = document.getElementById("newusername").value;
  if (x == y && y.length !== 0 && z.length !== 0) {
    let NewAcc = new Account((author = z), (language = x));
    AccountData.addAccount(NewAcc);
    alert("Account successfully created");
  } else {
    alert("Passwords do not match or are empty");
  }
});
