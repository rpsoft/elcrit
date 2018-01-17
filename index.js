var express = require('express');
var app = express();
// var path = require("path");
var html = require("html");
var request = require("request");
var cheerio = require('cheerio');

// var prevData = require("./data.js");

app.use(express.static(__dirname + '/domainParserviews'));
app.use(express.static(__dirname + '/views'));
app.engine('.html', require('ejs').renderFile);

app.get('/');

var fs = require('fs')

var allTrialCodes = ["NCT01263925","NCT01264939","NCT01270464","NCT01277822","NCT01281787","NCT01284556","NCT01285323","NCT01286935","NCT01287039","NCT01287117","NCT01290874","NCT01291641","NCT01292473","NCT01293097","NCT01294462","NCT01294592","NCT01296412","NCT01300819","NCT01302054","NCT01302067","NCT01302691","NCT01306214","NCT01310673","NCT01313494","NCT01313637","NCT01313676","NCT01315249","NCT01316380","NCT01316887","NCT01316900","NCT01316913","NCT01318070","NCT01318083","NCT01318135","NCT01321255","NCT01323621","NCT01323634","NCT01324362","NCT01327846","NCT01329029","NCT01331837","NCT01335464","NCT01335477","NCT01336023","NCT01336608","NCT01336751","NCT01340768","NCT01342081","NCT01342913","NCT01343004","NCT01345253","NCT01345916","NCT01346865","NCT01347580","NCT01349777","NCT01350804","NCT01353235","NCT01356602","NCT01357642","NCT01358175","NCT01358578","NCT01364220","NCT01365455","NCT01366209","NCT01368081","NCT01368536","NCT01369329","NCT01369342","NCT01369355","NCT01370005","NCT01371058","NCT01371994","NCT01376245","NCT01377012","NCT01381900","NCT01388361","NCT01392326","NCT01392573","NCT01392677","NCT01394952","NCT01395745","NCT01396395","NCT01397890","NCT01408303","NCT01411735","NCT01413958","NCT01415518","NCT01422434","NCT01425359","NCT01425853","NCT01427751","NCT01429844","NCT01430260","NCT01436110","NCT01437540","NCT01437995","NCT01438814","NCT01442038","NCT01443845","NCT01444430","NCT01445951","NCT01451203","NCT01451398","NCT01455129","NCT01455857","NCT01455870","NCT01455896","NCT01456611","NCT01458951","NCT01459367","NCT01459809","NCT01460342","NCT01461369","NCT01462266","NCT01462929","NCT01465152","NCT01465763","NCT01467323","NCT01467401","NCT01470053","NCT01470937","NCT01471340","NCT01472185","NCT01472757","NCT01474369","NCT01474512","NCT01477983","NCT01479530","NCT01483560","NCT01484496","NCT01486940","NCT01488019","NCT01492361","NCT01493531","NCT01493557","NCT01494532","NCT01494987","NCT01498003","NCT01498653","NCT01498679","NCT01498822","NCT01499082","NCT01499095","NCT01499368","NCT01499953","NCT01500278","NCT01502774","NCT01507831","NCT01508936","NCT01510158","NCT01510769","NCT01512004","NCT01512108","NCT01512446","NCT01512979","NCT01513460","NCT01516879","NCT01518855","NCT01519518","NCT01519674","NCT01519791","NCT01520818","NCT01521923","NCT01522521","NCT01523301","NCT01524289","NCT01525290","NCT01525615","NCT01528254","NCT01532648","NCT01538446","NCT01541943","NCT01541956","NCT01543555","NCT01545388","NCT01548001","NCT01555138","NCT01555164","NCT01556997","NCT01558271","NCT01562561","NCT01566604","NCT01568073","NCT01573143","NCT01574651","NCT01576419","NCT01577082","NCT01578850","NCT01583218","NCT01583374","NCT01584232","NCT01590771","NCT01590797","NCT01597245","NCT01599104","NCT01602003","NCT01603082","NCT01604278","NCT01605773","NCT01606007","NCT01610037","NCT01611571","NCT01613326","NCT01615198","NCT01617434","NCT01618162","NCT01618695","NCT01619059","NCT01621178","NCT01623115","NCT01623596","NCT01624259","NCT01627327","NCT01628926","NCT01632163","NCT01633112","NCT01636713","NCT01638000","NCT01644175","NCT01644188","NCT01644500","NCT01646073","NCT01646177","NCT01646255","NCT01646320","NCT01648582","NCT01650129","NCT01652729","NCT01661634","NCT01663402","NCT01664247","NCT01668667","NCT01674647","NCT01676116","NCT01682863","NCT01687283","NCT01691521","NCT01694771","NCT01695239","NCT01696058","NCT01696110","NCT01697696","NCT01703221","NCT01706198","NCT01706211","NCT01706328","NCT01707134","NCT01708603","NCT01708629","NCT01709110","NCT01709305","NCT01709513","NCT01709864","NCT01709903","NCT01710358","NCT01710657","NCT01711359","NCT01712516","NCT01714817","NCT01715298","NCT01717300","NCT01719003","NCT01720290","NCT01720303","NCT01720446","NCT01721044","NCT01721057","NCT01722331","NCT01727141","NCT01729559","NCT01729754","NCT01730534","NCT01732770","NCT01732822","NCT01733758","NCT01734785","NCT01741194","NCT01749904","NCT01749930","NCT01752634","NCT01758198","NCT01758380","NCT01763918","NCT01764997","NCT01767519","NCT01768559","NCT01769378","NCT01772134","NCT01772147","NCT01776424","NCT01777269","NCT01777334","NCT01782326","NCT01785472","NCT01787188","NCT01787396","NCT01792518","NCT01794143","NCT01798706","NCT01808118","NCT01813422","NCT01813435","NCT01817764","NCT01822808","NCT01822899","NCT01838850","NCT01845025","NCT01849289","NCT01850615","NCT01854658","NCT01855789","NCT01860729","NCT01860976","NCT01866163","NCT01869491","NCT01870778","NCT01870804","NCT01876368","NCT01879410","NCT01880216","NCT01885208","NCT01890122","NCT01897532","NCT01899742","NCT01907854","NCT01908140","NCT01908829","NCT01911364","NCT01914757","NCT01916226","NCT01917331","NCT01917656","NCT01921972","NCT01926782","NCT01928628","NCT01928771","NCT01930188","NCT01930682","NCT01937871","NCT01946620","NCT01947491","NCT01949948","NCT01952145","NCT01954121","NCT01955161","NCT01957163","NCT01958671","NCT01959451","NCT01959529","NCT01963208","NCT01964352","NCT01966107","NCT01967550","NCT01969123","NCT01969136","NCT01969708","NCT01970475","NCT01970488","NCT01970878","NCT01973205","NCT01973231","NCT01975246","NCT01976208","NCT01985334","NCT01986855","NCT01986881","NCT01989468","NCT01989754","NCT01991795","NCT01994226","NCT01994720","NCT01999218","NCT02000336","NCT02006641","NCT02006654","NCT02006732","NCT02007720","NCT02008682","NCT02009865","NCT02014467","NCT02017171","NCT02017340","NCT02019472","NCT02022930","NCT02024646","NCT02029495","NCT02033889","NCT02036515","NCT02045862","NCT02049814","NCT02054897","NCT02058147","NCT02058160","NCT02058368","NCT02064439","NCT02064868","NCT02065791","NCT02068443","NCT02072226","NCT02072434","NCT02074982","NCT02079727","NCT02080364","NCT02082769","NCT02085161","NCT02094937","NCT02094963","NCT02100228","NCT02104674","NCT02104804","NCT02104817","NCT02105948","NCT02105961","NCT02105974","NCT02119286","NCT02121613","NCT02128932","NCT02132767","NCT02132936","NCT02138916","NCT02145468","NCT02149199","NCT02151851","NCT02152371","NCT02152605","NCT02155660","NCT02157935","NCT02159053","NCT02164513","NCT02164864","NCT02168842","NCT02172287","NCT02172300","NCT02172378","NCT02172391","NCT02172430","NCT02172443","NCT02172469","NCT02172508","NCT02172573","NCT02172586","NCT02172807","NCT02173457","NCT02173691","NCT02173782","NCT02175355","NCT02176499","NCT02177344","NCT02177357","NCT02177396","NCT02177409","NCT02177435","NCT02177448","NCT02177461","NCT02177500","NCT02178137","NCT02181985","NCT02181998","NCT02182011","NCT02183064","NCT02183129","NCT02183168","NCT02183220","NCT02183701","NCT02194205","NCT02200640","NCT02200653","NCT02203032","NCT02203916","NCT02207231","NCT02207244","NCT02207374","NCT02207491","NCT02207621","NCT02207829","NCT02224157","NCT02227550","NCT02229227","NCT02229383","NCT02229396","NCT02235402","NCT02236611","NCT02240680","NCT02242318","NCT02242812","NCT02243176","NCT02244229","NCT02244255","NCT02245490","NCT02245672","NCT02246920","NCT02254291","NCT02257385","NCT02268214","NCT02269176","NCT02273050","NCT02276222","NCT02281318","NCT02284893","NCT02294227","NCT02294396","NCT02296138","NCT02301975","NCT02305381","NCT02305849","NCT02308163","NCT02311231","NCT02337738","NCT02343458","NCT02343926","NCT02345161","NCT02346240","NCT02347774","NCT02348723","NCT02349295","NCT02352363","NCT02357459","NCT02375724","NCT02376790","NCT02384941","NCT02388724","NCT02390375","NCT02390882","NCT02396732","NCT02413398","NCT02414854","NCT02414958","NCT02416271","NCT02419612","NCT02420262","NCT02421510","NCT02441218","NCT02446912","NCT02446990","NCT02452190","NCT02453685","NCT02454491","NCT02460978","NCT02463071","NCT02463331","NCT02465515","NCT02467452","NCT02467920","NCT02471404","NCT02473198","NCT02477865","NCT02477969","NCT02483169","NCT02489968","NCT02494284","NCT02495324","NCT02498509","NCT02501161","NCT02504268","NCT02526615","NCT02528201","NCT02531035","NCT02532855","NCT02546323","NCT02551575","NCT02551874","NCT02552212","NCT02558374","NCT02561806","NCT02579850","NCT02580591","NCT02585778","NCT02597049","NCT02607306","NCT02607865","NCT02616497","NCT02623062","NCT02629159","NCT02630706","NCT02631551","NCT02648204","NCT02656173","NCT02666664","NCT02672852","NCT02681094","NCT02684357","NCT02684370","NCT02694523","NCT02706951","NCT02709538","NCT02730377","NCT02738151","NCT02738632","NCT02738879","NCT02739984","NCT02746380","NCT02761252","NCT02762578","NCT02777580","NCT02788474","NCT02791490","NCT02796677","NCT02808767","NCT02835534","NCT02836873","NCT02849080","NCT02860624","NCT02863328","NCT02870205","NCT02890173","NCT02906917","NCT02906930","NCT02916602","NCT02937701","NCT02963922","NCT02967211","NCT02967224","NCT03006276","NCT03009019","NCT03015220","NCT03021187","NCT03031834","NCT03049085","NCT03220425"];

var seedURL = "http://ec2-52-89-34-225.us-west-2.compute.amazonaws.com/classify.aspx"

var result = ""

function pausecomp(millis) // The ultimate stop for a few millis script.
{
  var date = new Date();
  var curDate = null;

  do {
    curDate = new Date();
  } while (curDate - date < millis);
}

function printTrialData (trialData, sentences){
    //debugger

    var delim = "<$>"

    for( var d in trialData){
      //debugger
      var row = trialData[d].join("<$>")+"<$>"

      if( sentences[d].length > 0 ){
        for ( var i in sentences[d] ){
          for ( var a in sentences[d][i].trData ){
            var sent = sentences[d][i].trData[a]
            var finalRow = row+sentences[d][i].caption+"<$>"+(sent ? sent.join("<$>") : "" )

            finalRow = finalRow.split(",").join(";")
            finalRow = finalRow.split("<$>").join(",")

            console.log(finalRow)

            fs.appendFile('trialData.csv', finalRow+"\n", function (err) {
              if (err) {
                console.log("failed writing: "+finalRow)
              }
            })


          }
        }
      } else {
    //    debugger
        var finalRow = (row +"<$><$><$><$><$><$><$>").split("<$>").join(",");
        console.log(finalRow);
        fs.appendFile('trialData.csv', finalRow+"\n", function (err) {
          if (err) {
            console.log("failed writing: "+finalRow)
          }
        })

      }


    }
}


async function main() {

  for ( var triid in allTrialCodes ){
    try {

      var trialid = allTrialCodes[triid] //"NCT01923415" //"NCT02242318"

      console.log("Total: "+(parseInt(triid)+1)+"/"+allTrialCodes.length);

      var trialData = await retrieveTrialData(trialid)

      var trialDataSentences = []
      for ( var d in trialData.trialData.dataFromRows ){

        pausecomp(2000);

        var data =  await retrieveSentenceData(trialid,d,
                                                trialData.viewStateValue,
                                                trialData.viewStateGenerator,
                                                trialData.eventValidation)

        var totalData = []
        for ( var da = 0; da < data.length; da++ ){
          totalData.push(data[da])
        }

        trialDataSentences.push(totalData)
        //debugger
        console.log((parseInt(d)+1)+"/"+trialData.trialData.dataFromRows.length)

        trialData.sentences = trialDataSentences
        result = trialData
      }

      trialData.sentences = trialDataSentences
      result = trialData

      printTrialData(result.trialData.dataFromRows,result.sentences)

    } catch (e) {
      console.log(e);
    }
  }

}

main();

async function retrieveTrialData (trialid){


  return new Promise(function (resolve, reject) {

    request.post({url:seedURL, form: {
      ScriptManager1: encodeURI("UpdatePanel1|btnRun"),
      // __EVENTTARGET:encodeURI(""),
      // __EVENTARGUMENT:encodeURI(""),
      __VIEWSTATE:encodeURI("WT8Jp6nsnI1375/OQNu6fXZGCvkiy1W9WA0LLeNmo8wGrbXU1DH8X9zuaQ2UKkZMMAzc7HrEFlkInb+OoR+FxM33ZFkDT4zhE7PUHP83L/hWm4DtlmBbRUW48foafHR9SHTdOCvMd9MJBqEtn5AqDU56kY8DWeuSIjbJgBCx7fRtA1KTt5/yxROGKxCkPVjoJKQpCgLzlogyg17nGdgRYA=="),
      __VIEWSTATEGENERATOR:encodeURI("01FBFEE0"),
      __EVENTVALIDATION:encodeURI("srFIejfZtRJd/IU3MUPfwkujytT+NBI2Hn0bmqo+bjBc5EifpJB/7NbgauUc8O4Yan9sP4BtrhlnOz38cUBqdv5c8AzwLeDtiVB1LB9DlQz06ArpxCKZBScMSn3Jfh2wYSEc6AKb3YBct6tjVJh3aA=="),
      txtTID: encodeURI(trialid),
        __ASYNCPOST:"true&",
      btnRun:encodeURI("Search")}}, function(err,httpResponse,body){
          var $;
          //console.log(httpResponse.body)
          var viewStateValue = ""
          var viewStateGenerator = ""
          var eventValidation = ""

          if ( httpResponse.body ){
            $ = cheerio.load(body);

            viewStateValue = $(body).find("#__VIEWSTATE")[0].attribs.value
            viewStateGenerator = $(body).find("#__VIEWSTATEGENERATOR")[0].attribs.value
            eventValidation = $(body).find("#__EVENTVALIDATION")[0].attribs.value

          }


          resolve({viewStateValue,viewStateGenerator,eventValidation, trialData : processTrialSentencesBody(body)})

       })
    })
}


async function retrieveSentenceData (trialId,sid,viewStateValue,viewStateGenerator,eventValidation){
  return new Promise(function (resolve, reject) {
      //  debugger
         request.post({url:seedURL, form: {
           ScriptManager1: encodeURI("UpdatePanel1|GVResults"),
           __EVENTTARGET:encodeURI("GVResults"),
           __EVENTARGUMENT:encodeURI("ShowNgrams$"+sid),
           __VIEWSTATE:encodeURI(viewStateValue),
           __VIEWSTATEGENERATOR:encodeURI(viewStateGenerator),
           __EVENTVALIDATION:encodeURI(eventValidation),
           txtTID: encodeURI(trialId),
           __ASYNCPOST:"true&"
           }}, function(err,httpResponse,body){
              resolve(processAttributeExtractionBody (body))

            })
          });
}



function processTrialSentencesBody (body){
  var $ = cheerio.load(body);

//  debugger

  var columns = []
  $("th[scope=col]").each(function(i, elem) {
      var col = $(elem).text()
      if( col.indexOf("View Extracted Attributes") < 0 ){
      	columns.push(col);
      }
  });

  var allTableRows = $("#PanGrid").find("tr")
  //var numberOfSentences = allTableRows.length -2 // -2 because the first two rows are dedicated to the tile of the table and the column names.



  var dataFromRows = []
  allTableRows.each ( (i,row) => {
    var rowData = []
    if ( i > 1 ){ //skipping the first two rows.
      $(row).find("td").each( (i,element) => {
        if ( i > 0 )
        rowData.push($(element).text()+"") // "" to force string just in case.
      });

      dataFromRows.push(rowData)
    }

  })
  return {columns, dataFromRows}
}

function processAttributeExtractionBody(body) {

    var $ = cheerio.load(body);
    //  console.log(body)
    //  result = body

      var returnData = {}

      var tables = $("#LabTables").children().map( (i,v) => {
        if ( v.name == "table" ) { return v }
      });

      var tablesData = tables.map( (i,v) => {
        var caption = $(v).find("caption").text()
        var dataRows = $($(v).children()[1]).find("tr")

        var dataToReturn = {}

        var headers = dataRows.map ( (i,v) => {
                          if ( i < 1 ){ //first row of the tables with the colum names
                            return $(v).find("th[scope=col]").map( (i,v) => {return $(v).text()})
                          }
                        })

        var trData = dataRows.map ( (i,v) => {
                        if ( i > 0 ){ //first row of the tables with the colum names
                          return $(v).find("td").map( (i,v) => {return $(v).text()})
                        }
                      })

       var hds = []
       headers = headers[0]
         for ( var a = 0 ; a < headers.length; a++ ) {
         hds.push(headers[a])
       }
         //  console.log(hds)

       var tdata = []

       for ( var a = 0 ; a < trData.length; a++ ) {
         var inter = []
         for ( var b = 0 ; b < trData[a].length; b++ ) {
           inter.push(trData[a][b])
         }
         tdata.push(inter)
       }
       //console.log(hds)

       dataToReturn.headers = hds
       dataToReturn.trData = tdata
       dataToReturn.caption = caption

        // console.log(trData)
        return dataToReturn
      })

      return tablesData;
}





app.get('/data', function (req, res) {
  try {
//    debugger

    // var resu = []
    // for ( var r = 0; r < result.length; r++ ){
    //     resu.push(result[r])
    // }

    res.send(JSON.stringify(result));
  } catch (ex) {
    console.log(ex);
    res.send("");
  }
});

var portUSed = 3020;
app.listen(portUSed, function () {
  console.log('App is Running on port ' + portUSed + " " + new Date().toISOString());
});
