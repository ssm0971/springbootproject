document.querySelectorAll('.doghouse-list-title').forEach(title => {
    title.addEventListener('click', function() {
        const info = this.nextElementSibling;

        // 모든 리스트 정보 닫기
        document.querySelectorAll('.doghouse-list-info').forEach(item => {
            if (item !== info) {
                item.classList.remove('active');
            }
        });

        // 클릭한 리스트 정보 토글
        info.classList.toggle('active');
    });
});