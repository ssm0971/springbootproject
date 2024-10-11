document.addEventListener('DOMContentLoaded', function() {
  const emailSendButton = document.getElementById('emailSendButton');
  const phoneSendButton = document.getElementById('phoneSendButton');
  const zipcodeSearchButton = document.getElementById('addressSearchButton');
  const passwordInput = document.getElementById('password');
  const passwordCheckInput = document.getElementById('passwordcheck');
  const passwordMismatchMessage = document.getElementById('passwordMismatchMessage');

  // 이메일 인증전송 버튼 클릭 이벤트
  emailSendButton.addEventListener('click', function() {
      const email = document.getElementById('email').value;
      if (email) {
          alert(`${email}로 인증번호가 전송되었습니다.`);
      } else {
          alert('이메일을 입력해주세요.');
      }
  });

  // 전화번호 인증전송 버튼 클릭 이벤트
  phoneSendButton.addEventListener('click', function() {
      const phoneNumber = document.getElementById('phonenumber').value;
      if (phoneNumber) {
          alert(`${phoneNumber}로 인증번호가 전송되었습니다.`);
      } else {
          alert('전화번호를 입력해주세요.');
      }
  });

  // 주소 찾기 버튼 클릭 이벤트
  zipcodeSearchButton.addEventListener('click', function() {
      new daum.Postcode({
          oncomplete: function(data) {
              document.getElementById('zipcode').value = data.zonecode; // 우편번호 입력
              document.getElementById('address').value = data.address; // 주소 입력
              document.getElementById('detailAddress').focus(); // 상세주소 입력란에 포커스
          }
      }).open();
  });

  // 비밀번호 확인 입력 이벤트
  passwordCheckInput.addEventListener('input', function() {
      if (passwordInput.value !== passwordCheckInput.value) {
          passwordMismatchMessage.style.display = 'block';
      } else {
          passwordMismatchMessage.style.display = 'none';
      }
  });
});