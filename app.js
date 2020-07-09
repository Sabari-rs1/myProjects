const rest=document.getElementById("opacity-reducer");
const form=document.getElementById("input");
const submit=document.getElementById("submit");
const loading=document.getElementById("loading");


const createnewh3=document.getElementById("create-new-h3");
const createnewp=document.getElementById("create-new-p");
const createnewimg=document.getElementById("create-new-img");

function here() {
  rest.style.opacity=0.3;
  form.style.display="block";
  }


form.onsubmit=function(e)
{
 
  localStorage.clear();
  e.preventDefault();
  var a=form.pname.value;
  var b=form.pdescription.value;
  localStorage.setItem("postname",a);
  localStorage.setItem("postdescription",b);
  imgData = getBase64Image(previewimg);
  localStorage.setItem("imgData", imgData);
  form.style.display="none";
  rest.style.opacity=1;

  if(localStorage.postname!="" && localStorage.postdescription!="" && localStorage.imgData!="")
  {
    document.getElementById("submit").style.display="none";
    document.getElementById("add-post-button").style.display="none";
    document.getElementById("create-new-div").style.display="inline-block";
    console.log("3");
    loading.style.display="none";
    createnewh3.innerHTML=localStorage.postname;
    createnewp.innerHTML=localStorage.postdescription;
    document.getElementById("next-post").style.display="block";
    
    // var dataImage = localStorage.getItem('imgData');
    // createnewimg.src = "data:image/png;base64," + dataImage;


  }


};



function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#create-new-img')
              .attr('src', e.target.result)
              .width(160)
              .height(170);
      };

      reader.readAsDataURL(input.files[0]);
  }
}







