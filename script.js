document.getElementById('uploadInput').addEventListener('change', function() {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    thumbnailContainer.innerHTML = ''
    
    [...this.files].forEach(file => {
      const FileReader = new FileReader();
      FileReader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        thumbnailContainer.appendChild(img);
      };
      if (file.type.startsWith('image/')) {
        FileReader.readAsDataURL(file);
      } else {
        const fileIcon = document.createElement('div');
        fileIcon.className = 'file-icon';
        fileIcon.textContent = '📄';
        thumbnailContainer.appendChild(fileIcon);
      }
    });
  });
  
  async function upload() {
    const fileInput = document.getElementById("uploadInput");
    const fileLabel = document.getElementById('fileLabel');
    const uploadButton = document.getElementById('uploadButton');
    const progressElement = document.getElementById('uploadProgress');
    const loader = document.getElementById('loader');
  
    fileInput.disabled = true;
    fileLabel.style.pointerEvents = 'none';
    fileLabel.setAttribute('disabled', 'true')
    uploadButton.disabled = true;
    loader.style.display = 'block'
    progressElement.hidden = false;
    
    const su = new SmashUploader({ region: "us-east-1", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjMmQ2ZjI1LTdhOGEtNDdkNS1iYWIxLTM0N2I3MjlhMDUxNy1ldSIsInVzZXJuYW1lIjoiYzhkYmYzZTEtYWJhNS00ZDAxLWIxYTUtNmIyMDcwNzI5YWY1IiwicmVnaW9uIjoidXMtZWFzdC0xIiwiaXAiOiIxODkuMzYuMjA1LjEzOCIsInNjb3BlIjoiTm9uZSIsImFjY291bnQiOiJkMDI3NzA4Ny04NmM0LTRlN2UtODk3Ny0yNTYwYmI4Y2M3OTgtZWEiLCJpYXQiOjE3MjQxNTY3MzYsImV4cCI6NDg3OTkxNjczNn0.SguY51FubzZG5MyKCseEvxwdLT68tFxb69ySiUXUYyk" })
  
  
    try {
      const transfer = await su.upload({ files: [...fileInput.files] });
      console.log("Transfer", transfer); 
      progressElement.value = 100;
    } 
    catch(error) { 
      console.log("Error", error);
      progressElement.hidden = true;
    }
    finally {
      fileInput.disabled = false;
      fileLabel.style.pointerEvents = 'auto';
      fileLabel.removeAttribute('disabled')
      uploadButton.disabled = false;
      loader.style.display = 'none';
  }
  
        su.on('progress', (event) => {
          const progressData = event.data && event.data.progress;
          if (progressData && progressData.percent !== undefined) {
            progressElement.value = progressData.percent;
            console.log("Progress", progressData.percent);
        } else {
            console.log("deu merda");
        }
    })
  }
  