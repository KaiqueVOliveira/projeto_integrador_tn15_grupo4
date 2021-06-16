const deleteButtons = document.querySelectorAll('input[role="delete"]');

async function onDeleteClick(event) {
  const productId = event.target.dataset.productId;

  event.target.disabled = true;

  await fetch("/products/edit/" + productId + "?json", { method: "DELETE" });
  document.querySelector("table #products-" + productId).classList.add("d-none");
}

deleteButtons.forEach(function (button) {
  button.addEventListener("click", onDeleteClick);
});