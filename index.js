// Starting Variables
var name = "Sahil Shah";
var member_id = "12345678";

PDFDocument = require('pdfkit');
var fs=require('fs');
var moment = require('moment');

// Create a document
doc = new PDFDocument

// Pipe its output somewhere, like to a file or HTTP response
doc.pipe(fs.createWriteStream('temp/'+name.replace(/\s/g, '')+'_'+moment().format('MMDDYYYY')+'_'+moment().unix()+'.pdf'));
// doc.pipe(fs.createWriteStream('temp/'+'fileName.pdf'));

doc.font('fonts/Helvetica_Regular.ttf')
   .fontSize(17)
   .text('Fax to: (888) 901-8878', 50, 50)

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('images/shp.png', 420, 15, {
   fit: [100, 900],
   align: 'right',
});

doc.moveDown(4);
// doc.moveDown();
doc.fontSize(15);
doc.text('Superior HealthPlan', {
	  width: 500,
	  align: 'center',
    lineGap:5
	});

doc.text('DME Preferred Provider Opt-Out Form', {
  width: 500,
  align: 'center' });

doc.moveDown(3);
doc.fontSize(10);

width = doc.widthOfString(name)
height = doc.currentLineHeight() ;

doc.text('I, ',{continued:true ,lineGap:5,align:'justify'});

doc.text(" "+name+" ",{continued:true,underline:true});

var line1=" would like to opt out of the Superior HealthPlan Durable Medical Equipment(DME)"+
	" Preferred Provider program. I would like ";
var line2 = " (Name of DME company) to Provide the DME items that are being requested on my behalf. I understand that"+
  "medical supplies ordered from non-preferred DME Provider will require prior"+
  "authorization based on a review for medical necessity."
//
doc.text(line1,
  {continued:true,underline:false});

doc.text(' Allied Medical ',{continued:true,underline:true});

doc.text(line2,
  {underline:false});

doc.moveDown(3);

lineWidth="___________________________";

//get position of line
var pointerY=doc.y;
doc.text(lineWidth);
//filling signamture
doc.y=pointerY-1;
doc.font('fonts/Signerica_Thin.ttf')
doc.text(name, {
	width: doc.widthOfString(lineWidth),
	height: doc.currentLineHeight(),
	align: 'justify'
});
doc.font('fonts/Helvetica_Regular.ttf');
doc.text(lineWidth,405,pointerY);
//filling Date
doc.text(moment().format('MM/DD/YYYY'),405,pointerY-1);


doc.moveDown(0.4);
pointerY=doc.y;
doc.text('Member Signature',50,doc.y);
doc.text('Date',405,pointerY);

doc.moveDown(1.5);
pointerY=doc.y;
doc.text(lineWidth,50,doc.y);
//add printed Name

doc.text(name,50, pointerY-1,
  { width:doc.widthOfString(lineWidth),
  	height: doc.currentLineHeight(),
    ellipsis:true
  });
doc.moveDown(0.4);
doc.text('Member Printed Name');

doc.moveDown(1.5);
pointerY=doc.y;
doc.text(lineWidth,50,doc.y);
//member id
doc.text(member_id,50, pointerY,
  { width:doc.widthOfString(lineWidth),
  	height: doc.currentLineHeight()
  });
doc.moveDown(0.4);
doc.text('Superior Member ID Number');

doc.moveDown(3);
doc.font('fonts/OpenSans-Italic.ttf');
var pa3="This form is valid for one year from the date of Signature. Member may submit an opt-"+
			"out from annually if they would like to  continue to opt-out of the DME Preferred Provider program.";
doc.text(pa3 , {align:'justify'});

doc.moveDown();
var pa4="NOTE TO PROVIDER: Please submit this form to Superior HealthPlan with your request for"+
			"prior authorization.";
doc.text(pa4, {align:'justify'})



// Finalize PDF file
doc.end()
