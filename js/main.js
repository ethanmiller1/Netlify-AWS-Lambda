// Make a request to the getUsers() function and return a promise.
const fetchUsers = async () =>
  await (await fetch("/.netlify/functions/getusers")).json();

// Do something with the data returned by getUsers().
fetchUsers().then(data => {
  // Create a variable
  userList = document.querySelector("#users");

  // For each user returned by getUsers(),
  data.forEach(user => {
    // Add a list item to the HTML list.
    const li = document.createElement("li");
    // Style with .list-group-item.
    li.className = "list-group-item";
    // Create a link to user's profile.
    const link = document.createElement("a");
    link.appendChild(document.createTextNode(user.login));
    link.href = user.html_url;
    // Open in new tab.
    link.target = "_blank";
    // Append the profile link to the list item.
    li.appendChild(link);
    // Append the list item to the HTML list.
    userList.appendChild(li);
  });
});