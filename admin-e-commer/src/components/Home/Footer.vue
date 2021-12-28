<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} Fashion Shop management</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
