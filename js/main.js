var siteNameInp = document.getElementById("siteName");
var siteUrlInp = document.getElementById("siteUrl");
var update = document.getElementById("update");
var allSite;
var commonIndex;


if (localStorage.getItem("sites") != null) {
    allSite = JSON.parse(localStorage.getItem("sites"));
    displaySite();
} else {
    allSite = [];
}

function addAndUpdateSite() {
    if (validateSiteName() && validateSiteUrl()) {
        siteNameInp.classList.remove("is-invalid");
        siteNameInp.classList.add("is-valid");
        siteUrlInp.classList.remove("is-invalid");
        siteUrlInp.classList.add("is-valid");
        var site = {
            name: siteNameInp.value,
            url: siteUrlInp.value,
        };
        if (update.innerHTML == "Submit") {
            allSite.push(site);
        } else {
            allSite[commonIndex] = site;
            update.innerHTML = "Submit";
        }
        localStorage.setItem("sites", JSON.stringify(allSite));
        displaySite();
        clearData();
    } else if (validateSiteName() == false) {
        siteNameInp.classList.remove("is-valid");
        siteNameInp.classList.add("is-invalid");

    } else {
        siteUrlInp.classList.remove("is-valid");
        siteUrlInp.classList.add("is-invalid");
    }
}
function displaySite() {
    var list = ``;
    for (var i = 0; i < allSite.length; i++) {
        list += `<tr>
        <td>${i}</td>
        <td class="text-primary">${allSite[i].name}</td>
        <td><a href="${allSite[i].url}" target="_blank"><button class="btn btn-visit btn-sm"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a>
        </td>
        <td><button class="btn btn-update text-black btn-sm" onclick="returnData(${i})"><i
                    class="fa-solid fa-pen-to-square pe-2"></i>Update</button>
        <td><button class="btn btn-danger btn-sm" onclick="deleteSite(${i})"><i
                    class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`;
    }
    document.getElementById("mySite").innerHTML = list;
    
    clearData()
}
function clearData() {
    siteNameInp.value = "";
    siteUrlInp.value = "";
}
function deleteSite(index) {
    allSite.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(allSite));
    displaySite();
}
function returnData(index) {
    update.innerHTML = "Update";
    commonIndex = index;
    siteNameInp.value = allSite[index].name;
    siteUrlInp.value = allSite[index].url;
}

function validateSiteName() {
    var nameRegex =/^[A-Z][A-Za-z]{3,8}\s*([A-Za-z]{3,8})?$/;
    var cartona = `The first letter must be capitalized`;
    if(nameRegex.test(siteNameInp.value)){
        nameRules.innerHTML = null;
        return true;
        }
    else {
        nameRules.innerHTML = cartona;
        return false;
        }

}
function validateSiteUrl() {
    var siteRegex =/^(https:)(www\.)[a-zA-Z0-9]{3,}\.[a-z]{3}$/;
    var cartona = `Please enter valid URL such as "https:www.vvvvvvvv.com"`;

    if (siteRegex.test(siteUrlInp.value)) 
    {
      urlRules.innerHTML = null;
      return true;
    } else {
      urlRules.innerHTML = cartona;
      return false;
    }
}
