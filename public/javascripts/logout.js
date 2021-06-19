const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
    console.log('será meu deus');
    require.session.user == null;
});
