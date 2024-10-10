document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');

  // 정규표현식
  const usernameRegex = /^[a-zA-Z0-9]{4,12}$/; // 4~12자의 영문 대소문자와 숫자
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 최소 하나의 문자와 하나의 숫자

  usernameInput.addEventListener('blur', function() {
      validateField(this, usernameError, '아이디를 입력해주세요.', usernameRegex, '아이디는 4~12자의 영문 대소문자와 숫자만 가능합니다.');
  });

  passwordInput.addEventListener('blur', function() {
      validateField(this, passwordError, '비밀번호를 입력해주세요.', passwordRegex, '비밀번호는 최소 8자, 최소 하나의 문자와 하나의 숫자가 필요합니다.');
  });

  function validateField(field, errorElement, emptyMessage, regex, invalidMessage) {
      if (field.value.trim() === '') {
          showError(field, errorElement, emptyMessage);
      } else if (!regex.test(field.value)) {
          showError(field, errorElement, invalidMessage);
      } else {
          hideError(field, errorElement);
      }
  }

  function showError(field, errorElement, message) {
      field.classList.add('error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
  }

  function hideError(field, errorElement) {
      field.classList.remove('error');
      errorElement.style.display = 'none';
  }

  // 실제 로그인을 구현하는 구분
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      validateField(usernameInput, usernameError, '아이디를 입력해주세요.', usernameRegex, '아이디는 4~12자의 영문 대소문자와 숫자만 가능합니다.');
      validateField(passwordInput, passwordError, '비밀번호를 입력해주세요.', passwordRegex, '비밀번호는 최소 8자, 최소 하나의 문자와 하나의 숫자가 필요합니다.');

      if (!usernameInput.classList.contains('error') && !passwordInput.classList.contains('error')) {
         
          alert('로그인되었습니다.');
          window.location.href = '../../html/main/main.html';
      }
  });

  // 입력 시작할 때 에러 상태 제거
  usernameInput.addEventListener('input', function() {
      hideError(this, usernameError);
  });

  passwordInput.addEventListener('input', function() {
      hideError(this, passwordError);
  });
});