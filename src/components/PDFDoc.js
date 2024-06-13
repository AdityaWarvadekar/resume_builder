import { Document, Page, StyleSheet, Text, View, Image, Font, Link } from '@react-pdf/renderer'
import React from 'react'
import Regular from "./fonts/CMU Serif Roman.ttf"
import Bold from "./fonts/CMU Serif Bold.ttf"
import BoldItalic from "./fonts/CMU Serif BoldItalic.ttf"
import Italic from "./fonts/CMU Serif Italic.ttf"
import phone from "./img/phone.jpg"
import email from "./img/email.jpg"
import linkedin from "./img/linkedin.jpg"
import github from "./img/github.jpg"


function PDFDoc(props) {
    // Font.register({
    //  family: 'CormorantGaramond_bold', 
    //  format: "truetype",
    //  src: CormorantGaramond_bold, 
    //  fontStyle: 'normal', 
    //  fontWeight: 'normal', 
    // },
    // );
    // Font.register({
    //     family: 'CormorantGaramond_medium', 
    //     format: "truetype",
    // src: CormorantGaramond_medium, 
    //  fontStyle: 'normal', 
    //  fontWeight: 'normal', 
    //    });

    Font.register({
        family: 'Regular',
        format: "truetype",
        src: Regular,
        //  fontStyle: 'normal', 
        //  fontWeight: 'normal', 
    });

    Font.register({
        family: 'Bold',
        format: "truetype",
        src: Bold,
        //  fontStyle: 'normal', 
        //  fontWeight: 'normal', 
    });

    Font.register({
        family: 'BoldItalic',
        format: "truetype",
        src: BoldItalic,
        //  fontStyle: 'normal', 
        //  fontWeight: 'normal', 
    });

    Font.register({
        family: 'Italic',
        format: "truetype",
        src: Italic,
        //  fontStyle: 'normal', 
        //  fontWeight: 'normal', 
    });

    const ListItem = ({ children }) => {
        return (
            <View style={styles.row}>
                <View style={styles.bullet}>
                    <Text>{'\u2022' + "   "}</Text>
                </View>
                <Text style={{textAlign: "left"}}>{children}</Text>
            </View>
        )
    }

    const Section = (props) => {
        let headings = props.headings ? props.headings : [];
        return (
            <>
                <View style={styles.section}>
                    <Text><Text style={styles.headingCaps}>{props.secHeading? props.secHeading.slice(0, 1) : ""}</Text>{props.secHeading? props.secHeading.slice(1) : ""}</Text>
                </View>
                {headings.map((ele) => {
                    return (
                        <>
                            <View style={styles.headingLayout}>
                                {(ele.side) ? <Text style={styles.heading}>{ele.heading} | <Text style={styles.subHeading}>{ele.side}</Text></Text> : <Text style={styles.heading}>{ele.heading}</Text>}
                                <Text style={styles.date}>{ele.date}</Text>
                            </View>
                            <View style={styles.headingLayout}>
                                <Text style={styles.subHeading}>{ele.subHeading}</Text>
                                <Text style={styles.subHeading}>{ele.place}</Text>
                            </View>
                            <View style={styles.listLayout}>
                                {ele.list ?
                                    ele.list.map(element => {
                                        return (
                                            <ListItem>{element}</ListItem>
                                        );
                                    })
                                    : ""
                                };
                                {(ele.projectLink ? <ListItem>Project Link- <Link src={ele.projectLink}>{ele.projectLink}</Link></ListItem> : "")}
                            </View>
                            <View style={styles.para}>
                                {ele.para ? ele.para.map((td) => {
                                    return (<View style={{ display: "flex", flexDirection: "row" }}>{td.title ? <Text style={styles.title}>{td.title} : </Text> : ""}<Text style={styles.desc}>{td.description ? td.description : ""}</Text></View>)
                                }) : ""}
                            </View>
                        </>
                    );
                })}

            </>
        );
    }

    const styles = StyleSheet.create({
        page: {
            // flexDirection: "column",
            padding: "15px 30px",
            fontFamily: "Regular",
            justifyContent: "space-around"
        },
        header: {
            flexGrow: 1,
            textAlign: "center",
            fontSize: "22.5px",
            fontFamily: "Regular"
        },
        subHeader: {
            textAlign: "center",
            fontSize: "11px",
            // fontFamily: "Times-Roman"
        },
        caps: {
            fontSize: "29.5px"
        },
        icon: {
            height: "8px",
            width: "8px",
        },
        inline: {
            flexDirection: "row",
            flexWrap: "wrap",
            textAlign: "center",
            fontSize: "10px",
            justifyContent: "center",
            // padding: " 0 5%",
            // width: "80%"
        },
        section: {
            flexDirection: "row",
            margin: "10px 0 2px 0",
            fontSize: "9px",
            borderBottom: "1px solid black"
        },
        headingLayout: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "0 12px"
        },
        heading: {
            fontSize: "11px",
            fontFamily: "Bold",
            // fontWeight:"bold",
            padding: 0,
            marginTop: "1px"
        },
        headingCaps: {
            fontSize: "12px"
        },
        date: {
            fontFamily: "Regular",
            fontSize: "11px",
            marginTop: "1px"
        },
        subHeading: {
            fontSize: "10px",
            fontFamily: "Italic"
        },

        //LIST PART
        listLayout: {
            padding: "0 20px"
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            fontSize: "10px"
        },
        bullet: {
            fontSize: "8px",
            height: "100%"
        },

        //DESCRIPTIONS

        para: {
            padding: "0 10px",
            textAlign: 'left'
        },
        title: {
            fontSize: "10px",
            fontFamily: "Bold"
        },
        desc: {
            fontSize: "10px",
            fontFamily: "Regular"
        }
    });
    return (
        <Document>
            <Page size={"LETTER"} style={styles.page}>
                <View style={styles.header}>
                    <Text><Text style={styles.caps}>{props.fname? props.fname.slice(0, 1):""}</Text>{props.fname? props.fname.slice(1):""} <Text style={styles.caps}>{props.lname?props.lname.slice(0, 1):""}</Text>{props.lname?props.lname.slice(1):""}</Text>
                    <Text style={styles.subHeader}>{props.address ? props.address : ""}</Text>
                    <View style={styles.inline}>
                        {props.phone? <Text style={{ padding: "0 5px" }}><Image src={phone} style={styles.icon} /> {props.phone ? props.phone : ""}</Text> : ""}

                        {props.email? <Text style={{ textDecoration: "underline", padding: "0 5px" }}><Image src={email} style={styles.icon} /><Link src={props.email ? props.email : ""} /> {props.email ? props.email : ""}</Text> : ""}

                        {props.linkedin? <Text style={{ textDecoration: "underline", padding: "0 5px" }}><Image src={linkedin} style={styles.icon} /><Link src={props.linkedin ? props.linkedin : ""} /> {props.linkedin ? props.linkedin : ""}</Text>:""}

                        {props.github?<Text style={{ textDecoration: "underline", padding: "0 5px" }}><Image src={ github } style={styles.icon} /><Link src={props.github ? props.github : ""} /> {props.github ? props.github : ""}</Text>: ""}
                    </View>

                    {props.sections ?
                        props.sections.map((section) => {
                            return (
                                <>
                                    <Section secHeading={section.secHeading} headings={section.headings}/>
                                </>
                            )
                        })
                        : ""}

                    {/* EXPERIENCE */}


{/* 
                    <Section secHeading="EXPERIENCE" headings={[{
                        heading: "Newbieron Technologies",
                        date: "Jul 2023 - Sep 2023",
                        subHeading: "Web Development Intern",
                        place: "New Delhi, Delhi",
                        list: ["Created Responsive Pages", "Attended this this this event cerononsdgek", "Contributed this this this and thids", "Got this award and that appraisal"],
                    },
                    {
                        heading: "Newbieron Technologies",
                        date: "Jul 2023 - Sep 2023",
                        subHeading: "Web Development Intern",
                        place: "New Delhi, Delhi",
                        list: ["Created Responsive Pages", "Attended this this this event cerononsdgek", "Contributed this this this and thids", "Got this award and that appraisal"],
                        projectLink: "https://www.google.com",
                        side: "React, MongoDB, Express, Node, AWS"
                    }]
                    } />

                    <Section secHeading="EDUCATION" headings={[{
                        heading: "Guru Gobind Singh Indraprastha University",
                        date: "Jul 2025",
                        subHeading: "Bachelor of Technology in Computer Science",
                        place: "Dwarka, Delhi",

                    }]
                    } />


                    <Section secHeading="EXPERIENCE" headings={[{

                        para: [
                            {
                                title: "Cogitans, Techspace",
                                description: "Web Development Lead, mentored students"
                            },
                            {

                                description: "Web Development Lead, mentored students"
                            },
                            {
                                title: "Cogitans, Techspace",

                            }
                        ]
                    },

                    ]
                    } />


                    <Section secHeading="EXPERIENCE" headings={[{
                        heading: "Newbieron Technologies",
                        date: "Jul 2023 - Sep 2023",
                        subHeading: "Web Development Intern",
                        place: "New Delhi, Delhi",
                        list: ["Created Responsive Pages", "Attended this this this event cerononsdgek", "Contributed this this this and thids", "Got this award and that appraisal"],
                    },
                    {
                        heading: "Newbieron Technologies",
                        date: "Jul 2023 - Sep 2023",
                        subHeading: "Web Development Intern",
                        place: "New Delhi, Delhi",
                        list: ["Created Responsive Pages", "Attended this this this event cerononsdgek", "Contributed this this this and thids", "Got this award and that appraisal"],
                    }]
                    } /> */}


                </View>





            </Page>
        </Document>
    );




}



export default PDFDoc




// https://github.com/diegomura/react-pdf/issues/1075