<template>
  <CCard>
    <CCardBody>
      <CDataTable
          :hover="hover"
          :striped="striped"
          :border="border"
          :small="small"
          :fixed="fixed"
          :items="items"
          :fields="fields"
          :items-per-page="small ? 10 : 5"
          :dark="dark"
          pagination
      >
        <template #status="{item}">
          <td>
            <label class="switch">
              <input type="checkbox" :checked="item.status" @change="$emit('ToggleStatus', item.id)">
              <span class="slider round"></span>
            </label>
          </td>
        </template>
        <template #action="{item}">
          <td>
            <router-link :to="`/edit-customer/${item.id}`"
                         tag="button"
                         class="btn btn-success"
                         style="{font-size: 10px;}"
            >Edit
            </router-link>
            <button
                class="btn btn-danger"
                :id = "item.id"
                @click="$emit('deleteCustomer', item.id)"
            >Delete
            </button>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>

export default {
  name: 'customer',
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['id', 'username', 'full_name', 'email', 'address', 'phone_number', 'created_at', 'updated_at','status', 'action']
      }
    },
    caption: {
      type: String,
      default: 'table'
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  data(){
    return {
      labelIcon: {
        labelOn: '\u2713',
        labelOff: '\u2715'
      },
    }
  },
  methods: {

  }
}
</script>
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>


