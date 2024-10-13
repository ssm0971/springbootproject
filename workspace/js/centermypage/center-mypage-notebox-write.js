function goBack() {
  const title = document.getElementById('note-board-title').value;
  const nickname = document.getElementById('note-board-nickname').value;
  const content = document.getElementById('note-board-content').value;

  if (title || nickname || content) {
    const confirmation = confirm("작성 중인 내용은 저장되지 않습니다. 이동하시겠습니까?");
    if (confirmation) {
      window.location.href = "./center-mypage-notebox-send.html"; // 이전 페이지로 이동
    }
  } else {
    window.location.href = "./center-mypage-notebox-send.html"; // 이전 페이지로 이동
  }
}