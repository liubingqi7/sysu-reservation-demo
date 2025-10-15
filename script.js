const textBindings = [
  { input: "field-title", targets: ["title"] },
  { input: "field-venue", targets: ["venue", "modal-venue"] },
  { input: "field-code", targets: ["code", "modal-code"] },
  { input: "field-fee", targets: ["fee", "modal-fee"] },
  { input: "field-date", targets: ["date", "modal-date"] },
  { input: "field-timeRange", targets: ["timeRange", "modal-timeRange"] },
  { input: "field-location", targets: ["location", "modal-location"] },
  { input: "field-status", targets: ["status-badge"] },
  { input: "field-participants", targets: ["participants", "modal-participants"] },
  { input: "field-address", targets: ["address"] },
  { input: "field-note", targets: ["note"] }
];

textBindings.forEach(({ input, targets }) => {
  const field = document.getElementById(input);
  const elements = targets.map((id) => document.getElementById(id));
  const update = () => {
    elements.forEach((el) => {
      el.textContent = field.value.trim();
    });
  };
  field.addEventListener("input", update);
  update();
});

const contactsField = document.getElementById("field-contacts");
const contactsDisplay = document.getElementById("contacts");
const updateContacts = () => {
  contactsDisplay.innerHTML = contactsField.value
    .split("\n")
    .map((line) => line.trim())
    .map((line) => (line.length ? line : "&nbsp;"))
    .join("<br />");
};
contactsField.addEventListener("input", updateContacts);
updateContacts();

const statusField = document.getElementById("field-status");

statusField.addEventListener("input", () => {
  // Status field is now only used for display in the badge
});

const bookingCard = document.getElementById("booking-card");
const modal = document.getElementById("booking-modal");
const backdrop = document.getElementById("backdrop");
const closeButton = document.getElementById("modal-close");

const openModal = () => {
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  backdrop.classList.add("hidden");
};

bookingCard.addEventListener("click", openModal);
bookingCard.addEventListener("keypress", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openModal();
  }
});

closeButton.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// 全屏功能
const fullscreenBtn = document.getElementById("fullscreen-btn");

const toggleFullscreen = () => {
  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.mozFullScreenElement && 
      !document.msFullscreenElement) {
    // 进入全屏
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

fullscreenBtn.addEventListener("click", toggleFullscreen);

// 手机端自动触发地址栏隐藏
if (window.innerWidth <= 640) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 100);
  });
}
