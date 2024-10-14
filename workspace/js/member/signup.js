document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const emailVerifyBtn = document.getElementById('emailVerify');
  const emailVerifyConfirmBtn = document.getElementById('emailVerifyConfirm');
  const phoneVerifyBtn = document.getElementById('phoneVerify');
  const phoneVerifyConfirmBtn = document.getElementById('phoneVerifyConfirm');
  const addressSearchBtn = document.getElementById('addressSearch');
  const cancelBtn = document.getElementById('cancelBtn');
  const genderBtns = document.querySelectorAll('.gender-btn');
  const nicknameInput = document.getElementById('nickname');
  const nicknameCheckBtn = document.getElementById('nicknameCheck');
  const useridInput = document.getElementById('userid');
  const passwordInput = document.getElementById('password');
  const passwordConfirmInput = document.getElementById('passwordConfirm');

  let emailVerificationCode = '';
  let phoneVerificationCode = '';
  let isNicknameAvailable = false;

  // 정규표현식 패턴
  const useridPattern = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  // 성별 선택
  genderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      genderBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('gender').value = this.dataset.gender;
      hideError(document.getElementById('gender'));
    });
  });

  // 닉네임 중복 확인
  nicknameCheckBtn.addEventListener('click', function() {
    const nickname = nicknameInput.value.trim();
    if (nickname === '') {
      showError(nicknameInput, '닉네임을 입력해주세요.');
      return;
    }

    // 서버에 닉네임 중복 확인 요청
    // 실제 구현 시에는 서버로 AJAX 요청을 보내서 구현
    setTimeout(() => {
      // 임시로 랜덤하게 결과를 반환
      const isAvailable = Math.random() < 0.5;
      if (isAvailable) {
        alert('사용 가능한 닉네임입니다.');
        isNicknameAvailable = true;
        hideError(nicknameInput);
      } else {
        showError(nicknameInput, '이미 사용 중인 닉네임입니다.');
        isNicknameAvailable = false;
      }
    }, 1000);
  });

  nicknameInput.addEventListener('input', function() {
    isNicknameAvailable = false;
  });

  // 이메일 인증
  emailVerifyBtn.addEventListener('click', function() {
    emailVerificationCode = Math.random().toString(36).substr(2, 6);
    alert(`이메일 인증 코드: ${emailVerificationCode}`);
  });

  emailVerifyConfirmBtn.addEventListener('click', function() {
    const inputCode = document.getElementById('emailVerifyCode').value;
    if (inputCode === emailVerificationCode) {
      alert('이메일 인증이 완료되었습니다.');
      hideError(document.getElementById('emailVerifyCode'));
    } else {
      showError(document.getElementById('emailVerifyCode'), '인증 코드가 일치하지 않습니다.');
    }
  });

  // 연락처 인증
  phoneVerifyBtn.addEventListener('click', function() {
    phoneVerificationCode = Math.random().toString(36).substr(2, 6);
    alert(`연락처 인증 코드: ${phoneVerificationCode}`);
  });

  phoneVerifyConfirmBtn.addEventListener('click', function() {
    const inputCode = document.getElementById('phoneVerifyCode').value;
    if (inputCode === phoneVerificationCode) {
      alert('연락처 인증이 완료되었습니다.');
      hideError(document.getElementById('phoneVerifyCode'));
    } else {
      showError(document.getElementById('phoneVerifyCode'), '인증 코드가 일치하지 않습니다.');
    }
  });

  // 주소 검색
  addressSearchBtn.addEventListener('click', function() {
    new daum.Postcode({
      oncomplete: function(data) {
        document.getElementById('zipcode').value = data.zonecode;
        document.getElementById('address').value = data.address;
        document.getElementById('detailAddress').focus();
        hideError(document.getElementById('zipcode'));
        hideError(document.getElementById('address'));
      }
    }).open();
  });

  // 폼 제출
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
      alert('회원가입이 완료되었습니다.');
      window.location.href = '../member/signupOk.html'; 
    }
  });

  // 취소 버튼
  cancelBtn.addEventListener('click', function() {
    if (confirm('회원가입을 취소하시겠습니까?')) {
      window.location.href = '../../html/main/main.html'; 
    }
  });

  // 필드 유효성 검사
  const requiredInputs = document.querySelectorAll('input[required]');
  requiredInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    input.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        hideError(this);
      }
    });
  });

  // 아이디 유효성 검사
  useridInput.addEventListener('input', validateUserid);

  function validateUserid() {
    if (!useridPattern.test(useridInput.value)) {
      showError(useridInput, '아이디는 영문자로 시작하는 6~20자의 영문자 또는 숫자여야 합니다.');
    } else {
      hideError(useridInput);
    }
  }

  // 비밀번호 유효성 검사
  passwordInput.addEventListener('input', validatePassword);
  passwordConfirmInput.addEventListener('input', validatePassword);

  function validatePassword() {
    if (!passwordPattern.test(passwordInput.value)) {
      showError(passwordInput, '비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.');
    } else {
      hideError(passwordInput);
    }

    if (passwordInput.value !== passwordConfirmInput.value) {
      showError(passwordConfirmInput, '비밀번호가 일치하지 않습니다.');
    } else {
      hideError(passwordConfirmInput);
    }
  }

  function validateField(field) {
    if (field.value.trim() === '') {
      showError(field, `${field.previousElementSibling.textContent.replace('*', '').trim()}을(를) 입력해주세요.`);
    } else {
      hideError(field);
    }
  }

  function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function hideError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  // 폼 유효성 검사
  function validateForm() {
    let isValid = true;
    requiredInputs.forEach(input => {
      if (input.value.trim() === '') {
        validateField(input);
        isValid = false;
      }
    });

    if (!document.getElementById('gender').value) {
      showError(document.getElementById('gender'), '성별을 선택해주세요.');
      isValid = false;
    }
    if (!isNicknameAvailable) {
      showError(nicknameInput, '닉네임 중복 확인을 해주세요.');
      isValid = false;
    }
    if (document.getElementById('emailVerifyCode').value !== emailVerificationCode) {
      showError(document.getElementById('emailVerifyCode'), '이메일 인증이 완료되지 않았습니다.');
      isValid = false;
    }
    if (document.getElementById('phoneVerifyCode').value !== phoneVerificationCode) {
      showError(document.getElementById('phoneVerifyCode'), '연락처 인증이 완료되지 않았습니다.');
      isValid = false;
    }
    if (!useridPattern.test(useridInput.value)) {
      showError(useridInput, '아이디 형식이 올바르지 않습니다.');
      isValid = false;
    }
    if (!passwordPattern.test(passwordInput.value)) {
      showError(passwordInput, '비밀번호 형식이 올바르지 않습니다.');
      isValid = false;
    }
    if (passwordInput.value !== passwordConfirmInput.value) {
      showError(passwordConfirmInput, '비밀번호가 일치하지 않습니다.');
      isValid = false;
    }
    
    return isValid;
  }
});