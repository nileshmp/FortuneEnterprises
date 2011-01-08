var productPrices = [
		{"id" : "130",	"mrp"  : 130, "rate" : 85.90},
		{"id" : "160",	"mrp"  : 160, "rate" : 105.73},
		{"id" : "200",	"mrp"  : 200, "rate" : 132.16},
		{"id" : "250",	"mrp"  : 250, "rate" : 165.20},
		{"id" : "600",	"mrp"  : 600, "rate" : 422.91},
		{"id" : "700",	"mrp"  : 700, "rate" : 493.39},
		{"id" : "800",	"mrp"  : 800, "rate" : 528.63},
		{"id" : "1000",	"mrp"  : 1000, "rate" : 660.79},
		{"id" : "1200",	"mrp"  : 1200, "rate" : 792.95},
		{"id" : "1500",	"mrp"  : 1500, "rate" : 991.19},
		{"id" : "1750",	"mrp"  : 1750, "rate" : 991.19},
		{"id" : "1800",	"mrp"  : 1800, "rate" : 1189.43},
		{"id" : "2000",	"mrp"  : 2000, "rate" : 1321.59}
	];
	
var perfumes = [
		{"id": 1000, "desc":"Afaaq Conc Perfume"},
		{"id": 1000, "desc":"Carbon Eau De Perfume"},
		{"id": 1500, "desc":"Chemystery Eau De Perfume"},
		{"id": 1000, "desc":"Distraction Eau De Perfume"},
		{"id": 1800, "desc":"Entice Eau De Perfume"},
		{"id": 800, "desc":"Ignite Eau De Perfume"},
		{"id": 2000, "desc":"Illusion Eau De Perfume 60ml"},
		{"id": 1500, "desc":"Khawatri Conc Perfume"},
		{"id": 1000, "desc":"Mesmarize Eau De Perfume"},	
		{"id": 1000, "desc":"Neutron Eau De Perfume"},
		{"id": 1000, "desc":"Rain Drop Eau De Perfume"},
		{"id": 1200, "desc":"Ravish Eau De Perfume"},
		{"id": 2000, "desc":"Rika Eau De Perfume"},
		{"id": 1000, "desc":"Sacred Love Eau De Perfume"},
		{"id": 1500, "desc":"Sacrifice For Her Eau De Perfume"},
		{"id": 2000, "desc":"Shadow For Her Eau De Perfume"},
		{"id": 2000, "desc":"Shadow For Him Eau De Perfume"},
		{"id": 1000, "desc":"Titanium Eau De Perfume"},
		{"id": 2000, "desc":"Utopia Eau De Perfume"},
		{"id": 1000, "desc":"Vision Eau De Perfume"},
		// other company
		{"id": 700, "desc":"Diva Pour Femme"},
		{"id": 700, "desc":"Elements Pour Femme"},
		{"id": 700, "desc":"Frozen Pour Homme"},
		{"id": 600, "desc":"Happiness Pour Femme"},
		{"id": 600, "desc":"I Dream Pour Femme"},
		{"id": 600, "desc":"I Dream Pour Homme"},
		{"id": 600, "desc":"Saga Pour Homme"},
		{"id": 700, "desc":"Sterra Pour Femme"},
		{"id": 600, "desc":"Wild Silk Pour Femme"}
	]
	
var giftsets = [
		{"id": 1200, "desc":"Carbon Gift Set"},
		{"id": 1750, "desc":"Chemystery Gift Set"},
		{"id": 1200, "desc":"Sacred Love Gift Set"}
	];
	
var deos = [
		{"id": 200, "desc":"Carbon Pour Homme Deo"},
		{"id": 130, "desc":"Cherished Dreame Pour Femme Deo"},
		{"id": 250, "desc":"Chemystery Pour Homme Deo"},
		{"id": 200, "desc":"Distraction Pour Femme Deo"},
		{"id": 130, "desc":"Ebony Pour Homme Deo"},
		{"id": 160, "desc":"Expedition Pour Homme Deo"},
		{"id": 130, "desc":"Gala Pour Femme Deo"},
		{"id": 130, "desc":"Happiness Pour Femme Deo"},
		{"id": 160, "desc":"Ignite Pour Femme Deo"},
		{"id": 130, "desc":"Ivory Pour Femme Deo"},
		{"id": 130, "desc":"Lue Me Pour Femme Deo"},
		{"id": 200, "desc":"Mesmarize Pour Femme Deo"},
		{"id": 200, "desc":"Ravish Pour Femme Deo"},
		{"id": 130, "desc":"Simplicity Pour Homme Deo"},
		{"id": 200, "desc":"Sacred Love Pour Femme Deo"},
		{"id": 250, "desc":"Sacrifice For Her Deo"},
		{"id": 250, "desc":"Sacrifice For Him Deo"},
		{"id": 200, "desc":"Titanium Pour Homme Deo"},
		{"id": 130, "desc":"Trance Pour Homme Deo"},
		{"id": 130, "desc":"Trance Pour Femme Deo"},
		{"id": 130, "desc":"Urban Pour Homme Deo"},
		{"id": 200, "desc":"Vision Pour Homme Deo"}
	];


//=========================JSON Utility methods========================================

var JSON = 
{
	parse: function(perfumes, parseProductNames)
	{
		var productDesc = [];
		for(var i in perfumes) {
			productDesc[i] = parseProductNames(perfumes[i]);
		}
		return productDesc;
	},
	merge: function()
	{
		json = [];
		for (i=0; i<arguments.length;i++) {
			var jsonobj = arguments[i];
			for(var j in jsonobj)
			{
				json.push({id: jsonobj[j].id, desc: jsonobj[j].desc});
			}
		}
		return json;
	},
	merged: function()
	{
		return JSON.merge(perfumes, giftsets, deos);
	}
}