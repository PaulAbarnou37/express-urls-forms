// Setup
// -----------------------------------------------------------------------------
const express = require("express");


const app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");



// Routes
// -----------------------------------------------------------------------------
app.get("/", (request, response, next) => {
  response.render("home-page.hbs");
});

// /dp/B01MS6MO77
app.get("/dp/:productId", (request, response, next) => {
  // const productId = request.params.productId;
  const { productId } = request.params;

  response.locals.myProductId = productId;
  response.render("amazon-product.hbs");
});

// /en/courses/web-development-bootcamp
// /en/courses/ux-ui-design-bootcamp
app.get("/:lang/courses/:courseName", (request, response, next) => {
  const { lang, courseName } = request.params;
  let title;

  if (lang === "fr") {
    title = "Rejoignez la prochaine génération de créateurs du digital";
  }
  else if (lang === "de") {
    title = "Wir schaffen die nächste Generation von digitalen Kreativen"
  }
  else {
    title = "Preparing the next generation of digital creators";
  }

  response.locals.myTitle = title;
  response.render("ironhack-course.hbs");
});

// /watch?v=BCQHnlnPusY
app.get("/watch", (request, response, next) => {
  const { v } = request.query;

  response.locals.videoId = v;
  response.render("video-page.hbs");
});

// /results?search_query=pizza
app.get("/results", (request, response, next) => {
  const { search_query } = request.query;
  let icon;

  if (search_query === "pizza") {
    icon = "🍕";
  }
  else if (search_query === "burger") {
    icon = "🍔";
  }
  else {
    icon = "🏄‍♀️";
  }
  response.locals.emoji = icon;
  response.render("search-results.hbs");
});



app.listen(3000, () => {
  console.log("We are ready to go! 🤼‍♂️");
});
