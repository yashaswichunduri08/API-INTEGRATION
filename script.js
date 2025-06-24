const apiKey = "348b8d8c030742ada2b63219ea7f0b15";
const container = document.querySelector(".container");
function generateUI(articles) {
  articles.forEach(({ urlToImage, title, description, content, url }) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <div class="news-image-container">
        <img src="${urlToImage || "./newspaper.jpg"}" alt="">
      </div>
      <div class="news-content">
        <div class="news-title">${title}</div>
        <div class="news-description">${description || content || ""}</div>
        <a href="${url}" target="_blank" class="view-button">View More</a>
      </div>`;
    container.appendChild(card);
  });
}
function getNews() {
  container.innerHTML = "";
  fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
    .then((res) => res.json())
    .then(({ status, articles, message }) => {
      if (status !== "ok") {
        alert(`Error: ${message || "Error"}`);
        return;
      }
      if (!articles?.length) {
        container.innerHTML = "<p>No articles found.</p>";
        return;
      }
      generateUI(articles);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      alert("Failed to fetch news.");
    });
}
window.onload = getNews;
