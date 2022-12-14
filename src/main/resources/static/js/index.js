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