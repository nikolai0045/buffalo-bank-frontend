<template>
  <div class="x_panel">
    <div class="x_title">
      <h2>Notes <small>Notes since last Monday</small></h2>
      <div class="clearfix"></div>
    </div>
    <div class="x_content">
      <table class="table table-condensed">
        <thead>
          <th>Date</th>
          <th>Course</th>
          <th>Note</th>
        </thead>
        <tbody>
          <tr v-for="note in notes">
            <td>{{note.course_report.date}}</td>
            <td>{{note.course_report.course.name}}</td>
            <td>{{note.note}}</td>
          </tr>
        </tbody>
      </table>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentNotesComponent",
  props: ['student'],
  data: function(){
    return {
      notes:[]
    }
  },
  created: function(){
    this.fetchNotes();
  },
  methods: {
    fetchNotes: function(){
      var url = "bank/student/recent_notes/"+this.student.id+"/"
      var self = this;
      self.$http.get(url)
      .then(function(response){
        self.notes = response.data;
      })
    }
  }
}
</script>
