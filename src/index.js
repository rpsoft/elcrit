var express = require('express');
var app = express();
var path = require("path");
var html = require("html");

var sync = require('synchronize');

var Promise = require('es6-promise').Promise;

var amazon = require('amazon-product-api');

var amsc = require("./amazonScrapper.js")

var prevData = require("./data.js")

app.use(express.static(__dirname + '/domainParserviews'));

app.use(express.static(__dirname + '/views'));

app.engine('.html', require('ejs').renderFile);

var fs = require('fs');


app.get('/')

var allProducts = [];


function pausecomp(millis) // The ultimate stop for a few millis script.
{
  millis = millis+(2000*Math.random());
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
}

async function main(){


  // var data = await amsc.getProductIDS("https://www.amazon.co.uk/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=dvd+players");
  //
  // allProducts = allProducts.concat(data["pids"]);
  // console.log(data["pids"]);
  //
  //
  // while ( data.nextUrl != undefined){
  //     pausecomp(1500);
  //     console.log("wait so it is not suspicious");
  //     data = await amsc.getProductIDS("https://www.amazon.co.uk"+data.nextUrl);
  //     allProducts = allProducts.concat(data.pids);
  //     console.log("docs: "+allProducts.length);
  //     console.log("docs: "+data.nextUrl);
  // }
  //
  // for ( var p in allProducts){
  //     pausecomp(1000);
  //     console.log(allProducts[p].productId);
  //     var apiData = await amsc.getDataForProduct(allProducts[p].productId);
  //     allProducts[p]["amazonData"] = apiData;
  //     //console.log(JSON.stringify(apiData));
  // }


  try {
  //  var ids = ["B004VXT666","B0082O29D2","B000N17ZHC","B000MRJ4KS","B00004TIZW","B00XTBKYVM","B0002V23ZW","B000CMGUV4","B002BEIYGA","B00006ANXL","B000ARFPFS","B00005AK8U","B0054MO4R4","B00006RVH6","B00015GYT0","B00FEJ4M1K","B0000B12QO","B00QPFJ7G2","B000UJYQ2O","B007PP21DC","B00019FO24","B000I202FI","B000GKTXIE","B0000U5GMM","B000FCSWRQ","B00005B98H","B000GEA3RA","B00L4H0706","B001CS0QP8","B00YQD3ZU4","B00005ML6Q","B000H10W7I","B00005T3YI","B0015IJE7G","B00021O4V8","B000K1TKOQ","B00XWNA7FA"];
    var ids = ["B001AO4LBE","B001CS0QP8","B001GMTIT0","B003ZR4ZDS",
      "B003AM8EOE","B00133NV04","B008HT8FU8","B004PL4IK8","B00A9IXHIA","B007WRPCNO","B0023ALNFG","B0019JLG36","B005AWCOWK","B00C6ZBKX8","B000REWYNK","B00656GEV2","B0087FRRME","B005QWDBI0","B00F8J42X4","B003AX27AA","B00IK4TZOK","B004HCI1LW","B004X63CXE","B00FW2W38I","B0033BW4ES","B00B83LU70","B009YAGNXU","B009MQEU1I","B00FEJ4M1K","B004I1KVYC","B00AGAONZ2","B003SB6RLE","B004AMHA0C","B000YZLBHM","B00519RBMA","B00534AU80","B00361JJ2K","B008VE3CHA","B007BGF0PG","B00TMCF34K","B002WJY42C","B00HYNLLEA","B00MRDZ936","B00DCEOQ5Q","B003ANS2YK","B003AJ7OE8","B007SXDH98","B005CBA12E","B005F5RGBG","B004GFAFF0","B003AVMZ7C","B009D1D5FO","B0028FZPOG","B004MF34S4","B00579OCCG","B0038KNNJY","B009CK9H6W","B0038KTYAQ","B000F4FA0G","B00BG5BT1C","B00004U3BV","B00KQ6A85U","B00JXXXOS0","B0035CPEVU","B00CZCKPJW","B00AZENWTM","B003AJ7ODY","B01AQAS3KW","B00BJ5PIFW","B0009PUVFK","B0065907GC","B00I6HZ3OC","B004PJLNYE","B004LNL6V4","B00FXCC508","B00CMF5G6E","B009B56OXW","B00250EGBC","B001QWVHU8","B003Y814M8","B009W6SA3W","B00X6D1DMC","B00EPPTTIU","B00IH1E7Z8","B00BUL4NM4","B00YUJV12S","B0106GV330","B002SV04HS","B007BGF196","B00A3C2EMW","B00YQD3ZU4","B002WHFMN4","B00FP2Z4OU","B006N70DOM","B002BZZY4Y","B00CUEEP5U","B002SDCQJK","B00P6N9KE8","B004N2IJ0O","B00HBVY93U","B004190R1S","B003VX56MK","B00L1CZZ3I","B014OMTLOA","B00K2B5BK6","B007ERVCF4","B0044A37B6","B004NWDPB2","B00GWAO1IY","B00CSV72UK","B00REORJJK","B0039XU7B2","B004TW62QG","B0053H6JOQ","B000E81FPM","B00EF7ZCWK","B003B4YH38","B00ESDJ592","B00OV7TGE4","B00KGPQQW0","B007R5XEFY","B0038JECKE","B0016G1ABA","B002WJCQ4U","B00JXMFR90","B00858CZF2","B007D5LY6O","B0080H77PQ","B00OBL5OM8","B00JFDXIKM","B00NH4NY1S","B00C86PKT0","B001CF60R4","B005I5LNH6","B0053GUXBC","B0087FQPP4","B004612IWM","B008MWLHY6","B00JE6UIUS","B002ISQAFQ","B002N4G7QW","B00EOV3H4C","B007S71NZO","B00L2JX4DS","B00KLE0E88","B00C8SHXKW","B006KGNUZA","B008PB8Z7G","B00J3VHT3S","B00JJTGK98","B00B8TOFSU","B00KQ5LERM","B00WRCY08M","B000QC94WW","B004CYWVAM","B00DCFZ5P0","B0145QN4F2","B00A71YOQI","B008PB8XN2","B0111AVIJO","B008MWLHX2","B003EX0BVS","B003E4M4WQ","B009RUU4HI","B00SNN6N8O","B00THLNVY0","B005MCX4CW","B00FW7ATEI","B002PU9Z9U","B00FFJ3QUC","B008RAZ8DE","B00TAD0IKA","B00YQ4D15M","B004SBHSZ2","B007KQE1UC","B00KRM1X3Y","B004QIPKNY","B00KC0HVTQ","B007F9XHAY","B015PK4IAW","B00KJ10E60","B00BG2KWTK","B007F9XHBI","B00KM4SDPI","B00P1IE8WM","B009BZW8PK","B00EXR6N84","B00F4H95T6","B014NG27BG","B00J8WW6XA","B00OAKXTPY","B00ODIZ3H0","B00E2TYXGC","B007LNTPS2","B00GO8Q632","B004VXT666","B0082O29D2","B0054MO4R4","B00F67DN38","B00006I5N8","B002W8S2YO","B00E7A0S24","B00115LAW0","B0001P545A","B0080QZ25Y","B016YJYUZ6","B00MU2OZQG","B017EXLCTI","B00OZ57MPW","B00PB0K810","B01BJ6VPVQ","B01BJ6VELW","B00G4REGJE","B00UUDEHNI","B00MX78V18","B000I4FH8S","B014TNDIMU","B00449X3HA","B00BN9CH1M","B00P9GG5A4","B00890H11Y","B008VF6D6G","B007ECGFLU","B003JFKNG4","B00C2LVYKK","B00G6K7RKE","B004QGXX5S","B00PBBUJW2","B00EN1BOE8","B004QGXX62","B00EN1BOE8","B0041XIJX2","B00P1B2MJU","B00HBUV1E6","B005HFHJVQ","B009ZQ7KRG","B009F2GD0A","B00IU2Y3BM","B003BL13WY","B00AJVUCOY","B007FGAWVO","B00XTBKYVM","B00XWNA7FA","B00IIVUH3S","B00E9G496M","B00LMB75SG","B00U1SWNF6","B00GO71GQA","B00KC5ET0K","B00G1PR844","B00IHHG2JQ","B004BVVYCM","B003WBZ7FM","B00CMLITTE","B007LNSF4C","B0085H2O7M","B006OR5IYQ","B007XI1TAW","B018UXEI1A","B00TIRZKG0","B00MY8NKZI","B005WVLOPM","B00KQVEMXE","B0040EIQQC","B00O4GJOQ2","B00FSGUNEE","B0089ZQ3OK","B0017OHFPG","B003Q0XA3K","B00GXFIFN0","B003XTYP38","B00YHYXGZ6","B00TOR5VCC","B009XP191C","B009PDJ5EK","B00H4FKBFS","B00SKA0PB6","B00QJIJ3C8","B0143J32I0","B00MU2M266","B008041AOS","B00VGX0LE0","B00VGX016I","B00MX5N5CK"];



      ids = prevData.data

      for ( var p in ids){
          pausecomp(2000);
        //  console.log(ids[p]["productId"]);
          try {
            //var apiData = await amsc.getDataForProduct(ids[p]["productId"]);
            var dataDate = await amsc.getProductReviewDates(ids[p]["productId"]);
            //console.log(JSON.stringify(dataDate));
            // var outLine = ids[p]["productId"]+
            //           ","+dataDate["cheapestUsed"]+
            //           ","+dataDate["cheapestCondition1"]+
            //           ","+dataDate["cheapestCondition2"]+
            //           ","+dataDate["sellerStarRating"]+
            //           ","+dataDate["percentPositive"];
            // console.log(outLine + " "+p+"/"+ids.length);
            //
            // fs.appendFile('dataoutoutuk.txt', outLine+"\n", function (err) {
            //   if (err) {
            //     console.log("Error writting: "+outLine)
            //   }
            // })



            var dates = ids[p]["productId"]+","+dataDate["latestReviewDate"].replace(",","")+","+dataDate["firstReviewDate"].replace(",","")+","+dataDate["numberRaters"].replace(",","")
            console.log(dates+ " "+p+"/"+ids.length);

            fs.appendFile('datauk_dates_raters.csv', dates+"\n", function (err) {
              if (err) {
                console.log("Error writting: "+outLine)
              }
            })

            //allProducts.push(apiData);
            // console.log("APIDATA "+JSON.stringify(dataDate));
          } catch (e) {
            console.log(e);
            console.log("OH WELL KEEP GOING!");
          }

      }


      //console.log("ALL PRODS " +JSON.stringify(allProducts));
  } catch (e){
    console.log(e);
  }

}


main();






app.get('/data',function(req,res){
  try {
    // var queryObject = urlDataToObject(req._parsedOriginalUrl.query);
    //   //  console.log(JSON.stringify(req._parsedOriginalUrl));
    // var page = queryObject["page"];
    // //client.itemLookup()
    // client.itemLookup({
    //   //searchIndex: 'Electronics',
    //   ItemId:"B007BYLO4E,B01GO72M9O,B007F9XHAY,B00ODDE33U",
    //   responseGroup: 'ItemAttributes,Offers,Reviews,SalesRank',
    //   //ItemPage: page
    // }).then(function(results){
    //   console.log(JSON.stringify(results));
    //   res.send(results);
    // }).catch(function(err){
    //   console.log(JSON.stringify(err));
    // });

    res.send(allProducts);


  } catch( ex){
    console.log(ex);
    res.send("");
  }

});
var portUSed = 3020;
app.listen(portUSed, function () {
  console.log('AmazonScrapper Running on port '+portUSed +""+ new Date().toISOString());
});

var client = amazon.createClient({
  awsId: "AKIAI7UIBW6PANJASE6A",
  awsSecret: "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",
  awsTag: "somethingElse"
});



// client.itemSearch({
//   Brand: 'Sony',
//   searchIndex: 'Electronics',
//   Keywords: 'dvd player',
//   responseGroup: 'ItemAttributes,Offers,Images'
// }).then(function(results){
//   console.log(JSON.stringify(results));
// }).catch(function(err){
//   console.log(JSON.stringify(err));
// });

function urlDataToObject(query){
  var queryObject = {};
  if (query ){
    var queryElements = query.split("&"); //This is the GET variable contents. (Probably POST as well).
    for ( var i in queryElements){
        var element = queryElements[i].split("=");
        var key = decodeURIComponent(element[0]);

        key = key.split("[")[0]; // ugly fix. get variables that contain an array are postfixed by "[]". I didn't know this before I made this function.

        if ( !queryObject[key] ){
              queryObject[key] = [];
        }


        queryObject[key].push(element[1]);
        //queryObject[element[0]] = element[1];
    }

    for ( var i in queryObject ){
         if ( queryObject[i].length === 1){
           var singleVal = queryObject[i][0];
            queryObject[i] = singleVal;
         }
    }

  }
  return queryObject;
}
