document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('center-signupForm');
  const emailVerifyBtn = document.getElementById('center-emailVerify');
  const emailVerifyConfirmBtn = document.getElementById('center-emailVerifyConfirm');
  const phoneVerifyBtn = document.getElementById('center-phoneVerify');
  const phoneVerifyConfirmBtn = document.getElementById('center-phoneVerifyConfirm');
  const addressSearchBtn = document.getElementById('center-addressSearch');
  const cancelBtn = document.getElementById('center-cancelBtn');
  const businessNumberVerifyBtn = document.getElementById('center-businessNumberVerify');
  const useridInput = document.getElementById('center-userid');
  const passwordInput = document.getElementById('center-password');
  const passwordConfirmInput = document.getElementById('center-passwordConfirm');

  let emailVerificationCode = '';
  let phoneVerificationCode = '';

  // 정규표현식 패턴
  const useridPattern = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  // 사업자 등록번호 조회
  businessNumberVerifyBtn.addEventListener('click', function() {
    const businessNumber = document.getElementById('center-businessNumber').value;
   
    if (businessNumber.length === 10 && !isNaN(businessNumber)) {
      alert('유효한 사업자 등록번호입니다.');
    } else {
      alert('유효하지 않은 사업자 등록번호입니다.');
    }
  });

  // 이메일 인증
  emailVerifyBtn.addEventListener('click', function() {
    emailVerificationCode = Math.random().toString(36).substr(2, 6);
    alert(`이메일 인증 코드: ${emailVerificationCode}`);
  });

  emailVerifyConfirmBtn.addEventListener('click', function() {
    const inputCode = document.getElementById('center-emailVerifyCode').value;
    if (inputCode === emailVerificationCode) {
      alert('이메일 인증이 완료되었습니다.');
      hideError(document.getElementById('center-emailVerifyCode'));
    } else {
      showError(document.getElementById('center-emailVerifyCode'), '인증 코드가 일치하지 않습니다.');
    }
  });

  // 연락처 인증
  phoneVerifyBtn.addEventListener('click', function() {
    phoneVerificationCode = Math.random().toString(36).substr(2, 6);
    alert(`연락처 인증 코드: ${phoneVerificationCode}`);
  });

  phoneVerifyConfirmBtn.addEventListener('click', function() {
    const inputCode = document.getElementById('center-phoneVerifyCode').value;
    if (inputCode === phoneVerificationCode) {
      alert('연락처 인증이 완료되었습니다.');
      hideError(document.getElementById('center-phoneVerifyCode'));
    } else {
      showError(document.getElementById('center-phoneVerifyCode'), '인증 코드가 일치하지 않습니다.');
    }
  });

  // 주소 검색
  addressSearchBtn.addEventListener('click', function() {
    new daum.Postcode({
      oncomplete: function(data) {
        document.getElementById('center-zipcode').value = data.zonecode;
        document.getElementById('center-address').value = data.address;
        document.getElementById('center-detailAddress').focus();
        hideError(document.getElementById('center-zipcode'));
        hideError(document.getElementById('center-address'));
      }
    }).open();
  });

  // 폼 제출
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
      alert('센터 회원가입이 완료되었습니다.');
      window.location.href = '../member/center-signupOk.html'; 
    }
  });

  // 취소 버튼
  cancelBtn.addEventListener('click', function() {
    if (confirm('센터 회원가입을 취소하시겠습니까?')) {
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

    if (document.getElementById('center-emailVerifyCode').value !== emailVerificationCode) {
      showError(document.getElementById('center-emailVerifyCode'), '이메일 인증이 완료되지 않았습니다.');
      isValid = false;
    }
    if (document.getElementById('center-phoneVerifyCode').value !== phoneVerificationCode) {
      showError(document.getElementById('center-phoneVerifyCode'), '연락처 인증이 완료되지 않았습니다.');
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