var siteNameInput = document.getElementById('siteNameInput');
var siteURLInput = document.getElementById('siteURLInput');
var plist;
var boxes = document.getElementById('boxmodel');




if(localStorage.getItem('bookmark') !==null){
    plist = JSON.parse(localStorage.getItem('bookmark'));
    displayBookmark();
}
else{
    plist=[];
}



function validate(inputId , regexKey){
    
    var input = document.getElementById(inputId);  
    
    var regex = {
        name: /.{3,}/,
        url: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
         
    }
    var isvalid = regex[regexKey].test(input.value)

    input.classList.remove('is-valid','is-invalid')

    if(isvalid){
        input.classList.add('is-valid');
        // console.log('matched')
        
    }
    else{
        input.classList.add('is-invalid');
        // console.log('not matched')
    }
}



function addBookmark(){

    

    var inputs = {
        siteName: siteNameInput.value,
        url:siteURLInput.value
    }
    
    if (
        siteNameInput.classList.contains("is-valid") &&
        siteURLInput.classList.contains("is-valid") ||
        siteURLInput==''&&  
        siteNameInput==''      
      ){

        plist.push(inputs);
        console.log(plist);
    
        displayBookmark();
    
        clearInputs();
        upperCase(siteNameInput);
        localStorage.setItem('bookmark',JSON.stringify(plist))


    }
    else{
    boxes.classList.remove('d-none')

    }
       
    }



function displayBookmark(){

    siteNameInput.classList.remove('is-valid','is-invalid');
    siteURLInput.classList.remove('is-valid','is-invalid');


    var addInput='';
    for(var i=0;i<plist.length;i++){

        var capitalSiteName = plist[i].siteName.charAt(0).toUpperCase() + plist[i].siteName.slice(1);

        addInput += `   <tr>
        <td>${i+1}</td>
        <td>${capitalSiteName}</td>
           
        <td><a href="${plist[i].url}" target="_blank"><button class=" btn-visit rounded-2 px-3 py-2" onclick="visit(${plist[i].url})"> <i class="fa-solid fa-eye"></i>  Visit</button></a></td>
        <td><button class=" btn-delete rounded-2 px-3 py-2" onclick ="deleteinputs(${i});">   <i class="fa-solid fa-trash-can"></i>  Delete</button></td>
    </tr>
            
            `
        }
box.innerHTML= addInput;

}
function clearInputs(){
    siteNameInput.value = '';
    siteURLInput.value = '';
}
function deleteinputs(i){

    plist.splice(i,1);
    
    displayBookmark();
    localStorage.setItem('bookmark',JSON.stringify(plist))


}

function visit(url) {
    window.open(url, '_blank');
}


function upperCase(siteNameInput){
        siteNameInput.value= siteNameInput.value.charAt(0).toUpperCase() + siteNameInput.value.slice(1) ;
}
function closeBox(){
    boxes.classList.add('d-none');
    console.log('js');
}


