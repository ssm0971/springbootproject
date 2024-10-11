function clearPlaceholder() {
  const input = document.getElementById('agreement');
  input.value = ''; // 입력창 클릭 시 내용 지우기
  input.style.color = 'black'; // 텍스트 색상 변경
}

function checkAgreement() {
  const input = document.getElementById('agreement').value;
  const button = document.getElementById('withdrawButton');
  
  if (input === "동의합니다") {
      button.classList.add('active');
      button.style.cursor = 'pointer';
      button.disabled = false;
  } else {
      button.classList.remove('active');
      button.style.cursor = 'not-allowed';
      button.disabled = true;
  }
}

function showModal() {
  document.getElementById('modalOverlay').style.display = 'block';
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
}

function confirmWithdrawal() {
  alert("회원탈퇴가 완료되었습니다.");
  // 여기서 실제 회원탈퇴 로직을 추가하면 됩니다.
  closeModal();
}