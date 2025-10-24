// DOM Elements
const navAuth = document.getElementById("navAuth");
const navUser = document.getElementById("navUser");
const hamburger = document.getElementById("hamburger");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");
const postsFeed = document.getElementById("postsFeed");
const podcastGrid = document.getElementById("podcastGrid");
const postInput = document.getElementById("postInput");
const publishPost = document.getElementById("publishPost");
const commentModal = document.getElementById("commentModal");
const closeCommentModal = document.getElementById("closeCommentModal");
const commentList = document.getElementById("commentList");
const commentInput = document.getElementById("commentInput");
const postComment = document.getElementById("postComment");

// Sample data
let currentUser = null;
let posts = [];
let podcasts = [];
let currentPostId = null;

// Sample posts data
const samplePosts = [
  {
    id: 1,
    author: "Minh Anh",
    time: "2 giờ trước",
    space: "Không gian tích cực",
    title: "Hành trình yêu bản thân của tôi",
    content:
      "Sau nhiều năm tự ti về ngoại hình, tôi đã học cách chấp nhận và yêu thương chính mình. Mỗi ngày là một cơ hội mới để trân trọng bản thân và những điều đặc biệt mà mình có.",
    type: "text",
    likes: 124,
    comments: 23,
    shares: 8,
    liked: false,
  },
  {
    id: 2,
    author: "Tuấn Kiệt",
    time: "5 giờ trước",
    space: "Không gian sáng tạo",
    title: "Thơ: Tôi và chính tôi",
    content:
      "Trong gương một bóng hình quen,\nLà tôi đó, chẳng cần nên người khác,\nMỗi vết sẹo là câu chuyện riêng,\nMỗi nụ cười là khoảnh khắc đáng trân trọng.",
    type: "quote",
    likes: 89,
    comments: 15,
    shares: 12,
    liked: true,
  },
  {
    id: 3,
    author: "Hương Giang",
    time: "1 ngày trước",
    space: "Không gian tích cực",
    title: "Bài học về sự tự tin",
    content:
      "Hôm nay tôi nhận ra rằng sự tự tin không đến từ việc bạn hoàn hảo, mà đến từ việc bạn dám đối diện với những điểm chưa hoàn hảo của mình.",
    type: "text",
    likes: 156,
    comments: 34,
    shares: 6,
    liked: false,
  },
  {
    id: 4,
    author: "Quang Minh",
    time: "1 ngày trước",
    space: "Không gian sáng tạo",
    title: "Tranh: Ánh sáng bên trong",
    content:
      "Chia sẻ bức tranh tôi vẽ về hành trình tìm thấy ánh sáng bên trong bản thân. Mỗi nét vẽ là một cảm xúc, mỗi màu sắc là một trải nghiệm.",
    type: "image",
    likes: 201,
    comments: 28,
    shares: 15,
    liked: false,
  },
  {
    id: 5,
    author: "Thanh Thảo",
    time: "2 ngày trước",
    space: "Không gian tích cực",
    title: "Quote của ngày",
    content:
      '"Bạn xứng đáng được yêu thương theo cách bạn muốn, không phải theo cách người khác nghĩ bạn nên được yêu thương."',
    type: "quote",
    likes: 95,
    comments: 12,
    shares: 9,
    liked: true,
  },
  {
    id: 6,
    author: "Đức Anh",
    time: "2 ngày trước",
    space: "Không gian ẩn danh",
    title: "Chia sẻ ẩn danh",
    content:
      "Hôm nay tôi muốn chia sẻ rằng đôi khi cảm thấy cô đơn là điều bình thường. Nhưng hãy nhớ rằng bạn không đơn độc, luôn có người sẵn sàng lắng nghe.",
    type: "text",
    likes: 78,
    comments: 18,
    shares: 3,
    liked: false,
  },
  {
    id: 7,
    author: "Mỹ Linh",
    time: "3 ngày trước",
    space: "Không gian sáng tạo",
    title: "Bài hát tự sáng tác",
    content:
      "Chia sẻ bài hát tôi viết về hành trình tự yêu bản thân. Âm nhạc đã giúp tôi thể hiện những cảm xúc khó nói thành lời.",
    type: "text",
    likes: 142,
    comments: 25,
    shares: 11,
    liked: false,
  },
  {
    id: 8,
    author: "Hải Đăng",
    time: "3 ngày trước",
    space: "Không gian tích cực",
    title: "Thử thách 7 ngày yêu bản thân",
    content:
      "Ngày 1: Viết ra 3 điều bạn biết ơn về bản thân. Ngày 2: Tự thưởng cho mình một điều gì đó đặc biệt. Hãy cùng tôi thực hiện nhé!",
    type: "text",
    likes: 167,
    comments: 42,
    shares: 23,
    liked: true,
  },
  {
    id: 9,
    author: "Ngọc Ánh",
    time: "4 ngày trước",
    space: "Không gian sáng tạo",
    title: "Thơ: Vẻ đẹp thật sự",
    content:
      "Vẻ đẹp không nằm ở vẻ bề ngoài,\nMà ở trái tim biết yêu thương và sẻ chia,\nỞ đôi mắt biết nhìn thấy điều tốt đẹp,\nVà ở tâm hồn luôn rộng mở đón nhận.",
    type: "quote",
    likes: 113,
    comments: 19,
    shares: 7,
    liked: false,
  },
  {
    id: 10,
    author: "Trung Hiếu",
    time: "4 ngày trước",
    space: "Không gian tích cực",
    title: "Chia sẻ về sự thay đổi",
    content:
      "Một năm trước, tôi không dám nói chuyện trước đám đông. Hôm nay, tôi đã có thể chia sẻ câu chuyện của mình ở đây. Mọi thứ đều có thể thay đổi!",
    type: "text",
    likes: 189,
    comments: 31,
    shares: 14,
    liked: true,
  },
];

// Sample podcasts data
const samplePodcasts = [
  {
    id: 1,
    title: "Tự tin tỏa sáng",
    description:
      "Bí quyết xây dựng sự tự tin từ bên trong và thể hiện bản thân một cách chân thật nhất.",
    space: "Không gian tích cực",
    duration: "28 phút",
    plays: "1.5K lượt nghe",
    playing: false,
    liked: false,
  },
  {
    id: 2,
    title: "Nhật ký ẩn danh",
    description:
      "Những câu chuyện chưa từng kể được chia sẻ một cách chân thật và cảm động.",
    space: "Không gian ẩn danh",
    duration: "35 phút",
    plays: "892 lượt nghe",
    playing: false,
    liked: true,
  },
  {
    id: 3,
    title: "Sáng tạo không giới hạn",
    description:
      "Khám phá sức mạnh của sự sáng tạo trong việc thể hiện bản thân và chữa lành.",
    space: "Không gian sáng tạo",
    duration: "42 phút",
    plays: "1.2K lượt nghe",
    playing: false,
    liked: false,
  },
  {
    id: 4,
    title: "Yêu bản thân mỗi ngày",
    description:
      "Những thói quen nhỏ giúp bạn yêu thương và chăm sóc bản thân nhiều hơn.",
    space: "Không gian tích cực",
    duration: "31 phút",
    plays: "2.1K lượt nghe",
    playing: false,
    liked: true,
  },
  {
    id: 5,
    title: "Hành trình tự do",
    description:
      "Câu chuyện về hành trình tìm lại sự tự do trong suy nghĩ và hành động.",
    space: "Không gian ẩn danh",
    duration: "38 phút",
    plays: "956 lượt nghe",
    playing: false,
    liked: false,
  },
  {
    id: 6,
    title: "Nghệ thuật tự thể hiện",
    description:
      "Làm thế nào để sử dụng nghệ thuật như một công cụ thể hiện bản thân mạnh mẽ.",
    space: "Không gian sáng tạo",
    duration: "45 phút",
    plays: "1.8K lượt nghe",
    playing: false,
    liked: false,
  },
  {
    id: 7,
    title: "Vượt qua tự ti",
    description:
      "Chia sẻ về quá trình vượt qua cảm giác tự ti và xây dựng lòng tự trọng.",
    space: "Không gian tích cực",
    duration: "33 phút",
    plays: "1.4K lượt nghe",
    playing: false,
    liked: true,
  },
  {
    id: 8,
    title: "Tiếng nói bên trong",
    description:
      "Lắng nghe và thấu hiểu tiếng nói bên trong - người bạn đồng hành quan trọng nhất.",
    space: "Không gian ẩn danh",
    duration: "40 phút",
    plays: "1.1K lượt nghe",
    playing: false,
    liked: false,
  },
  {
    id: 9,
    title: "Sức mạnh của từ bi",
    description:
      "Tìm hiểu về sức mạnh của lòng từ bi với bản thân và cách thực hành mỗi ngày.",
    space: "Không gian tích cực",
    duration: "36 phút",
    plays: "1.6K lượt nghe",
    playing: false,
    liked: false,
  },
  {
    id: 10,
    title: "Viết để tự do",
    description:
      "Khám phá sức mạnh chữa lành của việc viết và cách nó giải phóng tâm hồn.",
    space: "Không gian sáng tạo",
    duration: "39 phút",
    plays: "1.3K lượt nghe",
    playing: false,
    liked: true,
  },
];

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
  setupEventListeners();
  loadPosts();
  loadPodcasts();
});

function setupEventListeners() {
  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileMenu);
  }

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Post creation
  publishPost.addEventListener("click", createNewPost);
  postInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      createNewPost();
    }
  });

  // Comment modal
  closeCommentModal.addEventListener("click", hideCommentModal);
  postComment.addEventListener("click", addComment);
  commentInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addComment();
    }
  });

  // Close modal when clicking outside
  commentModal.addEventListener("click", function (e) {
    if (e.target === commentModal) {
      hideCommentModal();
    }
  });
}

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (isLoggedIn === "true" && currentUser) {
    if (navAuth) navAuth.style.display = "none";
    if (navUser) navUser.style.display = "block";
  } else {
    if (navAuth) navAuth.style.display = "flex";
    if (navUser) navUser.style.display = "none";
  }
}

function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";

  // Animate hamburger icon
  const bars = hamburger.querySelectorAll(".bar");
  if (navMenu.style.display === "flex") {
    bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
  } else {
    bars[0].style.transform = "none";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "none";
  }
}

function switchTab(tabId) {
  // Update active tab button
  tabBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

  // Update active tab pane
  tabPanes.forEach((pane) => {
    pane.classList.remove("active");
  });
  document.getElementById(`${tabId}Tab`).classList.add("active");
}

function loadPosts() {
  posts = [...samplePosts];
  renderPosts();
}

function renderPosts() {
  postsFeed.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsFeed.appendChild(postElement);
  });
}

function createPostElement(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "post-card";
  postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <div class="author-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="author-info">
                    <h4>${post.author}</h4>
                    <span class="post-time">${post.time}</span>
                </div>
            </div>
            <div class="post-space">
                <i class="fas fa-${getSpaceIcon(post.space)}"></i>
                ${post.space}
            </div>
        </div>
        <div class="post-content">
            <h3>${post.title}</h3>
            ${
              post.type === "quote"
                ? `<div class="quote-post">${post.content}</div>`
                : `<p>${post.content}</p>`
            }
            ${
              post.type === "image"
                ? `<div class="post-image">
                    <i class="fas fa-image"></i>
                    <span>Hình ảnh từ ${post.author}</span>
                </div>`
                : ""
            }
        </div>
        <div class="post-stats">
            <div class="post-stat">
                <i class="fas fa-heart"></i>
                <span>${post.likes}</span>
            </div>
            <div class="post-stat">
                <i class="fas fa-comment"></i>
                <span>${post.comments}</span>
            </div>
            <div class="post-stat">
                <i class="fas fa-share"></i>
                <span>${post.shares}</span>
            </div>
        </div>
        <div class="post-actions">
            <button class="post-action-btn like-btn ${
              post.liked ? "liked" : ""
            }" data-post-id="${post.id}">
                <i class="fas fa-heart"></i>
                <span>Thích</span>
            </button>
            <button class="post-action-btn comment-btn" data-post-id="${
              post.id
            }">
                <i class="fas fa-comment"></i>
                <span>Bình luận</span>
            </button>
            <button class="post-action-btn share-btn" data-post-id="${post.id}">
                <i class="fas fa-share"></i>
                <span>Chia sẻ</span>
            </button>
        </div>
    `;

  // Add event listeners to action buttons
  const likeBtn = postDiv.querySelector(".like-btn");
  const commentBtn = postDiv.querySelector(".comment-btn");
  const shareBtn = postDiv.querySelector(".share-btn");

  likeBtn.addEventListener("click", function () {
    toggleLike(post.id);
  });

  commentBtn.addEventListener("click", function () {
    showComments(post.id);
  });

  shareBtn.addEventListener("click", function () {
    sharePost(post.id);
  });

  return postDiv;
}

function getSpaceIcon(space) {
  const icons = {
    "Không gian tích cực": "smile-beam",
    "Không gian sáng tạo": "paint-brush",
    "Không gian ẩn danh": "user-secret",
  };
  return icons[space] || "hashtag";
}

function loadPodcasts() {
  podcasts = [...samplePodcasts];
  renderPodcasts();
}

function renderPodcasts() {
  podcastGrid.innerHTML = "";

  podcasts.forEach((podcast) => {
    const podcastElement = createPodcastElement(podcast);
    podcastGrid.appendChild(podcastElement);
  });
}

function createPodcastElement(podcast) {
  const podcastDiv = document.createElement("div");
  podcastDiv.className = "podcast-card";
  podcastDiv.innerHTML = `
        <div class="podcast-cover">
            <i class="fas fa-headphones"></i>
        </div>
        <div class="podcast-info">
            <div class="podcast-space">
                <i class="fas fa-${getSpaceIcon(podcast.space)}"></i>
                ${podcast.space}
            </div>
            <h3>${podcast.title}</h3>
            <p>${podcast.description}</p>
            <div class="podcast-meta">
                <span class="duration">${podcast.duration}</span>
                <span class="plays">${podcast.plays}</span>
            </div>
        </div>
        <div class="podcast-actions">
            <button class="podcast-action-btn play-btn ${
              podcast.playing ? "playing" : ""
            }" data-podcast-id="${podcast.id}">
                <i class="fas fa-${podcast.playing ? "pause" : "play"}"></i>
            </button>
            <button class="podcast-action-btn like-btn ${
              podcast.liked ? "liked" : ""
            }" data-podcast-id="${podcast.id}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

  // Add event listeners
  const playBtn = podcastDiv.querySelector(".play-btn");
  const likeBtn = podcastDiv.querySelector(".like-btn");

  playBtn.addEventListener("click", function () {
    togglePodcastPlay(podcast.id);
  });

  likeBtn.addEventListener("click", function () {
    togglePodcastLike(podcast.id);
  });

  return podcastDiv;
}

function createNewPost() {
  const content = postInput.value.trim();
  if (!content) {
    showNotification("Vui lòng nhập nội dung bài viết", "error");
    return;
  }

  if (!currentUser) {
    showNotification("Vui lòng đăng nhập để đăng bài", "error");
    return;
  }

  const newPost = {
    id: posts.length + 1,
    author: currentUser.name || "Người dùng",
    time: "Vừa xong",
    space: "Không gian tích cực",
    title: "Bài viết mới",
    content: content,
    type: "text",
    likes: 0,
    comments: 0,
    shares: 0,
    liked: false,
  };

  posts.unshift(newPost);
  renderPosts();
  postInput.value = "";

  showNotification("Đã đăng bài viết thành công!", "success");
}

function toggleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();

    const action = post.liked ? "thích" : "bỏ thích";
    showNotification(`Đã ${action} bài viết`, "success");
  }
}

function showComments(postId) {
  currentPostId = postId;
  const post = posts.find((p) => p.id === postId);

  if (post) {
    // Load sample comments
    commentList.innerHTML = `
            <div class="comment-item">
                <div class="comment-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="comment-content">
                    <div class="comment-author">Minh Anh</div>
                    <div class="comment-text">Bài viết rất ý nghĩa, cảm ơn bạn đã chia sẻ!</div>
                </div>
            </div>
            <div class="comment-item">
                <div class="comment-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="comment-content">
                    <div class="comment-author">Tuấn Kiệt</div>
                    <div class="comment-text">Mình cũng đã trải qua điều tương tự. Cảm ơn vì đã truyền cảm hứng!</div>
                </div>
            </div>
        `;

    commentModal.style.display = "flex";
  }
}

function hideCommentModal() {
  commentModal.style.display = "none";
  commentInput.value = "";
  currentPostId = null;
}

function addComment() {
  const content = commentInput.value.trim();
  if (!content) {
    showNotification("Vui lòng nhập nội dung bình luận", "error");
    return;
  }

  if (!currentUser) {
    showNotification("Vui lòng đăng nhập để bình luận", "error");
    return;
  }

  const newComment = document.createElement("div");
  newComment.className = "comment-item";
  newComment.innerHTML = `
        <div class="comment-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="comment-content">
            <div class="comment-author">${currentUser.name || "Bạn"}</div>
            <div class="comment-text">${content}</div>
        </div>
    `;

  commentList.appendChild(newComment);
  commentInput.value = "";

  // Update post comment count
  if (currentPostId) {
    const post = posts.find((p) => p.id === currentPostId);
    if (post) {
      post.comments += 1;
      renderPosts();
    }
  }

  showNotification("Đã thêm bình luận", "success");
}

function sharePost(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.shares += 1;
    renderPosts();
    showNotification("Đã chia sẻ bài viết", "success");

    // In a real app, this would open a share dialog
    setTimeout(() => {
      console.log(`Sharing post: ${post.title}`);
    }, 500);
  }
}

function togglePodcastPlay(podcastId) {
  const podcast = podcasts.find((p) => p.id === podcastId);
  if (podcast) {
    // Stop all other podcasts
    podcasts.forEach((p) => {
      if (p.id !== podcastId) {
        p.playing = false;
      }
    });

    podcast.playing = !podcast.playing;
    renderPodcasts();

    const action = podcast.playing ? "bắt đầu phát" : "tạm dừng";
    showNotification(`Đã ${action} podcast "${podcast.title}"`, "success");
  }
}

function togglePodcastLike(podcastId) {
  const podcast = podcasts.find((p) => p.id === podcastId);
  if (podcast) {
    podcast.liked = !podcast.liked;
    renderPodcasts();

    const action = podcast.liked ? "thích" : "bỏ thích";
    showNotification(`Đã ${action} podcast`, "success");
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#38a169"
            : type === "error"
            ? "#e53e3e"
            : "#3182ce"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Handle page visibility change
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause all podcasts when page is hidden
    podcasts.forEach((podcast) => {
      podcast.playing = false;
    });
    renderPodcasts();
  }
});
