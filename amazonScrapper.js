var url = require('url');
var http = require("request");
var cheerio = require('cheerio');
var Promise = require('es6-promise').Promise;
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: "AKIAI7UIBW6PANJASE6A",
  awsSecret: "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",
  awsTag: "datagatherer"
});

var domain = "co.uk";

function pausecomp(millis) // The ultimate stop for a few millis script.
{
  var date = new Date();
  var curDate = null;

  do {
    curDate = new Date();
  } while (curDate - date < millis);
}

exports.getProductIDS = async function (seedURL) {
  console.log(seedURL);
  return new Promise(function (Resolve, Reject) {
    try {

      http(seedURL, function (error, resp, body) {
        var productIds = [];
        var $;

        if (resp && 'request' in resp) {

          $ = cheerio.load(body);
          //  console.log(body);

          $(".s-result-item").each(function (i, elem) {

            var rating = $(this).find(".a-icon-alt").text().replace("Prime", "");
            rating = parseFloat(rating.substring(0, rating.indexOf(" ")));
            var numberRaters = parseInt($(this).find(".s-item-container").children(":last-child").children(":last-child").text().replace(",", ""));

            //console.log(rating+" -- "+numberRaters);

            productIds.push({ "productId": $(this).attr("data-asin"), "starRating": rating, "numberRaters": numberRaters });
          });

          var toReturn = { "pids": productIds, "nextUrl": $("#pagnNextLink").attr("href") };

          Resolve(toReturn);
        } else {
          Reject("boom");
        }
      });
    } catch (e) {
      console.log(e);
      Reject(e);
    }
  });
};

exports.getLowestUsedPriceData = async function (productID) {
  return new Promise(function (Resolve, Reject) {
    try {

      http("https://www.amazon." + domain + "/gp/offer-listing/" + productID + "/ref=dp_olp_used?ie=UTF8&condition=used", async function (error, resp, body) {

        var $;

        if (resp && 'request' in resp) {

          $ = cheerio.load(body);

          if ($("body").find(".olpOfferPrice")) {

            var cheapestUsed = $("body").find(".olpOfferPrice").first().text().trim();
            var cheapestCondition1 = $("body").find(".olpCondition").first().text().trim().replace("\n                - ", ",").split(",")[0];
            var cheapestCondition2 = $("body").find(".olpCondition").first().text().trim().replace("\n                - ", ",").split(",")[1];
            var sellerStarRating = $("body").find(".olpSellerColumn").first().find("p:nth-child(2)").find("i:nth-child(1)").text().trim();
            var percentPositive = $("body").find(".olpSellerColumn").first().find("p:nth-child(2)").find("a:nth-child(2)").text();

            Resolve({ "cheapestUsed": cheapestUsed,
              "cheapestCondition1": cheapestCondition1,
              "cheapestCondition2": cheapestCondition2,
              "sellerStarRating": sellerStarRating,
              "percentPositive": percentPositive
            });
          }
        }
      });
    } catch (e) {
      console.log(e);
      Reject(e);
    }
  });
};

exports.getProductReviewDates = async function (productID) {

  return new Promise(function (Resolve, Reject) {
    try {

      http("https://www.amazon." + domain + "/product-reviews/" + productID + "?sortBy=recent", async function (error, resp, body) {
        //console.log("https://www.amazon."+domain+"/product-reviews/"+productID+"?sortBy=recent")
        var $;

        if (resp && 'request' in resp) {

          $ = cheerio.load(body);
          //console.log(body);

          var maxPage = $(".a-last").prev().text();
          //  console.log("maxPage: "+maxPage);


          var latestReviewDate = $(".review-date").first().text();

          //console.log(latestReviewDate)

          var numberRaters = $(".totalReviewCount").first().text();

          var firstReview;
          if (maxPage) {
            pausecomp(1000);
            firstReview = await getProductEarliestReviewDate(productID, maxPage);
          } else {
            firstReview = $(".review-date").last().text();
          }

          //  console.log(latestReviewDate + " --- "+ firstReview);
          latestReviewDate = latestReviewDate.replace("on ", "");
          firstReview = firstReview.replace("on ", "");

          var toReturn = { "latestReviewDate": latestReviewDate, "firstReviewDate": firstReview, "numberRaters": numberRaters };
          //console("esto return: "+toReturn);
          Resolve(toReturn);
        } else {
          Reject("boom");
        }
      });
    } catch (e) {
      console.log(e);
      Reject(e);
    }
  });
};

async function getProductEarliestReviewDate(productID, maxPage) {

  return new Promise(function (Resolve, Reject) {
    try {

      http("https://www.amazon." + domain + "/product-reviews/" + productID + "?sortBy=recent&pageNumber=" + parseInt(maxPage), function (error, resp, body) {

        var $;

        if (resp && 'request' in resp) {

          $ = cheerio.load(body);

          var firstReview = $(".review-date").last().text();
          //console.log("Earliest review: "+ firstReview);

          Resolve(firstReview);
        } else {
          Reject("boom");
        }
      });
    } catch (e) {
      console.log(e);
      Reject(e);
    }
  });
}

exports.getDataForProduct = async function (pid) {
  return new Promise(function (Resolve, Reject) {

    client.itemLookup({
      //searchIndex: 'Electronics',
      ItemId: pid,
      responseGroup: 'ItemAttributes,Offers,Reviews,SalesRank'
      //ItemPage: page
    }).then(function (results) {
      //console.log(JSON.stringify(results));
      Resolve(results);
    }).catch(function (err) {
      Reject(null);
      console.log(JSON.stringify(err));
    });
  });
};
//# sourceMappingURL=amazonScrapper.js.map
