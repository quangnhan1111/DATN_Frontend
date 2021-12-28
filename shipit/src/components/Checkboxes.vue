<template>
  <div>
    <v-container class="pt-0" fluid v-for="item in list" :key="item.id">
        <input
          :id="item.name"
          type="checkbox"
          :checked="checkedArray.indexOf(item.id) !== -1"
          @change="onChangeHandler(item.id)"
        />
        <label > {{item.label}}</label><br>

    </v-container>
  </div>
</template>

<script>
import {handleToggle} from "../utils/helper";

export default {
  name: "Checkboxes",
  props: {
    list: Array,
  },
  data: () => ({
    checkedArray: []
  }),
  methods: {
    onChangeHandler(checkboxId){
      const newState = handleToggle(checkboxId, this.checkedArray);
      this.checkedArray = newState
      // Update this checked information into Parent Component
      this.$emit('handleFilters', newState.map((id) => this.list[id].value))
    }
  }
}
</script>

<style scoped>

</style>
