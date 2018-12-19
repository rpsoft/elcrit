"use strict";

var data = require('../dvdplayers_uk.json');

var lines = require('fs').readFileSync("../dataoutoutuk_saved.txt", 'utf-8').split('\n').filter(Boolean);

var lines2 = require('fs').readFileSync("../datauk_dates_raters.csv", 'utf-8').split('\n').filter(Boolean);

var additionalData = {};
var otherAdditionalData = {};

for (l in lines) {
  var itemcode = lines[l].split(",")[0];
  additionalData[itemcode] = lines[l];
}

for (l in lines2) {
  var itemcode = lines2[l].split(",")[0];
  otherAdditionalData[itemcode] = lines2[l];
}

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
          offs.push({
            price: price,
            cond: cond,
            amount: amount
          }); //  console.log(JSON.stringify(offs))
        }

        var min = {};
        var max = {};

        if (offs.length > 0) {
          var min = offs.reduce(function (a, b, i, arr) {
            return a.amount < b.amount ? a : b;
          }); // console.log(min)

          var max = offs.reduce(function (a, b, i, arr) {
            return a.amount > b.amount ? a : b;
          }); // console.log(max)
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
console.log("ASIN,cheapestUsed,cheapestCondition1,cheapestCondition2,sellerStarRating,percentPositive,ASIN,earliestReviewDate,latestReviewDate,ratersNumber,ASIN,SalesRank," + iAttsNames.join(",") + "," + oSumNames.join(",") + "," + osNames.join(",") + "s_number,min_condition,min_price,max_condition,max_price");

for (var i = 0; i < data.length; i++) {
  var itemLine = "";
  var item = data[i][0];
  itemLine = itemLine + item.ASIN[0] + ",";
  itemLine = itemLine + item["SalesRank"] + ",";
  var iAtts = item.ItemAttributes[0];
  var oSum = item.OfferSummary[0];
  var os = item.Offers[0];
  itemLine = itemLine + prepareNode(iAtts, iAttsNames);
  itemLine = itemLine + prepareNode(oSum, oSumNames);
  itemLine = itemLine + prepareNode(os, osNames);
  var o = item.Offers[0].Offer;
  console.log(additionalData[item.ASIN[0]] + ',' + otherAdditionalData[item.ASIN[0]] + "," + itemLine);
}