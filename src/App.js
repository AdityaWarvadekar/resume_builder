import logo from './logo.svg';
import './App.css';
import PDFDoc from './components/PDFDoc';
import { PDFDownloadLink, PDFViewer, usePDF } from '@react-pdf/renderer';
import { MobilePDFReader } from 'react-read-pdf';
import { useEffect, useReducer, useRef, useState } from 'react';

function App() {

//   window.onbeforeunload = function (e) {
//     e = e || window.event;

//     // For IE and Firefox prior to version 4
//     if (e) {
//         e.returnValue = 'Sure?';
//     }

//     // For Safari
//     return 'Sure?';
// };

  const [input, setInput] = useState({
    fname: "JOHN",
    lname: "DOE",
    address: "123, New Delhi, 110078",
    phone: "1234567890",
    email: "abc@gmail.com",
    linkedin: "linkedin.com/in/abc",
    github: "github.com/abc",

  })



  // useEffect(()=>{
  //   sessionStorage.setItem("localList", "abc");
  //   sessionStorage.setItem("localPara", "abc");
  // }, [])



  const [secHeading, setSecHeading] = useState("EXPERIENCE");
  const [heading, setHeading] = useState("ABC Technologies");
  const [subHeading, setSubHeading] = useState("APP Developer Intern");
  const [date, setDate] = useState("Jan 22 - Feb 22");
  const [place, setPlace] = useState("Place");
  const [side, setSide] = useState("Java, Kotlin etc.");




  const localList = sessionStorage.getItem("localList") === null ? [
    "This is my role", "Did this task",
    "Created Responsive Pages",
    "Got this award and that appraisal"
  ] : JSON.parse(sessionStorage.getItem("localList"));
  // console.log(localList, "<----locallist");
  const [list, setList] = useState(localList);
  useEffect(() => {
    sessionStorage.setItem("localList", JSON.stringify(list))
  }, [list]);
  const [listItem, setListItem] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const localPara = sessionStorage.getItem("localPara") === null ? [{ title: "Tech Club", description: "Conducted sessions etc." }] : JSON.parse(sessionStorage.getItem("localPara"));
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

  // const [section, setSection] = useState({
  //   secHeading: secHeading,
  //   headings: [{
  //     heading: heading,
  //     subHeading: subHeading,
  //     date: date,
  //     place: place,
  //     list: list,
  //     para: para,
  //     side: side,
  //     projectLink: projectLink
  //   }],
  // })

  const localSections = sessionStorage.getItem("localSections") === null ? [{
    secId: 1,
    secHeading: "SAMPLE LAYOUT",
    headings: [
      {
        heading: heading,
        subHeading: subHeading,
        date: date,
        place: place,
        list: list
      }
    ]
  }] : JSON.parse(sessionStorage.getItem("localSections"));
  const [sections, setSections] = useState(localSections);
  useEffect(() => {
    sessionStorage.setItem("localSections", JSON.stringify(sections));
  }, [sections])

  const addHeading = () => {
    setHeadings([...headings, {
      headingId: headings.length > 0 ? headings[headings.length - 1].headingId + 1 : 1,
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

  const [editMode, setEditMode] = useState(false);
  const [headingEditId, setHeadingEditId] = useState(null);

  const updateHeadingFields = (id) => {
    let heads = headings;
    let index = heads.findIndex(item => item.headingId === id);
    if (index != -1) {
      // console.log(heads[index]);
      let head = heads[index];
      setList(head.list);
      setPara(head.para);
      setHeading(head.heading);
      setPlace(head.place);
      setDate(head.date);
      setSubHeading(head.subHeading);
      setSide(head.side);
      setProjectLink(head.projectLink);
      setEditMode(true);
      setHeadingEditId(id);
    }
  }

  const updateHeading = (id) => {
    let heads = headings;
    let index = heads.findIndex(item => item.headingId === id);
    if (index != -1) {
      heads.splice(index, 1, {
        headingId: id,
        heading: heading,
        side: side,
        date: date,
        place: place,
        subHeading: subHeading,
        list: list,
        para: para,
        projectLink: projectLink
      });
      setList([]);
      setPara([]);
      setHeading("");
      setPlace("");
      setDate("");
      setSubHeading("");
      setSide("");
      setProjectLink("");
      setEditMode(false);
      setHeadingEditId(null);
    }
  }

  const [secEdit, setSecEdit] = useState(false);
  const [secEditId, setsecEditId] = useState(null);

  const updateSectionFields = (id) => {
    let secs = sections;
    let index = secs.findIndex(item => item.secId === id);
    if (index != -1) {
      let sec = secs[index];
      setSecHeading(sec.secHeading);
      setHeadings(sec.headings);
      setSecEdit(true);
      setsecEditId(id);
    }
  }

  const updateSection = (id) => {
    let secs = sections;
    let index = secs.findIndex(item => item.secId === id);
    if(index!=-1){
      secs.splice(index, 1, {
        secId: id,
        secHeading: secHeading,
        headings: headings
      });
      setSecEdit(false);
      setsecEditId(null);
      setSecHeading("");
        setHeadings([]);
    }
  }

  const btnref = useRef(null);

  const submitSection = () => {
    if (secHeading === "" && sessionStorage.getItem("localHeadings") === JSON.parse("[]")) {
      window.alert("Section Empty!");
      return;
    }
    else if (heading !== "" || subHeading !== "" || date !== "" || place !== "" || listItem !== "" || list.length !== 0 || para.length !== 0 || title !== "" || description !== "" || projectLink !== "" || side !== "") {
      if (window.confirm("Submit the section without adding current component?")) {
        setSections([...sections, {
          secId: sections.length > 0 ? sections[sections.length - 1].secId + 1 : 1,
          secHeading: secHeading,
          headings: headings
        }]);
        // setSections([...sections, section]);
        setSecHeading("");
        setHeadings([]);
      }
    }
    else {
      setSections([...sections, {
        secId: sections.length > 0 ? sections[sections.length - 1].secId + 1 : 1,
        secHeading: secHeading,
        headings: headings
      }]);
      // setSections([...sections, section]);
      setSecHeading("");
      setHeadings([]);
    }
  }

  return (
    <>
      <div className="App d-flex">

        <div className=" back">
          <div className="d-flex justify-content-center w-100">
            <p style={{ fontSize: "8vmin", fontFamily: "Pricedown", color: "#00ADB5", textShadow:"0 3px 5px black" }}>RESUME MAKER</p>
          </div>
          <div className='d-flex justify-content-evenly '>
            <div className='d-flex flex-column align-items-center'>
              <p className='my-2'>First Name:</p>
              <input type="Text" className="form-control" id="" name="fname" value={input.fname} onChange={(e) => { setInput({ ...input, fname: e.target.value.toUpperCase() }) }} />
            </div>
            <div className='d-flex flex-column align-items-center'>
              <p className='my-2'>Last Name:</p>
              <input type="Text" className="form-control" id="" name="lname" value={input.lname} onChange={(e) => { setInput({ ...input, lname: e.target.value.toUpperCase() }) }} />
            </div>
          </div>
          <div className='d-flex flex-column align-items-center'>
          <p className='my-2'>Address: </p>
          <input type="Text" className="form-control" id="" name="address" value={input.address} onChange={onChangeInput} />
          </div>
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

            <div className="text-white p-3 my-3 rounded-2" style={{backgroundColor: "#222831", boxShadow: '0 10px 10px black'}}>
              <div className='d-flex flex-wrap align-items-center'>
                <h5 className='my-4'>SECTIONS: </h5>
                <div className='d-flex justify-content-evenly w-75 flex-wrap'>
                  {sections.map((section, index) => {
                    return (<>
                      <div className="buttonList" onClick={() => updateSectionFields(section.secId)}>
                        <p className="my-2" style={{ fontSize: "2vmin" }}>{section.secHeading}</p>
                        <p className='' onClick={() => {
                          if (window.confirm("Delete the Section: "+ section.secHeading+"?")) {
                            let newSections = sections;
                            newSections.splice(index, 1);
                            setSections(newSections);
                            setSections([...sections]);
                          }
                          // console.log("SECTOIN: ", section, index);
                          // let newSections = sections;
                          // newSections.splice(index, 1);
                          // setSections(newSections);
                          // console.log(sections);
                        }}><i class="fa-solid fa-circle-xmark text-danger close"></i></p>
                      </div>
                    </>)
                  })}
                </div>

              </div>

              <h2>Section: </h2>
              <p>Section Heading:</p>
              <input type="text" className='form-control w-50' onChange={(e) => { setSecHeading(e.target.value.toUpperCase()) }} value={secHeading}></input>
              <hr></hr>
              <div className='d-flex flex-wrap align-items-center'>
                <h6 className='my-4'>Components: </h6>
                <div className='d-flex justify-content-evenly w-75 flex-wrap'>
                  {headings.map((head, index) => {
                    return (<>
                      <div className="buttonList" onClick={() => updateHeadingFields(head.headingId)}>
                        <p className="my-2" style={{ fontSize: "2vmin" }}>{head.heading}</p>
                        <p className='' onClick={() => {
                          if (window.confirm("Delete the Heading: "+ head.heading+"?")) {
                            let newHeadings = headings;
                            newHeadings.splice(index, 1);
                            setHeadings(newHeadings);
                            setHeadings([...headings]);
                          }
                        }}><i class="fa-solid fa-circle-xmark text-danger close"></i></p>
                      </div></>)
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-between" style={{marginTop: "3vh"}}>
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
              <div className="d-flex justify-content-between align-items-center">
                <div className='my-3'>
                  <p>Sub-Heading:</p>
                  <input type="text" className='form-control w-100' onChange={(e) => { setSubHeading(e.target.value) }} value={subHeading}></input>
                </div>
                <div className='d-flex flex-column align-items-center my-3'>
                  <p>Place:</p>
                  <input type="text" className='form-control w-75' onChange={(e) => { setPlace(e.target.value) }} value={place}></input>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-evenly my-4'>
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
                          setList([...list,]);
                          setSections([...sections]);
                          console.log(list);
                        }
                      }}>-</button>
                    </div>
                  </>
                )
              })}



              <div className='px-3'>
                <p>Sentence: </p>
                <div className="d-flex  align-items-center justify-content-between">
                  <div className=''>
                    <p>Title:</p>
                    <input type="text" className='form-control w-100' onChange={(e) => { setTitle(e.target.value) }} value={title}></input>
                  </div>
                  :
                  <div className='d-flex flex-column align-items-center'>
                    <p>Description:</p>
                    <input type="text" className='form-control w-100' onChange={(e) => { setDescription(e.target.value) }} value={description}></input>
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
                            setSections([...sections]);
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
                  if (secHeading === "")
                    window.alert("Section Name Empty! ")
                  else if (heading === "" && side === "" && date === "" && place === "" && subHeading === "" && projectLink === "" && list.length === 0 && para.length === 0) {
                    window.alert("All fields empty!")
                  } else {
                    // Call addHeading function (replace this with your actual function)
                    console.log("callinnnngngngngn");
                    if (editMode)
                      updateHeading(headingEditId);
                    else
                      addHeading();
                  }
                }}>{editMode ? "Update Heading" : "+ Add Heading"}</button>
              </div>
              <div className='d-flex flex-column align-items-center'>
                <button className='btn btn-success w-50' onClick={() => { if (secHeading === "") window.alert("Section Name Empty!"); else if(secEdit) updateSection(secEditId); else submitSection() }}>{secEdit? "Update Section" : "Submit Section"}</button>
                <button className='btn btn-warning my-5'><div ><PDFDownloadLink style={{ textDecoration: "none", color: "black" }} document={<PDFDoc fname={input.fname} lname={input.lname} address={input.address} phone={input.phone} email={input.email} linkedin={input.linkedin} github={input.github} sections={sections} />} fileName={`${input.fname}_${input.lname}_Resume.pdf`} ref={btnref}>
                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                </PDFDownloadLink> <i class="fa-solid fa-download"></i></div></button>
              </div>
            </div>
          </div>
          <h5 style={{ fontFamily: "Pricedown" }}>CREATED BY : <a href="mailto:adityawarvadekar11@gmail.com">ADITYA WARVADEKAR</a></h5>
        </div>

      <div className='mobile'><PDFViewer width={"50%"} height={"700px"} className='pdfDoc'><PDFDoc fname={input.fname} lname={input.lname} address={input.address} phone={input.phone} email={input.email} linkedin={input.linkedin} github={input.github} sections={sections} /></PDFViewer></div>  
      </div >

    </>

  );
}

export default App;





// {
// secHeading: "EXPERIENCE",
// headings: [
//   {
//     heading: "Newbieron Technologies",
//     subHeading: "Web Developer Intern",
//     date: "Jul 2023 - Sep 2023",
//     place: "New Delhi",
//     list: [
//       "Created Responsive Pages", "Attended this this this event cerononsdgek",
//       "Contributed this this this and thids",
//       "Got this award and that appraisal"
//     ]
//   },
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