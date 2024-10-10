document.addEventListener('DOMContentLoaded', function() {
  const chatIcon = document.getElementById('chatIcon');
  const chatWindow = document.getElementById('chatWindow');
  const closeChat = document.getElementById('closeChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatQuestions = document.getElementById('chatQuestions');

  const questions = [
    { text: "봉사는 어떻게 신청하나요?", answer: "봉사신청 페이지에서 신청서를 작성할 수 있습니다." },
    { text: "기부는 어떻게 하나요?", answer: "기부 페이지에서 다양한 기부 방법을 확인하실 수 있습니다." },
    { text: "입양 절차가 궁금해요", answer: "입양 페이지에서 입양 절차와 필요한 서류를 확인하실 수 있습니다." }
  ];

  function toggleChatWindow() {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    if (chatWindow.style.display === 'flex') {
      showQuestions();
    }
  }

  function showQuestions() {
    chatQuestions.innerHTML = '';
    questions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'question-btn';
      btn.textContent = q.text;
      btn.onclick = () => showAnswer(q);
      chatQuestions.appendChild(btn);
    });
  }

  function showAnswer(question) {
    addMessage(question.text, 'user-message');
    addMessage(question.answer, 'bot-message');
  }

  function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatIcon.addEventListener('click', toggleChatWindow);
  closeChat.addEventListener('click', toggleChatWindow);

  // 초기 상태 설정
  chatWindow.style.display = 'none';
});