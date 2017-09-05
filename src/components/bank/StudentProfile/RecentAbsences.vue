<template>
  <div class="x_panel">
    <div class="x_title">
      <h2>Absences <small>Since last Monday</small></h2>
      <div class="clearfix"></div>
    </div>
    <div class="x_content">
      <table class="table table-condensed">
        <thead>
          <th>Date</th>
          <th>Courses Missed</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="absence in absences">
            <td>{{absence.date}}</td>
            <td>
              <a data-toggle="tooltip" data-placement="right" data-html="true" :title="getTooltipText(absence)">
                {{absence.courses.length}} courses
              </a>
            </td>
            <td v-if="absence.note">{{absence.note}}</td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentAbsencesComponent",
  props: ['student'],
  data: function(){
    return {
      absences: []
    }
  },
  created: function(){
    this.fetchAbsences();
  },
  methods: {
    fetchAbsences: function(){
      var url = "bank/student/recent_absences/"+this.student.id+"/";
      var self = this;
      self.$http.get(url)
      .then(function(response){
        self.absences = response.data;
      });
    },
    getTooltipText: function(absence){
      var ret = "<ul>";
      for (var i = 0;i<absence.courses.length;i++){
        ret += "<li>";
        ret += absence.courses[i].name;
        ret += "</li>";
      };
      ret += "</ul>";
      return ret;
    }
  }
}
</script>
