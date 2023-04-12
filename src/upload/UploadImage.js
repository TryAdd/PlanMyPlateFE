import "../index.css"
import { useState } from "react"
import axios from "axios"

function UploadImage() {
  const [file, setFile] = useState([])
  const [fileSelected, setFileSelected] = useState("")
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line
  const [res, setRes] = useState({})

  const handleSelectFile = (e) => {
    file.length = 0
    setFileSelected("")
    if (e.target.files.length === 1) {
      file.push(e.target.files[0])
      setFile(file)
      // setFileSelected("1")
      setFileSelected(<center>{file[0].name}</center>)
    }
    else {
      for (let i = 0; i < e.target.files.length; i++) {
        file.push(e.target.files[i])
        setFile(file)
        setFileSelected(<center>Multiple Files Selected</center>)
      }
    }
  }

  const handleUpload = async (e) => {
    try {
      setLoading(true);
      const data = new FormData()

      for (let i = 0; i < file.length; i++) {
        data.append("my_file", file[i])
      }

      const res = await axios.post("/image/upload", data)
      setRes(res.data)

      if (file.length > 0) {
        alert("You Uploaded Something B)")
      }
      else if (file.length < 1) {
        alert("Please Select Your Files :(")
      }
      setFileSelected("")
    }
    catch (error) {
      alert(error.message)
    }
    finally {
      setLoading(false)
    }}

  return (
    <div className="App">
      <h1>Image Uploader</h1>
      
        <label htmlFor="file" className="btn-grey">
          {" "}
          select files
        </label>

        {fileSelected}

        <input
          id="file"
          type="file"
          onChange={handleSelectFile}
          multiple={true}
        />

        {fileSelected && (
          <>
            <button onClick={handleUpload} className="btn-green">
              {loading ? "uploading..." : "upload to cloudinary and MongoDB"}
            </button>
          </>
        )}
    </div>
  )
}
export default UploadImage;