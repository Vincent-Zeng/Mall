<template>
	<div>
        <p type="button" @click="showDetail()">
        	<slot name="summary"></slot>
        </p>
        <div v-show="open">
            <slot name="detail"></slot>
        </div>
    </div>
</template>
<script>
export default{
  data () {
    return {
      open: false
    }
  },
  methods: {
    showDetail () {
      this.open = !this.open
      console.log(this.open)
    }
  }
}
</script>
<style lang="scss" scoped>
  p{
  	cursor:pointer
  }
</style>
