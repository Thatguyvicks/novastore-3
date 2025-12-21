// Notification function
function showNotification(message) {
  const notification = document.getElementById('contact-notification');
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showNotification("Message sent!");
  contactForm.reset();
});

// Customer Care popup
const careBtn = document.getElementById('customer-care-btn');
const careOverlay = document.getElementById('customer-care-overlay');
const closeCare = document.getElementById('close-customer-care');

careBtn.addEventListener('click', () => {
  careOverlay.style.display = "flex";
});

closeCare.addEventListener('click', () => {
  careOverlay.style.display = "none";
});

// Complaint submission
const complaintBtn = document.getElementById('submit-complaint');
const complaintText = document.getElementById('complaint-text');

complaintBtn.addEventListener('click', () => {
  if(complaintText.value.trim() === "") {
    showNotification("Please enter a complaint.");
    return;
  }
  showNotification("Complaint submitted!");
  complaintText.value = "";
});

// Simple AI chat simulation
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');

sendChat.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if(msg === "") return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.textContent = msg;
  userMsg.classList.add('user-msg');
  chatBox.appendChild(userMsg);

  // Clear input
  chatInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate AI response
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.textContent = "AI: Thank you for reaching out! We will assist you shortly.";
    aiMsg.classList.add('ai-msg');
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 800);
});

