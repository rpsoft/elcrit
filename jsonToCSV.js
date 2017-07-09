var data = require('../dvdplayers_uk.json');

String.prototype.replaceAll = function (target, replacement) {
  return this.split(target).join(replacement);
};

function prepareNode(node, attList) {
  var itemLine = "";
  for (var e in attList) {

    var line = "";
    switch (attList[e]) {
      case "LowestNewPrice":
        var n = node[attList[e]];
        line = n ? n[0]["FormattedPrice"][0] : "";
        break;
      case "Offer":
        var offers = node[attList[e]];

        var offs = [];

        for (var o in offers) {
          var offer = offers[o];
          var cond = offer["OfferAttributes"][0]["Condition"][0];
          var price = offer["OfferListing"][0]["Price"][0]["FormattedPrice"][0];
          var amount = offer["OfferListing"][0]["Price"][0]["Amount"][0];
          offs.push({ price, cond, amount });

          //  console.log(JSON.stringify(offs))
        }
        var min = {};
        var max = {};
        if (offs.length > 0) {
          var min = offs.reduce(function (a, b, i, arr) {
            return a.amount < b.amount ? a : b;
          });
          // console.log(min)
          var max = offs.reduce(function (a, b, i, arr) {
            return a.amount > b.amount ? a : b;
          });
          // console.log(max)
        }

        line = offs.length + "," + min.cond + "," + min.price + "," + max.cond + "," + max.price;
        break;

      default:
        line = node[attList[e]] + "";
        line = line.replaceAll(",", ";");
    }

    itemLine = itemLine + line + ",";
  }
  return itemLine;
}

var iAttsNames = ["Binding", "Brand", "Color", "Feature", "Label", "ListPrice", "Manufacturer", "Model", "MPN", "PackageDimensions", "PackageQuantity", "PartNumber", "ProductGroup", "ProductTypeName", "Publisher", "Size", "Studio", "Title"];
var oSumNames = ["LowestNewPrice", "TotalNew", "TotalUsed", "TotalCollectible", "TotalRefurbished"];
var osNames = ["TotalOffers", "TotalOfferPages", "MoreOffersUrl", "Offer"];

console.log("ASIN," + iAttsNames.join(",") + "," + oSumNames.join(",") + "," + osNames.join(",") + "s_number,min_condition,min_price,max_condition,max_price");

for (var i = 0; i < data.length; i++) {
  var itemLine = "";
  var item = data[i][0];

  itemLine = itemLine + item.ASIN[0] + ",";

  var iAtts = item.ItemAttributes[0];
  var oSum = item.OfferSummary[0];
  var os = item.Offers[0];

  itemLine = itemLine + prepareNode(iAtts, iAttsNames);
  itemLine = itemLine + prepareNode(oSum, oSumNames);
  itemLine = itemLine + prepareNode(os, osNames);

  var o = item.Offers[0].Offer;

  ///  itemLine = itemLine + JSON.stringify(o ? o[0] : "")  +","
  // itemLine = itemLine + item.ItemAttributes[0].Model  +","

  console.log(itemLine);
}
//# sourceMappingURL=jsonToCSV.js.map
