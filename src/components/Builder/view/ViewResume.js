import React, { useState, useEffect } from 'react';

const Resume = ({id}) => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // Fetch resume data from your API or local JSON file here
    // For this example, we'll simulate fetching data from a JSON object
    const simulatedFetch = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            "basics": {
              "name": "John Doe",
              "label": "Programmer",
              "image": "",
              "email": "john@gmail.com",
              "phone": "(912) 555-4321",
              "url": "https://johndoe.com",
              "summary": "A summary of John Doe…",
              "location": {
                "address": "2712 Broadway St",
                "postalCode": "CA 94115",
                "city": "San Francisco",
                "countryCode": "US",
                "region": "California"
              },
              "profiles": [{
                "network": "Twitter",
                "username": "john",
                "url": "https://twitter.com/john"
              }]
            },
            "work": [{
              "name": "Company",
              "position": "President",
              "url": "https://company.com",
              "startDate": "2013-01-01",
              "endDate": "2014-01-01",
              "summary": "Description…",
              "highlights": [
                "Started the company"
              ]
            }],
            "volunteer": [{
              "organization": "Organization",
              "position": "Volunteer",
              "url": "https://organization.com/",
              "startDate": "2012-01-01",
              "endDate": "2013-01-01",
              "summary": "Description…",
              "highlights": [
                "Awarded 'Volunteer of the Month'"
              ]
            }],
            "education": [{
              "institution": "University",
              "url": "https://institution.com/",
              "area": "Software Development",
              "studyType": "Bachelor",
              "startDate": "2011-01-01",
              "endDate": "2013-01-01",
              "score": "4.0",
              "courses": [
                "DB1101 - Basic SQL"
              ]
            }],
            "awards": [{
              "title": "Award",
              "date": "2014-11-01",
              "awarder": "Company",
              "summary": "There is no spoon."
            }],
            "certificates": [{
              "name": "Certificate",
              "date": "2021-11-07",
              "issuer": "Company",
              "url": "https://certificate.com"
            }],
            "publications": [{
              "name": "Publication",
              "publisher": "Company",
              "releaseDate": "2014-10-01",
              "url": "https://publication.com",
              "summary": "Description…"
            }],
            "skills": [{
              "name": "Web Development",
              "level": "Master",
              "keywords": [
                "HTML",
                "CSS",
                "JavaScript"
              ]
            }],
            "languages": [{
              "language": "English",
              "fluency": "Native speaker"
            }],
            "interests": [{
              "name": "Wildlife",
              "keywords": [
                "Ferrets",
                "Unicorns"
              ]
            }],
            "references": [{
              "name": "Jane Doe",
              "reference": "Reference…"
            }],
            "projects": [{
              "name": "Project",
              "startDate": "2019-01-01",
              "endDate": "2021-01-01",
              "description": "Description...",
              "highlights": [
                "Won award at AIHacks 2016"
              ],
              "url": "https://project.com/"
            }]
          });
      }, 1000); // Simulate a 1-second delay
    });

    simulatedFetch.then((data) => setResumeData(data));
  }, []);

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        {/* Basics */}
        <section className="bg-white p-4 shadow-lg rounded-lg my-4">
          <h1 className="text-3xl font-bold mb-2">{resumeData.basics.name}</h1>
          <p className="text-xl text-indigo-600 mb-4">{resumeData.basics.label}</p>
          <p className="mb-2">{resumeData.basics.email}</p>
          <p className="mb-2">{resumeData.basics.phone}</p>
          <p className="mb-2">
            Website: <a href={resumeData.basics.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{resumeData.basics.url}</a>
          </p>
          <p className="mb-2">
            Location: {resumeData.basics.location.city}, {resumeData.basics.location.region}, {resumeData.basics.location.countryCode}
          </p>
        </section>

        {/* Summary */}
        <section className="bg-white p-4 shadow-lg rounded-lg my-4">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p>{resumeData.basics.summary}</p>
        </section>

        {/* Work Experience */}
        <section className="bg-white p-4 shadow-lg rounded-lg my-4">
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          {resumeData.work.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{job.position} at {job.name}</h3>
              <p className="text-gray-600">{job.startDate} - {job.endDate}</p>
              <p>{job.summary}</p>
              <ul className="list-disc list-inside">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
              <p>
                Website: <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{job.url}</a>
              </p>
            </div>
          ))}
        </section>

        {/* Add other resume sections (Volunteer, Education, etc.) */}
        
      </div>
    </div>
  );
};

export default Resume;
