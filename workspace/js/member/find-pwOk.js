document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  
  // URL 파라미터에서 이름 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  // 이름 표시
  if (name) {
      document.getElementById('userName').textContent = name;
  }

  loginButton.addEventListener('click', function() {
      window.location.href = 'login.html'; // 로그인 페이지로 이동
  });
});