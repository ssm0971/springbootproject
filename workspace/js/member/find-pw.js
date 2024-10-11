document.addEventListener('DOMContentLoaded', function() {
  const findPwButton = document.getElementById('findPwButton');
  
  findPwButton.addEventListener('click', function() {
      const userName = document.getElementById('userName').value;
      const userId = document.getElementById('userId').value;
      const userEmail = document.getElementById('userEmail').value;

      if (userName && userId && userEmail) {

          
          // 임시 비밀번호 발송 성공을 가정하고 결과 페이지로 이동
          window.location.href = `find-pwOk.html?name=${encodeURIComponent(userName)}`;
      } else {
          alert('모든 필드를 입력해 주세요.');
      }
  });
});