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

function load_clinics() {
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
            dataJson.forEach(function (clinic) {
                document.getElementById("hospital").innerHTML += `<option>${clinic.number}</option>`
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
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
}

function closeForm(formName) {
    document.getElementById(formName).style.display = "none";
    document.getElementById("white").style.display = "none";
    if (formName === "myForm2") {
        document.getElementById("recommendations").innerHTML = ``;
    }
}

function sendResults() {
    let symptoms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => Number(e.name));
    if (symptoms.length === 0) {
        alert("Выберите хотя бы один атрибут!");
        return;
    }
    let symToSev = symptoms.map(e => ({
        "symptomId": e,
        "severityId": Number(document.getElementById("sev" + e).value)
    }));
    for (const ss of symToSev) {
        if (ss.severityId < 1 || ss.severityId > 5) {
            alert("Введите целое число от 1 до 5!");
            return;
        }
    }
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
                document.getElementById("recommendations").innerHTML += `
                    <label><b>${points.symptom.description}</b></label>`;
                for (const recKey of points.symptom.recommendations) {
                    document.getElementById("recommendations").innerHTML += `
                    <label><b>${recKey.description}</b></label>`;
                }
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
    document.getElementById("myForm2").style.display = "block";
    document.getElementById("white").style.display = "block";
}
document.addEventListener("DOMContentLoaded", function () {
    load_districts();
    load_clinics();
    load_symptoms();
    load_specialities();
    load_doctors();
});