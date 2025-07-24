document.addEventListener("DOMContentLoaded", () => {
  // IntersectionObserver를 지원하지 않는 구형 브라우저에 대한 예외 처리
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".dot-nav a");

  // 닷(dot) 클릭 시 부드럽게 스크롤
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // '#hero' 링크는 페이지 최상단(top: 0)으로 스크롤하도록 특별 처리
      if (targetId === "#hero") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // 스크롤 위치에 따라 활성 닷(dot) 업데이트
  const observerOptions = {
    root: null,
    // 뷰포트의 상하 45%를 제외한 중앙 10% 영역을 교차 지점으로 설정합니다.
    // 이렇게 하면 섹션이 화면 중앙에 위치할 때 활성 닷이 변경됩니다.
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
