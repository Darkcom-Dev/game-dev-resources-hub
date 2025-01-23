function darkMode(){
    var element = document.body;
    element.classList.toggle('dark-mode');
}

function toggleText() {
  let i = document.getElementById("theme-toggle");
  switch (i.getAttribute("class")) {
    case "fa fa-moon-o":
      i.setAttribute("class", "fa fa-sun-o");
      darkMode();
      break;
    case "fa fa-sun-o":
      i.setAttribute("class", "fa fa-moon-o");
      darkMode();
      break;
  }
}