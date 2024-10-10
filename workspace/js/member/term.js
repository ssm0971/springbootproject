document.addEventListener('DOMContentLoaded', function() {
  const allAgreeCheckbox = document.getElementById('allAgree');
  const agreementCheckboxes = document.querySelectorAll('input[name="agreement"]');
  const optionalAgreementCheckbox = document.querySelector('input[name="optionalAgreement"]');
  const nextBtn = document.getElementById('nextBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const termsForm = document.getElementById('termsForm');

  // 전체 동의 체크박스 이벤트
  allAgreeCheckbox.addEventListener('change', function() {
      const isChecked = this.checked;
      agreementCheckboxes.forEach(checkbox => checkbox.checked = isChecked);
      optionalAgreementCheckbox.checked = isChecked;
      updateNextButtonState();
  });

  // 개별 체크박스 이벤트
  agreementCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          updateNextButtonState();
          updateAllAgreeCheckbox();
      });
  });

  optionalAgreementCheckbox.addEventListener('change', updateAllAgreeCheckbox);

  // '다음' 버튼 상태 업데이트
  function updateNextButtonState() {
      const allRequired = Array.from(agreementCheckboxes).every(checkbox => checkbox.checked);
      nextBtn.disabled = !allRequired;
  }

  // 전체 동의 체크박스 상태 업데이트
  function updateAllAgreeCheckbox() {
      const allChecked = Array.from(agreementCheckboxes).every(checkbox => checkbox.checked) && optionalAgreementCheckbox.checked;
      allAgreeCheckbox.checked = allChecked;
  }

  // 취소 버튼 클릭 이벤트
  cancelBtn.addEventListener('click', function() {
      if (confirm('약관 동의를 취소하시겠습니까?')) {
          window.location.href = '../../html/main/main.html'; 
      }
  });

  // 폼 제출 이벤트 (다음 버튼 클릭)
  termsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (confirm('입력하신 내용으로 약관에 동의하시겠습니까?')) {
          window.location.href = 'signup.html'; 
      }
  });
});