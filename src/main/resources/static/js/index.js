let nodeClinics = document.getElementById(`dist`);
nodeClinics.addEventListener('change', function() {
    let choice = this.options[this.selectedIndex].text;
    load_clinics(choice);
})

function singUp() {
        let patient = {
        name: document.getElementById("fio").value,
        phone: document.getElementById("tel").value,
        birthdate: document.getElementById("bd").value
    }

    fetch("/patient/create", {
        method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(patient)
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(pat => {
            let address = {
                id: pat.id,
                address: document.getElementById("address").value,
                district: document.getElementById("region").value,
                cnt: 0
            }
            fetch("/address/create", {
                method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(address)
            })
                .then(resp => {
                    if (resp.status === 200) {
                        return pat
                    } else {
                        console.log("Status: " + resp.status)
                        return Promise.reject("server")
                    }
                });

        })
        .then(pat => {
            let user = {
                id: pat.id,
                login: document.getElementById("username").value,
                password: document.getElementById("password").value
            };
            fetch("/user/create", {
                method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)
            })
                .then(resp => {
                    if (resp.status === 200) {
                        return resp.json()
                    } else {
                        console.log("Status: " + resp.status)
                        return Promise.reject("server")
                    }
                });
        })
}

function comeIn() {
    let user = {
        login: document.getElementById("login").value,
        password: document.getElementById("psw").value
    };
    fetch("/user/check", {
        method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(async result => {
            if (result.length !== 0) {
                await designBtn(result[0].login);
            }
            else {
                document.getElementById("neOk").style.display = "block";
            }
        })
}

async function designBtn(name) {
    document.getElementById("neOk").style.display = "none";
    document.getElementById("ok").style.display = "block";
    await new Promise(r => setTimeout(r, 1000));
    document.getElementById("myForm").style.display = "none";
    document.getElementById("white").style.display = "none";

    document.querySelector(".container").innerHTML +=
        `<p id="newText">Здравствуйте,<br>${name}</p><button id="btn-exit" class="btn" onclick="exit()">Выйти</button>`

    document.getElementById("btn-one").style.display = "none";
    document.getElementById("ok").style.display = "none";
}

function exit() {
    document.getElementById("newText").remove();
    document.getElementById("btn-exit").remove();
    document.getElementById("btn-one").style.display="block";
}




function load_districts() {
    fetch("/clinic/all", {
        method: "get", headers: {"Content-Type": "application/json"}
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            let distSet = new Set()
            dataJson.forEach(function (clinic) {
                distSet.add(clinic.address.district)
            });
            distSet.forEach(function (district) {
                document.getElementById("dist").innerHTML += `<option>${district}</option>`
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function load_clinics(choice_region) {
    // fetch("/address/find/" + choice_region, {
    //     method: "get", headers: {"Content-Type": "application/json"}
    // })
    //     .then(resp => {
    //         if (resp.status === 200) {
    //             return resp.json()
    //         } else {
    //             console.log("Status: " + resp.status)
    //             return Promise.reject("server")
    //         }
    //     })
    //     .then(dataJson => {
    //         let distSet = new Set()
    //         dataJson.forEach(function (adr) {
    //             distSet.add(adr.id)
    //         });
    //         let adrId = {values: distSet};
            fetch("/clinic/find/" + choice_region, {
                method: "get", headers: {"Content-Type": "application/json"}//, body: JSON.stringify(Array.from(distSet))
            })
                .then(resp => {
                    if (resp.status === 200) {
                        return resp.json()
                    } else {
                        console.log("Status: " + resp.status)
                        return Promise.reject("server")
                    }
                })
                .then(dataJson => {
                    dataJson.forEach(function (clinic) {
                        document.getElementById("hospital").innerHTML += `<option>${clinic.number}</option>`
                    });
                })
}

function load_symptoms() {
    fetch("/symptom/all", {
        method: "get", headers: {"Content-Type": "application/json"}
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            dataJson.forEach(function (symptom) {
                document.getElementsByClassName("over")[0].innerHTML += `<div class="d"><label>${symptom.description}</label><input type="checkbox" name="${symptom.id}" onchange="changeInput(this)">
                    <input id="sev${symptom.id}" type="number" class="in" min="1" max="5" placeholder="От 1 до 5" hidden>
                    </div>`
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function changeInput(e) {
    document.getElementById("sev" + e.name).hidden = !e.checked
}

function load_specialities() {
    fetch("/speciality/all", {
        method: "get", headers: {"Content-Type": "application/json"}
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            dataJson.forEach(function (speciality) {
                document.getElementById("specialist").innerHTML += `<option>${speciality.name}</option>`
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function load_doctors() {
    fetch("/doctor/all", {
        method: "get", headers: {"Content-Type": "application/json"}
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            dataJson.forEach(function (doctor) {
                document.getElementById("doctor").innerHTML += `<option>${doctor.name}</option>`
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function openForm(formName) {
    document.getElementById(formName).style.display = "block";
    document.getElementById("white").style.display = "block";

    if (formName === 'myForm') {
        document.getElementById('form-singUp').style.display = "none";
    }
    if (formName === 'form-singUp') {
        document.getElementById('myForm').style.display = "none";
    }
}

function closeForm(formName) {
    document.getElementById(formName).style.display = "none";
    document.getElementById("white").style.display = "none";
    if (formName === "myForm2") {
        document.getElementById("recommendations").innerHTML = ``;
        document.getElementById("treat_type").innerHTML = ``;
        document.getElementById("rec_specialists").innerHTML = ``;
    }
}

function sendSymptoms(symptoms) {
    fetch("/symptom/", {
        method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(symptoms)
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            dataJson.forEach(function (symptom) {
                console.log(symptom);
                document.getElementById("recommendations").innerHTML += `
                    <label><b>${symptom.description}</b></label>`;
                for (const recKey of symptom.recommendations) {
                    document.getElementById("recommendations").innerHTML += `
                    <label><b>${recKey.description}</b></label>`;
                }
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function sendSymToSev(symToSev) {
    fetch("/points/", {
        method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(symToSev)
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            let max = 0;
            let sev_result = "";
            dataJson.forEach(function (points) {
                console.log(points);
                if (points.severity.id > 2) {
                    document.getElementById("rec_specialists").innerHTML += `
                    <label><b>${points.speciality.name}</b></label><label><b>${points.speciality.description}</b></label>`;
                }
                if (points.severity.id > max) {
                    max = points.severity.id;
                    sev_result = points.severity.treatType;
                }
                document.getElementById("treat_type").innerHTML += `
                <label><b>${sev_result}</b></label>`;
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function sendResults() {
    let symptoms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => Number(e.name));
    if (symptoms.length === 0) {
        alert("Выберите хотя бы один атрибут!");
        return;
    }
    sendSymptoms(symptoms);
    let symToSev = symptoms.map(e => ({
        "symptomId": e, "severityId": Number(document.getElementById("sev" + e).value)
    }));
    for (const ss of symToSev) {
        if (ss.severityId < 1 || ss.severityId > 5) {
            alert("Введите целое число от 1 до 5!");
            return;
        }
    }
    sendSymToSev(symToSev);
    openForm("myForm2")
}

document.addEventListener("DOMContentLoaded", function () {
    load_districts();
    load_symptoms();
    load_specialities();
    load_doctors();
});