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

var allProducts = [];

var seedURL = "http://ec2-52-89-34-225.us-west-2.compute.amazonaws.com/classify.aspx"

var result = ""

async function main() {
  try {
    // http(seedURL, function (error, resp, body) {
    //   var productIds = [];
    //   var $;
    //
    //   if (resp && 'request' in resp) {
    //
    //     // $ = cheerio.load(body);
    //      console.log(body);
    //
    //     //
    //     //
    //     // var toReturn = { "pids": productIds, "nextUrl": $("#pagnNextLink").attr("href") };
    //
    //     // Resolve(toReturn);
    //   } else {
    //     Reject("boom");
    //   }
    // });
    console.log(encodeURI("UpdatePanel1|btnRun") )

    var viewStateValue = ""
    var viewStateGenerator = ""
    var eventValidation = ""

    request.post({url:seedURL, form: {
      ScriptManager1: encodeURI("UpdatePanel1|btnRun"),
      // __EVENTTARGET:encodeURI(""),
      // __EVENTARGUMENT:encodeURI(""),
      __VIEWSTATE:encodeURI("WT8Jp6nsnI1375/OQNu6fXZGCvkiy1W9WA0LLeNmo8wGrbXU1DH8X9zuaQ2UKkZMMAzc7HrEFlkInb+OoR+FxM33ZFkDT4zhE7PUHP83L/hWm4DtlmBbRUW48foafHR9SHTdOCvMd9MJBqEtn5AqDU56kY8DWeuSIjbJgBCx7fRtA1KTt5/yxROGKxCkPVjoJKQpCgLzlogyg17nGdgRYA=="),
      __VIEWSTATEGENERATOR:encodeURI("01FBFEE0"),
      __EVENTVALIDATION:encodeURI("srFIejfZtRJd/IU3MUPfwkujytT+NBI2Hn0bmqo+bjBc5EifpJB/7NbgauUc8O4Yan9sP4BtrhlnOz38cUBqdv5c8AzwLeDtiVB1LB9DlQz06ArpxCKZBScMSn3Jfh2wYSEc6AKb3YBct6tjVJh3aA=="),
      txtTID: encodeURI("NCT01923415;NCT00774852;NCT00035308"),
        __ASYNCPOST:"true&",
      btnRun:encodeURI("Search")}}, function(err,httpResponse,body){
          var $;
          console.log(httpResponse.body)

          if ( httpResponse.body ){
            $ = cheerio.load(body);

            viewStateValue = $(body).find("#__VIEWSTATE")[0].attribs.value
            viewStateGenerator = $(body).find("#__VIEWSTATEGENERATOR")[0].attribs.value
            eventValidation = $(body).find("#__EVENTVALIDATION")[0].attribs.value

          }

          result = body
       })

       var viewStateValue = ""
       var viewStateGenerator = ""
       var eventValidation = ""


       request.post({url:seedURL, form: {
         ScriptManager1: encodeURI("UpdatePanel1|GVResults"),
         __EVENTTARGET:encodeURI("GVResults"),
         __EVENTARGUMENT:encodeURI("ShowNgrams$0"),
         __VIEWSTATE:encodeURI("lnrSc28/Ysng1kB0FwFPUrBN+1BRXnc1XKSPlZlGv3Vu7sNJ7HV96Qw2a3yC576nrhgoT6a5ZeILf5mVegHTpqOXdyT52zT+nG303Bqz+4ttmTudT5t36M8/8x8ziAFlRbAlU3vSQyojA+ozgMz+mc2Tbn64g7cVpYIF9sPgXAneHUWFbyVHPvclQOfsoyqrRAsUYU+b4bCHdWlegujGqs/alv4L4BBuJT6fwitEGV2R21oya3Wcsazluv7f83/zvlxwrLi5bRcMfJyP+hSifsp961mGKYqedhcKYFL03DhF7nh+2rx0ceReLyptu9Zu3aHcFFPIA3coyRqfF3BTpmE1vBTjKJle/tEq5/mHlV5vbONIrT9PNdtJJA06r1nqBTYjPQP3NDaTHHQq41y9JuntlSwEeGwejb1J+lKm7zc8YaAr9qVdGHrkeR57nZfZ4vYjEdnZ0oLfn8nUjme8+zIoTdHFMqWUEZkAD6wsC+7OzhT7mGKf2H3INO6eIiqXORqFXGIoXh5Ch6PsC9FjYiJeEPy9P+C7POCItbVN8Z8iqCzFyFA3oD4xsr1MAFBjH1ncwxaobLjJ+Rjmx2QyS/SrG0hw6Tf9ys3SSq87fLQqW7Xkhglj3+Y+pbd6l98dB4u1xERv+WiXzNQaWrMaI6ORU4f2W73qvMDEkGir2nUUv6LYn6YBwZVTT/olr4cF4WfOCUAWU4rlNTqV+3gvIbZex1f8rB7wO9//C+NZ9aPURQEMnWy2roTgqB7RcnSs8b+vZ4+S0tv5fvX50oyT5GKr541o0RK56Z4fq+j1Ww9Nd+bRexyTSopojdQcJ1DTy2rekBh69dvJojLBt4uDgcRYXpqtxn8038twK7FgmB7m+qV0pKNZC+KFt+08KyWH035QK6UzXF1sNO58keajsHSaW8tIGxhXzOeTazrARDaMs75FMQpTvTeIzYSjOvIHNs4eupJchbQvbczl0Les578bFzKL8fP5spj1+JOBvFq7ZGkaVvHSZ5BC0Ozx6kuWrpGW+MBtAfEbmilStK22LYvMfNDT6K7Fu/7TpVrNjMDeiidO2R4GNkPbv2FfnhQQKEDN2BcX7DTanIxgeM7KjuCb4beJuby0Q0G1CoLUYXxvkGkGViBlZWwtUlKrnLJytIkFbB/ugy9BP1Pi814A16XH9119Ybm5Bs2AdiCm+ZnbeWpw19ACG5xARqsdBLMy555/9qfRDKeS3kF9+13ihfzBIM5UktqKPESgMwbPM9fLPXjXK9FvHpsnu65Lo8splZMila9uLP8eKRwK/pNLz+5PR9AIlQiyCpuRaUuPkRlpRB2BYW5ruhCmYdEYHPLc6hHd/nJtI1L0LBCvdKulIJTqpk9WMzDBCM3atgY0j2QTmyUPOVcV/pqY0Q/YdqPVNq9XUWt/ZKFxjxAVxtOqGMn+A4tvCdW5UmuQ6ezZigbePHjb4xuMqNsVLpA0A1SpwmRQBUC0TehKGErXIGdX7A3auDMGbWhqJcKhwRO8GOaXsLGJaYgYUig2FZI4xGNeywg2C2o01baIOH3nJJAorgIrz8LSIdHWoVUbuB0bmNBEcHjqUynmRLV9BBxs5WZc5OrglXdTK8qzPrp4iQEEnIxkbNgXEpRe1gOFcWgHqMHGU3+IESjcSosY/JIUUIqR3JDwEdTl4WWqBRYPmTruntjHJOIZXeXYLpkNJA2Ag1uWb+mljJXDaDVEx+89J8WI5kn6LCJJNnhN15OqL5F8IZ3/jjXdnvtkiK72e1crGRL43i/wpaMYa6Bnbg9JxATrBP1OoZERIs3Q0ZsbquZPyWHD/A+mnP7EXPmSmAk+IT+VUpOddAqc9WZGh/Jvg6e3YQ3oTr8UBGMEoXhWqDJRuRkIIvxRXoExiVt9x6v+k/27R3rA3W7zdoKmj3wBjCq2ttTBaQnpqn/Ni6UNoY4eNgf7tzf7NWqUUfdLGa+w0nFzRP3TxXn0mT3EnoDkF+ASzDHsoIZ1p8Z4e0ER2TmqLxWsRU/Rl3VIPDJ9iShuWfOYd7T8Sv0v7PRcQMHq2DLRoQ629kAI0eSZrkBxgMZ7b6ULpxLABuC4+0JAzj6QXn/cg4pZVh334dgnpsp5H7Qlj4cw/ZosEIB7zWNN6bBxfOzROP6jfEfcyBOHydvxN+qcRlekFwrKnusYKy1NcLIJNlVp7bqmR2PTkYmzZWQQLgykFFfCQe8oDVAgADixmxSIhqlGT0Wxo9BEhiDbPMVF+1M9Q56BYDmGRdIr30VV4kO0pMkRThw2LblFSEoDptEPUbzu4BzfPtI/IqQ4ljr8QiAUKeld4mZJDBT98ARysVCX4s6fdQrVTcE923XILDBJfLksYnRmDvaIKGk2qShDej32zr4ugsxfLO5SAF+s5V0en4uTMwL9AHBDbENvk5dRtjZJuUXmWGe+tWWTR3dpNpQxTfsPB8yBaXiAyf1ign4cgGVlcMBG4oX+lYo5GybcmYKesFgpXZFtkTTcB+wdglFi8P3XU7xo6I4ltB/w3GzbWiTEl3fIse8cHHfOU4J2qTidxc2XxI6GUeAtowhMRndZjSQJ1IqQ0lZMvc30PXpkiuQhi95LiedAuShYcw8Vql54rOfZ/+V0UUv6s5H9JmxVVYfWam5pHAemVzVOV3mmoVojsCv4pEr9Db7SmfAvWB7BUAssis4PZy3CXh3u5uA1tsH+xqOGqL0ij2lW45brIa0L+D9a/7oOkSnJl67yqvi9SP7DK04vIMLfstkxTH7FEKUJxOC8rGbd+JzOJVTkiIYTqy2O3zIkomTDi6tXbvOZG5iCIlPIwlEaODO1LQtzfRqV4J+8VgVqnUrWXFH611YwY+fiGJK9rFXRHYdPHHG8auuYSbw8ZROU4o20I+3+p4VvjPRoNwucGryxv5Ah3ltv3dAcx/n6OFKLIjdcQAEqDNjVLN2v+rkaX8qcqXRD4RBAG7x5F4kgJ4kXRLEa9tni2gjgK2i6eu7INHCvm/E2swNhlBb2Dkp/NaKSLFmVi3I06Uk/cbH8GwyQvssOVvqA0m9WamNzVhbqTMSQIA/YhAXJh2H7pFCe0Vlv/4n7iOpoeAzOHWU1khvLDyXsvkWO+/ec1TbUKFtCNjDP9fdeVnBXeGIlJSVFvbH8GHh+DdsjVy9P2qlU04qKOjoSwUkSEi7GXR6OXU88sJ6LGTKPa4nskWPDe5ivKkJ6ZOfKWpu0/Uzc25HrNR2z5xu/wsJx8QjjvG+ZJ+cpdRIwboIiGdBuZHSL3h8REu3FShWngm/JCxzPC92His4P5ZKXL7F2WrpAX5ES05SnxULu49xpToFdAWSJfAzrPaei76Daao+ROmAEDk8Lxziekrf7T1AXZaDOITiuuWf/mqp+mbJsHwqO+WSPlpestzz/HbXx9RFsRhxAJ0fNzeg1rE/eyzzJNcCYaiRvDM88zPNOrdCYdyMJaazGh2UN7yiRUcOwAuMfevHXatl8mVhnpMXSJ+7vSM2WTt08jdqYc36VVZnCoapbB9uCT+KOlpc9UH+vdRTICaFImIy3eS/UlbxUVcBrEv5IuFSfKUgQTGRNRFimkIZqxpz8FybAiyEuSIdr1cFZyPqA1lxYLapiVKJ55AOj4f4KvBCZrgXXCKtTNKsK/SKCF7RJt5QzUeaINyIDz4XPq6qnoyPb8U5Bjbm2iYLN9ggpBP5ic5ZRLu1GsugyIT1DXnxE8A+5xayatevMF1LuQGOcFfGAPmf1/ElcPJllfc0ZsLLcITZ3jOcW2BdR+H8m8pA5A3kSEnAHLzwyjaNrO4hovilCN/QQT7bw7HdAwGigyCJJVx0duzKZMz+5dAo0pL6tFHmAj0gHX8DgibvKBDYyn8xNB5SSES9KA0Ssm82jydBq3aUEvtOf1owk2qQ+pg69+ejDalMz+oVtArxwtisCcRlRkUWkWUhVQnp0IQ6CI/mcxoY84nFOUW21LK3Jt8ltygPNQJzIfiGBXNnGk40SMVaWzGWbmLa/KYPhfpn2/2mg0jqflxQiPrCEzejaXbR7UvySI3FB+hTZxgpim/vVz0WzO76yiNzFvwc0kuBhnH8/RzMbJzqTQVzbBH/eO7yhdKiharwvXvVgHzfiXeNFZxjJQuVqa1AwPWat298kdlpIMDlRfOcap5dhzhAg3ac8wEB4JSLbAnx/xVJV9hbkD+JXgLkzWxPxJWsDHTCuYOzlbib4WH0wFAT9Haz74aAQkJW+FKx/p3QiP2K1DOQIozKQKsgGdX/HqXUYmJkMm8+FND7pdtQWxirpy4dC5O4/epVfnnMJFsTwaB8uS/Klw+YbTSIGop8t3H48d0Le4VCNd++N1KbqzU0/z5PkkUGBT9BnCZX43RiNmTZYA8eC5pWfVofpMWYInEp8fqvoewz4Zsup47UOoZ23e1dOMPbsKcsEmNUPXDqeasvOForggnN5nKT6tbMi7uZrM0Bqdxf8aYJxy/+CCZMBU956ZfVe1ErzoAnH9l0jhaD03hW2f2mToTyzNW9ntNDFHY2gZwAxh/+uINlsaWaRk9zj0mwQb+u3drRIOOrmC6V/kC9NmNftDPjz7Vy91phDvBSkPMq99eYI5CrsdJVUwljofstnOBOdBUtVqTnIeD6hfHEexrJ8fTPTS42y4w14Ow+xTJJVvpr4R03TdGrGtdPeBRu3C5fYnavuz9B7CB35Ka3ftqPtHXxKOJnMBNdJKt0ap9J/mykGcBI3DF4FUzH/gJeJjGUOlByoG+GxC5/me0yl4mrV8CTnsZvhxvvFWRxZHNV22+AuVFCt4h6QlvLDoMsMkaautYn1MfGl+xaSdCv77QLF37FkXzA3K3keFMsnkvaeYyVn+rQrt7fqrpjFRlGngwNek4eYEgFnmfm3tnF+Z6a+bMJ+E8XjPYnajB03XL859+MZZ+l1/WOJF/QWkGqEqsVLn0tKWx5tGVRYDBLx0UrpcspAd0gwbGGvxDCN7aXrE0x5UkZ8qx1tTOHHG4PIMBQFCjEkJBK9GumxEJ4W9flvTj5C6/GA61UxLPXBx21+/NKQmqhh8FdjHqaf9z0LjLaxyBGBbpj9f0GdRDWYIMzj9GUx7YFOgUyFAG8SQO/W1g8z9HdJSZDX1CdayUPmNxJiD0XlPi0w5bLWvETFqnt3H6fn9W+yYk3TqnQSbcwixYm3oMDKcHbRV+H/+LPIRFzQIfnAmKjlC6WT5Z4YVwheDm5jd8sjHhbyD772ifpT0PJXxmYA6ECe7VRcutfzf5KLVn+r5mqnIEESqXXApdXbusiCLEtVYXDsQ48IQBQqjgMJqdX3jFZpuQdp7OWPMad+UEkOQrVWKf8dphMkPvrqKQwbK/R46AOZz8fGRv4PAJ66e7JjE0FuHNoiHG0BWznYDDwoQUqUmWAZ6SvYCohsmjWk7GgPDFY8N1SHAVs8jFoLHX5Agl5IakWKPo/yBO+6D45bwXXPtuCGhmcqA8Q8XxP3HfS/63cF/CfXwYDWMH+N3J4qTR2diUJjOGZEhFHoRWYD5NnGglffw65V5VyrLdLyBDO/tyc8aKXYA96jgJsJVElGVLD18i5TstxQGcVSB6qV4SBGtu7ThLkOcpBL09mhAcThChDjenyBTorR+3ZHoTnNqlLXkQ07jypTPcVEjcNHBcjY1FTMfGFsKJor0B9/2rq26aVYjy6bHtD+0tAiU9xm8AhPmqIwfwoG73DHSP+XyU+baySPCRt8NIGrgv7xKoWRzVl8Qwcmz2UCHLQIenRl/BxhmbuECQXN2xG0Pn9GQDc7bFnUZzBJxgDydSLiZtZnqN7vdUk4WilzHCddRNEMkScyJTnvU9a3LKJyPncrCahXgW9mQrJ/OPTgMkk+f7zMDcszjlypIwGlWe6dlSQH7JK0g7yNP36ZI1X5SzuNdm8ATVmTdnlRqjF3rOrqByGTEBFQ2hJplvsLiJd6AaRn7y46AlfQwtddheKuzu4v1vzhbgKR2z8/J4UpOVVQIR544HTv77YffqV9zaP9mnHkFGiLg/XdBP40gzEE0pxBMdulM0U60RKas2/jV9mvJCu3mFneAeAPaBTWiCugdju+SI6WHPrfq6VF304O7ykl2LT2CHPeP8xkDZwfRF4xtQ6/Ue+pqxw2rAnpfNM+yXFHX/cRzWqahMYTypXWnR2g2nDPs5015wF3Q8BdsqK4cOT2r6Nka7JkbMZuMGJA2BpS/7Q/4164P43n3OS8I4+SwUFuj5neexbkFNqRw80EQ+dnzNGQKSpZ+Yj8LBqXYF3iCNoGHcmXyMNadeuD97yWLRJTE5kSyMGqEyZSKiEGeALPsYiPrQoTidSzgAK9Ecfn6JaTgFunwc6/b9ePq8Zk1zq6FXbHx60l9HQ3J4OL4Mq7wBIES9KMt1j0/Oqo+sk4GqGV2K6GhIugh3W9fXZ2nvnu/IDztQBKDbiptLQNu3i76P0hwgy+LJ1m/hzHoh+XM1OTQK7TI/3DZulGQCgr/lNHfYQtQ8OzXhpTfSSig3kc3+a+U3hndnFijqCvcUwfzT3VlTjv58xF7+dnKhdjQe5tfdv8qGjFnDyXuzwXCvbYxAiHJlTg/SnBu11tjPN0dsu9X7a3cObaDeJrGpw9Jrk+CMJhynUz94RfqUFMVtxyQl40A9DsVAaSPdONgDa5loVODFLMddQs4kx57SVTW/ERha8jRAnM2HW3PKjSwxVXlfLtR3ZgDXy/MuWK/okH22Es+vRVTamrt/+De2JOtQ1gi2rrNrQTNyj+Z6tIUL5D88E+nbYx/97e5btxD4VjG1VjtuLPHtycdvSCeM+MxHFmclT2rMvGBOEep6PE/DWEBt0qGbibUoSG3FoCrspTIxRPXNlTItNQIfxGrsPP5bdYy6l6Y3FwcOcYtBVZUfHf6WEkc4Mbpk7x9Tefhu7Teey7UbALywBzdVPwt4DaxaVyh5SHNWv/EINmM+Y5+4EBng8gR+zs5gWrJRWiKQh55SdwtCBnhbm1VyXDHV/Eu0nrZYBws1RE9QF5qwSU5xQw8SWtVCq92h+qvfY9NbK/KFxQSTxiOmMz28RMcgBr1tHIMVAUJYfGTlsBTIvvURC1bsegXgZVRIgZ8zMxrpt7pUY4T2CKrEp+QanjdaHAAGnflPOE2nX0crrinQU4r0pCFTmZgxYMfKYLUtCYDxh80pQTjI5JK2YTPXgpJ66vdMTenOG5joi8EtV2I2fqqLlLW+O7/a0Ta7L7v61hqKvZUSwIncFPuCCFF3bOgGSlppsSEh77ZPDT+s5WS2qp9uYFXRUv/74ETy7VWy0qF+PlphD04u9U1swSxAs6p4dbZmijQyViaZb6tEXAXBYKQDU+CJ3HXEcdXcZ7dp1rbtiAAVwSQiXy0RjEXi4S5yAQgRYuNrjfUt6hPqippwtRj0H7LNgztGpaZrw+QIDH0r8Bb5pmY6OoX2KfxTGT8H0R4qVaOcKyDmTr8fEZ3PFTlOkM9fFEju5yTtQsR9z0Al74otZBuAFJLCMj/I48n+5r2OcVNIGCW0qDYiAfprI1F0k2fT90I+TShnEZIsPZpqN0qptSX/gjmrtcTT6TlhT2B9NvJMxQ5PUWWeCWcyI0kYEjSoD7SOP7e9EUkaqQtOMz64V48cxJJQYTYqRuE/V30J6t2iiWaj13n+OthBar34guECVvHpwMSeIBmX/eF/eKisZ9g0bAYLe7nY7sGzZiwO0L9/35Bx25KqPVvqHycvlIWCJ/TVwvcQ2GMbxXBQzOPqDpSHUe7x20y2STCDjm7EnUxaVTIqABxOfMwgdi3XbqIQDq5yCRqFVHRU37CDV3W3Y7RnZnd5tqfhZQBhDUpmFPkDcBcfHhxsKokT0uIzZANEePdmHEWb7e2xdsn/UQ2xjbYNQYKKzESV2ugWc4BZ7yg4k7jwLyRorF57kkt6oR5ss0q4/tBFkGC+sWUma9SykezJkUSSUSigOgKtJtIEzzbNPbrl9IDnDIh8CpPn0ZU8T/b1bELsWUegbIW1SstZJiDTAUdnJ1UJUnjoHROmE7pj7eYon11Mcb3O1EY1mWRYIdjqtdNzJfPHeI9aDsPn1pp+l4OzoBMoSMhqDWZXlpUzh14TNOhDdyP/xOdY6s/Z+4eE/Y3dQK/hoK+0I="),
         __VIEWSTATEGENERATOR:encodeURI("01FBFEE0"),
         __EVENTVALIDATION:encodeURI("Lfriax/MESrAqh8+md08WYpZzf6Dv1SFNQUiuGY+7ZE0HJpHNeTd8XVpBBh8YrY1/L0kzY11GaP1VVtuKH0qHiFC6uWqwvR1BR32DeUnO1k1Xylqugu9xSrZvejb6/TrD7UTwTpBV1bo6gEXBS+9Eg6gZGLkVa2lpeHugYR+sKwOAnKpK5GcxnBfZO1k7SiLetJcScZIS6ro49hHNJQpN2BQNNrfH02dZLlDPAMNuGVQrumqFy/6Yu58mLXSsX1yflX3ir35NRrqKQqDRRs2WYI+iDDWYPMAY49QjxnaMAryazy134TsdSuMPveVGukmDDlMuCzD8BHZ8ac2pCP1oHR6Z4DG05RiPOd7o9iKr5JNMgM8jSgc1/AfqK4iuR/QJbYwWBtSN4wlmu0msJOEqlhk1MmkJhKbO3dFOr4w4IcxkrKY8zbqoMp4AijpVVDtfpgZ7EsIYSQo2isyizfCVjIptlK6O3ez6eePdgiKueUJ/ewu88C56eM5xlZ17ISrzOCFm/rcXy15B3NM37mUa5Z5G/MIWGdFHcpxUNIdJTZTxHBCmVOExKMzd9ibWpQXAx7hr/an9y+UxcL3bUZLzLnwlnoUpG4Fr3y5hOxcpoGNt07Sm3Gg8ddsVF0eYHITmdUbNdlWnd8Av75SutAz7aWEa2asf32aIH45cvRVHz6MEo6xTdtk7OjF4XXYSO7ngHa7Rof7bFCp9HzqHGMqGl7FcMPRPfOlGWHdLXO0REXTcs23Zed7F8X8jPktVvba"),
         txtTID: encodeURI("NCT01923415;NCT00774852;NCT00035308"),
         __ASYNCPOST:"true&"
         }}, function(err,httpResponse,body){
           $ = cheerio.load(body);
             console.log(body)
             result = body

             $(result).find("tbody").children()[2].children[3].children[0].data

             $(result).find("tbody").children().map( (i,v) => {

                    var data = v.children.map( (i,v) => {

                     var d = i.children.map( (i,v) => {
                       return i.data
                     })

                     return d[0]

                   })

                   console.log(data)
                   debugger
             })



          })


//        ScriptManager1:UpdatePanel1|GVResults
// //txtTID:NCT01923415; NCT00774852; NCT00035308
// __EVENTTARGET:GVResults
// __EVENTARGUMENT:ShowNgrams$0


  } catch (e) {
    console.log(e);
  }
}

main();

app.get('/data', function (req, res) {
  try {
    res.send(result);
  } catch (ex) {
    console.log(ex);
    res.send("");
  }
});

var portUSed = 3020;
app.listen(portUSed, function () {
  console.log('App is Running on port ' + portUSed + " " + new Date().toISOString());
});
