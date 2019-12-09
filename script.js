const dragDestinations = document.querySelectorAll(".receive"); // "drag here" empty pills
const dragPill = document.querySelectorAll(".drag-pill.full"); // blue pills

const atributeButtons = document.querySelectorAll('button.atributes'); // all atribute buttons

document.addEventListener("click", clickFunction);

function clickFunction(e) {
    closeAtributeList(e);
}
const tempData = {
    element: undefined, // string
    parrentTag: undefined, // string
    parrentType: undefined, // string
    parrentMultiple: undefined, // boolean
    parrentCount: undefined, // number
} 

//--------------------------------------
// drag related
//--------------------------------------

// add eventslisteners to drag destination
for(destination of dragDestinations) {
    destination.addEventListener("dragover", dragOver);
    destination.addEventListener("dragenter", dragEnter);
    destination.addEventListener("dragleave", dragLeave);
    destination.addEventListener("drop", dragDrop);
}

// add eventslisteners to drag pill listeners
for (let i = 0; i < dragPill.length; i++) {
    dragPill[i].addEventListener("dragstart", dragStart);
    dragPill[i].addEventListener("dragend", dragEnd);
}

function dragStart(e) {
    let crt = this.cloneNode(true);
    crt.setAttribute("style", "position:absolute; transform: translateX(-10000px)");
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
    updateDataObject(this);
}

//------------
function updateDataObject(el) {
    let parent = el.closest(".tag");
    tempData.element = el.getElementsByTagName("span")[0].innerText; 
    tempData.parrentTag = parent.getElementsByTagName("code")[0].firstElementChild.innerText.replace('<','').replace('>','');
    console.log(tempData)
}
//------------

function dragEnd() {
    console.log("dragEnd"); 
}

function dragOver(e) {
    e.preventDefault();
    console.log("hover over");
}

function dragEnter(e) {
    e.preventDefault(); 
    let currentElement = this.getElementsByClassName("empty");

    currentElement[0].classList.add("hovered");
    console.log("drag enter");
    
}

function dragLeave(e) {
    let currentElement = this.getElementsByClassName("empty"); 
    currentElement[0].classList.remove("hovered");
    console.log("leave");

}


function dragDrop() {
    console.log("drop");
}

//--------------------------------------
// toggle atribute list
//--------------------------------------

// click functions on "expand atributes" buttons
atributeButtons.forEach(element => {
    element.onclick = function(){
        let openButton = checkForOpenButtons();
        let svgIcon = this.getElementsByTagName("use")[0];

        let openlistContainer = checkForOpenlists();
        let thislistContainer = document.getElementById(`${this.getAttribute("data-target")}`); // gets the list that matched id

        let parent = this.parentElement;
        let counter = parent.previousElementSibling;

        //check open btn, close it an open clicked one
        if (openButton && openButton.getAttribute("data-target") !== this.getAttribute("data-target")) {
            openButton.removeAttribute("open");
            openButton.getElementsByTagName("use")[0].setAttribute("xlink:href", "#caret");
            this.toggleAttribute("open");
            svgIcon.setAttribute("xlink:href", "#close"); 

            // if other list open, close it
            openlistContainer.classList.remove('open');
            let openBtnParent = openButton.parentElement ;
            let openBtnCounter = openBtnParent.previousElementSibling;
            openBtnParent.setAttribute("style", "");
            openBtnCounter.setAttribute("style", " ");

            thislistContainer.classList.add('open');
            parent.setAttribute("style", "z-index:4");
            counter.setAttribute("style", "z-index:4");
            // console.log('if');

        } else if (openButton) {
            openButton.toggleAttribute("open"); 
            openButton.getElementsByTagName("use")[0].setAttribute("xlink:href", "#caret");
            thislistContainer.classList.remove('open');
            parent.setAttribute("style", " ");
            counter.setAttribute("style", " ");
            // console.log('else if');
        }
        else {
            this.toggleAttribute("open");
            svgIcon.setAttribute("xlink:href", "#close");

            // open the list that matches the clicked button
            thislistContainer.classList.add('open');
            parent.setAttribute("style", "z-index:4");
            counter.setAttribute("style", "z-index:4");
            // console.log('else');
        }
        
    };
});

function checkForOpenButtons() {
    let openBtn = document.querySelector("button[open]");
    return openBtn;
}

function checkForOpenlists() {
    let openList = document.querySelector("section.open");
    return openList;
}



function closeAtributeList(e) {
    let openBtn = checkForOpenButtons();
    let openlistContainer = checkForOpenlists();
    let openParentTag = (openBtn !== null) ? openBtn.closest(".tag") : null;
    let inside = (openParentTag == null) ? null : openParentTag.contains(e.target);
    
    if (!inside && openBtn !== null) {
        console.log("outside");
        openBtn.removeAttribute("open");
        openBtn.getElementsByTagName("use")[0].setAttribute("xlink:href", "#caret");
        openlistContainer.classList.remove('open');
        let openBtnParent = openBtn.parentElement ;
        let openBtnCounter = openBtnParent.previousElementSibling;
        openBtnParent.setAttribute("style", "");
        openBtnCounter.setAttribute("style", " ");
    } 

}


//--------------------------------------
//  
//--------------------------------------



