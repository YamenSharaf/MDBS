axios.get('http://yamensharaf.tk/blog/?json=get_recent_posts')
  .then(function (response) {
    const postsDiv = document.getElementById('blogPosts');
    let posts = [];
    posts = response.data.posts;
    for (var i = 0; i < posts.length; i++) {
      let title = posts[i].title;
      let thumbnail = posts[i].thumbnail_images.medium.url;
      console.log(thumbnail);
      let card = `
      <div class="col-md-4 bottom-buffer">
          <!--Card-->
          <div data-aos="fade-up" class="card card-cascade narrower top-buffer">
              <!--Card image-->
              <div class="view overlay hm-white-slight">
                  <img src=${thumbnail} class="img-fluid" alt="WordPress blog coming soon">
                  <a>
                      <div class="mask waves-effect waves-light"></div>
                  </a>
              </div>
              <!--Card content-->
              <div class="card-block">
                  <h5 class="card-text"><i class="mdi mdi-wordpress"></i> ${title}</h5>
              </div>
              <!--/.Card-->
          </div>
      </div>
      `
      postsDiv.insertAdjacentHTML('beforeend', card);
    }
  })
  .catch(function (error) {
    console.log(error);
  });



let content = `<div class="col-md-4 bottom-buffer">
    <!--Card-->
    <div data-aos="fade-up" class="card card-cascade narrower top-buffer">
        <!--Card image-->
        <div class="view overlay hm-white-slight">
            <img src="img/wp.jpg" class="img-fluid" alt="WordPress blog coming soon">
            <a>
                <div class="mask waves-effect waves-light"></div>
            </a>
        </div>
        <!--Card content-->
        <div class="card-block">
            <h5 class="card-text"><i class="mdi mdi-wordpress"></i> Powered by WordPress</h5>
        </div>
        <!--/.Card-->
    </div>
</div>`
