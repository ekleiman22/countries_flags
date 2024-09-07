/*
 * Task for building an application
I have a file countries.json that contains codes and names of countries in json format where each item has structure:
country_code, country_name. For example "AD": "Andorra".
Also I have a folder png250px tat contains images of flags of countries. The name of each file has structure <country_code>.png. For example ad.png. I need a page that contains the following parts: upper part: some description
The middle part has controls:
1. A button "Show random country flag". When an user pushes the button a flag is shown.
2.A combobox with dropdown menu containing names of countries and their codes as values. When an user begins to insert letters of the name then only names corresponding to a pattern  are shown.
3.A button "This country". When an user pushes this button the program compares the code of the selected item in the combobox and code of random country image. If they are the same that message "True" is shown otherwise ""False" is shown.
4.A button "Show selected country flag". When an user pushes this button then the flag of selected item is shown unstead of random flag.
 */
// Variables to store the random country and JSON data
let countries = {};
let randomCountryCode = "";

// Fetch countries.json (assuming it's in the same directory)
fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        countries = data;
        populateDropdown(countries);
    });

// Populate the combobox with country names
function populateDropdown(countries) {
    const datalist = document.getElementById('countries');
    for (const [code, name] of Object.entries(countries)) {
        const option = document.createElement('option');
        option.value = name;
        option.setAttribute('data-code', code);
        datalist.appendChild(option);
    }
}

// Show a random country flag
document.getElementById('randomFlagBtn').addEventListener('click', () => {
    const countryCodes = Object.keys(countries);
    randomCountryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    displayFlag(randomCountryCode);
    document.getElementById('result').textContent = "";
    document.getElementById('countryName').textContent = "";
    
});

// Show the flag of the selected country
document.getElementById('showSelectedFlagBtn').addEventListener('click', () => {
    const selectedCountry = document.getElementById('countryDropdown').value;
    const selectedCode = getCountryCodeByName(selectedCountry);
    if (selectedCode) {
        displayFlag(selectedCode);
    }
});

// Compare the selected country with the random country
document.getElementById('compareBtn').addEventListener('click', () => {
    const selectedCountry = document.getElementById('countryDropdown').value;
    const selectedCode = getCountryCodeByName(selectedCountry);

    if (selectedCode === randomCountryCode) {
        document.getElementById('result').textContent = "True";
    } else {
        document.getElementById('result').textContent = "False";
    }
});
// Show the country name of the current flag
document.getElementById('showCountryNameBtn').addEventListener('click', () => {
    //if (randomCountryCode) {
    //    document.getElementById('countryName').textContent = countries[randomCountryCode];
    //} else {
    //    document.getElementById('countryName').textContent = "No flag shown.";
    //}
    
    //get country code from image
    const flagImage = document.getElementById('flag');
    let arr = (flagImage.src).split("/");
    let imageName = arr[arr.length - 1];
    let countryCode = (imageName.split(".")[0]).toUpperCase();
    document.getElementById('countryName').textContent = countries[countryCode];
    document.getElementById('result').textContent = "";
});

// Helper function to display the flag
function displayFlag(countryCode) {
    const flagImage = document.getElementById('flag');
    flagImage.src = `png250px/${countryCode.toLowerCase()}.png`; // Assuming flags are named in lowercase
}

// Helper function to get country code by name
function getCountryCodeByName(countryName) {
    for (const [code, name] of Object.entries(countries)) {
        if (name.toLowerCase() === countryName.toLowerCase()) {
            return code;
        }
    }
    return null;
}
