


// Make the DIV element draggable:
// helper to find the closest parent by class with on optional stop class to stop searching
function closest (el, clazz, stopClazz) {
  if(el.classList.contains(stopClazz)) return null;

  while ((el = el.parentElement) 
         && !el.classList.contains(clazz)
         && !el.classList.contains(stopClazz));

  return el.classList.contains(stopClazz) ? null : el;
}

const dnd = (element, options) => {
// find all dragable elements
var draggableElements = element.querySelectorAll("[draggable=true]")
var activeDragElement;
var placeholderElement;
var startElementRect;
console.log("Drag'n'Drop Container: ", element, "Draggable elements: ", draggableElements);

  // Function responsible for sorting
 const _onDragOver = function (event) {
   placeholderElement.style.width = startElementRect.width + "px";
   placeholderElement.style.height = startElementRect.height + "px";
   placeholderElement.style.top = startElementRect.top + "px";
   placeholderElement.style.left = startElementRect.left + "px";
   console.log("Placeholder: ", placeholderElement, "startRect: ", startElementRect);
   
     event.preventDefault();
     event.dataTransfer.dropEffect = 'move';
    
     var target = closest(event.target, 'plane_div', 'playground');
     if (target && target !== activeDragElement) {  
        var rect = target.getBoundingClientRect();
        var horizontal = event.clientY > startElementRect.top && event.clientY < startElementRect.bottom;
        var next = false;
       
        if (horizontal) {
          next = (event.clientX - rect.left)/(rect.right - rect.left) > .5;
        } else {
          next = !((event.clientY - rect.top)/(rect.bottom - rect.top) > .5);
        }        
         
        console.log("onDragOver target classlist: ", target);
       
        // insert at new position
        element.insertBefore(activeDragElement, next && target.nextSibling || target);
       
        // update rect for insert poosition calculation
        startElementRect = activeDragElement.getBoundingClientRect();
     }
 }

// handle drag event end
const _onDragEnd = function (event) {
     event.preventDefault();
     
     placeholderElement.style.width = "0px";
     placeholderElement.style.height = "0px";
     placeholderElement.style.top = "0px";
     placeholderElement.style.left = "0px";
  
     activeDragElement.classList.remove('moving');
     element.removeEventListener('dragover', _onDragOver, false);
     element.removeEventListener('dragend', _onDragEnd, false);
};


element.addEventListener("dragstart", function (event) {
  // don't allow selection to be dragged if it is not draggable
  if(event.target.getAttribute("draggable") !== "true") {
    event.preventDefault(); 
    return;
  }
  
  activeDragElement = event.target;
  startElementRect = activeDragElement.getBoundingClientRect();
  
  // Limiting the movement type
  event.dataTransfer.effectAllowed = 'move';
  
  // setData => Fuinktioniert im IE nicht bzw. nur bedingt
  // !!!! wird aber scheinbar im Firefox für die Vorschau benötigt
  //event.dataTransfer.setData('text/html', activeDragElement.innerHtml);
  event.dataTransfer.setData("text/uri-list", "http://www.mozilla.org");
  
   // Subscribing to the events at dnd
   element.addEventListener('dragover', _onDragOver, false);
   element.addEventListener('dragend', _onDragEnd, false);
  
   activeDragElement.classList.add('moving');
   
   // import placeholder
   placeholderElement = element.querySelector('.tpl-placeholder');
});
};


// active the drag'n'drop functionallity for the .playground element
dnd(document.querySelector(".playground"));

lockButton = document.getElementById('lockButton')

lockButton.onclick = function toggleLock() {
  console.log('clicked')
  let draggableElements = document.querySelectorAll(".plane_div")
  for (let i=0; i < draggableElements.length; i++) {
    if (draggableElements[i].hasAttribute("draggable", true)){
      draggableElements[i].toggleAttribute("draggable");
      lockButton.innerHTML="&#128274;"
    }
    else { draggableElements[i].setAttribute("draggable", true)
    lockButton.innerHTML="&#128275;"

  }
}
}