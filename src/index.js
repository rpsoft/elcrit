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

var allTrialCodes = ["NCT02761252", "NCT02513160", "NCT02452190", "NCT02414854",
"NCT02301975", "NCT02294279", "NCT02281318", "NCT02245672", "NCT02224157",
"NCT02182479", "NCT02175771", "NCT02149199", "NCT02141854", "NCT02139644",
"NCT02104674", "NCT02094937", "NCT01976208", "NCT01928771", "NCT01914757",
"NCT01868061", "NCT01867125", "NCT01845025", "NCT01706198", "NCT01698320",
"NCT01691521", "NCT01687283", "NCT01577082", "NCT01508936", "NCT01498679",
"NCT01498653", "NCT01472757", "NCT01471340", "NCT01444430", "NCT01437995",
"NCT01436110", "NCT01357642", "NCT01345916", "NCT01324362", "NCT01316380",
"NCT01290874", "NCT01287039", "NCT01285323", "NCT01270464", "NCT01218009",
"NCT01202903", "NCT01181895", "NCT01172821", "NCT01172808", "NCT01167010",
"NCT01159912", "NCT01147848", "NCT01134042", "NCT01118312", "NCT01086384",
"NCT01079130", "NCT00950794", "NCT00920543", "NCT00911547", "NCT00901368",
"NCT00862394", "NCT00861926", "NCT00849095", "NCT00839800", "NCT00776984",
"NCT00772538", "NCT00734318", "NCT00702325", "NCT00667407", "NCT00652392",
"NCT00652002", "NCT00651651", "NCT00649025", "NCT00646594", "NCT00642187",
"NCT00641914", "NCT00635505", "NCT00628758", "NCT00545324", "NCT00536731",
"NCT00529529", "NCT00521599", "NCT00497237", "NCT00486343", "NCT00479739",
"NCT00476268", "NCT00463866", "NCT00452348", "NCT00452699", "NCT00419952",
"NCT00419757", "NCT00404547", "NCT00401596", "NCT00394199", "NCT00393952",
"NCT00393991", "NCT00385593", "NCT00383552", "NCT00383240", "NCT00381485",
"NCT00382889", "NCT00379288", "NCT00326053", "NCT00314574", "NCT00296530",
"NCT00296491", "NCT00290264", "NCT00273026", "NCT00264849", "NCT00259792",
"NCT00259766", "NCT00254956", "NCT00252824", "NCT00252863", "NCT00252785",
"NCT00242775", "NCT00242411", "NCT00242307", "NCT00238784", "NCT00232050",
"NCT00174733", "NCT00174720", "NCT00163436", "NCT00163423", "NCT00163527",
"NCT00163475", "NCT00163358", "NCT00163319", "NCT00148408", "NCT00140946",
"NCT00092144", "NCT00109668", "NCT00102765", "NCT00102882", "NCT00096954",
"NCT00092885", "NCT00092989", "NCT00076076", "NCT00073827", "NCT00073177",
"NCT00064389", "NCT00046748", "NCT00045955", "NCT02031640", "NCT01475721",
"NCT01165138", "NCT01018186"]


// allTrialCodes = ["NCT00133198","NCT00274547","NCT00168857","NCT00274560","NCT00274599","NCT00168844"]

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
          console.log(httpResponse.body)

          debugger

          var viewStateValue = ""
          var viewStateGenerator = ""
          var eventValidation = ""

          if ( httpResponse.body ){
            $ = cheerio.load(body);
            debugger
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

  console.log(body)

  debugger

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
      console.log(body)
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
