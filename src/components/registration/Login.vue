<template>
  <div class="login_wrapper">
    <div class='animate form login_form'>
    	<section class="login_content">
		    <form @submit.prevent="submitForm">
		    	<h1>Buffalo Bank</h1>
		    	<div>
		    		<input type="text" class="form-control" placeholder="Username" required="" v-model="credentials.username">
		    	</div>
		    	<div>
		    		<input type="password" class="form-control" placeholder="Password" required="" v-model="credentials.password">
		    	</div>
          <div v-if="message">
            <p>{{message}}</p>
          </div>
		    	<button type='submit' class='btn btn-default'>Log In</button>
          <a class="btn btn-default" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeYIOx3I1ulMeyQEvDZj3B9wahb6Q0wC8d4eOdvjVqIamhrdQ/viewform?usp=sf_link">Report an Issue</a>
		    	<div class="clearfix"></div>
		    	<div class="separator">
			    	<div>
			    		<p>©2017 All Rights Reserved. The Lexington Group</p>
			    	</div>
		    	</div>
		    </form>
		</section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      credentials: {
      	username: "",
      	password: "",
      },
      message: false,
    }
  },
  created: function() {

  },
  methods: {
    submitForm: function(e) {
      var self = this;
      self.message = "";
      this.credentials.password = this.credentials.password.trim();
      this.$http.post("/rest-auth/login/", this.credentials, {withCredentials:true})
        .then(function(response){
          console.log(response.status);
          if(response.status === 400) {
            self.message = "There was a problem with your username or password";
            self.credentials.username = "";
            self.credentials.password = "";
          } else {
            if (self.$cookie.get('user_key')) {
              self.$cookie.delete('user_key');
            }
            self.$cookie.set("user_key",response.data.key,1);
            self.$http.defaults.headers.common['Authorization'] = "Token " + response.data.key;
            self.credentials.username = "";
            self.credentials.password = "";
            self.$router.push({name:'dashboard'});
          }
        })
    }
  }
}
</script>
