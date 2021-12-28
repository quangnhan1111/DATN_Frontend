<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage" class="btn btn-black">
        First
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage" class="btn btn-black">
        Previous
      </button>
    </li>

    <li v-for="page in pages" class="pagination-item" :key="page.name">
      <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{ actived: isPageActive(page.name) }" class="btn btn-black">
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage" class="btn btn-black">
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage" class="btn btn-black">
        Last
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Paginate',
  components:{

  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        if(this.totalPages - this.maxVisibleButtons>0){
          return this.totalPages - this.maxVisibleButtons;
        }
        return 1;
      }
      // When in between
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      console.log(this.startPage)
      for (let i = this.startPage;
           i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
           i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    },
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      console.log(page)
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    }
  }
};
</script>
<style scoped>
.pagination {
  list-style-type: none;
  display: flex;
  justify-content: center;
}

.pagination-item {
  color: #8a2b2b;
  padding: 2px 4px;
  margin: 0;
  text-decoration: none;
  /*border-radius: 50%;*/
  /*border: 2px solid #a1a1a1;*/
}

.actived {
  background-color: #f50f2a;
  color: #a90f0f;
}
</style>
