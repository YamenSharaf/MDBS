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
