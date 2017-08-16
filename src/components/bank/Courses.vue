<template>
  <div class='right_col' role='main'>
    <div class='row'>
      <div class='col-md-12 col-sm-12 col-xs-12'>
        <div class='x_panel'>
          <div class='x_title'>
            <h2>Courses<small v-if="user.user_type == 'ADMIN' || user.user_type == 'OBSERVER'">All Active Courses</small><small v-else>All of Your Active Courses</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class='x_content'>
            <table class="table table-striped table-hover">
              <thead>
                <th style='width: 60%'>Course Name</th>
                <th style='width: 20%'>Hour</th>
                <th style='width: 20%' v-if="user.user_type == 'ADMIN' || user.user_type == 'OBSERVER'">Teacher(s)</th>
              </thead>
              <tbody>
                <tr v-for="course in courses">
                  <td><router-link :to="{name: 'course_roster', params: {course_id: course.id}}">{{ course.name }}</router-link></td>
                  <td>{{ course.hour }}</td>
                  <td v-if="user.user_type == 'ADMIN' || user.user_type == 'OBSERVER'">
                    <ul>
                      <li v-for="teacher in course.teachers">
                        {{ teacher.first_name }} {{ teacher.last_name }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoursesPageComponent',
  created: function() {
    this.fetchCourses();
  },
  data: function() {
    return {
      courses: [],
    }
  },
  props: {
    user: {}
  },
  methods: {
    fetchCourses: function() {
      var self = this;
      var url = '/bank/courses/active/'
      self.$http.get(url)
      .then(function(response){
        self.courses = response.data;
      })
    }
  }
}
</script>
