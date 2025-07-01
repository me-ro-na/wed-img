const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// CORS 설정 (React에서 요청 가능하도록 설정)
app.use(cors());

// 파일 저장 디렉토리 설정
const uploadPath = path.join(__dirname, '../file'); // 홈 디렉토리 내의 ~/file 경로 설정

// 파일 저장 디렉토리 존재 여부 확인 및 생성
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // 디렉토리가 없으면 생성
}

// Multer 설정: 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // 파일이 저장될 경로 지정
  },
  filename: (req, file, cb) => {
    const originalFileName = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 한글 파일명 깨짐 해결
    const extension = path.extname(originalFileName); // 파일 확장자 추출
    const baseName = path.basename(originalFileName, extension); // 확장자 제외한 파일명 추출
    const userName = req.body.userName || 'unknown'; // 사용자 이름을 파일명에 포함
    const uniqueFileName = `${userName}_${baseName}_${Date.now()}${extension}`; // 고유 파일명 생성
    cb(null, uniqueFileName); // 파일명 설정
  },
});

const upload = multer({ storage });

// 파일 업로드 엔드포인트
app.post('/upload', upload.array('files'), (req, res) => {
  res.json({ message: '파일 업로드 성공', files: req.files });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});