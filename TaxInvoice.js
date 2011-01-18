var delay = 300;

$(document).ready(function() {
    TaxInvoice.addRow();

    $(':button[id=add]').bind('click', function(event) {
	TaxInvoice.addRow();
	focusOnRow();
	
    });
    
    $(':button[id=delete]').bind('click', function(event) {
	TaxInvoice.deleteRow();
	focusOnRow();
    });
    
    setCurrentDate();
    
    $('#percentage').bind('keypress', function(eve) {
	applyPercentageToAllRows(eve);
    });

    $('#address').autocomplete(null, {matchContains: true}, JSON.parse(outlets, getOutletId), setAddress);
    $('#address').focus();

    $('#percentage').autocomplete(null, {matchContains: true}, percentages, focusOnRow);

    $('#Print').bind('click', function(event){
	Print.CreatePrintReceipt();
    });

    bindToAddRowShortCut(jQuery(document));
    bindToDeleteRowShortCut(jQuery(document));
			 
});

function bindToAddRowShortCut(element)
{
    element.bind('keydown', '/', function (evt){
	TaxInvoice.addRow();
	focusOnRow();
	evt.stopPropagation( );  
	evt.preventDefault( );
	return false;
    });
}

function bindToDeleteRowShortCut(element)
{
    element.bind('keydown', 'ctrl+/', function (evt){
	TaxInvoice.deleteRow();
	focusOnRow();
	evt.stopPropagation( );  
	evt.preventDefault( );
	return false;
    });
}

function focusOnRow()
{
    $('#invoice > tbody:last').find('#select_products').focus();
}

function getOutletId(outlet)
{
    return outlet.id;
}

function setAddress(event)
{
    addressField = $(event.currentTarget);
    outletId = addressField.val();
    $("#set-address").text("Buyer Name and Address:  " + getAddress(outletId));
    $('#percentage').focus();
}

function getAddress(id)
{
    for(i=0; i<outlets.length; i++) {
	if(outlets[i].id == id)
	{
	    return outlets[i].desc;
	}
    }
}

function setCurrentDate()
{
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    date = ( day+ "/" + month + "/" + year)
    $('#date').empty().append("Date : " + date);
}

function populate(event)
{
    goodsDesc = $(event.currentTarget);
    TaxInvoice.populateRowData(goodsDesc);
    row = goodsDesc.parent().parent();
    billedTextBox = $(row).find ('#billed');
    shippedTextBox = $(row).find ('#shipped');
    billedTextBox.focus();
    billedTextBox.bind('keypress', function(eve) {
	copyValueWithDelay(billedTextBox, shippedTextBox, eve);
    });
}

function copyValueWithDelay(from, to, eve)
{
    setTimeout(function()
	       {
		   to.val(from.val());
		   TaxInvoice.rowTotal(eve);
		   TaxInvoice.grantTotal();
		   TaxInvoice.calculateVATOnGrandTotal();
		   TaxInvoice.grandTotal();
		   TaxInvoice.calculateRoundOffAndAssign();
		   TaxInvoice.stringifyAmount();
	       }, delay);
}

function applyPercentageToAllRows(event)
{
    setTimeout(function()
	       {
		   percentageTextBox = $(event.currentTarget);
		   percentageValue = percentageTextBox.val();
		   $('#invoice tr').each(function (index, row){
		       if(index > 0)
		       {
			   mrp = $(row).find ('td:eq(1)');
			   mrpValue = parseInt($(mrp).text());
			   rateValue = TaxInvoice.priceAfterDeductingPercentageAndVAT( percentageValue, mrpValue );
			   rate = $(row).find ('td:eq(4)');
			   $(rate).text(rateValue);
			   billedPcs = $(row).find('td:eq(2) input').val();
			   total = $(row).find ('td:eq(6)');
			   $(total).text(rateValue * billedPcs);
			   TaxInvoice.grantTotal();
			   TaxInvoice.calculateVATOnGrandTotal();
			   TaxInvoice.grandTotal();
			   TaxInvoice.calculateRoundOffAndAssign();
			   TaxInvoice.stringifyAmount();
		       }
		   });			
	       }, 500);
}

function parseProductNames(perfumesRow)
{
    return perfumesRow.desc;
}
var TaxInvoice = 
    {
	addRow: function()
	{
	    index = 0;
	    $('#invoice > tbody:last').append('<tr align="middle" valign="bottom">' +
					      '<td width="15%">' + TaxInvoice.createTextField() + '</td>' +
					      '<td width="10%">0</td>' +
					      '<td width="15%"><input id="billed" type="text" /></td>' +
					      '<td width="10%"><input id="shipped" type="text" /></td>' +
					      '<td width="10%">0</td>' +
					      '<td width="10%">Pcs</td>' +
					      '<td width="10%">0.00</td>' +
					      '</tr>' );
	    $('input[id=select_products]').autocomplete(null, {matchContains: true}, JSON.parse(JSON.merge(perfumes, giftsets, deos), parseProductNames), populate);
	    bindToAddRowShortCut($(':text'));
	    bindToDeleteRowShortCut($(':text'));

	},

	deleteRow: function(index)
	{
	    $('#invoice tr:last').remove();

	},


	createTextField: function(value)
	{
	    return '<input size="50" type="text" id="select_products" value="" autocomplete="off" class="ac_input" />';
	},

	populateRowData: function(selectedTextBox)
	{
	    desc  = selectedTextBox.val();
	    id = Utils.validateValue(TaxInvoice.getId(desc));
	    var selectedRow = selectedTextBox.parent().parent();//$('#invoice tr:last');
	    $('td:eq(1), td:eq(4)', selectedRow).each(function(index) {
		if(index == 0)
		{
		    var mrp = Utils.validateValue(TaxInvoice.getMRP(id));
		    $(this).text(mrp);
		}
		if(index == 1)
		{
		    var mrp = Utils.validateValue(TaxInvoice.getMRP(id));
		    var percentage = parseInt($('#percentage').val());
		    var rate = TaxInvoice.priceAfterDeductingPercentageAndVAT( percentage, mrp );
		    $(this).text(rate);
		}
	    });
	},
	
	getId: function(desc)
	{
	    var allProducts = JSON.merged();
	    for(i=0; i<allProducts.length; i++) {
		if(allProducts[i].desc == desc)
		{
		    return allProducts[i].id;
		}
	    }
	},

	getMRP: function(id)
	{
	    for(i=0; i<productPrices.length; i++) {
		if(productPrices[i].id == id)
		{
		    return productPrices[i].mrp;
		}
	    }
	},

	getPrice: function(id)
	{
	    for(i=0; i<productPrices.length; i++) {
		if(productPrices[i].id == id)
		{
		    return productPrices[i].rate;
		}
	    }
	},

	rowTotal: function(event)
	{
	    var input = event.target;
	    var billedPcs = $(input).val();
	    var tr = $(input).parent().parent();
	    var rate = $('td:eq(4)', tr).text();
	    var total = rate * billedPcs;
	    //round the number to 2 decimal precision
	    total = total.toFixed(2);
	    $('td:eq(6)', tr).text(total);
	},

	grantTotal: function()
	{
	    var total = parseFloat(0);
	    $('#invoice tr').each(function (index, domele){
		if(index > 0)
		{
		    total += parseFloat($('td:eq(6)', domele).text());
		}
	    });
	    total = total.toFixed(2);
	    $('#total tr:first td:last').text(total);
	},

	calculateVATOnGrandTotal: function()
	{
	    var grandTotal = parseFloat($('#total tr:first td:last').text());
	    var vat = (13.5 * grandTotal) / 100;
	    vat = vat.toFixed(2);
	    $('#total tr:eq(1) td:last').text(vat);
	},

	calculateRoundOffAndAssign: function()
	{
	    var grandTotal = TaxInvoice.addTotalAndVat();
	    var roundedValue = Math.round(grandTotal);
	    roundedValue = (roundedValue-grandTotal).toFixed(2);
	    if(roundedValue > 0)
		roundedValue = "+" + roundedValue 
	    $('#total tr:eq(2) td:last').text(roundedValue);
	},

	grandTotal: function()
	{
	    var grandTotal = TaxInvoice.addTotalAndVat();
	    $('#total tr:eq(3) td:last').text(Math.round(grandTotal));
	},

	addTotalAndVat: function()
	{
	    var total = parseFloat($('#total tr:first td:last').text());
	    var vat = parseFloat($('#total tr:eq(1) td:last').text());
	    var grandTotal = total + vat;
	    grandTotal = grandTotal.toFixed(2);
	    return grandTotal;
	},

	getDate: function()
	{
	    var currentTime = new Date()
	    var month = currentTime.getMonth() + 1
	    var day = currentTime.getDate()
	    var year = currentTime.getFullYear()
	    return (month + "/" + day + "/" + year)
	},

	stringifyAmount: function()
	{
	    var text = "Total Amount Chargeable (in words) : Rs. "
	    var grandTotal = Math.round(TaxInvoice.addTotalAndVat());
	    grandTotal = text + NumberUtils.convertToWords(grandTotal);
	    var td = $('#total tr:last td:last');
	    $('font:first-child', td).text(grandTotal);
	},
	
	priceAfterDeductingPercentageAndVAT: function(percentage, mrp)
	{
	    valueToDeduct = (mrp*percentage) /100;
	    valueToDeduct = mrp - valueToDeduct;
	    var VATAmount = 1.135;
	    valueToDeduct = (valueToDeduct/VATAmount);	
	    return (valueToDeduct).toFixed(2);
	}
    }