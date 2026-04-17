const galleryLoading = document.getElementById("gallery-loading");
const galleryError = document.getElementById("gallery-error");
const galleryGrid = document.getElementById("gallery-grid");
const modalOverlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalRole = document.getElementById("modal-role");
const modalContribution = document.getElementById("modal-contribution");
const modalLinksSection = document.getElementById("modal-links");
const modalLinksList = document.getElementById("modal-links-list");
const modalLightbox = document.getElementById("modal-lightbox");
const yearEl = document.getElementById("year");

let lightboxStep = null;
let projects = []; // Global projects array

yearEl.textContent = String(new Date().getFullYear());

function getLinkIconSvg(type) {
  if (type === "x") {
    return `<svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  }
  if (type === "playstore") {
    return `<svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
    <path d="M 1.167 1.766 L 1.167 22.234 C 1.168 22.407 1.357 22.514 1.507 22.427 C 1.523 22.418 1.538 22.406 1.552 22.393 L 12.208 12 L 1.552 1.607 C 1.428 1.484 1.218 1.542 1.175 1.71 C 1.17 1.728 1.167 1.746 1.167 1.766 Z"></path>
    <path d="M 16.677 7.73 L 3.314 0.367 L 3.306 0.363 C 3.076 0.238 2.857 0.549 3.046 0.73 L 13.52 10.747 L 16.677 7.73 Z"></path>
    <path d="M 3.047 23.27 C 2.857 23.451 3.076 23.762 3.307 23.637 L 3.316 23.633 L 16.677 16.27 L 13.52 13.252 L 3.047 23.27 Z"></path>
    <path d="M 22.071 10.698 L 18.34 8.643 L 14.831 12 L 18.34 15.355 L 22.071 13.302 C 23.086 12.741 23.086 11.259 22.071 10.698 Z"></path>
    </svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
  <path d="M 23.328 12 C 23.328 5.993 18.61 1.067 12.679 0.716 C 12.556 0.702 12.434 0.693 12.309 0.693 C 12.272 0.693 12.235 0.697 12.199 0.698 C 12.133 0.697 12.067 0.693 12 0.693 C 5.753 0.693 0.672 5.765 0.672 12 C 0.672 18.235 5.753 23.307 12 23.307 C 12.066 23.307 12.133 23.303 12.199 23.301 C 12.235 23.303 12.272 23.307 12.309 23.307 C 12.433 23.307 12.555 23.299 12.679 23.284 C 18.61 22.933 23.328 18.007 23.328 12 Z M 21.221 15.64 C 20.832 15.526 19.853 15.282 18.127 15.079 C 18.27 14.103 18.349 13.072 18.349 12 C 18.349 11.155 18.3 10.336 18.209 9.549 C 20.397 9.287 21.354 8.959 21.418 8.936 L 21.155 8.194 C 21.646 9.366 21.918 10.652 21.918 12 C 21.918 13.285 21.669 14.512 21.221 15.64 Z M 6.998 12 C 6.998 11.21 7.05 10.437 7.146 9.695 C 8.292 9.784 9.663 9.851 11.272 9.866 L 11.272 14.769 C 9.704 14.784 8.365 14.848 7.238 14.935 C 7.083 14.002 6.998 13.016 6.998 11.999 L 6.998 12 Z M 12.683 2.2 C 14.416 2.703 15.9 5.109 16.564 8.297 C 15.496 8.382 14.21 8.445 12.683 8.459 L 12.683 2.2 Z M 11.272 2.217 L 11.272 8.459 C 9.764 8.444 8.471 8.381 7.385 8.299 C 8.064 5.149 9.559 2.762 11.272 2.217 Z M 11.272 16.179 L 11.272 21.781 C 9.673 21.273 8.265 19.163 7.533 16.326 C 8.587 16.249 9.831 16.193 11.272 16.179 Z M 12.683 21.8 L 12.683 16.179 C 14.139 16.192 15.379 16.25 16.42 16.332 C 15.7 19.205 14.3 21.332 12.683 21.8 Z M 12.683 14.77 L 12.683 9.867 C 14.302 9.852 15.664 9.783 16.795 9.691 C 16.887 10.434 16.938 11.207 16.938 11.999 C 16.938 13.018 16.856 14.006 16.705 14.939 C 15.592 14.849 14.26 14.784 12.683 14.769 L 12.683 14.77 Z M 20.894 7.626 C 20.682 7.693 19.79 7.946 18.002 8.157 C 17.603 6.038 16.883 4.227 15.946 2.919 C 18.1 3.856 19.857 5.532 20.895 7.626 L 20.894 7.626 Z M 8.617 2.695 C 7.464 4.018 6.524 5.923 6.01 8.174 C 4.409 8 3.449 7.796 3.065 7.703 C 4.185 5.393 6.18 3.58 8.617 2.695 Z M 2.541 9.024 C 2.813 9.097 3.842 9.353 5.756 9.564 C 5.646 10.347 5.586 11.162 5.586 12 C 5.586 13.066 5.682 14.091 5.857 15.063 C 4.214 15.24 3.203 15.452 2.75 15.562 C 2.322 14.455 2.083 13.255 2.083 11.999 C 2.083 10.963 2.244 9.962 2.542 9.022 L 2.541 9.024 Z M 3.368 16.866 C 3.882 16.757 4.801 16.59 6.163 16.448 C 6.7 18.429 7.571 20.105 8.617 21.305 C 6.384 20.494 4.526 18.904 3.368 16.867 L 3.368 16.866 Z M 15.945 21.079 C 16.789 19.903 17.457 18.319 17.873 16.469 C 19.273 16.629 20.152 16.818 20.595 16.93 C 19.535 18.764 17.904 20.228 15.945 21.079 Z"></path>
</svg>`
}

function renderProjectLinks(project) {
  modalLinksList.innerHTML = "";
  const items = (project.links || []).map(item => ({ type: item.type, href: item.url }));
  if (!items.length) {
    modalLinksSection.hidden = true;
    return;
  }

  modalLinksSection.hidden = false;
  for (const item of items) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "modal__link";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const iconWrap = document.createElement("span");
    iconWrap.className = "modal__link-icon";
    iconWrap.innerHTML = getLinkIconSvg(item.type);

    const text = document.createElement("span");
    text.className = "modal__link-text";
    text.textContent = item.href;

    a.append(iconWrap, text);
    li.appendChild(a);
    modalLinksList.appendChild(li);
  }
}

function setModalState(open, projectId = null) {
  modalOverlay.dataset.state = open ? "open" : "closed";
  modalOverlay.classList.toggle("hidden", !open);
  document.body.classList.toggle("modal-open", open);

  if (!open) {
    stopModalMedia();
    lightboxStep = null;
    modalLightbox.innerHTML = "";
    modalLightbox.hidden = true;
    // Remove project from URL hash when closing
    window.location.hash = '';
  }
}

function stopModalMedia() {
  modalLightbox.querySelectorAll("video").forEach((v) => {
    v.pause();
    v.removeAttribute("src");
    v.load();
  });
  modalLightbox.querySelectorAll("iframe.modal-lightbox__iframe").forEach((el) => {
    el.src = "about:blank";
  });
}

function getYouTubeVideoId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("v");
  } catch (_) {
    return null;
  }
}

function mountLazyImage(wrapper, { src }) {
  const skeleton = document.createElement("div");
  skeleton.className = "media-block__skeleton";
  wrapper.appendChild(skeleton);

  const img = document.createElement("img");
  img.className = "media-block__img";
  img.decoding = "async";
  img.loading = "eager";

  img.onload = () => {
    skeleton.remove();
    wrapper.classList.remove("media-block--loading");
  };
  img.onerror = () => {
    skeleton.remove();
    wrapper.classList.remove("media-block--loading");
    img.style.minHeight = "120px";
    img.style.objectFit = "contain";
  };

  wrapper.appendChild(img);
  requestAnimationFrame(() => {
    img.src = src;
  });
}

function mountLazyVideo(wrapper, { src, autoplay = false }) {
  const skeleton = document.createElement("div");
  skeleton.className = "media-block__skeleton";
  wrapper.appendChild(skeleton);

  const video = document.createElement("video");
  video.className = "media-block__video";
  video.controls = true;
  video.playsInline = true;
  video.preload = autoplay ? "auto" : "none";
  video.setAttribute("controlsList", "nodownload");
  if (autoplay) {
    video.autoplay = true;
    video.muted = false;
  }

  const clearSkeleton = () => {
    skeleton.remove();
    wrapper.classList.remove("media-block--loading");
  };

  video.addEventListener(
    "loadeddata",
    () => {
      clearSkeleton();
      if (autoplay) {
        video.play().catch(() => { });
      }
    },
    { once: true }
  );
  video.addEventListener(
    "error",
    () => {
      clearSkeleton();
      video.replaceWith(
        Object.assign(document.createElement("p"), {
          className: "modal__body",
          textContent: "Video could not be loaded.",
        })
      );
    },
    { once: true }
  );

  wrapper.appendChild(video);

  requestAnimationFrame(() => {
    video.src = src;
    video.load();
    if (autoplay) {
      video.play().catch(() => { });
    }
  });
}

function mountYouTubeEmbed(wrapper, url, { autoplay = false } = {}) {
  const skeleton = document.createElement("div");
  skeleton.className = "media-block__skeleton";
  wrapper.appendChild(skeleton);

  const id = getYouTubeVideoId(url);
  const clearSkeleton = () => {
    skeleton.remove();
    wrapper.classList.remove("media-block--loading");
  };

  if (!id) {
    clearSkeleton();
    wrapper.appendChild(
      Object.assign(document.createElement("p"), {
        className: "modal__body",
        textContent: "Could not read this YouTube link.",
      })
    );
    return;
  }

  const params = new URLSearchParams({
    playsinline: "1",
    rel: "0",
  });
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "0");
  }

  const iframe = document.createElement("iframe");
  iframe.className = "modal-lightbox__iframe";
  iframe.src = `https://www.youtube.com/embed/${id}?${params.toString()}`;
  iframe.title = "YouTube video player";
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );

  iframe.addEventListener("load", clearSkeleton, { once: true });

  wrapper.appendChild(iframe);
}

function populateModalLightbox(project) {
  lightboxStep = null;
  modalLightbox.innerHTML = "";

  const items = (project.media || []).filter(
    (m) =>
      (m.type === "image" && m.src) || (m.type === "video" && m.src)
  );

  if (items.length === 0) {
    modalLightbox.hidden = true;
    return;
  }

  modalLightbox.hidden = false;

  const stageOuter = document.createElement("div");
  stageOuter.className = "modal-lightbox__stage-outer";

  const stage = document.createElement("div");
  stage.className = "modal-lightbox__stage";

  const thumbs = document.createElement("div");
  thumbs.className = "modal-lightbox__thumbs";
  thumbs.setAttribute("role", "tablist");

  let current = 0;

  function pauseStageMedia() {
    stage.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.removeAttribute("src");
      v.load();
    });
    stage.querySelectorAll("iframe.modal-lightbox__iframe").forEach((el) => {
      el.src = "about:blank";
    });
  }

  function updateThumbSelection(index) {
    thumbs.querySelectorAll(".modal-lightbox__thumb").forEach((btn, i) => {
      const on = i === index;
      btn.classList.toggle("modal-lightbox__thumb--active", on);
    });
  }

  function select(index, { fromOpen = false } = {}) {
    if (index < 0 || index >= items.length) return;
    pauseStageMedia();
    current = index;
    updateThumbSelection(index);

    const item = items[index];
    const shouldAutoplay =
      Boolean(fromOpen) && index === 0 && item.type === "video";

    stage.innerHTML = "";
    const inner = document.createElement("div");
    inner.className =
      "modal-lightbox__stage-inner media-block media-block--loading";

    if (item.type === "image") {
      mountLazyImage(inner, { src: item.src });
    } else if (getYouTubeVideoId(item.src)) {
      mountYouTubeEmbed(inner, item.src, { autoplay: shouldAutoplay });
    } else {
      mountLazyVideo(inner, { src: item.src, autoplay: shouldAutoplay });
    }
    stage.appendChild(inner);
  }

  items.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "modal-lightbox__thumb";
    btn.setAttribute("role", "tab");

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.loading = "lazy";
      img.decoding = "async";
      btn.appendChild(img);
    } else {
      const wrap = document.createElement("span");
      wrap.className = "modal-lightbox__thumb-video";
      wrap.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M8 5v14l11-7z"/></svg>';
      btn.appendChild(wrap);
    }

    btn.addEventListener("click", () => select(i));
    thumbs.appendChild(btn);
  });

  if (items.length <= 1) {
    thumbs.hidden = true;
  }

  stageOuter.append(stage);
  modalLightbox.append(stageOuter, thumbs);

  lightboxStep = (delta) => {
    if (items.length <= 1) return;
    const n = items.length;
    const next = (current + delta + n) % n;
    select(next, {});
  };

  select(0, { fromOpen: true });
}

function openProject(project, triggerEl) {
  modalTitle.textContent = project.title;
  modalDescription.innerHTML = project.longDescription;

  if (project.myRole) {
    modalContribution.hidden = false;
    modalRole.innerHTML = project.myRole;
  } else {
    modalContribution.hidden = true;
    modalRole.innerHTML = "";
  }

  renderProjectLinks(project);

  populateModalLightbox(project);
  setModalState(true);

  // Update URL hash with project ID
  window.location.hash = project.id;
}

function renderGallery(projectsData) {
  projects = projectsData; // Store globally
  galleryGrid.innerHTML = "";

  projects.forEach((project) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card";

    const thumbWrap = document.createElement("div");
    thumbWrap.className = "card__thumb-wrap";

    const img = document.createElement("img");
    img.className = "card__thumb";
    img.loading = "lazy";
    img.decoding = "async";
    img.src = project.thumbnail || "";

    thumbWrap.appendChild(img);

    const body = document.createElement("div");
    body.className = "card__body";

    const title = document.createElement("h2");
    title.className = "card__title";
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.className = "card__desc";
    desc.textContent = project.shortDescription || "";

    body.append(title, desc);
    btn.append(thumbWrap, body);

    btn.addEventListener("click", () => openProject(project, btn));
    galleryGrid.appendChild(btn);
  });

  galleryLoading.classList.add("hidden");
  galleryGrid.hidden = false;
}

async function loadProjects() {
  try {
    const res = await fetch("projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const projectsData = Array.isArray(data.projects) ? data.projects : [];
    if (projectsData.length === 0) {
      galleryLoading.textContent = "No projects configured yet.";
      return;
    }
    renderGallery(projectsData);

    // Check for project in URL hash
    const hash = window.location.hash.substring(1); // Remove #
    const projectId = hash.split('/')[0];
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        openProject(project);
      }
    }
  } catch (e) {
    galleryLoading.classList.add("hidden");
    galleryError.classList.remove("hidden");
    galleryError.textContent =
      "Could not load projects from 'projects.json'";
  }
}

modalClose.addEventListener("click", () => setModalState(false));

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) setModalState(false);
});

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("keydown", (e) => {
  if (modalOverlay.dataset.state !== "open") return;
  if (e.key === "Escape") {
    e.preventDefault();
    setModalState(false);
    return;
  }
  if (lightboxStep && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    e.preventDefault();
    lightboxStep(e.key === "ArrowLeft" ? -1 : 1);
  }
});

// Handle hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  const projectId = hash.split('/')[0];
  if (projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      openProject(project);
    }
  } else {
    setModalState(false);
  }
});

loadProjects();
