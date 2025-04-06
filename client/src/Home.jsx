export default function Home() {
    return (
        <div className="page">
            <h2 className="heading">
                Resume Tools
            </h2>
            <div className="text-box centered">
                Tools for both applicants and recruiters alike. Powered by gpt-4o-mini. Be more effective at making resumes and reading resumes.
            </div>
            <br></br>
            <button className="quarter-width button button-request-style" onClick={function onClick(){sessionStorage['use_load']='true';document.getElementById("Loader").className = "exit-transition";setTimeout(function(){window.location.replace("/tools");}, 550);}}>Get Started Now</button>
        </div>
    );
}