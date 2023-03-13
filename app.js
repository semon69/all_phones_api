const loadPhone = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data, dataLimit))
}
const displayData = (phones, dataLimit) => {
    const phoneCOntainer = document.getElementById('phone-container');
    phoneCOntainer.innerText = '';
    // slice and show all 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 6){
        phones = phones.slice(0, 6);
        showAll.classList.remove('d-none');
    } else{
        showAll.classList.add('d-none');
    }
    
    // NO phone found text add
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    } else{
        noPhone.classList.add('d-none')
    }
    for(let phone of phones){
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card rounded-5">
        <img class="p-5" src="${phone.image}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p> ${phone.slug}</p>
            <button onclick="showDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
        </div>
        `;
        phoneCOntainer.appendChild(phoneDiv);
        
    }
    // spinner call 
    toggleSpinner(false);
}
const searchProcess = dataLimit =>{
    // spinner call
    toggleSpinner(true);
    const searchText = document.getElementById('search-field').value;
    loadPhone(searchText, dataLimit);
}
const searchBtn = () =>{
    searchProcess(10);
}

// spinner add
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    } else{
        spinner.classList.add('d-none');
    }
}
const showAllBtn = () =>{
    searchProcess();
}

const showDetails= id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = phone => {
    console.log(phone)
    const phoneModalTitle = document.getElementById('exampleModalLabel');
    phoneModalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modal-details');
    modalBody.innerHTML = `
        <p> Release Date: ${phone.releaseDate}</p>
        <p> Storage: ${phone.mainFeatures.storage}</p>
        <p> Display: ${phone.mainFeatures.displaySize}</p>
        <img src="${phone.image}">
    `;
}
loadPhone('apple');