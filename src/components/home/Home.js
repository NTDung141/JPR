import axios from 'axios';
import React, { useState } from 'react';
import LoadingComponent from '../loading/LoadingComponent';
import "./Home.css"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [selectedFile, setSelectedFile] = useState(false);
    const [selectedImage, setSelectedImage] = useState(false)
    const [resultArray, setResultArray] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageReturn, setImageReturn] = useState('')
    const changeFileHandle = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file);
        if (file) {
            if (file
                && (file.type === "image/jpeg"
                    || file.type === "image/png"
                    || file.type === "image/pjp"
                    || file.type === "image/pjpeg"
                    || file.type === "image/jpg"
                    || file.type === "image/jfif")) {
                const image = URL.createObjectURL(file)
                setSelectedImage(image)
                setImageReturn('')
            }
            else {
                toast.error("Allowed image types are png, jpg, jpeg", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    const getText = async () => {
        setResultArray([])

        try {
            const formData = new FormData()
            formData.append("file", selectedFile)
            setLoading(true)
            const res = await axios.post("https://be.phamvantanh.online/predict", formData)
            console.log(res.data)
            if (res.status === 200) {
                setLoading(false)
                setSelectedImage(false)
                setResultArray(res.data.result)
                setImageReturn(res.data.img)
                const unixTime = Math.floor(Date.now())

                const resultToHistory = {
                    content: res.data.result,
                    dateTime: unixTime
                }
                let allResult = JSON.parse(localStorage.getItem("allResult"))

                if (allResult) {
                    allResult.unshift(resultToHistory)
                    localStorage.setItem("allResult", JSON.stringify(allResult))
                }
                else {
                    let allResultNew = []
                    allResultNew.unshift(resultToHistory)
                    localStorage.setItem("allResult", JSON.stringify(allResultNew))
                }
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
            // toast.error(error.response.data.message, {
            //     position: "bottom-left",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row mb-3">
                <div className="home-left col-lg-6">
                    <div className="selected-image">
                        {!selectedImage && !imageReturn ? "Please select an image to get text!" : null}
                        {selectedImage && <img src={selectedImage}></img>}
                        {imageReturn && <img src={`data:image/jpeg;base64,${imageReturn}`} />}
                    </div>

                    <div className="action">
                        <input type="file" style={{ visibility: "hidden" }} id="file" accept="image/png, image/jpeg" onChange={changeFileHandle} />

                        <label for="file" className="cursor-pointer">
                            <span className="file-button">
                                <i className="fa fa-upload mr-2" aria-hidden="true" disabled={loading ? true : false}></i>
                                Choose Picture
                            </span>
                        </label>

                        <button
                            id="get-text-btn"
                            type="button"
                            className="btn btn-primary mt-3"
                            onClick={getText}
                            disabled={loading ? true : false}
                        >
                            Get text
                        </button>
                    </div>
                </div>

                <div className="home-right col-lg-6">
                    <div className="result">
                        <div className="result-title">
                            Result
                        </div>

                        <div className="result-text-area">
                            {loading && <LoadingComponent />}
                            {
                                resultArray.map((item, index) =>
                                    <p key={index}>{item}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;