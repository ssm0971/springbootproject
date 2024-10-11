document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('findIdForm');
  const sendVerificationBtn = document.getElementById('sendVerification');
  const verifyCodeBtn = document.getElementById('verifyCode');
  const findIdButton = document.getElementById('findIdButton');
  const verificationGroup = document.getElementById('verificationGroup');

  let verificationCode = '';
  let isVerified = false;

  sendVerificationBtn.addEventListener('click', function() {
      const phone = document.getElementById('userPhone').value;
      if (phone) {
          
          verificationCode = Math.random().toString(36).substr(2, 6);
          alert(`인증번호가 전송되었습니다: ${verificationCode}`);
          verificationGroup.style.display = 'block';
      } else {
          alert('전화번호를 입력해주세요.');
      }
  });

  verifyCodeBtn.addEventListener('click', function() {
      const inputCode = document.getElementById('verificationCode').value;
      if (inputCode === verificationCode) {
          alert('인증이 완료되었습니다.');
          isVerified = true;
          findIdButton.disabled = false;
      } else {
          alert('인증번호가 일치하지 않습니다.');
      }
  });

  findIdButton.addEventListener('click', function(e) {
      if (isVerified) {
       
          const userName = document.getElementById('userName').value;
          const userPhone = document.getElementById('userPhone').value;
    
          // 아이디를 찾은 후 findIdOk 페이지로 이동
          window.location.href = 'center-findIdOk.html';
      } else {
          alert('전화번호 인증을 완료해주세요.');
      }
  });

});