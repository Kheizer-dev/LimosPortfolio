// Updated script.js
let activeFilters = {};
let visibleCount = 3;
let sortOrder = "newest";

const postList = document.getElementById('post-list');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.getElementById('search');
const toggleModeBtn = document.getElementById('toggle-mode');
const sortDropdown = document.getElementById('sort-posts');
const modal = document.getElementById('post-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');

const defaultPosts = [
  {
    title: "Starting HTML and CSS",
    date: "2025-05-01",
    content: "Today I learned how to structure a webpage using **HTML** and style it with *CSS*.",
    topic: "Web Development",
    tags: ["html", "css"]
  },
  {
    title: "Understanding JavaScript Basics",
    date: "2025-05-03",
    content: "JavaScript seemed scary at first but functions and events make more sense now.",
    topic: "Programming",
    tags: ["js"]
  },
  {
    title: "Building my First Web Page",
    date: "2025-05-05",
    content: "I combined HTML, CSS, and JS to build a simple blog.",
    topic: "Web Development",
    tags: ["html", "css", "js"]
  }
];

if (!localStorage.getItem("posts")) {
  localStorage.setItem("posts", JSON.stringify(defaultPosts));
}

function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function renderFilters(posts) {
  const tags = new Set();
  const topics = new Set();

  posts.forEach(p => {
    p.tags.forEach(tag => tags.add(tag));
    topics.add(p.topic);
  });

  const topicList = document.getElementById('topic-list');
  topicList.innerHTML = '';
  [...topics].forEach(topic => {
    topicList.innerHTML += `<li><button class="filter-btn" data-type="topic" data-value="${topic}">${topic}</button></li>`;
  });

  const tagList = document.getElementById('tag-list');
  tagList.innerHTML = '';
  [...tags].forEach(tag => {
    tagList.innerHTML += `<button class="filter-btn" data-type="tag" data-value="${tag}">#${tag}</button>`;
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const value = btn.dataset.value;

      if (!activeFilters[type]) activeFilters[type] = new Set();
      if (activeFilters[type].has(value)) {
        activeFilters[type].delete(value);
        btn.classList.remove("active");
      } else {
        activeFilters[type].add(value);
        btn.classList.add("active");
      }

      visibleCount = 3;
      renderPosts();
    });
  });
}

function renderPosts() {
  const posts = getPosts();
  postList.innerHTML = "";
  const search = searchInput.value.toLowerCase();

  let filtered = posts.filter(post =>
    post.title.toLowerCase().includes(search) ||
    post.content.toLowerCase().includes(search)
  );

  if (activeFilters.topic && activeFilters.topic.size > 0) {
    filtered = filtered.filter(post => activeFilters.topic.has(post.topic));
  }

  if (activeFilters.tag && activeFilters.tag.size > 0) {
    filtered = filtered.filter(post =>
      post.tags.some(tag => activeFilters.tag.has(tag))
    );
  }

  filtered.sort((a, b) => sortOrder === "newest"
    ? new Date(b.date) - new Date(a.date)
    : new Date(a.date) - new Date(b.date)
  );

  const toDisplay = filtered.slice(0, visibleCount);

  toDisplay.forEach((post, index) => {
    const el = document.createElement("article");
    el.className = "blog-post";
    const likes = localStorage.getItem(`likes-${post.title}`) || 0;
    el.innerHTML = `
      <h2 class="post-title">${post.title}</h2>
      <p class="post-meta">${post.date} • ${post.topic} • by Me</p>
      <div class="post-content">${marked.parse(post.content.split(" ").slice(0, 20).join(" "))}...</div>
      <button class="read-more styled-btn theme-btn" data-index="${posts.indexOf(post)}">📖 Read More</button>
      <button class="like-btn styled-btn theme-btn" data-title="${post.title}">👏 Like <span>${likes}</span></button>
    `;
    postList.appendChild(el);
  });

  loadMoreBtn.style.display = filtered.length > visibleCount ? "block" : "none";

  document.querySelectorAll(".read-more").forEach(btn => {
    btn.addEventListener("click", () => {
      const post = posts[btn.dataset.index];
      modalBody.innerHTML = `
        <h2>${post.title}</h2>
        <p class="post-meta">${post.date} • ${post.topic}</p>
        <div>${marked.parse(post.content)}</div>
      `;
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("visible");
    });
  });

  document.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title;
      let count = parseInt(localStorage.getItem(`likes-${title}`) || 0) + 1;
      localStorage.setItem(`likes-${title}`, count);
      btn.querySelector("span").textContent = count;
    });
  });
}

function clearFilters() {
  const clearBtn = document.getElementById("clear-filters");
  clearBtn.addEventListener("click", () => {
    activeFilters = {};
    visibleCount = 3;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    renderPosts();
  });
}

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 3;
  renderPosts();
});

searchInput.addEventListener("input", () => {
  visibleCount = 3;
  renderPosts();
});

sortDropdown.addEventListener("change", () => {
  sortOrder = sortDropdown.value;
  renderPosts();
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleModeBtn.textContent = "☀️";
}

toggleModeBtn.style.top = "10px";
toggleModeBtn.style.zIndex = "1000";

toggleModeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  toggleModeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

closeModal.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("visible");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("visible");
  }
});

renderPosts();
renderFilters(getPosts());
clearFilters();
