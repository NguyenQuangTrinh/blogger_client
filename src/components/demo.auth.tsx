import React, { useState, ChangeEvent } from 'react';

const FileReaderComponent: React.FC = () => {
  const [fileContents, setFileContents] = useState<string[]>([]);

  const handleFileRead = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const promises = Array.from(files).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();

          reader.onload = (e) => {
            const content = e.target?.result as string;
            const formattedContent = processHTML(content); // Xử lý HTML ở đây
            resolve(formattedContent);
          };

          reader.readAsText(file);
        });
      });

      const contents = await Promise.all(promises);
      setFileContents(contents);
    }
  };

  const handleUpload = () => {
    // Bạn có thể sử dụng fileContents để lưu hoặc upload
    console.log(fileContents);
  };

  const processHTML = (content: string): string => {
    const lines = content.split("\n");

    // Xử lý từng dòng trong mảng lines
    const formattedContent = lines.map((line, index) => {
      if (line.includes('#')) {
        const headingLevel = line.match(/^#+/)?.[0].length;
        const textWithoutHash = line.replace(/^#+\s*/, '');

        // Sử dụng template literals để tạo chuỗi HTML trực tiếp
        return `<h${headingLevel}>${textWithoutHash}</h${headingLevel}>`;
      } else {
        return `${line}<br />`;
      }
    });

    // Chuyển đổi mảng formattedContent thành chuỗi văn bản thô
    return formattedContent.join('');
  };

  const renderFormattedContents = () => {
    return fileContents.map((content, index) => (
      <div key={index}>
        <strong>File {index + 1}:</strong>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    ));
  };

  return (
    <div>
      <input type="file" onChange={handleFileRead} multiple />
      <div>
        <strong>Formatted Contents:</strong>
        {renderFormattedContents()}
      </div>
      <button onClick={handleUpload}>Upload HTML</button>
    </div>
  );
};

export default FileReaderComponent;
