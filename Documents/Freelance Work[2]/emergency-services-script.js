function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

var openBtn = document.querySelector('.open-btn');
var closeBtn = document.querySelector('.close-btn');
var popup = document.querySelectorAll('.popup');

openBtn.addEventListener('click', function (){
    for(let x = 0; x < popup.length; x++ ){
        popup[x].classList.add('visible');
    }
})

closeBtn.addEventListener('click', function (){
    for(let x = 0; x < popup.length; x++ ){
        popup[x].classList.remove('visible');
    }
})