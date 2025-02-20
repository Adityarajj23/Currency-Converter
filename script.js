let baseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");


for(select of dropdowns){
    for(code in countryList){
        const option=document.createElement("option");
        option.value=code;
        option.innerText=code;
        if( select.name==="From" && code==="USD"){
            option.selected=true;
        }
        if(select.name==="To" && code==="INR"){
            option.selected=true;
        }
        select.append(option);
    }
select.addEventListener("change",(e)=>{
    updateflag(e.target);
});
}

const updateflag=(element)=>{
    currcode=element.value;
    countrycode=countryList[currcode];
    const img=element.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${countrycode}/flat/64.png`;
}
 
btn.addEventListener("click",async (evt)=>{
   evt.preventDefault();
   const amount=document.querySelector("input").value;
   if(amount===""){
       alert("Please enter amount");
       return;
   }
   if(amount<1){
         alert("Please enter valid amount");
         return;
   }

   console.log(fromCurr.value,toCurr.value);
   let URl = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URl);
    let json = await response.json();
    console.log(json);
   let rate = json[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   console.log(rate);
    let result = amount*rate;
    let msg =document.querySelector(".msg");
    msg.innerHTML=`<p>1 ${fromCurr.value} = ${rate} ${toCurr.value}</p>`;
    document.querySelector(".result").innerHTML = `<p>Converted Amount: ${result.toFixed(2)} ${toCurr.value}</p>`;

});

let icon = document.querySelector("i");
icon.addEventListener("click",()=>{
    let temp;
    temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateflag(fromCurr);
    updateflag(toCurr);
});