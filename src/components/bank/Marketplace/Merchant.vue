<template>
  <div class='right_col' role='main'>
    <div class='row'>
      <div class='col-md-12 col-sm-12 col-xs-12'>
        <div class="x_panel">
          <div class="x_title">
            <h2>Step 1 <small>Select grade</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <button class="btn btn-primary" :disabled="selectedGrade=='6'" @click="selectedGrade='6'">6th Grade</button>
            <button class="btn btn-primary" :disabled="selectedGrade=='7'" @click="selectedGrade='7'">7th Grade</button>
            <button class="btn btn-primary" :disabled="selectedGrade=='8'" @click="selectedGrade='8'">8th Grade</button>
            <div class="clearfix"></div>
          </div>
        </div>
        <div v-if="mentorGroups.length > 0" class="x_panel">
          <div class="x_title">
            <h2>Step 2 <small>Select mentoring group</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <button v-for="group in MentorGroups" class="btn btn-primary" :disabled="selectedMentorGroup==group" @click="selectedMentorGroup=group">{{group.teachers[0].first_name}} {{group.teachers[1].last_name}}'s Mentoring Group'</button>
          </div>
        </div>
        <div v-if="selectedMentorGroup!={}" class="x_panel">
          <div class="x_title">
            <h2>Step 3 <small>Select students and items</small></h2>
            <div class="clearfix">
          </div>
          <div class="x_content">
            <div class="col-md-6">
              <h4>Students</h4>
              <hr>
              <div class="col-md-6">
                <p v-for="student in eligibleStudents">{{student.last_name}}, {{student.first_name}}</p>
              </div>
              <div class="col-md-6">
                <h5>Selected Students</h5>
                <hr>
                <p v-for="student in selectedStudents">{{student.last_name}}, {{student.first_name}} <i class='fa fa-arrow-right'></i><p>
              </div>
              <multiselect v-model="selectedStudents" :options="eligibleStudents" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" placeholder="Students">
                <template slot="tag" scope="props"><span class="custom_tag"><span>{{props.last_name}}, {{props.first_name}}</span><span class="custom__remove" @click="props.remove(props.option)"><i class="fa fa-times"></i></span></template>
              </multiselect>
            </div>
            <div class="col-md-6">
              <h4>Items</h4>
              <hr>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: "MerchantComponent",
  components: {
    Multiselect
  },
  data: function(){
    return {
      selectedGrade: null,
      mentorGroups: [],
      selectedMentorGroup: {},
      purchaseItems: [],
      eligibleStudents: [],
      ineligibleStudents: [],
      selectedStudents: []
    }
  }
}
</script>
