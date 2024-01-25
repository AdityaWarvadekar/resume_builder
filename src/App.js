import logo from './logo.svg';
import './App.css';
import PDFDoc from './components/PDFDoc';
import { PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';

function App() {
  const secions = [
    {
      secHeading: "EXPERIENCE",
      headings: [
        {
          heading: "Newbieron Technologies",
          subHeading: "Web Developer Intern",
          date: "Jul 2023 - Sep 2023",
          place: "New Delhi",
          list: [
            "Created Responsive Pages", "Attended this this this event cerononsdgek",
            "Contributed this this this and thids",
            "Got this award and that appraisal"
          ]
        },
        {
          heading: "Newbieron Technologies",
          subHeading: "Web Developer Intern",
          date: "Jul 2023 - Sep 2023",
          place: "New Delhi",
          list: [
            "Created Responsive Pages", "Attended this this this event cerononsdgek",
            "Contributed this this this and thids",
            "Got this award and that appraisal"
          ],
        }
      ]
    },
    {
      secHeading: "EDUCATION",
      headings: [
        {
          heading: "Guru Gobind Singh Indraprastha University",
          subHeading: "Bachelors of Technology in Computer Science",
          date: "Jul 2025",
          place: "Dwarka, Delhi"
        }
      ]
    },
    {
      secHeading: "PROJECTS",
      headings: [

        {
          heading: "TnP_USICT",
          side: "React, MongoDB, MERN, AWS",
          projectLink: "www.google.com",
          list: [
            "Developed Full Stack Application",
            "Implemented Authentication using JWT Tokens",
          ],
          date: "Aug 23 - Sep 23"
        }
      ]
    },
    {
      secHeading: "TECHNICAL SKILLS",
      headings: [
        {
          para: [
            {
              title: "Languages",
              description: "C++, C, Java, Python, HTML, CSS, JS, MySQL"
            },
            {
              title: "Frameworks",
              description: "C++, C, Java, Python, HTML, CSS, JS, MySQL"
            }
          ]
        }
      ]
    },
    {
      secHeading: "ACHIEVEMENTS",
      headings: [
        {
          para: [
            {
              description: "Secured First Position in IEEE Synapse Hackathon"
            },
            {
              description: "Secured Second Position in IEEE Hack-U-Thon"
            }
          ]
        }
      ]
    }
  ]

  const [input, setInput] = useState({
    fname: "JOHN",
    lname:"DOE",
    address: "123, New Delhi, 110078",
    phone: "1234567890",
    email: "abc@gmail.com",
    linkedin: "linkedin.com/in/abc",
    github: "github.com/abc",
    sections: null
  })

  const onChangeInput = (e)=>{setInput({...input, [e.target.name] : e.target.value})}

  const [sections, setSections] = useState([]);



  return (
    <div className="App">

      <div className="container w-50 d-flex flex-column align-items-center">
        <div className='d-flex'>
          <div className='d-flex flex-column align-items-center'>
        <p className='my-2'>First Name:</p>
        <input type="Text" className="form-control" id="" name="fname" value={input.fname} onChange={onChangeInput}/>
        </div>
        <div className='d-flex flex-column align-items-center'>
        <p className='my-2'>Last Name:</p>
        <input type="Text" className="form-control" id="" name="lname" value={input.lname} onChange={onChangeInput}/>
        </div>
        </div>
        <p className='my-2'>Address: </p>
        <input type="Text" className="form-control" id="" name="address" value={input.address} onChange={onChangeInput}/>
      <div className='d-flex my-5'>
        <div className="d-flex flex-column align-items-center justify-content-center">
        <p>Phone: </p>
        <input type="Text" className="form-control" id="" name="phone" value={input.phone} onChange={onChangeInput}/>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
        <p>Email: </p>
        <input type="Text" className="form-control" id="" name="email" value={input.email} onChange={onChangeInput}/>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
        <p>Linkedin: </p>
        <input type="Text" className="form-control" id="" name="linkedin" value={input.linkedin} onChange={onChangeInput}/>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
        <p>Github: </p>
        <input type="Text" className="form-control" id="" name="github" value={input.github} onChange={onChangeInput}/>
        </div>
      </div>

      </div>

      <PDFViewer width={"50%"} height={"700px"}><PDFDoc fname={input.fname} lname={input.lname} address={input.address} phone={input.phone} email={input.email} linkedin={input.linkedin} github={input.github} sections={sections} /></PDFViewer>
    </div>
  );
}

export default App;
