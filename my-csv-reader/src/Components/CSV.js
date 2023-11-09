// CsvReader.js
import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvReader = () => {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError('No file selected');
      return;
    }

    // Check if the selected file is a CSV
    if (file.type !== 'text/csv') {
      setError('Please upload a valid CSV file');
      return;
    }

    setError('');

    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      error: (err) => {
        setError('Error parsing CSV file');
        console.error(err);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table>
        <thead>
          <tr>
            {csvData[0] &&
              csvData[0].map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {csvData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvReader;
