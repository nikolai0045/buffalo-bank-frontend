<template>
  <div class="right_col" role="main">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Students <small>{{ course.name }} - section {{ course.section_number }}</small></h2>
            <div class='clearfix'></div>
          </div>
          <div class="x_content">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Account Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in course.students">
                  <td>{{ student.last_name }}</td>
                  <td>{{ student.first_name }}</td>
                  <td>{{ student.account_balance }}</td>
                  <td><button class='btn btn-default'>Profile</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RosterPageComponent',
  created: function() {
    this.fetchCourse();
  },
  data: function () {
    return {
      course: {},
    }
  },
  props: {
    user: {},
  },
  methods: {
    fetchCourse: function() {
      var self = this;
      var url = '/bank/roster/'+self.$route.params.course_id+"/";
      self.$http.get(url)
      .then(function(response){
        self.course = response.data;
      });
    }
  }
}
</script>
