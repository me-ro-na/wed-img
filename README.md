## 사진/영상 업로드 페이지
모바일 청첩장 또는 식권에 QR 코드를 삽입하여, 하객들이 결혼식 영상 및 사진을 업로드할 수 있는 페이지 구현

📌 실제 서비스 URL: http://3.39.197.68:3000/

<br>

### 주요 기능
- QR 코드를 통해 사진/영상 업로드 페이지 접근(외부 타 사이트에서 QR로 변환함)
- 하객이 직접 결혼식 사진/영상을 업로드 가능
- 업로드된 파일은 서버에 저장
<br>

### 서버 디렉토리 구조
```
/home/ec2-user/h1t0_img
├── react-app/       # React 관련 파일들
├── server/          # Node.js 관련 파일들
├── batch/           # 배치 스크립트 디렉토리
│   ├── setenv.sh    # 환경 설정 스크립트
│   ├── start.sh     # 전체 모듈 시작 스크립트
│   ├── stop.sh      # 전체 모듈 중지 스크립트
│   ├── status.sh    # 모듈 상태 확인 스크립트
│   ├── react-app-start.sh  # React 시작 스크립트
│   ├── node-server-start.sh # Node.js 서버 시작 스크립트
├── logs/            # 로그 디렉토리
├── pids/            # PID 파일 디렉토리
```

<br>
### 실행 방법
1. 전체 서비스 실행

```bash
./batch/start.sh
```

2. 전체 서비스 종료
```bash
./batch/stop.sh
```

3. 서비스 상태 확인
```bash
./batch/status.sh
```
<br>

### 기술 스택
- Frontend: React
- Backend: Node.js + Express
- Deployment: AWS EC2(Amazon Linux 2023)
<br>

### 참고 및 개선
- 실제 사용할 때, 모바일 청첩장에만 QR 코드를 삽입하여 일부 하객들이 해당 기능을 인지하지 못하는 경우가 있었음.
- 식권에도 QR 코드를 삽입하면 인지도를 높이고 활용도를 높을 수 잇을것으로 예상됨
