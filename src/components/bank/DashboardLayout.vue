<template>
  <div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col">
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <router-link class="site_title" to="/"><i class="fa fa-cloud"></i> <span>Buffalo Bank</span></router-link>
          </div>

          <div class="clearfix"></div>

          <!-- sidebar menu -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
              <ul class="nav side-menu">
                <li :class="{'active': $route.fullPath === '/reports'}">
                  <router-link to="/reports"><i class="fa fa-book"></i> Reports </router-link>
                </li>
                <li :class="{'active': $route.fullPath === '/courses'}">
                  <router-link to="/courses"><i class="fa fa-graduation-cap"></i> Courses </router-link>
                </li>
        				<li v-if="user.merchant" :class="{'active':$route.fullPath === '/marketplace'}">
        					<router-link to="/marketplace"><i class="fa fa-building"></i>Market</router-link>
        				</li>
                <li>
                  <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeYIOx3I1ulMeyQEvDZj3B9wahb6Q0wC8d4eOdvjVqIamhrdQ/viewform?usp=sf_link"><i class="fa fa-exclamation-triangle"></i>Report an Issue</a>
                </li>
                <!-- <li v-if="user.user_type == 'ADMIN' || user.user_type == 'TEACHER' || user.user_type == 'OBSERVER'" :class="{'active': $route.fullPath === '/users'}">
                  <router-link to="/"><i class="fa fa-users"></i> Users </router-link>
                </li>
                <li v-if="user.user_type == 'ADMIN' || user.user_type == 'TEACHER' || user.user_type == 'OBSERVER'" :class="{'active': $route.fullPath === '/archive'}">
                  <router-link to="/"><i class="fa fa-archive"></i> Archive </router-link>
                </li> -->
              </ul>
            </div>
          </div>
          <!-- /sidebar menu -->
        </div>
      </div>

      <!-- top navigation -->
      <div class="top_nav">
        <div class="nav_menu">
          <nav class="" role="navigation">
            <div class="nav toggle">
              <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>

            <ul class="nav navbar-nav navbar-right">
              <li class="">
                <a href="" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  {{user.first_name}} {{user.last_name}}
                  <span class=" fa fa-angle-down"></span>
                </a>
                <ul class="dropdown-menu dropdown-usermenu pull-right">
                  <li><router-link v-if="user" :to="{name: 'dashboard', params:{}}">Profile </router-link></li>
                  <li><a href="#" @click.prevent="signOut"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- /top navigation -->

      <!-- page content -->
      <router-view name="content" :user="user"></router-view>
      <!-- /page content -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',
  created: function() {

  },
  mounted: function() {
    initSidebar();
    var self = this;
    self.$http.get('/bank/current_user/')
    .then(function(response){
      self.setUser(response.data);
      console.log(response.data);
    });
  },
  updated: function() {
    initSidebar();
  },
  data: function() {
    return{
      user: {},
    }
  },
  methods: {
    setUser: function(user) {
      this.user = user;
    },
    signOut: function(){
      this.$cookie.delete('user_key');
      this.$http.defaults.headers.common['Authorization'] = null;
      this.$router.push({name: 'login'});
    },
  }
}
</script>
