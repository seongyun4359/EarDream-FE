
# EarDream-FE

## 🏗 프로젝트 개요
- EarDream 프론트엔드
- Vite + React + TypeScript + PostCSS + TailwindCSS 기반 구성

---

## 📦 폴더 구조
```bash
📦src  
 ┣ 📂assets # 이미지, 아이콘 등  
 ┃ ┗ 📜.gitkeep  
 ┣ 📂components # 재사용 가능한 UI 컴포넌트  
 ┃ ┗ 📜.gitkeep  
 ┣ 📂hooks # 커스텀 훅  
 ┃ ┗ 📜.gitkeep  
 ┣ 📂layouts # 페이지 레이아웃 컴포넌트 (헤더 등)  
 ┃ ┗ 📜.gitkeep  
 ┣ 📂pages # 각 페이지  
 ┃ ┗ 📜.gitkeep  
 ┣ 📂services # API 통신 및 서비스 로직    
 ┃ ┗ 📜.gitkeep  
 ┣ 📂styles # 글로벌 스타일  
 ┃ ┗ 📜index.css  
 ┣ 📂types # TypeScript 타입 정의  
 ┃ ┗ 📜.gitkeep  
 ┣ 📂utils # 유틸 함수  
 ┃ ┗ 📜.gitkeep  
 ┣ 📜App.css  
 ┣ 📜App.tsx  
 ┣ 📜main.tsx  
 ┗ 📜vite-env.d.ts  
```

 > 빈 폴더는 `.gitkeep` 파일을 추가하여 Git에 포함시켰습니다.
 > 해당 파일 삭제 후 개발하시면 됩니다.

---

## 🌿 브랜치 전략
- **main**: 배포용 브랜치 
- **feature/#이슈번호**: 기능 개발 브랜치  
  예: `feat/#3`  

> 브랜치는 이슈 단위로 생성하고, 작업 완료 후 PR로 main 브랜치에 병합

---

## ✍ 커밋 컨벤션
- `feat:` 새로운 기능 구현  
- `fix:` 버그 수정  
- `chore:` 환경 설정, 초기 세팅, 문서 등  
- `refactor:` 코드 리팩토링  
- `style:` 코드 포맷팅, 스타일 변경 (기능 변경 없음)  

> 예시
>```bash
>git commit -m "chore: 프로젝트 초기 세팅"
>```
---

## 🛠 사용 기술

| 기술 | 설명 |
|------|------|
| Vite | 번들러 및 개발 서버 |
| React | UI 라이브러리 |
| TypeScript | 정적 타입 |
| PostCSS & TailwindCSS | 스타일링 |

---

## Issue 탬플릿
```bash
## ✍🏻 Description
- 간단한 이슈 설명

## ✅ Todo
- [ ] 해야할 일 목록
```
---

## ⭐️ PR 탬플릿
```bash
### 🚀 Background
- PR에 대한 간단한 설명

### 🥥 Contents
- 코드 및 작업 내용

### 🧪 Testing
- [ ] 테스트 항목 체크

### 📸 Screenshot
- 스크린샷 첨부 (있다면)

### ⚓ Related Issue
close #(이슈번호)
```
