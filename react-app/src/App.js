import React, { useState } from 'react';
import './App.css';
import Swal from 'sweetalert2'; // SweetAlert 사용

function App() {
  const [fileArray, setFileArray] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [userName, setUserName] = useState(''); // 사용자 이름 상태 추가

  // 허용된 확장자 목록
  const acceptedExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'heic', 'heif',
    'mp4', 'mov', 'avi', 'mkv', 'webm', '3gp', 'hevc'
  ];

  // 파일 확장자 검사 함수
  const isAcceptedExtension = (file) => {
    const extension = file.name.split('.').pop().toLowerCase(); // 확장자 추출
    return acceptedExtensions.includes(extension);
  };

  // 파일 선택 및 미리보기 처리
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // 허용되지 않은 확장자가 있는지 검사
    const invalidFiles = files.filter(file => !isAcceptedExtension(file));
    
    if (invalidFiles.length > 0) {
      Swal.fire({
        icon: 'error',
        title: '허용되지 않은 파일 형식입니다.',
        text: `허용되지 않은 파일: ${invalidFiles.map(f => f.name).join(', ')}`,
      });
      return; // 허용되지 않은 파일이 있으면 처리 중단
    }

    setFileArray(files);

    // 미리보기 이미지 생성
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // 서버로 파일 업로드
  const handleUploadClick = async () => {
    if (fileArray.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '파일을 선택하세요.',
      });
      return;
    }

    if (userName.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '이름을 입력하세요.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('userName', userName); // 사용자 이름을 FormData에 추가

    // 파일만 전송 (파일명은 서버에서 처리)
    fileArray.forEach((file) => {
      formData.append('files', file); // 파일 추가
    });

    try {
      const response = await fetch('http://3.39.197.68:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '파일 업로드 성공!',
        });
        // 업로드 성공 후 미리보기 및 파일 배열 초기화
        setFileArray([]);
        setPreviewImages([]);
      } else {
        Swal.fire({
          icon: 'error',
          title: '파일 업로드 실패!',
        });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      Swal.fire({
        icon: 'error',
        title: '파일 업로드 중 오류가 발생했습니다.',
      });
    }
  };

  // 미리보기 업데이트
  const updatePreview = () => {
    return previewImages.map((src, index) => (
      <div className="image-container" key={index}>
        <img src={src} alt={`preview ${index}`} />
        <button className="remove-btn" onClick={() => removeImage(index)}>
          &times;
        </button>
      </div>
    ));
  };

  // 이미지 삭제
  const removeImage = (index) => {
    const updatedFileArray = [...fileArray];
    updatedFileArray.splice(index, 1); // 해당 파일 제거
    setFileArray(updatedFileArray);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1); // 미리보기 제거
    setPreviewImages(updatedPreviews);
  };

  return (
    <div className="upload-container">
      <h2 className="custom-title">파일 업로드</h2>

      {/* 사용자 이름 입력 */}
      <input
        type="text"
        className="form-control"
        placeholder="이름을 입력하세요"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <div className="upload-box">
        <i className="bi bi-folder-fill"></i>
        <p>
          파일을 여기에 드래그하거나 <span className="text-primary">클릭</span>하여 파일을 선택하세요.
        </p>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.heic,.heif,.mp4,.mov,.avi,.mkv,.webm,.3gp,.hevc"
          multiple
          onChange={handleFileChange}
        />
      </div>

      <div className="image-preview">{updatePreview()}</div>

      <button
        className="btn btn-upload"
        onClick={handleUploadClick}
        disabled={!userName || fileArray.length === 0} // 이름 없거나 파일 없으면 비활성화
      >
        파일 업로드
      </button>
    </div>
  );
}

export default App;