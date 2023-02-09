<template>
  <ul>
    <slot :todos="todos"></slot>
  </ul>
</template>

<script>
export default {
  name: 'List' ,
  props : ['todos']
}
</script>