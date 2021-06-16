const deleteButtons = document.querySelectorAll('button[role="delete"]');

async function onDeleteClick(event) {
  const productId = event.target.dataset.productId;

  event.target.disabled = true;

  await fetch("/products/list" + productId + "?json", { method: "DELETE" });
  document.querySelector("table #doctor-" + doctorId).classList.add("d-none");
}

deleteButtons.forEach(function (button) {
  button.addEventListener("click", onDeleteClick);
});