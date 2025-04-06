import React, {useState, useRef } from 'react';

export default function Tools() {
    const [file, setFile] = useState(null);
    const [formResult, setFormResult] = useState(null);
    var mutex_lock = false;
    var responseData;
    const op = useRef("string");

    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    
    const handleSubmit = async (e) => {
        //Guards against multiple submissions. Wait for the first request to finish.
        if (mutex_lock === false)
        {
            mutex_lock = true;
            setFormResult("Please wait. We're processing your request!");
            e.preventDefault();
            const formData = new FormData();
            formData.append('pdf', file);
            const response = await fetch("http://localhost:5000/submit", {
                method: "POST",
                body: formData
            });

            responseData = await response.json();

            console.log(op)
            if (op.current === "json") {
                setFormResult(JSON.stringify(responseData.jsonEval));
            } else if (op.current === "string") {
                setFormResult(responseData.stringEval);
            }
            mutex_lock = false;
        }
      }

    return (
        <div className="page">
            <div className="items-row">
                <div className="input-part">
                    <div className="text-box">
                        {`Upload your resume in a .pdf format and we'll handle the rest. "Extract JSON" converts your resume into a JSON string for developers to easily parse! "Evaluate Resume" provides an AI-powered analysis of your resume to identify your current resume's effectiveness and suggest any future changes!`}
                    </div>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className="items-row">
                            <input type="file" id="resume" name="resume" required=""onChange={handleChange}></input>
                        </div>
                        <br></br>
                        <div className="items-row">
                            <button className="button-request-style" onClick={() => op.current = "json"} type="submit">Extract JSON</button>
                            <button className="button-request-style" onClick={() => op.current = "string"}type="submit">Evaluate Resume</button>
                        </div>
                    </form>
                </div>

                <div className="output-part">
                    <div className="text-box">
                        {formResult}
                    </div>
                </div>
            </div>
        </div>
    );
}