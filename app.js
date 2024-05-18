const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterUpdate = document.querySelector(".slider input"),
filterValue = document.querySelector(".value"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter");
chooseImgBtn = document.querySelector(".choose-img");
saveImgBtn = document.querySelector(".save-img");
let  Brightness = 100, Saturation = 100, Inversion = 0, Grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () => {
   previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
   previewImg.style.filter = `brightness(${Brightness}%) Saturate(${Saturation}%) invert(${Inversion}%) Grayscale(${Grayscale}%)`;
}
 const loadImage = () =>{
    let file = fileInput.files[0]; // getting user selected file//
   if(!file) return; // return if user hasn't select file
    console.log(file); 
    previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
    previewImg.addEventListener("load", () => {
      document.querySelector(".container").classList.remove("disable");
    })
   
   }
   filterOptions.forEach(option =>{
      option.addEventListener("click", () => {
         document.querySelector(".filter .active").classList.remove("active")
         option.classList.add("active");
         filterName.innerText = option.innerText;
         if(option.id === "Brightness"){
            filterUpdate.max =  200;
            filterUpdate.value =  Brightness;
            filterValue.innerText = `${ Brightness}%`;
         }else if(option.id === "Saturation"){
            filterUpdate.max =  200;
            filterUpdate.value =  Saturation;
            filterValue.innerText = `${ Saturation}%`;
         }else if(option.id === "Inversion"){
            filterUpdate.max =  100;
            filterUpdate.value =  Inversion; 
            filterValue.innerText = `${ Inversion}%`;
         }else{
            filterUpdate.max =  100;
            filterUpdate.value =  Grayscale;
            filterValue.innerText = `${ Grayscale}%`;
         }
      });
   });
   const sliderUpdate = () => {
      filterValue.innerText = `${filterUpdate.value}%`;
   const selectedFilter = document.querySelector(".filter .active");
   if(selectedFilter.id === "Brightness"){
      Brightness = filterUpdate.value;
   }else if(selectedFilter.id === "Saturation"){
      Saturation = filterUpdate.value;
   }else if(selectedFilter.id === "Inversion"){
      Inversion  = filterUpdate.value;
   }else{
      Grayscale  = filterUpdate.value;
   }
   applyFilter();
   };
   rotateOptions.forEach(option => {
      option.addEventListener("click", () => {
           if(option.id === "left"){
             rotate -= 90;
           }else if(option.id === "right"){
            rotate += 90;
           }else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
           }else{
            flipVertical = flipVertical === 1 ? -1 : 1;
           }
           applyFilter();
      });
   });
   const resetFilter = () =>{
        Brightness = 100; Saturation = 100; Inversion = 0; Grayscale = 0;
       rotate = 0; flipHorizontal = 1; flipVertical = 1;
       filterOptions[0].click();
       applyFilter();
   }
   const saveImg = () =>{
      const canvas  = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = previewImg.naturalWidth;
      canvas.height = previewImg.naturalHeight;

      ctx.filter = `brightness(${Brightness}%) Saturate(${Saturation}%) invert(${Inversion}%) Grayscale(${Grayscale}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if(rotate !== 0){
         ctx.rotate(rotate * Math.PI / 180);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      
      const link = document.createElement("a");
      link.download = "image-jpg";
      link.href = canvas.toDataURL();
      link.click();
   }
   
 fileInput.addEventListener("change", loadImage);
 filterUpdate.addEventListener("input", sliderUpdate);
 resetFilterBtn.addEventListener("click", resetFilter);
 saveImgBtn.addEventListener("click", saveImg)
 chooseImgBtn.addEventListener("click",() => fileInput.click());