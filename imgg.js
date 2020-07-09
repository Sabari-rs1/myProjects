
const inpfile=document.getElementById("inpfile");
const prevContainer=document.getElementById("imgprev-div");
const previewimg=document.getElementById("image-prev");
const prevdefaulttext=document.getElementById("image-prev-text");


inpfile.addEventListener("change",function () 
{ 
  const file=this.files[0];
  if(file)
  {
    const reader=new FileReader();
    prevdefaulttext.style.display="none";
    previewimg.style.display="block";
    reader.addEventListener("load",function(){
    previewimg.setAttribute("src",this.result);
    });
    reader.readAsDataURL(file);
  }
});








function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

}

