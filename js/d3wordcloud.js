var wordsInEnglish = 171476;
var wordObj = [
  {
    text: "a",
    size: .08167 * wordsInEnglish
  },{
    text:"b",
    size: .01492 * wordsInEnglish
  },{
    text: 'c',
    size: .02782 * wordsInEnglish
  },{
    text: 'd',
    size: .04253 * wordsInEnglish
  },{
    text: 'e',
    size: .12702 * wordsInEnglish
  },{
    text: 'f',
    size: .02228 * wordsInEnglish
  },{
    text: 'g',
    size: .02015 * wordsInEnglish
  },{
    text: 'h',
    size: .06094 * wordsInEnglish
  },{
    text: 'i',
    size: .06966 * wordsInEnglish
  },{
    text: 'j',
    size: .00153 * wordsInEnglish
  },{
    text: 'k',
    size: .00772 * wordsInEnglish
  },{
    text: 'l',
    size: .04025 * wordsInEnglish
  },{
    text: 'm',
    size: .02406 * wordsInEnglish
  },{
    text: 'n',
    size: .06749 * wordsInEnglish
  },{
    text: 'o',
    size: .07507 * wordsInEnglish
  },{
    text: 'p',
    size: .01292 * wordsInEnglish
  },{
    text: 'q',
    size: .00095 * wordsInEnglish
  },{
    text: 'r',
    size: .05987 * wordsInEnglish
  },{
    text: 's',
    size: .06327 * wordsInEnglish
  },{
    text: 't',
    size: .09056 * wordsInEnglish
  },{
    text: 'u',
    size: .02758 * wordsInEnglish
  },{
    text: 'v',
    size: .00978 * wordsInEnglish
  },{
    text: 'w',
    size: .02361 * wordsInEnglish
  },{
    text: 'x',
    size: .00150 * wordsInEnglish
  },{
    text: 'y',
    size: .01974 * wordsInEnglish
  },{
    text: 'z',
    size: .00074 * wordsInEnglish
  }];



var fill = d3.scale.category20();

var layout = d3.layout.cloud()
    .size([$(window).width(), $(window).height()])
    // .words(wordObj)
    .words(wordObj.map(function(d) {
      // console.log(d);
      return {text: d.text, size: (d.size)/50};
    }))
    .rotate(function() { return Math.floor(Math.random() * (25 - (-25) + 1)) + (-25); })
    .font("Impact")
    .fontSize(function(d) { return d.size; })

    .on("end", draw);

layout.start();

function draw(words) {
  d3.select("body").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) {
        if (d.size < 20) {
          d.size = d.size*3;
          return d.size * 3 + 'px';
        }
        return d.size + "px";
      })
      .style("font-family", "Bree Serif, serif")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; })
      .on("mouseenter", function(d){
        d3.select(this)
          .style("cursor", "pointer")
          .style("font-size", function() {
            return d.size * 1.5;
            }
          )
      })
      .on('mouseleave', function(d) {
        d3.select(this)
          .style("font-size", function() {
            if (d.size < 20) {
              d.size = d.size*3;
              return d.size * 3 + 'px';
            }
            return d.size + "px";
          })
      });
}

$("text").on("mouseenter", function(){
  var letterSize = $(this).css("font-size");
  var letterCount = letterSize.slice(0,letterSize.length - 2);
  var $letter= '<h3>' + $(this).html().toUpperCase() + '</h3>';
  $(".box").html("Number of " + $letter +letterCount*50);

});
