var clients;
var state = "add";
function doGet() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "backend.php", true);
  xhttp.send();
  xhttp.onload = function () {
    clients = JSON.parse(this.responseText);
    clients.map(
      (client) =>
        (document.getElementById("t_body").innerHTML +=
          "<tr><td>" +
          client.id +
          "</td><td>" +
          client.name +
          "</td><td>" +
          client.email +
          "</td>" +
          '<td><button class="btn btn-success" onclick="findForUpdate(' +
          client.id +
          ')">update</button></td>' +
          '<td><button class="btn btn-danger" onclick="findForDelete(' +
          client.id +
          ')">delete</button></td></tr>')
    );
  };
}
doGet();
function doPost(request) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "backend.php");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  xhttp.send(
    "request=" + request + "&id=" + id + "&name=" + name + "&email=" + email
  );
  location.reload();
}
function disableButtons() {
  document.getElementById("add").disabled = state != "add";
  document.getElementById("update").disabled = state != "update";
  document.getElementById("delete").disabled = state != "delete";
}
disableButtons();
function findForUpdate(id) {
  let client = clients.find((client) => client.id === id);
  document.getElementById("id").value = client.id;
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  state = "update";
  disableButtons();
}
function findForDelete(id) {
  clear();
  document.getElementById("id").value = id;
  state = "delete";
  disableButtons();
}
function clear() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  state = "add";
  disableButtons();
}
