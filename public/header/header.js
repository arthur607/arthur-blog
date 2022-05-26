var header           = document.getElementById('header');
var navigationHeader = document.getElementById('navigation_header');
var container          = document.getElementById('container');
var showSidebar      = false;

function toggleSidebar() {
    showSidebar = !showSidebar;
    if(showSidebar){

        navigationHeader.style.display = 'flex';
        navigationHeader.style.animationName = 'showSidebar';
        container.style.filter = 'blur(2px)';
      
    }
    else{
            navigationHeader.style.display = 'none';
            navigationHeader.style.animationName = '';
            container.style.filter = '';

    }
}

function closeSidebar() {
    if(showSidebar){
        toggleSidebar();
    }
}

window.addEventListener('resize', function(event) {
    if(window.innerWidth > 768 && showSidebar) 
    {  
        showSidebar = true;
        toggleSidebar();
        navigationHeader.style.display = 'flex';
    }
    else if(window.innerWidth > 768 && navigationHeader.style.display == 'none'){
        navigationHeader.style.display = 'flex';
    }
});