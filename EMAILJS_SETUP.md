# EmailJS 설정 가이드

## 1. EmailJS 계정 만들기
1. https://www.emailjs.com/ 에 접속
2. "Sign Up" 버튼 클릭하여 무료 계정 생성
3. 이메일 인증 완료

## 2. Email Service 설정
1. EmailJS 대시보드에서 "Email Services" 클릭
2. "Add New Service" 클릭
3. Gmail, Outlook 등 원하는 이메일 서비스 선택
4. 이메일 계정 연결 및 인증
5. Service ID 복사 (예: `service_xxxxxxx`)

## 3. Email Template 만들기
1. "Email Templates" 메뉴 클릭
2. "Create New Template" 클릭
3. 다음 변수들을 템플릿에 추가:
   - `{{name}}` - 이름
   - `{{company}}` - 회사명
   - `{{email}}` - 이메일
   - `{{phone}}` - 연락처
   - `{{subject}}` - 문의 유형
   - `{{message}}` - 메시지

4. 템플릿 예시:
```
제목: N-CREATION 웹사이트 문의 - {{subject}}

이름: {{name}}
회사명: {{company}}
이메일: {{email}}
연락처: {{phone}}
문의 유형: {{subject}}

메시지:
{{message}}
```

5. Template ID 복사 (예: `template_xxxxxxx`)

## 4. Public Key 가져오기
1. "Account" → "General" 메뉴로 이동
2. "Public Key" 복사

## 5. 코드에 적용하기
`script.js` 파일에서 다음 값들을 변경하세요:

```javascript
// Public Key 변경
emailjs.init("YOUR_PUBLIC_KEY");

// Service ID와 Template ID 변경
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
```

## 무료 플랜 제한
- 월 200통까지 무료 전송
- 대부분의 웹사이트에 충분합니다

## 문제 해결
- 이메일이 전송되지 않으면 브라우저 콘솔(F12)에서 오류 확인
- EmailJS 대시보드의 "Logs"에서 전송 상태 확인
