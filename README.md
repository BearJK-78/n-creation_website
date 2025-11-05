# N-CREATION 웹사이트

bluein.kr을 참고하여 제작된 N-CREATION의 포트폴리오 웹사이트입니다.

## 🎯 주요 기능

- **비디오 배경**: 메인 페이지에 자동 재생되는 비디오 배경
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- **인터랙티브 애니메이션**: 스크롤 시 나타나는 페이드인 효과
- **포트폴리오 필터링**: Works 페이지에서 카테고리별 필터링
- **모던한 UI/UX**: 세련된 디자인과 부드러운 인터랙션

## 📁 파일 구조

```
n-creation/
├── index.html          # 메인 페이지
├── about.html          # 회사 소개 페이지
├── works.html          # 작업물 포트폴리오 페이지
├── contact.html        # 연락처 및 문의 페이지
├── style.css           # 스타일시트
├── script.js           # JavaScript 기능
├── images/             # 이미지 폴더
│   └── n-creation logo final.png  # 로고 이미지
├── LOGO_SETUP.md       # 로고 설정 안내
└── README.md           # 이 문서
```

## 🚀 사용 방법

### 1. 로고 이미지 추가 (필수)
제공받은 N CREATION 로고 이미지를 다음 경로에 저장하세요:
```
images/logo.png
```
상세한 로고 설정 방법은 `LOGO_SETUP.md` 파일을 참고하세요.

### 2. 로컬에서 실행
   - 모든 파일을 같은 폴더에 저장
   - `index.html` 파일을 웹 브라우저로 열기

### 3. 웹 서버에 배포
   - 모든 파일을 웹 서버에 업로드
   - 도메인을 통해 접속

## 📱 페이지 구성

### 1. 메인 페이지 (index.html)
- 비디오 배경이 있는 히어로 섹션
- 회사 소개
- 주요 프로젝트 쇼케이스
- CTA(Call-to-Action) 섹션

### 2. We are N (about.html)
- 회사 비전 및 철학
- 서비스 소개 (Creative Strategy, Experience Design 등)
- 팀 구성
- 주요 클라이언트

### 3. Works (works.html)
- 포트폴리오 그리드
- 카테고리별 필터링 (Event, Digital, Exhibition, Branding)
- 프로젝트 썸네일 및 정보

### 4. Contact (contact.html)
- 연락처 정보
- 문의 폼
- 지도 영역 (API 연동 가능)

## 🎨 커스터마이징

### 색상 변경
`style.css` 파일의 `:root` 섹션에서 색상을 변경할 수 있습니다:

```css
:root {
    --primary-color: #000;          /* 주 색상 */
    --secondary-color: #fff;         /* 보조 색상 */
    --accent-color: #ff6b35;        /* 강조 색상 */
    --text-color: #333;             /* 텍스트 색상 */
}
```

### 비디오 변경
`index.html`의 비디오 소스를 원하는 비디오로 변경:

```html
<video autoplay muted loop playsinline>
    <source src="your-video.mp4" type="video/mp4">
</video>
```

### 이미지 변경
각 HTML 파일에서 Unsplash 이미지 URL을 원하는 이미지로 교체할 수 있습니다.

## 💡 기능 설명

### JavaScript 기능
- **헤더 스크롤 효과**: 스크롤 시 헤더 배경색 변경
- **모바일 메뉴**: 햄버거 메뉴 토글
- **부드러운 스크롤**: 앵커 링크 클릭 시 스무스 스크롤
- **페이드인 애니메이션**: 요소가 화면에 나타날 때 애니메이션
- **포트폴리오 필터**: Works 페이지 카테고리 필터링
- **폼 검증**: Contact 페이지 폼 제출 처리
- **맨 위로 버튼**: 스크롤 시 나타나는 Top 버튼

### 반응형 브레이크포인트
- **데스크톱**: 1024px 이상
- **태블릿**: 768px ~ 1023px
- **모바일**: 767px 이하

## 🔧 추가 개선 사항

### 필요한 작업:
1. **실제 비디오 파일 추가**: 로컬 비디오 파일로 교체
2. **회사 정보 업데이트**: 실제 회사 정보로 변경
3. **이미지 교체**: 실제 프로젝트 이미지로 교체
4. **지도 API 연동**: Google Maps 또는 Kakao Maps API 추가
5. **폼 백엔드 연동**: Contact 폼 실제 전송 기능 구현
6. **SEO 최적화**: 메타 태그, OG 태그 추가

### 선택적 개선:
- Google Analytics 추가
- 다국어 지원 (영어/한국어)
- 블로그 섹션 추가
- CMS 연동 (WordPress, Strapi 등)
- 애니메이션 라이브러리 추가 (GSAP, AOS 등)

## 📞 지원

웹사이트 관련 문의사항이 있으시면 다음 정보를 업데이트하여 사용하세요:
- Email: info@n-creation.com
- Tel: 02-0000-0000

## 📄 라이선스

이 프로젝트는 N-CREATION의 소유입니다.

---

**제작일**: 2024
**버전**: 1.0.0

