# 로고 설정 안내

## 🎨 제공받은 로고

제공받은 N CREATION 로고 이미지를 웹사이트에 적용하려면 다음 단계를 따라주세요.

## 📝 설정 단계

### 1. 로고 파일 저장
제공받은 로고 이미지를 다음 경로에 저장해주세요:
```
images/logo.png
```

### 2. 로고 사양
- **파일 형식**: PNG (권장)
- **권장 크기**: 가로 400px ~ 800px
- **배경**: 투명 또는 흰색
- **로고 색상**: 검정색 (CSS 필터로 자동 변환)

### 3. 로고 사용 위치

모든 HTML 파일에서 로고가 다음과 같이 적용되어 있습니다:

#### 헤더 (모든 페이지)
```html
<div class="logo">
    <a href="index.html">
        <img src="images/logo.png" alt="N CREATION" class="logo-img">
    </a>
</div>
```

#### 모바일 메뉴
```html
<div class="logo">
    <img src="images/logo.png" alt="N CREATION" class="logo-img">
</div>
```

#### 푸터
```html
<div class="footer-logo">
    <img src="images/logo.png" alt="N CREATION" class="logo-img">
</div>
```

## 🎨 CSS 스타일링

로고는 상황에 따라 자동으로 색상이 변경됩니다:

### 헤더
- **스크롤 전**: 흰색 (투명 배경)
- **스크롤 후**: 검정색 (흰색 배경)

### 모바일 메뉴
- 항상 흰색

### 푸터
- 항상 흰색

CSS 필터를 사용하여 자동 변환:
```css
/* 기본 (흰색 로고) */
.logo-img {
    filter: brightness(0) invert(1);
}

/* 스크롤 후 (검정색 로고) */
.header.scrolled .logo-img {
    filter: brightness(0) invert(0);
}
```

## 🔧 로고 크기 조정

로고 크기를 변경하려면 `style.css` 파일에서 다음 값을 수정하세요:

```css
/* 헤더 로고 크기 */
.logo-img {
    height: 35px;  /* 이 값을 조정 */
}

/* 푸터 로고 크기 */
.footer-logo .logo-img {
    height: 40px;  /* 이 값을 조정 */
}
```

## 📱 반응형 조정

모바일에서 로고 크기를 다르게 하려면:

```css
@media (max-width: 768px) {
    .logo-img {
        height: 28px;
    }
}
```

## ✅ 완료!

`images/logo.png` 파일만 추가하면 모든 페이지에서 로고가 자동으로 표시됩니다.

## 💡 팁

- 로고가 너무 크거나 작다면 CSS의 `height` 값을 조정하세요
- 로고 색상 반전이 이상하다면 원본 로고를 흰색으로 제작하는 것이 좋습니다
- SVG 형식을 사용하면 더 선명한 로고를 표시할 수 있습니다

