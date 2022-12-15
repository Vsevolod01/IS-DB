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
                document.getElementById("symptom").innerHTML += `<option>${symptom.description}</option>`
            });
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
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

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("white").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("white").style.display = "none";
}

function addRow() {
    document.getElementById("sym").insertAdjacentHTML("beforeend", `<label for="symptom">Выберите симптом</label>
    <select id="symptom" name="symptom" class="in">
        <option disabled selected>Симптомы</option>
    </select>`);
    document.getElementById("cnt").insertAdjacentHTML("beforeend", `<label for="number">Степень тяжести</label>
    <input id="number" type="number" class="in" min="1" max="3" placeholder="От 1 до 3">`);
}

document.addEventListener("DOMContentLoaded", function () {
    load_districts();
    load_clinics();
    load_symptoms();
    load_specialities();
    load_doctors();
});