//SPINNER OBJECT WITH SHOW AND HIDE FUNCTIONS
var spinner = {
  tempelate: `
    <div class="col-md-12 loading">
      <div class="text-center">
        <h1>Loading Latest Items ...</h1>
        <div class="spinner"></div>
    </div>
  </div>
    `,
  show(div) {
    let target = document.getElementById(div);
    target.insertAdjacentHTML('afterend', this.tempelate);
  },
  hide() {
    $('.loading').html('');
  }
}

//GRAB AND VIEW PORTFOLIO PROJECTS
spinner.show('portfolioHeader');
axios.get('http://yamensharaf.tk/blog/api/get_category_posts/?slug=portfolio').then(function(response) {
  const portfolioDiv = document.getElementById('portfolioDiv');
  let posts = [];
  posts = response.data.posts;
  for (var i = 0; i < posts.length; i++) {
    //GRABBING MAIN ATTRIBUTES
    let title = posts[i].title;
    let text = posts[i].content;
    let image = posts[i].thumbnail_images.medium_large.url;
    //GETTING VALUES OFF CUSTOM FIELDS
    let link = posts[i].custom_fields.link[0];
    let sublink = posts[i].custom_fields.sublink[0];
    let button = posts[i].custom_fields.button[0];
    //CARD TEMPELATE
    let card = `
      <!--Card-->
      <div class="col-md-4 top-buffer">
        <div data-aos="fade-up" class="card">
          <!--Card image-->
          <div class="view overlay hm-white-slight">
            <img src=${image} class="img-fluid" alt="${title}">
            <a target="_blank" href=${link}>
              <div class="mask waves-effect waves-light"></div>
            </a>
          </div>
          <div class="card-block">
            <!--Title-->
            <h4 class="card-title text-center">${title}</h4>
            <p class="card-text">${text}</p>
            <a target="_blank" href=${sublink} class="btn btn-block btn-secondary"><i class="mdi mdi-eye"></i>${button}</a>
          </div>
        </div>
      </div>
      `
    //HIDE SPINNER
    spinner.hide();
    //RENDERING TEMPELATE
    portfolioDiv.insertAdjacentHTML('beforeend', card);
  }
}).catch(function(error) {
  console.log(error);
});

// LOAD AND INSERT BLOG POSTS
//SHOW SPINNER FIRST
spinner.show('blogHeader');
axios.get('http://yamensharaf.tk/blog/?json=get_recent_posts').then(function(response) {
  const postsDiv = document.getElementById('blogPosts');
  let posts = [];
  posts = response.data.posts;
  for (var i = 0; i < posts.length; i++) {
    let title = posts[i].title;
    let thumbnail = posts[i].thumbnail_images.medium_large.url;
    let link = posts[i].url;
    let card = `
      <div class="col-md-4 bottom-buffer">
          <!--Card-->
          <div data-aos="fade-up" class="card card-cascade narrower top-buffer">
              <!--Card image-->
              <div class="view overlay hm-white-slight">
                  <img src=${thumbnail} class="img-fluid" alt="WordPress blog coming soon">
                  <a target="_blank" href=${link}>
                      <div class="mask waves-effect waves-light"></div>
                  </a>
              </div>
              <!--Card content-->
              <div class="card-block">
                  <a target="_blank" href = ${link}><h5 class="card-text"><i class="mdi mdi-bookmark-outline"></i> ${title}</h5></a>
              </div>
              <!--/.Card-->
          </div>
      </div>
      `
    postsDiv.insertAdjacentHTML('beforeend', card);
  }
}).catch(function(error) {
  console.log(error);
});





// CANVAS SCRIPT
let resizeReset = function() {
  w = canvasBody.width = window.innerWidth;
  h = canvasBody.height = window.innerHeight;
}

const opts = {
  particleColor: "rgb(200,200,200)",
  lineColor: "rgb(200,200,200)",
  particleAmount: 30,
  defaultSpeed: 1,
  variantSpeed: 1,
  defaultRadius: 2,
  variantRadius: 2,
  linkRadius: 200,
};

window.addEventListener("resize", function() {
  deBouncer();
});

let deBouncer = function() {
  clearTimeout(tid);
  tid = setTimeout(function() {
    resizeReset();
  }, delay);
};

let checkDistance = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function(point1, hubs) {
  for (let i = 0; i < hubs.length; i++) {
    let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
    let opacity = 1 - distance / opts.linkRadius;
    if (opacity > 0) {
      drawArea.lineWidth = 0.5;
      drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      drawArea.beginPath();
      drawArea.moveTo(point1.x, point1.y);
      drawArea.lineTo(hubs[i].x, hubs[i].y);
      drawArea.closePath();
      drawArea.stroke();
    }
  }
}

Particle = function(xPos, yPos) {
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
  this.directionAngle = Math.floor(Math.random() * 360);
  this.color = opts.particleColor;
  this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
  this.vector = {
    x: Math.cos(this.directionAngle) * this.speed,
    y: Math.sin(this.directionAngle) * this.speed
  };
  this.update = function() {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  };
  this.border = function() {
    if (this.x >= w || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= h || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  };
  this.draw = function() {
    drawArea.beginPath();
    drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    drawArea.closePath();
    drawArea.fillStyle = this.color;
    drawArea.fill();
  };
};

function setup() {
  particles = [];
  resizeReset();
  for (let i = 0; i < opts.particleAmount; i++) {
    particles.push(new Particle());
  }
  window.requestAnimationFrame(loop);
}

function loop() {
  window.requestAnimationFrame(loop);
  drawArea.clearRect(0, 0, w, h);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  for (let i = 0; i < particles.length; i++) {
    linkPoints(particles[i], particles);
  }
}

const canvasBody = document.getElementById("canvas"),
  drawArea = canvasBody.getContext("2d");
let delay = 200,
  tid,
  rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();
