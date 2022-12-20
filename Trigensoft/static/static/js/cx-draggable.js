/* let draggables = document.querySelectorAll('.cx-draggable');
let containers = document.querySelectorAll('.accordion');

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () =>{
        draggable.classList.add('cx-dragging');
    });
    draggable.addEventListener('dragend', () =>{
        draggable.classList.remove('cx-dragging');
    });
});
console.log(containers);
containers.forEach((container) => {
    
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        let afterElement = getDragAferElement(container, e.clientY);
        console.log(container);
        let draggable = document.querySelector('.cx-dragging');
        if(afterElement == null){
            container.appendChild(draggable);
        }else{
            container.insertBefore(draggable, afterElement);
        }
    });
});

function getDragAferElement(container, y){
    let draggableElements = [...container.querySelectorAll('.cx-draggable:not(.cx-dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        console.log(closest);
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if((offset < 0) && (offset > closest.offset)){
            return {offset:offset, element: child};
        }else{
            return closest;
        }
},{offset:Number.NEGATIVE_INFINITY}.element);
} */