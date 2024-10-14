document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  const findPasswordButton = document.getElementById('findPasswordButton');
  
  // URL 파라미터에서 이름과 아이디 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const id = urlParams.get('id');

  // 이름과 아이디 표시
  if (name && id) {
      document.querySelector('.result-message').textContent = `${name}님의 아이디는`;
      document.getElementById('foundId').textContent = id;
  }

  loginButton.addEventListener('click', function() {
      window.location.href = 'login.html'; // 로그인 페이지로 이동
  });

  findPasswordButton.addEventListener('click', function() {
      window.location.href = 'find-pw.html'; // 비밀번호 찾기 페이지로 이동
  });
});