const buttons=document.querySelectorAll('.Details');
buttons.forEach(button => {
    let isClicked=false;
    const overview=button.parentElement.querySelector('.movie-overview');
    button.addEventListener('click',()=>{
        console.log("hello");
        if(isClicked==false){
            overview.style.display='block';
            isClicked=true;
        }else{
            overview.style.display='none';
            isClicked=false;
        }
    });
});