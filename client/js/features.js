var featureLoading = document.getElementById("featureLoading");
var featureSubmitBtn = document.getElementById("featureSubmitBtn");
var featureFrm = document.getElementById("featureFrm");

featureSubmitBtn.addEventListener("click", async function () {
  //debugger;
  featureLoading.classList.remove("amdt-hidden");
  featureFrm.classList.add("amdt-hidden");
  await onfeaturesubmit();
  featureFrm.reset();
  featureLoading.classList.add("amdt-hidden");
  featureFrm.classList.remove("amdt-hidden");
  await onfeatureload();
});

async function onfeatureload() {
  //debugger;
  var response = await fetch("http://localhost:3000/api/features");
  var result = await response.json();
  var feature1 = result[0]; // accessing the first object inside the result array

  var featureList = document.getElementById("feature-list");

  featureList.innerHTML = "";

  for (var i = 0; i < result.length; i++) {
    var lielement = document.createElement("li");
    lielement.innerHTML =
      result[i].body +
      " " +
      '<span class="badge badge-success">' +
      result[i].author +
      ", " +
      result[i].time +
      "</span>";
    lielement.className = "list-group-item";
    featureList.appendChild(lielement);
  }
}

onfeatureload();

async function onfeaturesubmit() {
  //debugger;
  await fetch("http://localhost:3000/api/features", {
    method: "post",
    body: JSON.stringify({
      name: document.getElementById("suggestedname").value,
      feature: document.getElementById("suggestedfeature").value
    }),   
    headers: {
      "content-type": "application/json"
    }
  });

}
function mailsend() {
  let beep = {
    ID: $('#name').val(),
    email: $('#email').val(),
    message: $('#message').val(),
  }

  $.ajax
    ({
      type: "POST",
      url: "http://localhost:3000/",
      data: JSON.stringify(beep),
      contentType: "application/json",
      dataType: 'json',
      success: function (html) {
        alert(html);
      }
    });
}


onfeatureload();

$('#myCarousel').carousel({
  interval: 3000,
})