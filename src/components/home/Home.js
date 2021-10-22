import React, { useState } from 'react';
import "./Home.css"

function Home() {
    const [selectedFile, setSelectedFile] = useState(false);
    const [selectedImage, setSelectedImage] = useState(false)

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
            }
        }
    }

    const getText = () => {
        const result = "今日はいい天気ですね。散歩に行きましょう。"
        const unixTime = Math.floor(Date.now())

        const resultToHistory = {
            content: result,
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

    return (
        <div className="home-page">
            <div className="home-left">
                <div className="selected-image">
                    {!selectedImage && "Please select an image to get text!"}

                    {selectedImage && <img src={selectedImage}></img>}
                </div>

                <div className="action">
                    <input type="file" style={{ visibility: "hidden" }} id="file" accept="image/png, image/jpeg" onChange={changeFileHandle} />

                    <label for="file">
                        <span className="file-button">
                            <i className="fa fa-upload mr-2" aria-hidden="true"></i>
                            Choose Picture
                        </span>
                    </label>

                    <button type="button" className="btn btn-primary mt-3" onClick={getText}>Get text</button>

                </div>
            </div>

            <div className="home-right">
                <div className="result">
                    <div className="result-title">
                        Result
                    </div>

                    <div className="result-text-area">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;