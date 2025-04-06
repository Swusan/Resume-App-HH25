import React, {useState} from 'react';

export default function Tools() {
    const [file, setFile] = useState(null);
    const [formResult, setFormResult] = useState(null);
    var op = true;
    var mutex_lock = false;

    function changeOp(newOp) {
        op = newOp;
    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    
    const handleSubmit = async (e) => {
        //Guards against multiple submissions. Wait for the first request to finish.
        if (mutex_lock == false)
        {
            mutex_lock = true;
            setFormResult("Please wait. We're processing your request!");
            e.preventDefault()
            const formData = new FormData();
            formData.append('pdf', file);
            formData.append('op', op)
            const response = await fetch("http://localhost:5000/submit", {
                method: "POST",
                body: formData
            });
            
            if (op == true) {
                setFormResult(JSON.stringify(await response.json()));
            } else {
                setFormResult(await response.text())
            }
            mutex_lock = false;
        }
      }

    return (
        <div className="page">
            <div className="items-row">
                <div className="input-part">
                    <div className="text-box">
                        Upload your resume in a .pdf format and we'll handle the rest!
                    </div>

                    <div className="text-box">
                        "Extract JSON" converts your resume into a JSON string for developers to easily parse! "Evaluate Resume" provides an AI-powered analysis of your resume to identify your current resume's effectiveness and suggest any future changes!
                    </div>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className="items-row">
                            <input type="file" id="resume" name="resume" required=""onChange={handleChange}></input>
                        </div>
                        
                        <div className="items-row">
                            <button className="button-request-style" type="submit" action={changeOp(true)}>Extract JSON</button>
                            <button className="button-request-style" type="submit" action={changeOp(false)}>Evaluate Resume</button>
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