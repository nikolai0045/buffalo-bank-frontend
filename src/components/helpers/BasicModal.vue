<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<!-- <template>
	<div class="modal fade" id="editPersonalGoalModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" v-if="student != null">
					<h2 class="modal-title">{{student.first_name}} {{student.last_name}}</h2>
				</div>
				<div class="modal-body" v-if="student != null">
					<div class="row">
            <form>
              <div class="form-group">
                <label for="editGoalName">Goal</label>
                <input type="text" class="form-control" id="editGoalName" :value="goal.name" v-bind="newName">
              </div>
              <div class="form-group">
                <label for="editGoalDescription">Example textarea</label>
                <textarea class="form-control" id="editGoalDescription" rows="3" :value="goal.description" v-bind="newDescription"></textarea>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" :checked="goal.active" v-bind="active" class="form-check-input">
                  Active
                </label>
              </div>
            </form>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template> -->

<script>
export default {
	name: 'BasicModal',
	props: {
		student: {},
    goal: {}
	},
	data: function(){
		return {
			newName: "",
      newDescription: "",
      active: true
		}
	}
}
</script>
