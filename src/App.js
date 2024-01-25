import logo from './logo.svg';
import './App.css';
import PDFDoc from './components/PDFDoc';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useReducer, useRef, useState } from 'react';

function App() {

  const [input, setInput] = useState({
    fname: "JOHN",
    lname: "DOE",
    address: "123, New Delhi, 110078",
    phone: "1234567890",
    email: "abc@gmail.com",
    linkedin: "linkedin.com/in/abc",
    github: "github.com/abc",

  })

  const [sections, setSections] = useState([]);

  // useEffect(()=>{
  //   sessionStorage.setItem("localList", "abc");
  //   sessionStorage.setItem("localPara", "abc");
  // }, [])

  const [section, setSection] = useState({
    secHeading: "",
    headings: [{
      heading: "",
      subHeading: "",
      date: "",
      place: "",
      list: [],
      para: [],
      side: "",
      projectLink: ""
    }],
  })
  const [secHeading, setSecHeading] = useState("");
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [side, setSide] = useState("");

  const localList = sessionStorage.getItem("localList") === null ? [] : JSON.parse(sessionStorage.getItem("localList"));
  // console.log(localList, "<----locallist");
  const [list, setList] = useState(localList);
  useEffect(() => {
    sessionStorage.setItem("localList", JSON.stringify(list))
  }, [list]);
  const [listItem, setListItem] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const localPara = sessionStorage.getItem("localPara") === null ? [] : JSON.parse(sessionStorage.getItem("localPara"));
  const [para, setPara] = useState(localPara);
  useEffect(() => {
    sessionStorage.setItem("localPara", JSON.stringify(para));
  }, [para]);

  const [projectLink, setProjectLink] = useState("");

  const onChangeInput = (e) => { setInput({ ...input, [e.target.name]: e.target.value }) }

  const localHeadings = sessionStorage.getItem("localHeadings") === null ? [] : JSON.parse(sessionStorage.getItem("localHeadings"));
  const [headings, setHeadings] = useState(localHeadings);

  useEffect(() => {
    sessionStorage.setItem("localHeadings", JSON.stringify(headings));
  }, [headings]);

  const addHeading = () => {
    setHeadings([...headings, {
      heading: heading,
      side: side,
      date: date,
      place: place,
      subHeading: subHeading,
      list: list,
      para: para,
      projectLink: projectLink
    }]);
    setList([]);
    setPara([]);
    setHeading("");
    setPlace("");
    setDate("");
    setSubHeading("");
    setSide("");
    setProjectLink("");

  }

  const btnref = useRef(null);

  const submitSection = () => {
    if (secHeading === "" && sessionStorage.getItem("localHeadings") === JSON.parse("[]"))
      return;
    setSections([...sections, {
      secHeading: secHeading,
      headings: headings
    }]);
    setSecHeading("");
    setHeadings([]);
  }

  return (
    <>
      <div className="App d-flex">

        <div className=" back">
          <div className="d-flex justify-content-center w-100">
            <p style={{ fontSize: "8vmin", fontFamily: "Pricedown" }}>RESUME MAKER</p>
          </div>
          <div className='d-flex'>
            <div className='d-flex flex-column align-items-center'>
              <p className='my-2'>First Name:</p>
              <input type="Text" className="form-control" id="" name="fname" value={input.fname} onChange={onChangeInput} />
            </div>
            <div className='d-flex flex-column align-items-center'>
              <p className='my-2'>Last Name:</p>
              <input type="Text" className="form-control" id="" name="lname" value={input.lname} onChange={onChangeInput} />
            </div>
          </div>
          <p className='my-2'>Address: </p>
          <input type="Text" className="form-control" id="" name="address" value={input.address} onChange={onChangeInput} />
          <div className='d-flex my-5'>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Phone: </p>
              <input type="Text" className="form-control" id="" name="phone" value={input.phone} onChange={onChangeInput} />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Email: </p>
              <input type="Text" className="form-control" id="" name="email" value={input.email} onChange={onChangeInput} />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Linkedin: </p>
              <input type="Text" className="form-control" id="" name="linkedin" value={input.linkedin} onChange={onChangeInput} />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Github: </p>
              <input type="Text" className="form-control" id="" name="github" value={input.github} onChange={onChangeInput} />
            </div>
          </div>

          {/* SECTIONS */}


          <div className=' section '>

            <div className="text-white bg-dark p-3 my-3 rounded-5">
              <h2>Sections: </h2>
              <p>Section Heading:</p>
              <input type="text" className='form-control w-50' onChange={(e) => { setSecHeading(e.target.value) }} value={secHeading}></input>
              <div className="d-flex justify-content-between">
                <div className='my-3'>
                  <p>Heading:</p>
                  <input type="text" className='form-control w-100' onChange={(e) => { setHeading(e.target.value) }} value={heading}></input>
                </div>
                <div className='d-flex flex-column align-items-center my-3'>
                  <p>|  Side Details:</p>
                  <input type="text" className='form-control w-75' onChange={(e) => { setSide(e.target.value) }} value={side}></input>
                </div>
                <div className='d-flex flex-column align-items-center my-3'>
                  <p>Date:</p>
                  <input type="text" className='form-control w-75' onChange={(e) => { setDate(e.target.value) }} value={date}></input>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className='my-3'>
                  <p>Sub-Heading:</p>
                  <input type="text" className='form-control w-100' onChange={(e) => { setSubHeading(e.target.value) }} value={subHeading}></input>
                </div>
                <div className='d-flex flex-column align-items-center my-3'>
                  <p>Place:</p>
                  <input type="text" className='form-control w-75' onChange={(e) => { setPlace(e.target.value) }} value={place}></input>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-evenly my-2'>
                <strong>List: </strong>
                <input type="text" className='form-control w-75' onChange={(e) => { setListItem(e.target.value) }} value={listItem}></input>
                <button className='btn btn-primary' onClick={() => { if (listItem !== "") { setList([...list, listItem]); setListItem(""); } }}>+</button>
              </div>
              {list.map((ele, index) => {
                return (
                  <>
                    <div className='d-flex justify-content-end my-2'>
                      <div className='text-box w-75 rounded-3 px-2'>{ele}</div>
                      <button className='btn btn-danger mx-4' onClick={() => {
                        let newList = list;
                        // let index = newList.indexOf(ele);
                        // console.log(index, "   ele  ", ele, newList);

                        if (index > -1) {

                          newList.splice(index, 1);
                          setList(newList);
                          sessionStorage.setItem("localList", JSON.stringify(list));
                          setList([...list,])
                          console.log(list)
                        }
                      }}>-</button>
                    </div>
                  </>
                )
              })}



              <div className=' px-2'>
                <strong>Sentence: </strong>
                <div className="d-flex justify-content-between align-items-center">
                  <div className=''>
                    <p>Title:</p>
                    <input type="text" className='form-control w-100' onChange={(e) => { setTitle(e.target.value) }} value={title}></input>
                  </div>
                  :
                  <div className='d-flex flex-column align-items-center'>
                    <p>Description:</p>
                    <input type="text" className='form-control w-75' onChange={(e) => { setDescription(e.target.value) }} value={description}></input>
                  </div>
                  <div className='my-5'>
                    <button className='btn btn-primary' onClick={() => { if (!(title === "" && description === "")) { setPara([...para, { title: title, description: description }]); setTitle(""); setDescription(""); } }}>+</button>
                  </div>
                </div>
                {
                  para.map((ele, index) => {
                    return (
                      <>
                        <div className='d-flex justify-content-end my-2'>
                          <div className='text-box w-25 rounded-3 p-2 mx-3 overflow-hidden'>{ele.title}</div>
                          :
                          <div className='text-box w-50 rounded-3 p-2 mx-3'>{ele.description}</div>
                          <button className="btn btn-danger mx-2" onClick={() => {
                            let newPara = para;
                            newPara.splice(index, 1);
                            setPara(newPara);
                            sessionStorage.setItem("localPara", JSON.stringify(para));
                            setPara([...para]);
                          }}>-</button>
                        </div>
                      </>
                    )
                  })
                }
              </div>
              <div className='d-flex align-items-center justify-content-evenly my-5 w-100'>
                <strong>Project Link: </strong>
                <input type="text" className='form-control w-75' onChange={(e) => { setProjectLink(e.target.value) }} value={projectLink}></input>
              </div>

              <div className='d-flex justify-content-center my-3'>
                <button className="btn btn-primary w-25" onClick={() => {
                  if (heading === "" && side === "" && date === "" && place === "" && subHeading === "" && projectLink === "" && list.length === 0 && para.length === 0) {
                    window.alert("All fields empty!")
                  } else {
                    // Call addHeading function (replace this with your actual function)
                    console.log("callinnnngngngngn");
                    addHeading();
                  }
                }}>+ Add Heading</button>
              </div>
              <div className='d-flex flex-column align-items-center'>
                <button className='btn btn-success w-50' onClick={() => { if (secHeading === "") window.alert("Section Name Empty!"); else submitSection() }}>Submit Section</button>
                <button className='btn btn-warning my-5'><div ><PDFDownloadLink style={{textDecoration:"none", color: "black"}} document={<PDFDoc fname={input.fname} lname={input.lname} address={input.address} phone={input.phone} email={input.email} linkedin={input.linkedin} github={input.github} sections={sections} />} fileName={`${input.fname}_${input.lname}_Resume.pdf`} ref={btnref}>
                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                </PDFDownloadLink> <i class="fa-solid fa-download"></i></div></button>
              </div>

            </div>
          </div>



        </div>



        <PDFViewer width={"50%"} height={"700px"} className='pdfDoc'><PDFDoc fname={input.fname} lname={input.lname} address={input.address} phone={input.phone} email={input.email} linkedin={input.linkedin} github={input.github} sections={sections} /></PDFViewer>
      </div >

    </>

  );
}

export default App;





// {
//   secHeading: "EXPERIENCE",
//   headings: [
//     {
//       heading: "Newbieron Technologies",
//       subHeading: "Web Developer Intern",
//       date: "Jul 2023 - Sep 2023",
//       place: "New Delhi",
//       list: [
//         "Created Responsive Pages", "Attended this this this event cerononsdgek",
//         "Contributed this this this and thids",
//         "Got this award and that appraisal"
//       ]
//     },
//     {
//       heading: "Newbieron Technologies",
//       subHeading: "Web Developer Intern",
//       date: "Jul 2023 - Sep 2023",
//       place: "New Delhi",
//       list: [
//         "Created Responsive Pages", "Attended this this this event cerononsdgek",
//         "Contributed this this this and thids",
//         "Got this award and that appraisal"
//       ],
//     }
//   ]
// },
// {
//   secHeading: "EDUCATION",
//   headings: [
//     {
//       heading: "Guru Gobind Singh Indraprastha University",
//       subHeading: "Bachelors of Technology in Computer Science",
//       date: "Jul 2025",
//       place: "Dwarka, Delhi"
//     }
//   ]
// },
// {
//   secHeading: "PROJECTS",
//   headings: [

//     {
//       heading: "TnP_USICT",
//       side: "React, MongoDB, MERN, AWS",
//       projectLink: "www.google.com",
//       list: [
//         "Developed Full Stack Application",
//         "Implemented Authentication using JWT Tokens",
//       ],
//       date: "Aug 23 - Sep 23"
//     }
//   ]
// },
// {
//   secHeading: "TECHNICAL SKILLS",
//   headings: [
//     {
//       para: [
//         {
//           title: "Languages",
//           description: "C++, C, Java, Python, HTML, CSS, JS, MySQL"
//         },
//         {
//           title: "Frameworks",
//           description: "C++, C, Java, Python, HTML, CSS, JS, MySQL"
//         }
//       ]
//     }
//   ]
// },
// {
//   secHeading: "ACHIEVEMENTS",
//   headings: [
//     {
//       para: [
//         {
//           description: "Secured First Position in IEEE Synapse Hackathon"
//         },
//         {
//           description: "Secured Second Position in IEEE Hack-U-Thon"
//         }
//       ]
//     }
//   ]
// }