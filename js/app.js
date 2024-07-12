var siteName = document.getElementById("BookmarkName");
var siteURL = document.getElementById("WebsiteUrl");
var tableHead = document.getElementById("tableHead");
var addBtn = document.getElementById("addbtn");
localStorage.getItem("bookMark");
var bookMark;
var mainIndex = 0;
if (localStorage.getItem("bookMark") == undefined) {
  bookMark = [];
} else {
  bookMark = JSON.parse(localStorage.getItem("bookMark"));
  display(bookMark);
}




function nameValidation(){
    var nameRejex=/^[a-z]{1,}$/
    var urlRejex =/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    if(nameRejex.test(siteName.value)==false){
return 'the name is not valid'
    }else if(urlRejex.test(siteURL.value)==false){
        return "URl is not valid"
    }
return true;
}




function addBookMark() {
    if(nameValidation()==true){
      if (addBtn.innerHTML == "Update") {
    addBtn.innerHTML = "Submit";
    var bookMarkObject = {
      name: siteName.value,
      URL: siteURL.value,
    };
    bookMark.splice(mainIndex, 1, bookMarkObject);
  } else {
    var bookMarkObject = {
      name: siteName.value,
      URL: siteURL.value,
    };
    bookMark.push(bookMarkObject);
  }

  localStorage.setItem("bookMark", JSON.stringify(bookMark));
  display(bookMark);
  clearForm();
}else{
   alert(nameValidation())
}

}

function display(arryWanted) {
  var dispaledMark = ``;
  for (var i = 0; i < bookMark.length; i++) {
    dispaledMark += ` <tr>
              <th scope="row">${i}</th>
              <td>${bookMark[i].name}</td>
              <td><a href="${bookMark[i].URL}"><button class="btn btn-info">Visit</button> </a></td>
              <td><button class="btn btn-danger " Onclick="updateElement(${i})" >Update</button></td>
              <td><button class="btn btn-danger " Onclick="deleteElement(${i})" >delete</button></td>
            </tr>
       `;
    tableHead.innerHTML = dispaledMark;
  }
}

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

function deleteElement(index) {
  bookMark.splice(index, 1);
  localStorage.setItem("bookMark", JSON.stringify(bookMark));
  display(bookMark);
}

function updateElement(index) {
  siteName.value = bookMark[index].name;
  siteURL.value = bookMark[index].URL;
  addBtn.innerHTML = "Update";
  mainIndex = index;
}

function searchElement(term){
    var searchedValue=''
    for(var i = 0;i<bookMark.length ;i++){
        if(bookMark[i].name.toLowerCase().includes(term)){
           searchedValue+=` <tr>
              <th scope="row">${i}</th>
              <td>${bookMark[i].name}</td>
              <td><a href="${bookMark[i].URL}"><button class="btn btn-info">Visit</button> </a></td>
              <td><button class="btn btn-danger " Onclick="updateElement(${i})" >Update</button></td>
              <td><button class="btn btn-danger " Onclick="deleteElement(${i})" >delete</button></td>
            </tr>
       `
        }
    }
    document.getElementById("tableHead").innerHTML=searchedValue;
}
