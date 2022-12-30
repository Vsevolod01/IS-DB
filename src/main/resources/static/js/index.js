let patientId = null;
let nodeClinics = document.getElementById(`dist`);
nodeClinics.addEventListener('change', function () {
    let choice = this.options[this.selectedIndex].text;
    load_clinics(choice);
})

let nodeSpecialist = document.getElementById(`hospital`);
nodeSpecialist.addEventListener('change', function() {
    let choice = this.options[this.selectedIndex].text;
    load_specialities(Number(choice));
})

let nodeDoctor = document.getElementById(`specialist`);
nodeDoctor.addEventListener('change', function() {
    let choice = this.options[this.selectedIndex].text;
    load_doctors_new(choice);
})

function registration() {
    let patient = patientId
    if (patientId == null) {
        let name = document.getElementById(`name`).value;
        let phone = document.getElementById(`phone`).value;
        let name_phone = {
            name: name, phone: phone
        }
        fetch("/patient/check", {
            method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(name_phone)
        })
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    console.log("Status: " + resp.status)
                    return Promise.reject("server")
                }
            })
            .then(result => {
                if (result.length !== 0) {
                    patient = result[0].id
                } else {
                    let birthdate = document.getElementById(`db`);
                    patient = { name: name, phone: phone, birthdate: birthdate }
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
                            patient = pat.id
                            let address = {
                                id: pat.id,
                                address: document.getElementById("addr").value,
                                district: document.getElementById("distr").value,
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
                }
            })
    }
    let at_home = document.getElementById("at_home").value === 'На дому'
    let checked = Number(document.querySelector('#talons input[name="talon"]:checked')
        .nextElementSibling.querySelector(`.talonId`).innerHTML);
    let params = { patient: patient, at_home: at_home, appointmentId: checked }
    fetch("/appointment/appoint", {
        method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(params)
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
    //Передаём параметры пациента в базу, изменяем статус талона
}

function show_ticket() {
    openForm('myForm3');

    let districtNode = document.getElementById(`dist`);
    let district = districtNode.options[districtNode.selectedIndex].text;
    let clinicNode = document.getElementById(`hospital`);
    let clinicNum = Number(clinicNode.options[clinicNode.selectedIndex].text);
    let specialistNode = document.getElementById(`specialist`);
    let specialist = specialistNode.options[specialistNode.selectedIndex].text;
    let doctorNode = document.getElementById(`doctor`);
    let doctor = doctorNode.options[doctorNode.selectedIndex].text;

    let date = document.getElementById(`date`).value;

    let params = {
        district: district,
        clinic: clinicNum,
        specialist: specialist,
        doctor: doctor
    };

    fetch("/appointment/find", {
        method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(params)
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(tickets => {
            if (tickets.length === 0) {
                drawTalonNull();
            }
            else {
                document.getElementById(`talons`).innerHTML = ``;
                tickets.forEach(function (ticket) {
                    drawTalon(ticket.id, ticket.work.doctor.speciality.name, ticket.work.doctor.name, ticket.work.clinic.address.address, ticket.date);
                })
            }
        })

}

function drawTalonNull() {
    document.getElementById(`talons`).innerHTML = ``;
    document.querySelector(`#talonRes h4`).innerHTML = `Талонов не найдено :(`;
    document.getElementById(`registration`).disabled = true;
}

function drawTalon(id, speciality, doctor, address, date) {
    document.getElementById(`talons`).innerHTML +=
        `<div class="talon">
            <input type="radio" class="talonItem" name="talon">
            <div>
                <p>Талон №</p>
                <p class="talonId">${id}</p>
                <p>${speciality}</p>
                <p>${doctor}</p>
                <p>${address}</p>
                <p>${date}</p>
            </div>
        </div>`;
}

function signUp() {
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
        login: document.getElementById("login").value, password: document.getElementById("psw").value
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
                patientId = result[0].patient.id
            } else {
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

    document.querySelector(".container").innerHTML += `<p id="newText">Здравствуйте,<br>${name}</p>
        <button id="btn-exit" class="btn" onclick="exit()">Выйти</button>`

    document.getElementById("btn-one").style.display = "none";
    document.getElementById("ok").style.display = "none";

    document.getElementById("login").value = "";
    document.getElementById("password").value = "";

    document.getElementById("form-appoint").remove();
}

function exit() {
    patientId = null
    document.getElementById("newText").remove();
    document.getElementById("btn-exit").remove();
    document.getElementById("btn-one").style.display = "block";

    document.getElementsByClassName("title-2")[1].insertAdjacentHTML("afterend",
        `<div class="col" id="form-appoint">
        <label for="name">Как вас зовут?</label>
        <input id="name" type="text" class="in" placeholder="ФИО">
        <label for="db">Дата рождения</label>
        <input id="db" type="date" class="in" placeholder="Дата рождения">
        <label for="phone">Ваш телефон</label>
        <input id="phone" type="tel" class="in" placeholder="8 999 999 99 99">
        <label for="addr">Адрес проживания</label>
        <input id="addr" type="text" class="in" placeholder="Адрес">
        <label for="distr">Район проживания</label>
        <input id="distr" type="text" class="in" placeholder="Район">
        <label for="at_home">Способ лечения</label>
        <select id="at_home" name="at_home" class="in">
            <option selected>На дому</option>
            <option>Амбулаторно</option>
        </select>
    </div>`)

    document.getElementById("form-appoint").style.display = ''
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
    document.getElementById("specialist").innerHTML = `<option selected>-</option>`;
    document.getElementById("doctor").innerHTML = `<option selected>-</option>`;
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
                    document.getElementById("hospital").innerHTML = `<option selected>-</option>`;
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
                document.getElementsByClassName("over")[0].innerHTML += `<div class="d"><div class="dd">
                    <input type="checkbox" name="${symptom.id}" onchange="changeInput(this)"><p>${symptom.description}</p></div>
                    <input id="sev${symptom.id}" type="number" class="in" min="1" max="5" placeholder="От 1 до 5" hidden>
                    </div>`
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function load_specialities(choice_clinic) {
    document.getElementById("doctor").innerHTML = `<option selected>-</option>`;
    fetch("/clinic/findId/" + choice_clinic, {
        method: "get", headers: {"Content-Type": "application/json"}
    })
        .then(rr => {
            if (rr.status === 200) {
                return rr.json()
            } else {
                console.log("Status: " + rr.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            let clinic_id = dataJson[0].id;
            fetch("/work/findByClinic/" + clinic_id, {
                method: "get", headers: {"Content-Type": "application/json"}
            })
                .then(resp1 => {
                    if (resp1.status === 200) {
                        return resp1.json()
                    } else {
                        console.log("Status: " + resp1.status)
                        return Promise.reject("server")
                    }
                })
                .then(res => {
                    document.getElementById("specialist").innerHTML = `<option selected>-</option>`;
                    let specialists = new Set();
                    res.forEach(function (doctors) {
                        specialists.add(doctors.doctor.speciality.name);
                    })
                    specialists.forEach(function (s) {
                        document.getElementById("specialist").innerHTML += `<option>${s}</option>`;
                    })
                })
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}

function load_doctors_new(choice_speciality) {
    let clinic_num_Node = document.getElementById(`hospital`);
    let clinic_num = clinic_num_Node.options[clinic_num_Node.selectedIndex].text;
    fetch(`/work/findByClinicAndSpeciality/${clinic_num}/${choice_speciality}`, {
        method: "get", headers: {"Content-Type": "application/json"}
    })
        .then(resp2 => {
            if (resp2.status === 200) {
                return resp2.json()
            } else {
                console.log("Status: " + resp1.status)
                return Promise.reject("server")
            }
        })
        .then(doctors => {
            document.getElementById("doctor").innerHTML = `<option selected>-</option>`;
            doctors.forEach(function (doc) {
                document.getElementById("doctor").innerHTML += `<option>${doc.doctor.name}</option>`;
            })
        })
}


function changeInput(e) {
    document.getElementById("sev" + e.name).hidden = !e.checked
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
        document.getElementById('form-signUp').style.display = "none";
    }
    if (formName === 'form-signUp') {
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
                    <p><b>${symptom.description}:</b></p>`;
                for (const recKey of symptom.recommendations) {
                    document.getElementById("recommendations").innerHTML += `
                    <p class="ss">${recKey.description}</p>`;
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
                    <p><b>${points.speciality.name}:</b></p><p>${points.speciality.description}</p>`;
                }
                if (points.severity.id > max) {
                    max = points.severity.id;
                    sev_result = points.severity.treatType;
                }
                document.getElementById("treat_type").innerHTML += `
                <p>${sev_result}</p>`;
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
    let symToSev = symptoms.map(e => ({
        "symptomId": e, "severityId": Number(document.getElementById("sev" + e).value)
    }));
    for (const ss of symToSev) {
        if (ss.severityId < 1 || ss.severityId > 5) {
            alert("Введите целое число от 1 до 5!");
            closeForm("myForm2")
            return;
        }
    }
    sendSymptoms(symptoms);
    sendSymToSev(symToSev);
    openForm("myForm2")
}

document.addEventListener("DOMContentLoaded", function () {
    load_districts();
    load_doctors();
    load_symptoms();
});