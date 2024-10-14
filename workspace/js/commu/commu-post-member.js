// 댓글등록 알터창
function Comment() {
  const comment = document.getElementById('commentInput').value.trim();
  
  if (comment === '') {
    alert('입력한 내용이 없습니다.');
    return false; // 입력 내용이 없을 경우
  }
  return true; // 입력 내용이 있을 경우 
}

//게시글 

// 수정, 삭제,신고 confirm창
function modifyAlert() {
  const userConfirmed = confirm("수정하시겠습니까?");
  if (userConfirmed) {
      window.location.href ='../../html/commu/commu-post-rewrite.html'; // 수정페이지로 이동
  }
}

function deleteAlert() {
  const userConfirmed = confirm("삭제하시겠습니까?");
  if (userConfirmed) {
      alert("삭제가 완료되었습니다."); // 확인 눌렀을 때 알림 창 표시
      window.location.href = "../../html/commu/commu-main-member.html"; // 커뮤 메인으로 이동
  }
}

function endAlert() {
  const userConfirmed = confirm("신고하시겠습니까?");
  if (userConfirmed) {
      alert("신고가 완료되었습니다."); // 알림 창 표시
      window.location.href = "../../html/commu/commu-main-member.html"; // 커뮤 메인으로 이동
  }
}