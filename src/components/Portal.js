import { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
function Portal() {
  const [data, setData] = useState("");
  const [val, setVal] = useState("Upload image to predict");
  const [filename, setFilename] = useState("No file Uploaded");
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const history = useNavigate(); 

  // Function to handle navigation back to detection page
  const handleBackToDetection = () => {
    history('/attendance'); // Navigate to detection page
  };

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3001/upload", formData);

      if (response.data.message) {
        setVal(response.data.message);
      } else {
        // Update val based on the detection result
        // Assuming your detection result has a structure like { detection_results: [...] }
        setVal(response.data.detection_results ? "Classes detected!" : "No classes detected!");
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Data updated successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error uploading file");
      setOpenSnackbar(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFilename(file.name);

    // Create a preview for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <h1 className=" mt-[5rem] mb-4 text-3xl font-extrabold dark:text-indigo-800 md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-blue-900">
          Machine Learning Model to
        </span>
        <br /> Detect cats & Dogs
      </h1>
      <p className="text-lg font-normal text-white lg:text-xl">
        Upload the image file to detect.
      </p>
      <form onSubmit={handleSubmit}>
    
      {/* <div className="flex w-full items-start justify-center bg-grey-lighter mb-5 mt-[5rem] ">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
          <svg
            className="w-8 h-8"
            fill="blue"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
        </label>
      </div> */}
      <div className="flex items-start justify-center bg-grey-lighter mb-5 mt-[5rem] ">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full mb-2" />}
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type="file" name="file" className="hidden" onChange={(e) => { setFile(e.target.files[0]); handleFileUpload(e) }} />
        </label>
      </div>
      <span className="text-white">File Uploaded : {filename}</span>

      <div className="flex items-center justify-center">
        <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" type="submit">
          PREDICT
        </button>
      </div>
      </form>

      <div className=" mt-[5rem] mb-4 text-2xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-blue-900 font-black">
          Detected Image is : {val}
        </span>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div>
      <button onClick={handleBackToDetection}>Attendance Log</button> {/* Button to navigate back to detection page */}
    </div>
    </>
  );
}

export default Portal;