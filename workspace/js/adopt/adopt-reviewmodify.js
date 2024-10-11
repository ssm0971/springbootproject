// 글작성도중취소버튼
function modifyCancle() {
  if (confirm('정말 취소하시겠습니까? 작성중이던 글은 저장되지 않습니다')) {
    console.log('입양 글수정이 취소되었습니다.');
  } else {
    console.log('입양 글수정이 취소되지 않았습니다.');
  }
}