// Listen for form submit
document.getElementById('myform').addEventListener('submit', (e)=> {
    // saveBookmark 
    // get Form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
      }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

   // Test if Bookmarks is null 
    if(localStorage.getItem('bookmarks') === null){
        // Init aaray 
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        
        // Set to LocalStorage 
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        // Get bookmarks from local Storage 
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // ADD bookmark to local storage
        bookmarks.push(bookmark);
        // Re-set back To localstorage 
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

   
     document.getElementById('myform').reset();

    // Re-fetch bookmarks 
    fetchBookmarks();

    // prevent Form from submiting
    e.preventDefault();
});



// Delete Bookmarks
function deleteBookmark(url){
    // Get bookmarks from local Storage 
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // Loop thorought bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url){
            // remove from array 
            bookmarks.splice(i , 1);
        }
    } 
    // Re-set back To localstorage 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks 
    fetchBookmarks();

}

// fetch Bookmarks
const fetchBookmarks = ()=> {
    // Get bookmarks from local Storage 
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // Get Output id 
    let bookmarksResults = document.getElementById('bookmarksResults');
     
    //build output 
    bookmarksResults.innerHTML = '';
    for(let i=0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += `<div class="card my-3 mx-3">
        <div class="card-body">
            <h5 class="mx-3">${name}</h5>
            <a id="bookmarkSiteUrl" target="_blank" class="btn btn-sm btn-secondary mx-2" href="${url}">visit</a>
            <a onclick="deleteBookmark(\``+url+`\`)" class="btn btn-danger btn-sm" href="#">Delete</a> 
        </div>
        </div>` 
    }
}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    return true;
  }
  
