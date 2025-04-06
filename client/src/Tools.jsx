import axios from 'axios';
import React, {useState} from 'react';

export default function Tools() {
    const [file, setFile] = useState(null);
    const [formResult, setFormResult] = useState(null);

    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('pdf', file);
        const response = await fetch("http://localhost:5000/submit", {
            method: "POST",
            body: formData
        });
        
        setFormResult(JSON.stringify(await response.json()));
      }

    return (
        <div className="page">
            <div className="items-row">
                <div className="input-part">
                    <div className="text-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis vitae velit eget viverra. Proin ut quam at libero porta ultricies id mollis augue. Donec non justo ex. Ut consectetur elit vel aliquet condimentum
                    </div>

                    <div className="text-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis vitae velit eget viverra. Proin ut quam at libero porta ultricies id mollis augue. Donec non justo ex. Ut consectetur elit vel aliquet condimentum
                    </div>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className="items-row">
                            <input type="file" id="resume" name="resume" required=""onChange={handleChange}></input>
                        </div>
                        
                        <div className="items-row">
                            <button className="button-request-style" type="submit">Extract JSON</button>
                            <button className="button-request-style" type="submit">Evaluate Resume</button>
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