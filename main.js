let button = document.querySelector(".get-button");
let input = document.querySelector(".get-repos input");
let reposData = document.querySelector(".show-data");

button.onclick = function () {
  getData();
};
// Get Repos Function
function getData() {
  if (input.value == "") {
    // if Value is empty
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        // empty the container
        reposData.innerHTML = "";
        // Loop in the repositories
        repositories.forEach((repo) => {
          // Create the Main Div Element
          let mainDiv = document.createElement("div");
          // Create Repo Name Text
          let repoName = document.createTextNode(repo.name);
          // Append The Text to Main Div
          mainDiv.appendChild(repoName);
          // Create Repo Url Anchor
          let theUrl = document.createElement("a");
          // Create Repo Url Text
          let theUrlText = document.createTextNode("Visit");
          // Append Repo Url Text to Url Anchor
          theUrl.appendChild(theUrlText);
          // Add The Hypertext Reference "href"
          theUrl.href = `https://github.com/${input.value}/${repo.name}`;
          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank");
          // Append The Url To Main Div
          mainDiv.appendChild(theUrl);
          reposData.appendChild(mainDiv);

          // Create Stars Count Span
          let starsSpan = document.createElement("span");

          // Create The Stars Count Text
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // Add Stars Count Text To Stars Span
          starsSpan.appendChild(starsText);

          // Append Stars Count Span To Main Div
          mainDiv.appendChild(starsSpan);

          // Add Class On Main Div
          mainDiv.className = "repo-box";
        });
      });
  }
}
// https://api.github.com/users/Abdullaheisa/repos
