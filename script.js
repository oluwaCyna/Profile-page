    let Pname = document.getElementById('name');
    let userName = document.getElementById('username');
    let emailAddress = document.getElementById('pemail');
    let address = document.getElementById('address');
    let phoneNumber = document.getElementById('number');
    let companyName = document.getElementById('cname');
    let website = document.getElementById('website');
    let catchPhrase = document.getElementById('phrase');
    let bs = document.getElementById('bs');

    let form = document.forms['form'];
    let email = form['email']; 

    let emailRequiredError = document.getElementById("email-required");
    let emailError = document.getElementById("email-error");

    function display () {
        document.getElementById('main-wrapper').style.display = 'none'; 
    }

    function displayOff () {
        document.getElementById('main-wrapper').style.display = 'none'; 
        document.getElementById('form-wrap').style.display = 'block';
    }

    function submitForm (e) {
        e.preventDefault();
    
        checkRequired();
        validateEmail();
    }; 

    function checkRequired () {
        if (email.value.length == 0) {
            emailRequiredError.innerHTML = "required *"}
        else{
            emailRequiredError.innerHTML = " "
        }
    }
    
    function validateEmail(){
        let emailChar =  Array.from(email.value);
        let arrayOfAt = emailChar.filter(function (e) {
            return e === '@';
        });
        switch (arrayOfAt.length) {
            case 0:
                emailError.innerHTML = "Enter a valid email";
                break;
            case 1:
                let positionAt = emailChar.indexOf('@');
                if ((emailChar.lastIndexOf('.')) < positionAt) {
                emailError.innerHTML = "Enter a valid email";}
                else{
                    validateUser();
                }
                break;
            default:
                emailError.innerHTML = "There are more than one '@'";
                break;
        }
    }

    
let newData;
let emailIndex;
let addressy;

function validateUser () {
    
    fetch("https://jsonplaceholder.typicode.com/users", {
    method: 'GET'
})
    .then(response => {
        return response.json();
    })
    .then(data => {
        newData = data; 

        const emailArray = [];
        for (let i = 0; i < newData.length; i++) {
            emailArray.push(data[i]['email'])
        }

        if (emailArray.includes(email.value)) {

            emailIndex = emailArray.indexOf(email.value)

            userName.innerHTML = newData[emailIndex]['username'];
            Pname.innerHTML = newData[emailIndex]['name'];
            addressy = newData[emailIndex]['address'];
            address.innerHTML = Object.values(addressy).slice(0, 4).toString().replaceAll(',',', ');
            emailAddress.innerHTML = newData[emailIndex]['email'];
            phoneNumber.innerHTML = newData[emailIndex]['phone'].slice(0, 14);
            companyName.innerHTML = newData[emailIndex]['company']['name'];
            website.innerHTML = newData[emailIndex]['website'];;
            catchPhrase.innerHTML = newData[emailIndex]['company']['catchPhrase'];
            bs.innerHTML = newData[emailIndex]['company']['bs'];;   

            document.getElementById('main-wrapper').style.display = 'block';
            document.getElementById('form-wrap').style.display = 'none';
        }else {
            alert("You are not a User!");
        }
    })
    .catch(err => console.log(err))


}

form.addEventListener('submit', submitForm);









