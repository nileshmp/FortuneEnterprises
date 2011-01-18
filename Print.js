var Print =
{
    CreatePrintReceipt: function()
    {
	$('div#print-invoice').clone().dialog({ buttons: { "Ok": function() { $(this).dialog("close"); } } });
    },

    CreatePrintPage: function()
    {
	var disp_setting = "toolbar=no,location=no,directories=no,menubar=no,scrollbars=no"; 

	content = Print.GeneratePrintContent().html();

	var docprint=window.open("","",disp_setting); 

	docprint.document.open(); 
	docprint.document.write('<html><head><title>Fortune Enterprises</title>'); 
	// docprint.document.write('</head><body onLoad="self.print()"><center>');          
	docprint.document.write('</head><body><center>');          
	docprint.document.write(content);          
	docprint.document.write('</center><br/><font size="2" face="Arial">This invoice is computer generated.</</body></html>'); 
	docprint.document.close(); 
	docprint.focus(); 

    },

    ReplaceTextFields: function(body)
    {
	body.find(':text').each(function(){
	    textVal = $(this).val();
	    td = $(this).parent();
	    td.text(textVal);
	    $(this).remove();
	});
    },

    GeneratePrintContent: function()
    {
	clonedBody = $('body').clone();
	Print.ReplaceTextFields(clonedBody);
	Print.RemoveNonPrintableContents(clonedBody);
	return clonedBody;
    }, 

    RemoveNonPrintableContents: function(element)
    {
	element.find('.non-printable').remove();
    }

    
}
