function checkBreedInput() {
  const inputField = document.getElementById('breedInput');
  const breadError = document.getElementById('breadError');
  const breadError2 = document.getElementById('breadError2');

  if (inputField.value.trim() === '') {
      breadError.style.display = 'block'; // 메시지 표시
      breadError2.style.display = 'block'; // 메시지 표시
  } else {
      breadError.style.display = 'none'; // 메시지 숨김
      breadError2.style.display = 'none'; // 메시지 숨김
  }
}

function checkWeightInput() {
  const inputField = document.getElementById('weightInput');
  const weightError = document.getElementById('weightError');
  const weightError2 = document.getElementById('weightError2');

  if (inputField.value.trim() === '') {
      weightError.style.display = 'block'; // 메시지 표시
      weightError2.style.display = 'block'; // 메시지 표시
  } else {
      weightError.style.display = 'none'; // 메시지 숨김
      weightError2.style.display = 'none'; // 메시지 숨김
  }
}

function checkIntroduceInput() {
  const inputField = document.getElementById('introduceInput');
  const introduceError = document.getElementById('introduceError');
  const introduceError2 = document.getElementById('introduceError2');

  if (inputField.value.trim() === '') {
      introduceError.style.display = 'block'; // 메시지 표시
      introduceError2.style.display = 'block'; // 메시지 표시
  } else {
      introduceError.style.display = 'none'; // 메시지 숨김
      introduceError2.style.display = 'none'; // 메시지 숨김
  }
}