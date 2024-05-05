import'./profile.css'
import React, { useContext, useState ,useRef,useEffect ,} from 'react'
import { PureComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import App, { AppContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from 'html2canvas';
import { font } from './alfont_com_arial-1-normal';
import './alfont_com_arial-1.ttf'
import border from '../../assets/bordr.jpg'


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Profile = ({data , initiatives , show}) => {
const {route , setLoader}=useContext(AppContext)

const chartRef = useRef(null);

  // const exportReport =  () => {
  //   setLoader(true)

  //   html2canvas(document.getElementById('element')).then(canvas => {
  //     const canvas = chartRef.current.canvas;
  //     const imageData = canvas.toDataURL('image/png');
  //     const doc = new jsPDF({
  //       orientation: 'landscape', // 'portrait' or 'landscape' orientation
  //       unit: 'mm', // Measurement unit (millimeters)
  //       format: [285.75 , 508 ]
  //     });
      
     
  //     doc.addFileToVFS('alfont_com_arial-1.ttf', font);
  //     doc.addFont('alfont_com_arial-1.ttf', 'alfont_com_arial-1', 'normal');
  //     doc.setFont("alfont_com_arial-1");


 
  //     const center = (nas)=>{
  //       const pageWidth = doc.internal.pageSize.getWidth();
  //       const text = nas;
  //       const txtWidth = doc.getTextWidth(text);
  //       const xPos = (pageWidth / 2) - (txtWidth / 2); 
  //       return xPos
  //     }
  //     const centerImg = (imageWidth)=>{
  //       const pageWidth = doc.internal.pageSize.getWidth();
  //       const startX = (pageWidth - imageWidth) / 2;
  //       return startX
  //     }
  //     const text = `${data.title}`;
  //     doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //     doc.setFontSize(30);
  //     doc.text("تقرير للهدف", center("تقرير للهدف"), 30);
  //     doc.setFontSize(50);
  //     doc.text(text, center(text), 55);
  //     doc.setFontSize(30);
  //     doc.text("اسم الجمعية", center("اسم الجمعية"), 75);
  //     doc.setFontSize(50);
  //     doc.text(`${sessionStorage.getItem("name")}`, center(sessionStorage.getItem("name")), 95);
  //     doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', centerImg(120), 120, 120, 80);
  //     const pageWidth = doc.internal.pageSize.getWidth();
  //     const margin = 20; // Set a margin for the text
  //     const maxWidth = pageWidth -5; // Calculate the maximum width of the text
  //     const lineHeight = 10; // Set the line height
  //      initiatives.forEach((obj, index) => {
  //       let lines = doc.splitTextToSize(obj.desc, pageWidth);
  //       let problemLines = doc.splitTextToSize(obj.problem, pageWidth);
  //       let yPos = 70;
  //       let pPos = yPos +20 + lines.length * 10;
  //       doc.addPage();
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(30);
  //       doc.text(`مبادرة`, center("مبادره"), 35);
  //       doc.setFontSize(40);
  //       doc.text(`${obj.title}`, center(obj.title), 55);
  //       // doc.setFontSize(20);
  //       // doc.text(`وصف المبادره`, center("وصف المبادره"), 75);
  //       doc.setFontSize(20);
  //       // doc.text(`${obj.desc}`, center(obj.desc), 95);
  //       lines.forEach((line) => {
      
  //         if (yPos > doc.internal.pageSize.getHeight() - 10) { 
  //             doc.addPage();
  //             doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //             doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //             yPos = 25;
  //         }
  
  //         // Add the text line and move to next line position
  //         doc.text(line, center(line), yPos);
  //         yPos += lineHeight;
  //     });
  //     doc.text(`المشكله`, center("المشكله"), pPos-10);
  //       problemLines.forEach((line) => {
      
  //         if (yPos > doc.internal.pageSize.getHeight() - 20) { 
  //             doc.addPage();
  //             doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //             doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //             yPos = 25;
  //         }
  
  //         // Add the text line and move to next line position
  //         doc.text(line, center(line), pPos);
  //         yPos += lineHeight;
  //     });
  //     doc.addPage()
  //     doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //     doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //     doc.setFontSize(20);
  //     if(obj.budget){
  //       doc.text(`الميزانية`, center("الميزانية"), 20);
  //       doc.setFontSize(30);
  //       doc.text(`${obj.budget}`, center(`${obj.budget}`), 40);
  //     }
  //     if(obj.plan){
  //       doc.setFontSize(35);
  //       doc.text(`خطة العمل`, center("خطة العمل"), 60);
  //       obj.plan.forEach((action, index) => {
  //               doc.autoTable({
  //           html: `#plan${index}`,
  //           styles: {
  //             font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //             fontSize: 13, // Adjust the font size as needed
  //             valign: 'middle', // Center vertically
  //             halign: 'center', // Center horizontally
  //           },
  //           theme:"grid",
  //           startY: 80
  //         });
  //       });
  //     }
  //     if(obj.target){
  //       doc.addPage()
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(35);
  //       doc.text(`ارتباط باهداف الوطنية`, center("ارتباط باهداف الوطنية"), 30);
  //       doc.autoTable({
  //         html: `#target${index}`,
  //         styles: {
  //           font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //           fontSize: 13, // Adjust the font size as needed
  //           valign: 'middle', // Center vertically
  //           halign: 'center', // Center horizontally
  //         },
  //         theme:"grid",
  //         startY: 50
  //       });
  //       doc.text(`ارتباط بأهداف التنمية المستدامة `, center("ارتباط بأهداف التنمية المستدامة "), 100);
  //       doc.autoTable({
  //         html: `#targetG${index}`,
  //         styles: {
  //           font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //           fontSize: 13, // Adjust the font size as needed
  //           valign: 'middle', // Center vertically
  //           halign: 'center', // Center horizontally
  //         },
  //         theme:"grid",
  //         startY: 125
  //       });
  //     }
  //     if(obj.jsutifications){
  //       doc.addPage()
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(35);
  //       doc.text(`المسوغات`, center("المسوغات"), 30);
  //       obj.jsutifications.forEach((action, index) => {
  //               doc.autoTable({
  //           html: `#just${index}`,
  //           styles: {
  //             font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //             fontSize: 13, // Adjust the font size as needed
  //             valign: 'middle', // Center vertically
  //             halign: 'center', // Center horizontally
  //           },
  //           theme:"grid",
  //           startY: 50
  //         });
  //       });
  //     }
  //     if(obj.strategy1){
  //       doc.addPage()
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(35);
  //       doc.text(`الأبعاد الخمسه`, center("الأبعاد الخمسه"), 30);
  //       obj.strategy1.forEach((action, index) => {
  //               doc.autoTable({
  //           html: `#strat${index}`,
  //           styles: {
  //             font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //             fontSize: 13, // Adjust the font size as needed
  //             valign: 'middle', // Center vertically
  //             halign: 'center', // Center horizontally
  //           },
  //           theme:"grid",
  //           startY: 50
  //         });
  //       });
  //     }
  //     if(obj.output && obj.output.length > 0){
  //       doc.addPage()
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(35);
  //       doc.text(`المخرجات`, center("المخرجات"), 30);
  //       doc.autoTable({
  //         html: `#out${index}`,
  //         styles: {
  //           font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //           fontSize: 13, // Adjust the font size as needed
  //           valign: 'middle', // Center vertically
  //           halign: 'center', // Center horizontally
  //         },
  //         theme:"grid",
  //         startY: 50
  //       });
   
  //     }

  //     if(obj.entries){
   
  //       doc.addPage()
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(35);
  //       doc.text(`نظرية التغيير`, center("نظرية التغيير"), 30);
  //       doc.text(`المدخلات`, center("المدخلات"), 50);
  //       doc.autoTable({
  //         html: `#entry${index}`,
  //         styles: {
  //           font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //           fontSize: 13, // Adjust the font size as needed
  //           valign: 'middle', // Center vertically
  //           halign: 'center', // Center horizontally
  //         },
  //         theme:"grid",
  //         startY: 70
  //       });

  //       doc.addPage()
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(35);
  //       doc.text(`نظرية التغيير`, center("نظرية التغيير"), 30);
  //       doc.text(`الأثر`, center("الأثر"), 50);
     
  //       doc.autoTable({
  //         html: `#impact${index}`,
  //         styles: {
  //           font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //           fontSize: 13, // Adjust the font size as needed
  //           valign: 'middle', // Center vertically
  //           halign: 'center', // Center horizontally
  //         },
  //         theme:"grid",
  //         startY: 70
  //       });

  //       doc.addPage()
  //       doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
  //       doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
  //       doc.setFontSize(35);
  //       doc.text(`نظرية التغيير`, center("نظرية التغيير"), 30);
  //       doc.text(`النشاطات`, center("النشاطات"), 50);
  //       doc.autoTable({
  //         html: `#active${index}`,
  //         styles: {
  //           font: 'alfont_com_arial-1', // Set the font to the Arabic font
  //           fontSize: 13, // Adjust the font size as needed
  //           valign: 'middle', // Center vertically
  //           halign: 'center', // Center horizontally
  //         },
  //         theme:"grid",
  //         startY: 70
  //       });
  // //       obj.activities.forEach((action, index) => {
 
  // // });
  //     }
    
      
    
  //   });
      
   
     
 
  //      doc.save("mypddf.pdf");
  //      setLoader(false)
 
  //   });
    
  // };

  const exportReport =  () => {
    setLoader(true)


      // const canvas = chartRef.current.canvas;
      // const imageData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'landscape', // 'portrait' or 'landscape' orientation
        unit: 'mm', // Measurement unit (millimeters)
        format: [285.75 , 508 ]
      });
      
     
      doc.addFileToVFS('alfont_com_arial-1.ttf', font);
      doc.addFont('alfont_com_arial-1.ttf', 'alfont_com_arial-1', 'normal');
      doc.setFont("alfont_com_arial-1");


 
      const center = (nas)=>{
        const pageWidth = doc.internal.pageSize.getWidth();
        const text = nas;
        const txtWidth = doc.getTextWidth(text);
        const xPos = (pageWidth / 2) - (txtWidth / 2); 
        return xPos
      }
      const centerImg = (imageWidth)=>{
        const pageWidth = doc.internal.pageSize.getWidth();
        const startX = (pageWidth - imageWidth) / 2;
        return startX
      }
      const text = `${data.title}`;
      doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
      doc.setFontSize(30);
      doc.text("تقرير للهدف", center("تقرير للهدف"), 30);
      doc.setFontSize(50);
      doc.text(text, center(text), 55);
      doc.setFontSize(30);
      doc.text("اسم الجمعية", center("اسم الجمعية"), 75);

      doc.setFontSize(50);
      doc.text(`${sessionStorage.getItem("name")}`, center(sessionStorage.getItem("name")), 95);
      doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', centerImg(120), 120, 120, 80);
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20; // Set a margin for the text
      const maxWidth = pageWidth -5; // Calculate the maximum width of the text
      const lineHeight = 10; // Set the line height
       initiatives.forEach((obj, index) => {
        let lines = doc.splitTextToSize(obj.desc, pageWidth);
        let problemLines = doc.splitTextToSize(obj.problem, pageWidth);
        let yPos = 70;
        let pPos = yPos +20 + lines.length * 10;
        doc.addPage();
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(30);
        doc.text(`مبادرة`, center("مبادره"), 35);
        doc.setFontSize(40);
        doc.text(`${obj.title}`, center(obj.title), 55);
        // doc.setFontSize(20);
        // doc.text(`وصف المبادره`, center("وصف المبادره"), 75);
        doc.setFontSize(20);
        // doc.text(`${obj.desc}`, center(obj.desc), 95);
        lines.forEach((line) => {
      
          if (yPos > doc.internal.pageSize.getHeight() - 10) { 
              doc.addPage();
              doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
              doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
              yPos = 25;
          }
  
          // Add the text line and move to next line position
          doc.text(line, center(line), yPos);
          yPos += lineHeight;
      });
      doc.text(`المشكله`, center("المشكله"), pPos-10);
        problemLines.forEach((line) => {
      
          if (yPos > doc.internal.pageSize.getHeight() - 20) { 
              doc.addPage();
              doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
              doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
              yPos = 25;
          }
  
          // Add the text line and move to next line position
          doc.text(line, center(line), pPos);
          yPos += lineHeight;
      });
      doc.addPage()
      doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
      doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
      doc.setFontSize(20);
      if(obj.budget){
        doc.text(`الميزانية`, center("الميزانية"), 20);
        doc.setFontSize(30);
        doc.text(`${obj.budget}`, center(`${obj.budget}`), 40);
      }
      if(obj.plan){
        doc.setFontSize(35);
        doc.text(`خطة العمل`, center("خطة العمل"), 60);
        obj.plan.forEach((action, index) => {
                doc.autoTable({
            html: `#plan${index}`,
            styles: {
              font: 'alfont_com_arial-1', // Set the font to the Arabic font
              fontSize: 13, // Adjust the font size as needed
              valign: 'middle', // Center vertically
              halign: 'center', // Center horizontally
            },
            theme:"grid",
            startY: 80
          });
        });
      }
      if(obj.target){
        doc.addPage()
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(35);
        doc.text(`ارتباط باهداف الوطنية`, center("ارتباط باهداف الوطنية"), 30);
        doc.autoTable({
          html: `#target${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 13, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 50
        });
        doc.text(`ارتباط بأهداف التنمية المستدامة `, center("ارتباط بأهداف التنمية المستدامة "), 100);
        doc.autoTable({
          html: `#targetG${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 13, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 125
        });
      }
      if(obj.jsutifications){
        doc.addPage()
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(35);
        doc.text(`المسوغات`, center("المسوغات"), 30);
        obj.jsutifications.forEach((action, index) => {
                doc.autoTable({
            html: `#just${index}`,
            styles: {
              font: 'alfont_com_arial-1', // Set the font to the Arabic font
              fontSize: 13, // Adjust the font size as needed
              valign: 'middle', // Center vertically
              halign: 'center', // Center horizontally
            },
            theme:"grid",
            startY: 50
          });
        });
      }
      if(obj.strategy1){
        doc.addPage()
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(35);
        doc.text(`الأبعاد الخمسه`, center("الأبعاد الخمسه"), 30);
        obj.strategy1.forEach((action, index) => {
                doc.autoTable({
            html: `#strat${index}`,
            styles: {
              font: 'alfont_com_arial-1', // Set the font to the Arabic font
              fontSize: 13, // Adjust the font size as needed
              valign: 'middle', // Center vertically
              halign: 'center', // Center horizontally
            },
            theme:"grid",
            startY: 50
          });
        });
      }
      if(obj.output && obj.output.length > 0){
        doc.addPage()
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(35);
        doc.text(`المخرجات`, center("المخرجات"), 30);
        doc.autoTable({
          html: `#out${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 13, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 50
        });
   
      }

      if(obj.entries){
   
        doc.addPage()
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(35);
        doc.text(`نظرية التغيير`, center("نظرية التغيير"), 30);
        doc.text(`المدخلات`, center("المدخلات"), 50);
        doc.autoTable({
          html: `#entry${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 13, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 70
        });

        doc.addPage()
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(35);
        doc.text(`نظرية التغيير`, center("نظرية التغيير"), 30);
        doc.text(`الأثر`, center("الأثر"), 50);
     
        doc.autoTable({
          html: `#impact${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 13, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 70
        });

        doc.addPage()
        doc.addImage(border, 'JPEG',0 ,0 ,doc.internal.pageSize.getWidth() ,doc.internal.pageSize.getHeight());
        doc.addImage(`${route}/storage/${sessionStorage.getItem("logo")}`, 'JPEG', 10, 10, 30, 30);
        doc.setFontSize(35);
        doc.text(`نظرية التغيير`, center("نظرية التغيير"), 30);
        doc.text(`النشاطات`, center("النشاطات"), 50);
        doc.autoTable({
          html: `#active${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 13, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 70
        });
  //       obj.activities.forEach((action, index) => {
 
  // });
      }
    
      
    
    });
      
   
     
 
       doc.save("mypddf.pdf");
       setLoader(false)
 
    ;
    
  };


  

  

  return (
    <div className="profile" id='element' >      
    <div className="tit" ref={chartRef} >
      التقرير جاهز يمكنك تحميله الأن
    </div>
      <button className='download'  onClick={exportReport}>تحميل</button>
      <div className="tit" style={{cursor :"pointer"}} onClick={()=>show(false)}>x</div>

      {initiatives.map((item ,index) => (
        <div className="cont">
     {item.plan ?
     <table  style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', display :"none" }} id={`plan${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>البند</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>مدة الانجاز</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>التكلفة</th>

       </tr>
     </thead>
     <tbody>
       {item.plan.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.band}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.achievement_period}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.cost}</td>

         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.target ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , display:"none"}} id={`target${index}`}>
     <thead>
       <tr>
      
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}> المرحلة الثالثه</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>المرحلة الثانيه</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>المرحلة الاولي</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>ارتباط بالاهداف الوطنية</th>
        

       </tr>
     </thead>
     <tbody>
       {item.target.map((item) => (
         <tr key={item.id}>

      
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.stage3}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.stage2}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.stage1}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.national_goal}</td>

         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.target ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , display:"none"}} id={`targetG${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>شرح الهدف</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>الهدف</th>
  
        

       </tr>
     </thead>
     <tbody>
       {item.target.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.grow_goal_desc}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.grow_goal}</td>


         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.jsutifications ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , display:"none"}} id={`just${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>العنوان</th>
 
        

       </tr>
     </thead>
     <tbody>
       {item.jsutifications.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.title}</td>
    

         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.output ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , display:"none"}} id={`out${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>المخرج</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>شرح المخرج</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>طريقه الحساب</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>الهدف رقما</th>
 
        

       </tr>
     </thead>
     <tbody>
       {item.output.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.title}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.desc}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.calc_way}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.target}</td>
    

         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.entries ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , display:"none"}} id={`entry${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>المدخل</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>شرح المدخل</th>
 
        

       </tr>
     </thead>
     <tbody>
       {item.entries.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.entry}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.entry_desc}</td>
    

         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.activities ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', display:"none" }} id={`active${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>النشاط</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>شرح النشاط</th>
 
        

       </tr>
     </thead>
     <tbody>
       {item.activities.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.activity}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.activity_desc}</td>
    

         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.impacts ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', display:"none" }} id={`impact${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>الأثر</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>شرح الأثر</th>
 
        

       </tr>
     </thead>
     <tbody>
       {item.impacts.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.impact}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.impact_desc}</td>
    

         </tr>
       ))}
     </tbody>
   </table>
     :null}
     {item.strategy1 ?
     <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , display:"none"}} id={`strat${index}`}>
     <thead>
       <tr>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>ماذا</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>من</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>كم</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>المساهمه</th>
         <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>المخاطر</th>
 
        

       </tr>
     </thead>
     <tbody>
       {item.strategy1.map((item) => (
         <tr key={item.id}>

           <td style={{ border: '1px solid black', padding: '8px' }}>{item.what}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.who}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.how_much}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.contributes}</td>
           <td style={{ border: '1px solid black', padding: '8px' }}>{item.risks}</td>
    

         </tr>
       ))}
     </tbody>
   </table>
     :null}
  
        </div>
      ))}
    </div>
  );
}



export default Profile





//const Example = () => {
  //   const {route}=useContext(AppContext)
  //   const [fullReport,setFullReport]=useState([])
  
  //   useEffect(()=>{
  //     sessionStorage.setItem("full",false)
  //     fetch(`${route}/answer/getUserAnswersReportTotal/${localStorage.getItem("userId")}`, {
  //       headers: {
  //         Authorization :`Bearer ${localStorage.getItem("token")}`
  //       }
  //     })
  //     .then(res=>res.json())
  //     .then(data=>{
  // console.log(data)
  //       if (data) {
  //         if(!JSON.parse(sessionStorage.getItem("full"))){
  
  //           data.forEach((item) => {
  //             const newOb = {
  //               name: item.key,
  //             " ذاتي قبلي": item.graph.userBefore,
  //               "ذاتي بعدي": item.graph.userAfter,
  //               amt: item.totalDifference.raters,
  //             };
  //             setFullReport((prevFullReport) => [...prevFullReport, newOb]);
  //             sessionStorage.setItem("full",true)
  //           });
          
  //         }
         
  //       }
        
  //     })
  //   },[])
   
  //   return (
  //     <ResponsiveContainer width="90%" height="100%" >
  //       <BarChart
  //         width={200}
  //         height={100}
  //         data={fullReport}
  //         margin={{
  //           top: 5,
  //           right: 30,
  //           left: 20,
  //           bottom: 5,
  //         }}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="name" />
  //         <YAxis  />
  //         <Tooltip />
  //         <Legend />
  //         <Bar dataKey=" ذاتي قبلي" fill="#28BBBC" />
  //         <Bar dataKey="ذاتي بعدي" fill="#ed833e" />
  //       </BarChart>
  
  
  //     </ResponsiveContainer>
  //   );
  // };
  // const ExampleRater = () => {
  //   const {route}=useContext(AppContext)
  //   const [fullReport,setFullReport]=useState([])
  
  //   useEffect(()=>{
  //     sessionStorage.setItem("fulla",false)
  //     fetch(`${route}/answer/getUserAnswersReportTotal/${localStorage.getItem("userId")}`, {
  //       headers: {
  //        Authorization :`Bearer ${localStorage.getItem("token")}`
  //       }
  //     })
  //     .then(res=>res.json())
  //     .then(data=>{
  // console.log(data)
  //       if (data) {
  //         if(!JSON.parse(sessionStorage.getItem("fulla"))){
  
  //           data.forEach((item) => {
  //             const newOb = {
  //               name: item.key,
  //             " أخرين قبلي": item.graph.raterBefore,
  //               "أخرين بعدي": item.graph.raterAfter,
  //               amt: item.totalDifference.raters,
  //             };
  //             setFullReport((prevFullReport) => [...prevFullReport, newOb]);
  //             sessionStorage.setItem("fulla",true)
  //           });
          
  //         }
         
  //       }
        
  //     })
  //   },[])
   
  //   return (
  //     <ResponsiveContainer width="90%" height="100%">
  //       <BarChart
  //         width={200}
  //         height={100}
  //         data={fullReport}
  //         margin={{
  //           top: 5,
  //           right: 30,
  //           left: 20,
  //           bottom: 5,
  //         }}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="name" />
  //         <YAxis  />
  //         <Tooltip />
  //         <Legend />
  //         <Bar dataKey=" أخرين قبلي" fill="#28BBBC" />
  //         <Bar dataKey="أخرين بعدي" fill="#ed833e" />
  //       </BarChart>
  
  
  //     </ResponsiveContainer>
  //   );
  // };
  



  // /////////////////////////////////////////////////////////////////pdf
        // doc.addImage(screen, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    
      // fullReport.forEach((tableData, index) => {
      //   // if (index !== 0) {
      //   //   doc.addPage();
      //   // }
      //   doc.addPage();
      //   // doc.addImage(border, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      //   doc.addImage(logo, 'JPEG' , 10,10,40,15)
      //   doc.setFontSize(20);
      //   doc.setTextColor(232, 234, 237, 1.00);
      //   doc.text(`: ${tableData.key}`, 210, 50);
      //   doc.text(`: ${tableData.key}`, 210, 100);
    
    
      //   doc.autoTable({
      //     html: `#sayed${index}`,
      //     styles: {
      //       font: 'alfont_com_arial-1', // Set the font to the Arabic font
      //       fontSize: 13, // Adjust the font size as needed
      //       valign: 'middle', // Center vertically
      //       halign: 'center', // Center horizontally
      //     },
      //     theme:"grid",
      //     startY: 120
      //   });
      //   doc.autoTable({
      //     html: `#small${index}`,
      //     styles: {
      //       font: 'alfont_com_arial-1', // Set the font to the Arabic font
      //       fontSize: 11, // Adjust the font size as needed
      //       valign: 'middle', // Center vertically
      //       halign: 'center', // Center horizontally
      //     },
      //     theme:"grid",
      //     startY: 60
      //   });
      // });
      
      // doc.addImage(kes, 'JPEG' , 0,0,doc.internal.pageSize.getWidth(),60)
      // doc.autoTable({
      //   html: `#first`,
      //   styles: {
      //     font: 'alfont_com_arial-1', // Set the font to the Arabic font
      //     fontSize: 11, // Adjust the font size as needed
      //     valign: 'middle', // Center vertically
      //     halign: 'center', // Center horizontally
      //   },
      //   theme:"grid",
      //   startY: 100
      // });
      // doc.addPage();
      // doc.addImage(slook, 'JPEG' , 0,10,doc.internal.pageSize.getWidth(),60)
      // doc.autoTable({
      //   html: `#sayed`,
      //   styles: {
      //     font: 'alfont_com_arial-1', // Set the font to the Arabic font
      //     fontSize: 11, // Adjust the font size as needed
      //     valign: 'middle', // Center vertically
      //     halign: 'center', // Center horizontally
      //   },
      //   theme:"grid",
      //   startY: 100
      // });
  
  
  