# Resume-App-HH25

## Inspiration
As aspiring software engineerers, game developers, and data scientists, we face immense difficulties within the modern state of the job market. Given the overwhelming number of rejections, we thought: what if there was a tool that could help us review our resumes and autofill applications more efficiently? Current autofilling capabilities within websites such as WorkdayJobs are often inaccurate and require our valuable time to correct these mistakes. When combined with the decreased productivity caused by the need to conduct manual corrections and the painstaking process of manually inputting every skill, several hours are wasted on meaingless regurgitation. So, can we do it better?

## What it does

ResumeTools has two primary features: first, applicants can use the AI-powered tool to conduct reviews of their resumes and receive feedback in a matter of seconds, addressing the shortage of well-trained professionals that can act in an advisory capacity for the growing number of entry-level applicants to the industry. Second, recruiters can use the AI-powered tool to automatically extract information from resumes and format it in a JSON template such that it can be easily used within popular job application websites.

## How we built it

Using React, Flask, HTML5, CSS3, and Python3, we developed a website with full-stack architecture. Within the frontend operations, React served as our primary means of handling interactive inputs, form submissions to the backend systems, and rendering animated objects. Flask helped us to implement Python3 within the backend systems such that we can call the OpenAI API to interpret plaintext strings of the inputted resumes. From there, Flask forwards the results of the operation back to React, allowing the user to finally receive their conversion/evaluation of their resume. 

## Challenges we ran into

A significant level of overhead was required to set up the full-stack architecture required for this project. When considering multiple dependencies with different version requirements, setting up the development environment requires a significant portion of time. This prevented efficient development within the backend systems, and much of the team's attention was diverted towards addressing backend issues. On the frontend, the learning curve with full-stack architecture proved to be the biggest challenge, and linking such systems to the backend required a similar expenditure of time. Finally, OpenAI's lack of efficient debugging methods required our developers to manually parse every character whenever an error occured in the OpenAI API call.

## Accomplishments that we're proud of

At 11:00 PM, we produced a working prototype of our full-stack prototype, and the OpenAI API output produced a usable JSON string that was forwarded back to the frontend systems for client-sided display. From there, we knew that this project would be possible to finish.

## What we learned

- Set up a development environment prior to a hackathon.
- Do not trust "npm install react-scripts" and specify a version number to install.

## What's next for Resume Tools

- Improve the frontend UX design.
- Optimize the backend.
- Add support for HTTP requests from other applications.
- Accept an input of a job description and provide feedback for a resume with respect to the specified job.
