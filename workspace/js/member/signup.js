document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const emailVerifyBtn = document.getElementById('emailVerify');
  const emailVerifyConfirmBtn = document.getElementById('emailVerifyConfirm');
  const phoneVerifyBtn = document.getElementById('phoneVerify');
  const phoneVerifyConfirmBtn = document.getElementById('phoneVerifyConfirm');
  const addressSearchBtn = document.getElementById('addressSearch');
  const cancelBtn = document.getElementById('cancelBtn');
  const genderBtns = document.querySelectorAll('.gender-btn');

  let emailVerificationCode = '';
  let phoneVerificationCode = '';

  // 성별 선택
  genderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      genderBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('gender').value = this.dataset.gender;
      hideError(document.getElementById('gender'));
    });
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
    if (document.getElementById('emailVerifyCode').value !== emailVerificationCode) {
      showError(document.getElementById('emailVerifyCode'), '이메일 인증이 완료되지 않았습니다.');
      isValid = false;
    }
    if (document.getElementById('phoneVerifyCode').value !== phoneVerificationCode) {
      showError(document.getElementById('phoneVerifyCode'), '연락처 인증이 완료되지 않았습니다.');
      isValid = false;
    }
    
    return isValid;
  }
});